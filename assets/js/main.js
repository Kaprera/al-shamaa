/* AL-SHAMAA — landing page interactions
   Everything degrades gracefully and respects prefers-reduced-motion.

   Two rules hold throughout, because between them they are what keeps INP low
   and the main thread quiet:
     1. Nothing reads layout inside an event handler. Anything the page needs to
        measure is measured once and cached, and invalidated on resize.
     2. Every handler does is stash a number; the writes all happen together in
        one requestAnimationFrame callback per frame. */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Scroll: one listener, one frame, no layout reads ────────────────
     The header state and the progress bar used to run on one listener and the
     hero parallax on a second, and the progress bar re-read
     documentElement.scrollHeight on every single frame — a forced synchronous
     layout for a number that only changes when the document resizes. Both are
     one handler now, and the document height is cached. */
  var header   = document.getElementById('header');
  var progress = document.getElementById('progress');
  var frame    = document.getElementById('heroFrame');
  var canvas   = frame && frame.querySelector('.hero__canvas');
  var parallax = canvas && !reduced;

  var docHeight = 0;         // scrollHeight - innerHeight, refreshed on resize
  var viewH     = 0;
  var scrollTicking = false;

  function measure() {
    viewH     = window.innerHeight;
    docHeight = document.documentElement.scrollHeight - viewH;
  }

  function renderScroll() {
    scrollTicking = false;
    var y = window.scrollY || document.documentElement.scrollTop;

    header.classList.toggle('is-stuck', y > 40);
    progress.style.transform = 'scaleX(' + (docHeight > 0 ? y / docHeight : 0) + ')';

    /* Past ~1.2 viewports the hero is long gone; stop writing to it. */
    if (parallax && y < viewH * 1.2) {
      canvas.style.setProperty('--sy', (y * 0.14) + 'px');
      canvas.style.setProperty('--sc', 1 + y * 0.00006);
    }
  }

  function onScroll() {
    if (!scrollTicking) { scrollTicking = true; requestAnimationFrame(renderScroll); }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () { measure(); onScroll(); }, { passive: true });
  measure();
  renderScroll();

  /* The reveals below grow the document as they land, so the progress bar's
     denominator has to follow. One observer on <body> beats polling. */
  if ('ResizeObserver' in window) {
    new ResizeObserver(measure).observe(document.body);
  }

  /* ── Mobile drawer ───────────────────────────────────────────────── */
  var burger = document.getElementById('burger');
  var drawer = document.getElementById('drawer');

  var MENU_LABEL = {
    en: { open: 'Open menu', close: 'Close menu' },
    ar: { open: 'فتح القائمة',
          close: 'إغلاق القائمة' }
  };

  /* Closed, the drawer is still a position:fixed panel sitting over the page —
     CSS now hides it from the accessibility tree, and `inert` takes its links
     out of the tab order to match. */
  function setMenu(open) {
    var l = MENU_LABEL[document.documentElement.lang] || MENU_LABEL.en;
    /* Note the order: marking the drawer inert blurs whatever inside it had
       focus, so whether focus was in there has to be read first — otherwise
       closing with Escape drops focus onto <body> and a keyboard user starts
       the next Tab back at the top of the document. */
    var hadFocus = drawer.contains(document.activeElement);

    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? l.close : l.open);
    document.body.style.overflow = open ? 'hidden' : '';
    if ('inert' in drawer) drawer.inert = !open;

    if (open) {
      var first = drawer.querySelector('a, button');
      if (first) first.focus();
    } else if (hadFocus) {
      burger.focus();
    }
  }
  if ('inert' in drawer) drawer.inert = true;

  burger.addEventListener('click', function () {
    setMenu(!document.body.classList.contains('menu-open'));
  });
  drawer.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });

  document.addEventListener('keydown', function (e) {
    if (!document.body.classList.contains('menu-open')) return;

    if (e.key === 'Escape') { setMenu(false); return; }

    /* Keep Tab inside the open drawer, with the burger as the loop's end, so
       focus cannot wander onto the page hidden behind it. */
    if (e.key !== 'Tab') return;
    var stops = [].slice.call(drawer.querySelectorAll('a, button')).concat([burger]);
    if (!stops.length) return;
    var first = stops[0], last = stops[stops.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
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

  /* ── Animated counters ───────────────────────────────────────────────
     The figure runs 0 → 100%, so its box used to grow mid-animation and shove
     whatever sat beside it — a layout shift, and in the hero an above-the-fold
     one. The final string's width is reserved up front (the CSS gives these
     tabular numerals, so a `ch` is an honest digit width) and the suffix is
     carried the whole way rather than appearing on the last frame. */
  function runCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    if (isNaN(target)) return;

    /* Reserve the finished width by rendering the finished string once and
       measuring it, rather than estimating from the character count — the
       suffix is not a digit, so a `ch` estimate would be a little short. */
    var done = String(target) + suffix;
    el.style.minWidth = '';
    el.textContent = done;
    el.style.minWidth = el.offsetWidth + 'px';

    if (reduced) return;

    var dur = 1400, start = null;
    function frame(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);            // easeOutCubic
      el.textContent = Math.round(target * eased) + suffix;
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

  /* ── Hero blueprint line-draw ────────────────────────────────────────
     getTotalLength() forces a layout of the SVG, so all sixteen reads happen
     first and all sixteen writes after — interleaving them thrashed layout
     once per path. */
  if (!reduced) {
    var paths = [].slice.call(document.querySelectorAll('.hero__canvas .draw'));
    var lengths = paths.map(function (path) {
      try { return path.getTotalLength(); } catch (err) { return null; }
    });

    paths.forEach(function (path, i) {
      if (lengths[i] === null) return;
      path.style.strokeDasharray  = lengths[i];
      path.style.strokeDashoffset = lengths[i];
      path.style.transition = 'stroke-dashoffset 1.6s cubic-bezier(.16,1,.3,1) ' + (300 + i * 70) + 'ms';
    });

    var nodes = [].slice.call(document.querySelectorAll('.hero__canvas .node'));
    nodes.forEach(function (node, i) {
      node.style.opacity    = '0';
      node.style.transition = 'opacity .8s ease ' + (1200 + i * 110) + 'ms';
    });

    requestAnimationFrame(function () {
      paths.forEach(function (path, i) {
        if (lengths[i] !== null) path.style.strokeDashoffset = '0';
      });
      nodes.forEach(function (node) { node.style.opacity = ''; });
    });
  }

  /* ── Hero pointer drift ──────────────────────────────────────────────
     This was the page's worst interaction cost: every pointermove called
     getBoundingClientRect() and then wrote margin-left/margin-top, so each
     event forced a layout and a full re-layout of the hero. It now reads a
     cached rect, writes two custom properties that feed a compositor-only
     transform, and does it at most once a frame. */
  var drift = canvas && canvas.querySelector('svg');

  if (drift && !reduced && window.matchMedia('(pointer:fine)').matches) {
    var rect = null, mx = 0, my = 0, driftTicking = false;

    var refreshRect = function () { rect = null; };
    window.addEventListener('resize', refreshRect, { passive: true });
    window.addEventListener('scroll', refreshRect, { passive: true });

    frame.addEventListener('pointermove', function (e) {
      if (!rect) rect = frame.getBoundingClientRect();
      mx = (e.clientX - rect.left) / rect.width  - 0.5;
      my = (e.clientY - rect.top)  / rect.height - 0.5;
      if (driftTicking) return;
      driftTicking = true;
      requestAnimationFrame(function () {
        driftTicking = false;
        drift.style.setProperty('--px', (mx * -14) + 'px');
        drift.style.setProperty('--py', (my * -10) + 'px');
      });
    }, { passive: true });

    frame.addEventListener('pointerleave', function () {
      drift.style.setProperty('--px', '0px');
      drift.style.setProperty('--py', '0px');
    }, { passive: true });
  }

  /* ── Scrollspy for nav ───────────────────────────────────────────── */
  var sections = [].slice.call(document.querySelectorAll('main section[id]'));
  var navLinks = [].slice.call(document.querySelectorAll('#nav a'));

  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          var on = a.getAttribute('href') === '#' + entry.target.id;
          a.classList.toggle('is-active', on);
          if (on) { a.setAttribute('aria-current', 'true'); } else { a.removeAttribute('aria-current'); }
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ── Re-run count-ups after a language swap ──────────────────────── */
  document.addEventListener('langchange', function () {
    counters.forEach(runCount);
  });

  /* ── Footer year ─────────────────────────────────────────────────── */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();
