/**
 * Job Notification Tracker — Premium SaaS app skeleton
 * Route-specific content. No state, no backend, no logic.
 * Design system: calm, minimal, 180ms ease-in-out.
 */

(function () {
  'use strict';

  var ROUTES = [
    { path: '/', name: 'landing' },
    { path: '/dashboard', name: 'dashboard' },
    { path: '/saved', name: 'saved' },
    { path: '/digest', name: 'digest' },
    { path: '/settings', name: 'settings' },
    { path: '/proof', name: 'proof' }
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

  function escapeHtml(s) {
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  function renderLanding() {
    return (
      '<div class="ds-route__inner">' +
        '<h1 class="ds-headline">Stop Missing The Right Jobs.</h1>' +
        '<p class="ds-subline">Precision-matched job discovery delivered daily at 9AM.</p>' +
        '<div class="ds-landing-cta">' +
          '<a href="/settings" class="ds-btn ds-btn--primary" data-link>Start Tracking</a>' +
        '</div>' +
      '</div>'
    );
  }

  function renderSettings() {
    return (
      '<div class="ds-route__inner">' +
        '<h1 class="ds-headline">Settings</h1>' +
        '<p class="ds-subline" style="margin-bottom: 24px;">Configure your preferences. No logic yet—UI placeholders only.</p>' +
        '<form class="ds-form" novalidate>' +
          '<div class="ds-field">' +
            '<label class="ds-label" for="role-keywords">Role keywords</label>' +
            '<input type="text" id="role-keywords" class="ds-input" placeholder="e.g. Frontend, React, Product Manager">' +
          '</div>' +
          '<div class="ds-field">' +
            '<label class="ds-label" for="locations">Preferred locations</label>' +
            '<input type="text" id="locations" class="ds-input" placeholder="e.g. New York, Remote">' +
          '</div>' +
          '<div class="ds-field">' +
            '<span class="ds-label">Mode</span>' +
            '<div class="ds-radio-group">' +
              '<label class="ds-radio"><input type="radio" name="mode" value="remote"> Remote</label>' +
              '<label class="ds-radio"><input type="radio" name="mode" value="hybrid"> Hybrid</label>' +
              '<label class="ds-radio"><input type="radio" name="mode" value="onsite"> Onsite</label>' +
            '</div>' +
          '</div>' +
          '<div class="ds-field">' +
            '<label class="ds-label" for="experience">Experience level</label>' +
            '<select id="experience" class="ds-select">' +
              '<option value="">Select level</option>' +
              '<option value="entry">Entry</option>' +
              '<option value="mid">Mid</option>' +
              '<option value="senior">Senior</option>' +
              '<option value="lead">Lead</option>' +
            '</select>' +
          '</div>' +
        '</form>' +
      '</div>'
    );
  }

  function renderDashboard() {
    return (
      '<div class="ds-route__inner">' +
        '<div class="ds-empty">' +
          '<h2 class="ds-empty__title">No jobs yet</h2>' +
          '<p class="ds-empty__text">In the next step, you will load a realistic dataset.</p>' +
        '</div>' +
      '</div>'
    );
  }

  function renderSaved() {
    return (
      '<div class="ds-route__inner">' +
        '<h1 class="ds-headline">Saved</h1>' +
        '<div class="ds-empty" style="margin-top: 24px;">' +
          '<h2 class="ds-empty__title">Nothing saved yet</h2>' +
          '<p class="ds-empty__text">Jobs you save will appear here. No data yet.</p>' +
        '</div>' +
      '</div>'
    );
  }

  function renderDigest() {
    return (
      '<div class="ds-route__inner">' +
        '<h1 class="ds-headline">Digest</h1>' +
        '<div class="ds-empty" style="margin-top: 24px;">' +
          '<h2 class="ds-empty__title">Daily summary coming next</h2>' +
          '<p class="ds-empty__text">Your precision-matched job digest will be delivered here. No logic yet.</p>' +
        '</div>' +
      '</div>'
    );
  }

  function renderProof() {
    return (
      '<div class="ds-route__inner">' +
        '<h1 class="ds-headline">Proof</h1>' +
        '<p class="ds-subline">Placeholder for artifact collection. This section will be built in the next step.</p>' +
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

  function renderRoute(route) {
    switch (route.name) {
      case 'landing': return renderLanding();
      case 'settings': return renderSettings();
      case 'dashboard': return renderDashboard();
      case 'saved': return renderSaved();
      case 'digest': return renderDigest();
      case 'proof': return renderProof();
      default: return render404();
    }
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
      app.innerHTML = renderRoute(route);
    } else {
      app.innerHTML = render404();
    }

    setActiveLink(path);
    closeNavDropdown();
  }

  function navigate(href) {
    var path = href === '/' ? '/' : href.replace(/\/$/, '');
    var currentPath = getPath();
    if (path === currentPath) return;
    window.history.pushState({}, '', href);
    render();
  }

  function handleClick(e) {
    var a = e.target.closest('a[data-link]');
    if (a && a.target !== '_blank' && !a.hasAttribute('download')) {
      var href = a.getAttribute('href');
      if (href && href.indexOf('://') === -1) {
        e.preventDefault();
        navigate(href);
        return;
      }
    }
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
