// /* ══════════════════════════════════════════════════════
//    Sasana Jiwa — Main JavaScript
//    ══════════════════════════════════════════════════════ */
//
// (function () {
//   'use strict';
//
//   /* ── Mobile menu toggle ──────────────────────────── */
//   var t = document.getElementById('nav-toggle'),
//       m = document.getElementById('mobile-menu'),
//       b = document.getElementById('m-backdrop'),
//       io = document.getElementById('ic-open'),
//       ic = document.getElementById('ic-close');
//
//   function openMenu() {
//     m.classList.remove('d-none');
//     io.classList.add('d-none');
//     ic.classList.remove('d-none');
//     t.setAttribute('aria-expanded', 'true');
//     document.body.style.overflow = 'hidden';
//     closeProducts();
//   }
//
//   function closeMenu() {
//     m.classList.add('d-none');
//     io.classList.remove('d-none');
//     ic.classList.add('d-none');
//     t.setAttribute('aria-expanded', 'false');
//     document.body.style.overflow = '';
//   }
//
//   if (t) {
//     t.addEventListener('click', function () {
//       m.classList.contains('d-none') ? openMenu() : closeMenu();
//     });
//   }
//   if (b) {
//     b.addEventListener('click', closeMenu);
//   }
//   document.addEventListener('keydown', function (e) {
//     if (e.key === 'Escape') {
//       closeMenu();
//       closeProducts();
//     }
//   });
//
//   /* ── Navbar scroll — dark ↔ light ────────────────── */
//   var nav = document.getElementById('main-nav');
//   function updateNav() {
//     if (window.scrollY > 60) {
//       nav.classList.replace('navbar-dark', 'navbar-light');
//     } else {
//       nav.classList.replace('navbar-light', 'navbar-dark');
//     }
//   }
//   window.addEventListener('scroll', updateNav, { passive: true });
//
//   /* ── Product dropdown ────────────────────────────── */
//   var btn   = document.getElementById('prod-toggle');
//   var menu  = document.getElementById('products-menu');
//   var chev  = btn ? btn.querySelector('.prod-chevron') : null;
//   var mBtn  = document.getElementById('m-prod-toggle');
//   var mSub  = document.getElementById('m-products-sub');
//   var mChev = mBtn ? mBtn.querySelector('.prod-chevron') : null;
//
//   function closeProducts() {
//     if (menu) menu.classList.add('d-none');
//     if (chev) chev.classList.remove('open');
//   }
//   window.closeProducts = closeProducts;
//
//   if (btn) {
//     btn.addEventListener('click', function (e) {
//       e.stopPropagation();
//       var isOpen = !menu.classList.contains('d-none');
//       if (isOpen) {
//         closeProducts();
//       } else {
//         menu.classList.remove('d-none');
//         chev.classList.add('open');
//       }
//     });
//   }
//
//   if (mBtn) {
//     mBtn.addEventListener('click', function (e) {
//       e.stopPropagation();
//       var isOpen = !mSub.classList.contains('d-none');
//       mSub.classList.toggle('d-none', isOpen);
//       mSub.style.display = isOpen ? 'none' : 'flex';
//       if (mChev) mChev.classList.toggle('open', !isOpen);
//     });
//   }
//
//   document.addEventListener('click', function (e) {
//     if (menu && !menu.classList.contains('d-none')) {
//       if (!menu.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
//         closeProducts();
//       }
//     }
//   });
//
// })();
