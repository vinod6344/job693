from __future__ import annotations

import sys
import time
from dataclasses import dataclass

from playwright.sync_api import TimeoutError as PlaywrightTimeoutError
from playwright.sync_api import sync_playwright


BASE = "http://localhost:5173/index.html"


@dataclass
class StepResult:
    name: str
    ok: bool
    details: str = ""


def fail(msg: str) -> None:
    raise AssertionError(msg)


def main() -> int:
    results: list[StepResult] = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        try:
            # 1) settings: roleKeywords=React, save
            page.goto(f"{BASE}#/settings", wait_until="domcontentloaded")
            page.wait_for_selector("#settings-form", timeout=10_000)
            page.fill("#role-keywords", "React")
            page.click("#settings-save")
            results.append(StepResult("1) Set roleKeywords=React and save", True))

            # 2) go to dashboard
            page.goto(f"{BASE}#/dashboard", wait_until="domcontentloaded")
            page.wait_for_selector(".ds-job-card", timeout=15_000)
            results.append(StepResult("2) Navigate to #/dashboard", True))

            # 3) first visible job: set status Applied
            first_card = page.locator(".ds-job-card").first
            job_id = first_card.get_attribute("data-job-id") or ""
            title = (first_card.locator(".ds-job-card__title").inner_text() or "").strip()
            company = (first_card.locator(".ds-job-card__company").inner_text() or "").strip()

            if not job_id:
                fail("First job card missing data-job-id attribute.")
            if not title or not company:
                fail("Could not read title/company from first job card.")

            first_card.locator('button[data-action="set-status"][data-status="Applied"]').click()
            results.append(
                StepResult(
                    "3) First visible card: set status Applied",
                    True,
                    details=f'Job: "{title}" @ "{company}" (id={job_id})',
                )
            )

            # 4) confirm toast appears then auto disappears
            toast = page.locator(".ds-toast", has_text="Status updated: Applied")
            t0 = time.monotonic()
            toast.wait_for(state="visible", timeout=5_000)
            t_visible = time.monotonic() - t0

            # It should auto-remove; expect hidden/detached after ~2.4s + 220ms.
            t1 = time.monotonic()
            toast.wait_for(state="detached", timeout=8_000)
            t_detached = time.monotonic() - t1

            results.append(
                StepResult(
                    "4) Toast appears and auto disappears",
                    True,
                    details=f"toast visible after {t_visible:.2f}s; detached after {t_detached:.2f}s",
                )
            )

            # Sanity: badge reflects Applied before refresh
            badge_text = (first_card.locator(".ds-status-badge").inner_text() or "").strip()
            if badge_text != "Applied":
                fail(f'After setting status, expected status badge "Applied" but saw "{badge_text}".')

            # 5) refresh
            page.reload(wait_until="domcontentloaded")
            page.wait_for_selector(".ds-job-card", timeout=15_000)
            results.append(StepResult("5) Refresh page", True))

            # 6) confirm status persisted
            same_card = page.locator(f'.ds-job-card[data-job-id="{job_id}"]')
            same_card.wait_for(state="visible", timeout=10_000)

            persisted_badge = (same_card.locator(".ds-status-badge").inner_text() or "").strip()
            applied_btn_class = same_card.locator('button[data-action="set-status"][data-status="Applied"]').get_attribute(
                "class"
            ) or ""

            if persisted_badge != "Applied":
                fail(f'After refresh, expected persisted badge "Applied" but saw "{persisted_badge}".')
            if "is-active" not in applied_btn_class:
                fail('After refresh, expected Applied status button to have class "is-active".')

            results.append(StepResult("6) Status persisted after refresh", True))

            # 7) set Status filter to Applied and confirm only Applied jobs show
            page.select_option("#filter-status", "Applied")

            # Wait for list to re-render (container replaced).
            page.wait_for_timeout(250)
            cards = page.locator(".ds-job-card")
            count = cards.count()
            if count == 0:
                fail("After filtering Status=Applied, no job cards are visible.")

            statuses: set[str] = set()
            # Inspect up to 30 cards for speed.
            for i in range(min(count, 30)):
                st = (cards.nth(i).locator(".ds-status-badge").inner_text() or "").strip()
                statuses.add(st)

            if statuses != {"Applied"}:
                fail(f"Expected only Applied statuses visible after filter; saw statuses: {sorted(statuses)}")

            results.append(
                StepResult(
                    "7) Status filter Applied shows only Applied jobs",
                    True,
                    details=f"visible cards={count}, statuses={sorted(statuses)}",
                )
            )

            # 8) digest: confirm Recent Status Updates shows the update
            page.goto(f"{BASE}#/digest", wait_until="domcontentloaded")
            page.wait_for_selector(".ds-digest-updates__title", timeout=10_000)

            updates = page.locator(".ds-update-row")
            if updates.count() == 0:
                fail("Digest has 'Recent Status Updates' section but no update rows.")

            # Find row by exact title+company match as rendered.
            row = page.locator(".ds-update-row", has_text=title).filter(has_text=company).first
            row.wait_for(state="visible", timeout=5_000)
            row_status = (row.locator(".ds-status-badge").inner_text() or "").strip()
            if row_status != "Applied":
                fail(f'In digest updates, expected status "Applied" but saw "{row_status}".')

            meta = (row.locator(".ds-update-row__meta").inner_text() or "").strip()

            results.append(
                StepResult(
                    "8) Digest Recent Status Updates includes the Applied update",
                    True,
                    details=f'Row meta: "{meta}"',
                )
            )

        except PlaywrightTimeoutError as e:
            results.append(StepResult("Playwright timeout", False, details=str(e)))
        except Exception as e:
            results.append(StepResult("Exception", False, details=str(e)))
        finally:
            context.close()
            browser.close()

    # Print concise report
    ok = all(r.ok for r in results)
    for r in results:
        status = "PASS" if r.ok else "FAIL"
        line = f"{status} - {r.name}"
        if r.details:
            line += f" ({r.details})"
        print(line)

    return 0 if ok else 2


if __name__ == "__main__":
    raise SystemExit(main())

