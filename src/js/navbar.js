/* ══════════════════════════════════════════════════════
   Sasana Jiwa — Navbar JavaScript
   ══════════════════════════════════════════════════════

   Page detection
   ─────────────
   Add  class="page-home"  to <body> on the home page only.
   All other pages leave the body class empty (or anything else).

   Behaviour
   ─────────
   • Home page  → starts transparent (navbar-dark);
                  switches to white (navbar-light) after 60 px scroll.
   • Other pages → always white (navbar-light) from the start.
   • Mobile hamburger inherits colour from navbar theme via CSS:
       navbar-dark  → white bg, navy icon
       navbar-light → navy bg,  white icon
   ══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Cached elements ─────────────────────────────── */
  var nav     = document.getElementById('main-nav');
  var toggle  = document.getElementById('nav-toggle');
  var mMenu   = document.getElementById('mobile-menu');
  var mBack   = document.getElementById('m-backdrop');
  var icOpen  = document.getElementById('ic-open');
  var icClose = document.getElementById('ic-close');

  var prodBtn  = document.getElementById('prod-toggle');
  var prodMenu = document.getElementById('products-menu');
  var prodChev = prodBtn ? prodBtn.querySelector('.prod-chevron') : null;

  var mProdBtn  = document.getElementById('m-prod-toggle');
  var mProdSub  = document.getElementById('m-products-sub');
  var mProdChev = mProdBtn ? mProdBtn.querySelector('.prod-chevron') : null;

  /* ── Navbar theme ────────────────────────────────── */
  var isHome        = document.body.classList.contains('page-home');
  var SCROLL_THR    = 60;
  var themeBeforeMenu = null; // simpan theme sebelum menu dibuka

  function setTheme(theme) {
    // theme: 'dark' | 'light'
    nav.classList.toggle('navbar-dark',  theme === 'dark');
    nav.classList.toggle('navbar-light', theme === 'light');
  }

  function updateNavOnScroll() {
    setTheme(window.scrollY > SCROLL_THR ? 'light' : 'dark');
  }

  // Initialise
  if (isHome) {
    setTheme('dark');
    window.addEventListener('scroll', updateNavOnScroll, { passive: true });
  } else {
    setTheme('light');
  }

  /* ── Mobile menu ─────────────────────────────────── */
  function openMenu() {
    if (!mMenu) return;
    mMenu.classList.remove('d-none');
    if (icOpen)  icOpen.classList.add('d-none');
    if (icClose) icClose.classList.remove('d-none');
    if (toggle)  toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    // simpan theme saat ini lalu paksa white
    themeBeforeMenu = nav.classList.contains('navbar-dark') ? 'dark' : 'light';
    setTheme('light');
    closeProdMenu();
  }

  function closeMenu() {
    if (!mMenu) return;
    mMenu.classList.add('d-none');
    if (icOpen)  icOpen.classList.remove('d-none');
    if (icClose) icClose.classList.add('d-none');
    if (toggle)  toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    // kembalikan theme sebelum menu dibuka
    if (themeBeforeMenu) {
      setTheme(themeBeforeMenu);
      themeBeforeMenu = null;
    }
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      mMenu.classList.contains('d-none') ? openMenu() : closeMenu();
    });
  }
  if (mBack) mBack.addEventListener('click', closeMenu);

  /* ── Products dropdown ───────────────────────────── */
  function openProdMenu() {
    if (!prodMenu) return;
    prodMenu.classList.remove('d-none');
    if (prodChev) prodChev.classList.add('open');
  }

  function closeProdMenu() {
    if (!prodMenu) return;
    prodMenu.classList.add('d-none');
    if (prodChev) prodChev.classList.remove('open');
  }
  // expose for external use (e.g. mobile menu open calls it)
  window.closeProdMenu = closeProdMenu;

  if (prodBtn) {
    prodBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      prodMenu.classList.contains('d-none') ? openProdMenu() : closeProdMenu();
    });
  }

  // Close products dropdown when clicking outside
  document.addEventListener('click', function (e) {
    if (!prodMenu || prodMenu.classList.contains('d-none')) return;
    if (!prodMenu.contains(e.target) && !prodBtn.contains(e.target)) {
      closeProdMenu();
    }
  });

  /* ── Mobile products sub-menu ────────────────────── */
  if (mProdBtn && mProdSub) {
    mProdBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = !mProdSub.classList.contains('d-none');
      mProdSub.classList.toggle('d-none', isOpen);
      mProdSub.style.display = isOpen ? 'none' : 'flex';
      if (mProdChev) mProdChev.classList.toggle('open', !isOpen);
    });
  }

  /* ── Keyboard: Escape closes everything ─────────── */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeMenu();
      closeProdMenu();
    }
  });

})();