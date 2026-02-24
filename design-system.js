/**
 * Design system — minimal interaction
 * Copyable prompt, checklist toggle. 150–200ms, ease-in-out, no bounce.
 */

(function () {
  'use strict';

  // Copy button: copy target text to clipboard
  document.querySelectorAll('[data-copy-target]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = this.getAttribute('data-copy-target');
      var el = id ? document.getElementById(id) : null;
      var text = el ? (el.textContent || el.innerText || '').trim() : '';
      if (!text) return;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          btn.textContent = 'Copied';
          setTimeout(function () { btn.textContent = 'Copy'; }, 2000);
        });
      } else {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'absolute';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand('copy');
          btn.textContent = 'Copied';
          setTimeout(function () { btn.textContent = 'Copy'; }, 2000);
        } finally {
          document.body.removeChild(ta);
        }
      }
    });
  });

  // Checklist: click item to toggle done (demo)
  document.querySelectorAll('.ds-checklist__item').forEach(function (item) {
    item.addEventListener('click', function () {
      var done = this.getAttribute('data-done') === 'true';
      this.setAttribute('data-done', done ? 'false' : 'true');
    });
  });
})();
