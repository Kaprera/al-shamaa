# AL-Shamaa — Landing Page

Static landing page for **AL-Shamaa Engineering Services and Consultancy**.
No build step, no dependencies — open `index.html` or serve the folder.

```bash
python3 -m http.server 8912   # then visit http://localhost:8912
```

## Structure

```
index.html              markup + all inline technical SVG artwork
assets/css/styles.css   design tokens, layout, animation, RTL
assets/js/i18n.js       EN/AR switching, persistence, document attributes
assets/js/main.js       scroll reveal, counters, drawer, parallax, scrollspy
assets/img/
  logo.jpeg             original supplied logo (untouched)
  logo-full.png         full logo, background knocked out
  mark.png              logo mark only — for light backgrounds
  mark-light.png        logo mark recoloured cream — for dark backgrounds
```

## Design system

Colours are sampled from the supplied logo.

| Token | Value | Use |
|---|---|---|
| `--ink` | `#0B2136` | Hero, capabilities band, footer |
| `--navy` | `#143651` | Body headings, primary buttons |
| `--gold` | `#C2A15E` | Accent, rebar artwork, CTAs |
| `--cream` / `--paper` | `#F6F3EC` / `#FCFBF8` | Alternating section grounds |

Type is the **IBM Plex** superfamily — an engineering-documentation typeface,
which is why it suits detailing, BIM and structural work rather than reading as
generic luxury:

| Role | Face |
|---|---|
| Display | IBM Plex Sans 600, `-0.035em` tracking |
| Body | IBM Plex Sans 400/500 |
| Technical labels | IBM Plex Mono, wide tracking, uppercase |
| Arabic (all roles) | IBM Plex Sans Arabic 400–700 |

Plex Sans Arabic is the matched Arabic companion, so both scripts share one
skeleton and the page does not change character when it flips language.

All imagery is hand-drawn SVG — a reinforcement cage in the hero, a detailed
beam elevation, an isometric BIM frame and a solar support frame on the service
cards. Nothing depends on stock photography, and everything stays crisp at any
size. Swap them for renders or site photography later if wanted.

## Hero sizing

The hero is a card inset by a uniform 14px gutter on all four sides, wider than
the content shell so it reads as near full bleed, and locked to the viewport
rather than sized by its content:

```css
--hero-gutter: 14px;
--hero-w: min(1800px, 100% - (var(--hero-gutter) * 2));

.hero        { padding: var(--hero-gutter) 0; }   /* top and bottom */
.hero__frame {
  width: var(--hero-w);
  min-height: clamp(560px, calc(100svh - (var(--hero-gutter) * 2)), 1080px);
}
```

`svh` (not `vh`) so mobile browser chrome does not cause a jump, a 560px floor
for very short viewports and an 1080px cap so the hero never becomes a void on
tall displays. `min-height` rather than `height` means longer copy or a
translation can never be clipped. The header pill uses the same `--hero-w`, so
it sits flush with the hero's edges at every width.

For the lock to hold, the content has to fit too, so the headline is capped by
height as well as width — `clamp(2.75rem, min(1.5rem + 6.4vw, 11svh), 6.75rem)`
— vertical rhythm uses `vh`, and below 600px the three stat cards collapse into
a single divided strip. Under `max-height: 640px` (landscape phones) the stats
drop out of the hero entirely; the same figures appear in the About section.

Measured: 14px clearance on all four sides with the card bottom exactly one
gutter above the fold at 500x844, 820x1180, 1280x800, 1440x900 and 1920x1080.
Above ~1120px of viewport height the height cap takes over deliberately, so the
section below peeks in rather than the hero stretching into empty space.

## Arabic

The page is written in English. One button in the header (and in the mobile
drawer) converts the whole site to Arabic and back — the two languages never
coexist in the markup.

**How it works.** Every translatable string is marked, not duplicated:

```html
<span data-i18n>Shop Drawings</span>
```

`assets/js/i18n.js` holds the Arabic copy in a single object keyed by the
English it replaces:

```js
var AR = {
  "Shop Drawings": "المخططات التنفيذية",
  ...
};
```

On conversion the script caches each node's English text in `dataset.en`,
writes the Arabic with `textContent` (never `innerHTML`, so nothing can inject
markup), and flips `<html lang="ar" dir="rtl">`. Converting back restores from
the cache. The choice persists in `localStorage` under `alshamaa-lang`, and a
`langchange` event lets `main.js` re-run the count-up figures.

`[data-i18n]{ display: contents }` keeps the markers invisible to layout, so a
converted string behaves exactly as the bare text node did.

**Editing copy.** Change an English string in `index.html` *and* its key in
`AR`, or the string simply stays English — unmatched keys fall through rather
than blanking out. To add a string, wrap it in `<span data-i18n>` and add its
English text as a new key. Strings deliberately left untranslated (the brand
name, numerals, `BIM`, `CAD`, the email address) carry no marker at all.

**RTL handling.** Layout mirrors via `dir="rtl"` plus logical properties
(`padding-inline-start`, `inset-inline-start`, `text-align:end`).
Direction-aware overrides cover the progress bar and underline origins, the
drawer's clip-path origin, the marquee direction, the arrow glyphs, and the
hero blueprint (mirrored as a whole so the cage still recedes away from the
headline).

**Arabic typography.** Letter-spacing and `text-transform: uppercase` break
Arabic shaping, so both are neutralised on every label class; Arabic gets
looser line heights and larger small-text sizes; italics are dropped in favour
of colour; and the numeric figures are `direction: ltr; unicode-bidi: isolate`
so bidi cannot reorder "2D + 3D" into "3D + 2D". The hero headline has its own
Arabic size ceiling, because the taller Arabic line would otherwise push it
past the fold.

The Arabic was written against standard detailing terminology
(تفصيل حديد التسليح, جداول ثني الحديد, كشف التعارضات). Worth a native
engineer's review before launch.

## Buttons

Hover floods the colour radially out of the arrow disc until it fills the pill.
A `::before` circle is anchored on the disc's centre with a logical inset
(`inset-inline-end: 28px` — the 10px end padding plus half the 36px disc) and
scales from 0 to 1, so it mirrors in RTL without a separate rule. It is sized
at `210%` of the button width so the far corner is covered on the widest
button.

The disc inverts as the flood passes it, keeping the arrow legible against the
new ground, and the arrow itself swaps: each `.btn__ic` holds two identical
SVGs, `:nth-child(1)` leaving toward the top-trailing corner while
`:nth-child(2)` arrives from bottom-leading.

Everything rides one easing token, `--ease-flood:
cubic-bezier(.33,0,.15,1)` — a gentle start and a long settle, which is what
makes the flood read as smooth rather than snappy. The label colour is delayed
100ms so it flips just as the fill reaches it.

`:focus-visible` gets the same treatment as `:hover`, and
`prefers-reduced-motion` reduces the whole thing to a plain colour change with
the second arrow removed.

## Sections

Hero → capability marquee → about + figures → three services → capabilities
bento → five-step process → sectors → standards strip → CTA → footer.

## Motion

IntersectionObserver-driven reveals, count-up figures, stroke-dash line drawing
on the hero blueprint, scroll parallax, pointer drift, infinite marquee, sliding
underlines and a scroll progress bar. Everything collapses to a static page
under `prefers-reduced-motion: reduce`.

## Before going live — placeholders to replace

1. **Email.** `info@al-shamaa.com` is a stand-in (the brief had no contact
   details). It appears in the CTA buttons, the CTA fact list and the footer.
   Add phone and location rows to `.cta__facts` if wanted.
2. **Figures.** The four stats in the About section and the three hero stat
   cards are derived from the brief rather than from real numbers. Once years of
   experience / projects completed are confirmed, swap them in — the
   `data-count` and `data-suffix` attributes drive the count-up animation.
3. **Social / OG image.** `og:image` currently points at the raw logo; a
   dedicated 1200×630 share card would be better.
4. **Domain.** Add a canonical URL and absolute `og:image` path once hosted.
