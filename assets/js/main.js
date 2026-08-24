/* AL-SHAMAA — landing page interactions
   Everything degrades gracefully and respects prefers-reduced-motion. */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Header state + scroll progress ──────────────────────────────── */
  var header   = document.getElementById('header');
  var progress = document.getElementById('progress');
  var ticking  = false;

  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    header.classList.toggle('is-stuck', y > 40);

    var max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
    ticking = false;
  }
  function requestScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }
  window.addEventListener('scroll', requestScroll, { passive: true });
  onScroll();

  /* ── Mobile drawer ───────────────────────────────────────────────── */
  var burger = document.getElementById('burger');
  var drawer = document.getElementById('drawer');

  var MENU_LABEL = {
    en: { open: 'Open menu', close: 'Close menu' },
    ar: { open: '\u0641\u062a\u062d \u0627\u0644\u0642\u0627\u0626\u0645\u0629',
          close: '\u0625\u063a\u0644\u0627\u0642 \u0627\u0644\u0642\u0627\u0626\u0645\u0629' }
  };

  function setMenu(open) {
    var l = MENU_LABEL[document.documentElement.lang] || MENU_LABEL.en;
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? l.close : l.open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  burger.addEventListener('click', function () {
    setMenu(!document.body.classList.contains('menu-open'));
  });
  drawer.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  /* ── Scroll reveal ───────────────────────────────────────────────── */
  var revealables = document.querySelectorAll('[data-reveal]');

  if (reduced || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var revealer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          revealer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });

    revealables.forEach(function (el) { revealer.observe(el); });
  }

  /* ── Animated counters ───────────────────────────────────────────── */
  function runCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    if (reduced || isNaN(target)) { el.textContent = target + suffix; return; }

    var dur = 1400, start = null;
    function frame(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);            // easeOutCubic
      el.textContent = Math.round(target * eased) + (p === 1 ? suffix : '');
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  var counters = document.querySelectorAll('[data-count]');
  if (!('IntersectionObserver' in window)) {
    counters.forEach(runCount);
  } else {
    var counterObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { runCount(entry.target); counterObs.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { counterObs.observe(el); });
  }

  /* ── Hero blueprint line-draw ────────────────────────────────────── */
  if (!reduced) {
    document.querySelectorAll('.hero__canvas .draw').forEach(function (path, i) {
      var len = 0;
      try { len = path.getTotalLength(); } catch (err) { return; }
      path.style.strokeDasharray  = len;
      path.style.strokeDashoffset = len;
      path.style.transition = 'stroke-dashoffset 1.6s cubic-bezier(.16,1,.3,1) ' + (300 + i * 70) + 'ms';
      requestAnimationFrame(function () { path.style.strokeDashoffset = '0'; });
    });

    document.querySelectorAll('.hero__canvas .node').forEach(function (node, i) {
      node.style.opacity    = '0';
      node.style.transition = 'opacity .8s ease ' + (1200 + i * 110) + 'ms';
      requestAnimationFrame(function () { node.style.opacity = ''; });
    });
  }

  /* ── Hero parallax ───────────────────────────────────────────────── */
  var frame  = document.getElementById('heroFrame');
  var canvas = frame && frame.querySelector('.hero__canvas');

  if (canvas && !reduced) {
    var pTick = false;
    window.addEventListener('scroll', function () {
      if (pTick) return;
      pTick = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        if (y < window.innerHeight * 1.2) {
          canvas.style.transform = 'translate3d(0,' + (y * 0.14) + 'px,0) scale(' + (1 + y * 0.00006) + ')';
        }
        pTick = false;
      });
    }, { passive: true });

    /* gentle pointer drift on desktop */
    if (window.matchMedia('(pointer:fine)').matches) {
      frame.addEventListener('pointermove', function (e) {
        var r  = frame.getBoundingClientRect();
        var dx = (e.clientX - r.left) / r.width  - 0.5;
        var dy = (e.clientY - r.top)  / r.height - 0.5;
        canvas.style.setProperty('--px', (dx * -14) + 'px');
        canvas.style.setProperty('--py', (dy * -10) + 'px');
        canvas.style.marginLeft = (dx * -14) + 'px';
        canvas.style.marginTop  = (dy * -10) + 'px';
      });
      frame.addEventListener('pointerleave', function () {
        canvas.style.marginLeft = '0px';
        canvas.style.marginTop  = '0px';
      });
      canvas.style.transition = 'margin .9s cubic-bezier(.16,1,.3,1)';
    }
  }

  /* ── Scrollspy for nav ───────────────────────────────────────────── */
  var sections = [].slice.call(document.querySelectorAll('main section[id]'));
  var navLinks = [].slice.call(document.querySelectorAll('#nav a'));

  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ── Re-run count-ups after a language swap ──────────────────────── */
  document.addEventListener('langchange', function () {
    document.querySelectorAll('[data-count]').forEach(runCount);
  });

  /* ── Footer year ─────────────────────────────────────────────────── */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();
