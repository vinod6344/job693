/**
 * Job Notification App — Route shell and navigation
 * SPA: no full page reloads. Active link no flicker.
 * Design system: calm, minimal, 180ms ease-in-out.
 */

(function () {
  'use strict';

  var PLACEHOLDER_SUBTEXT = 'This section will be built in the next step.';

  var ROUTES = [
    { path: '/', title: 'Home' },
    { path: '/dashboard', title: 'Dashboard' },
    { path: '/saved', title: 'Saved' },
    { path: '/digest', title: 'Digest' },
    { path: '/settings', title: 'Settings' },
    { path: '/proof', title: 'Proof' }
  ];

  function getPath() {
    return window.location.pathname.replace(/\/$/, '') || '/';
  }

  function findRoute(path) {
    var normal = path === '' ? '/' : path;
    for (var i = 0; i < ROUTES.length; i++) {
      if (ROUTES[i].path === normal) return ROUTES[i];
    }
    return null;
  }

  function renderPlaceholder(route) {
    return (
      '<div class="ds-route__inner">' +
        '<h1 class="ds-headline">' + escapeHtml(route.title) + '</h1>' +
        '<p class="ds-subline">' + escapeHtml(PLACEHOLDER_SUBTEXT) + '</p>' +
      '</div>'
    );
  }

  function render404() {
    return (
      '<div class="ds-route__inner ds-route--404">' +
        '<h1 class="ds-headline">Page Not Found</h1>' +
        '<p class="ds-subline">The page you are looking for does not exist.</p>' +
      '</div>'
    );
  }

  function escapeHtml(s) {
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  function setActiveLink(path) {
    var pathNorm = path === '' ? '/' : path;
    var allLinks = document.querySelectorAll('.ds-nav__link[href]');
    allLinks.forEach(function (a) {
      var href = a.getAttribute('href');
      var linkPath = href === '/' ? '/' : href.replace(/\/$/, '');
      if (linkPath === pathNorm) {
        a.classList.add('is-active');
      } else {
        a.classList.remove('is-active');
      }
    });
  }

  function render() {
    var path = getPath();
    var route = findRoute(path);
    var app = document.getElementById('app');
    if (!app) return;

    if (route) {
      app.innerHTML = renderPlaceholder(route);
    } else {
      app.innerHTML = render404();
    }

    setActiveLink(path);
    closeNavDropdown();
  }

  function handleClick(e) {
    var a = e.target.closest('a[data-link]');
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
    var href = a.getAttribute('href');
    if (!href || href.indexOf('://') !== -1) return;

    e.preventDefault();
    var path = href === '/' ? '/' : href.replace(/\/$/, '');
    var currentPath = getPath();
    if (path === currentPath) return;

    window.history.pushState({}, '', href);
    render();
  }

  function closeNavDropdown() {
    var dropdown = document.getElementById('nav-dropdown');
    var btn = document.getElementById('nav-menu-btn');
    if (dropdown) dropdown.classList.remove('is-open');
    if (btn) {
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Open menu');
    }
  }

  function toggleNavDropdown() {
    var dropdown = document.getElementById('nav-dropdown');
    var btn = document.getElementById('nav-menu-btn');
    if (!dropdown || !btn) return;
    var isOpen = dropdown.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', isOpen);
    btn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    dropdown.setAttribute('aria-hidden', !isOpen);
  }

  function init() {
    render();
    document.addEventListener('click', handleClick);
    window.addEventListener('popstate', render);

    var menuBtn = document.getElementById('nav-menu-btn');
    if (menuBtn) {
      menuBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleNavDropdown();
      });
    }

    document.addEventListener('click', function (e) {
      if (!e.target.closest('.ds-nav')) closeNavDropdown();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
