# AL-Shamaa — Landing Page

Static landing page for **AL-Shamaa Engineering Services and Consultancy**.
No build step, no dependencies — open `index.html` or serve the folder.

```bash
python3 -m http.server 8912   # then visit http://localhost:8912
```

## Structure

```
index.html              markup + all inline technical SVG artwork
assets/css/styles.css   @font-face, design tokens, layout, animation, RTL
assets/js/i18n.js       EN/AR switching, persistence, document attributes
assets/js/main.js       scroll reveal, counters, drawer, parallax, scrollspy
assets/fonts/           self-hosted IBM Plex subsets (see Fonts)
assets/img/
  mark.png              logo mark only — for light backgrounds       152×192
  mark-light.png        logo mark recoloured cream — for dark grounds 152×192
  favicon-32.png        favicon
  apple-touch-icon.png  iOS home-screen icon                          180²
  icon-192.png          icon-512.png    for schema.org / any manifest
  og-card.jpg           1200×630 social share card
  work/                 Ohana Villas case study — one render plus five drawing
                        sheets cropped out of the issued PDFs (see Case study)
  _source/              full-resolution originals — NOT part of the site.
                        Re-export the marks from here; do not link to them.
robots.txt              crawl rules + sitemap pointer
sitemap.xml             single URL
_headers                security + cache headers — Netlify / Cloudflare Pages
.htaccess               ditto — Apache / cPanel
vercel.json             ditto — Vercel
deploy/nginx.conf       ditto — nginx
deploy/CSP.txt          the CSP, explained, and how to re-hash it
```

Only one of the four header files does anything on any given host; the rest are
inert. **Read `deploy/CSP.txt` before touching the CSP or the inline script in
`<head>`** — they are coupled by a hash.

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

Everything above the case study is hand-drawn SVG — a reinforcement cage in the
hero, a detailed beam elevation, an isometric BIM frame and a solar support
frame on the service cards. No stock photography, and it all stays crisp at any
size. The only raster imagery on the page is the Ohana Villas case study, which
is real project material rather than decoration.

## Case study

`#work` carries one project: Ohana Villas Phase 04, Damour · Chouf. The five
sheet images in `assets/img/work/` are rendered out of the issued package at
170 dpi, cropped to drop the title block, trimmed and encoded as webp at 1200 px
wide. To regenerate or add a sheet, render the PDF with `pdftoppm -r 170`, crop
the right-hand ~16 % (the title block, which carries the consultant's contact
details and the approval initials), trim the white margin and encode with
`cwebp -q 80`.

The source PDFs live in `Ohana/`, which is gitignored on purpose: anything
committed here lands in the deploy root and would be publicly fetchable. Keep
issued client drawings out of the repo and publish only the cropped previews.

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
bento → five-step process → selected work → sectors → CTA → footer.

## Motion

IntersectionObserver-driven reveals, count-up figures, stroke-dash line drawing
on the hero blueprint, scroll parallax, pointer drift, infinite marquee, sliding
underlines and a scroll progress bar. Everything collapses to a static page
under `prefers-reduced-motion: reduce`.

## Fonts

Self-hosted, not fetched from Google. Third-party font CSS is render-blocking
on a connection the browser has not yet opened, which is the single most
expensive thing a page like this can put on its critical path.

| File | Covers | Size |
|---|---|---|
| `plex-sans-var-latin.woff2` | IBM Plex Sans **100–700**, roman | 31 KB |
| `plex-sans-italic-var-latin.woff2` | the same range, italic | 35 KB |
| `plex-mono-400/500-latin.woff2` | technical labels | 8 KB each |
| `plex-arabic-400/500/600/700-arabic.woff2` | Arabic, all roles | ~30 KB each |
| `plex-arabic-500-langbtn.woff2` | just the word العربية | 2.7 KB |

Three things make this cheap:

* **Plex Sans is a variable font.** One file carries every roman weight the page
  uses, so 400/500/600/700 cost one request between them.
* **The Arabic faces carry an Arabic-only `unicode-range`,** so an English
  visitor never downloads them. They arrive the moment the page flips.
* **The language button is a special case.** It shows العربية *while the page is
  in English*, and those seven letters alone were pulling the whole 32 KB Arabic
  face onto every English load. They have their own 2.7 KB face.

The latin faces are subset to Latin-1 plus punctuation — wide enough that any
English (or French, German, Spanish) copy you write will render, not just the
words currently on the page.

Two `@font-face` rules define **`Plex Sans Fallback`** and `Plex Mono Fallback`:
Arial and Menlo, re-scaled with `size-adjust` and `ascent-override` to Plex's own
metrics. While Plex is in flight the page lays out in a fallback that occupies
exactly the same space, so when Plex lands nothing moves. That is what lets
`font-display: swap` cost zero CLS.

To regenerate, refetch from Google Fonts with a modern UA and subset with
`pyftsubset`; the unicode-ranges in `styles.css` are the ranges to pass.

## Performance

Measured with Lighthouse (mobile preset, simulated slow 4G) against a server
that does what the deploy configs ask for — Brotli, the real cache headers.

| | before | after |
|---|---|---|
| Performance | 79 | **99** |
| Accessibility | 91 | **100** |
| Best Practices | 100 | **100** |
| SEO | 100 | **100** |
| First Contentful Paint | 3.45 s | **1.16 s** |
| Largest Contentful Paint | 4.17 s | **1.88 s** |
| Total Blocking Time | 0 ms | **0 ms** |
| Cumulative Layout Shift | 0 | **0** |
| Transferred | 488 KB | **131 KB** |
| Third-party origins | 2 | **0** |

What did it, roughly in order of size:

* Google Fonts removed from the critical path (see Fonts).
* The logo marks were 370×480 PNGs weighing 120 KB and 92 KB, rendered at 30×38.
  They are 152×192 and 4.7 KB / 3.8 KB — still 4× the largest render, and
  visually lossless (>41 dB PSNR at every size the page actually draws them).
* `logo-full.png` (589 KB) and `logo.jpeg` were never requested by the page.
  They live in `assets/img/_source/` now.
* The three faces the first screen paints in are preloaded. Measured: dropping
  the italic and mono preloads costs ~450 ms of FCP, so all three stay.

**Two rules hold in `main.js`,** and between them they are why TBT and INP stay
near zero: nothing reads layout inside an event handler, and every handler only
stashes a number for one `requestAnimationFrame` callback to write out.

The hero's pointer drift used to call `getBoundingClientRect()` and then write
`margin-left`/`margin-top` on *every* `pointermove` — a forced layout plus a full
re-layout of the hero per event, and the page's worst interaction cost. It now
reads a cached rect and writes two custom properties feeding a compositor-only
transform. The scroll handler likewise cached `scrollHeight`, which it had been
re-reading (and so re-laying-out for) every frame.

That change also fixed a real RTL bug: the parallax wrote an inline `transform`
onto `.hero__canvas`, which silently overrode the `scaleX(-1)` that mirrors the
blueprint in Arabic — so the artwork un-mirrored the moment an Arabic reader
scrolled. Parallax and mirror now live on different elements and coexist.

### If you edit CSS or JS

`index.html` links each of the three with a `?v=` query string, and the hosts
cache them for a year as `immutable`. **Bump the `?v=` on any file you change**
or returning visitors keep the old one — and so does the CDN, which is the
failure mode that bites: the HTML revalidates on every load, so a new page ships
against a year-old stylesheet and the new rules simply are not there. Bump only
what changed, so the untouched files stay cached. Fonts and images are
content-stable; rename them if you ever replace one.

The source is deliberately unminified and unbundled — that is the architecture,
and Brotli already takes `styles.css` from 46 KB to 11 KB on the wire. If a build
step ever arrives, minifying CSS and JS is worth roughly another 3 KB
compressed; nothing else is left on the table.

## Security headers

All four host configs set the same thing, and the site scores **A+** on
securityheaders.com with any of them:

`Content-Security-Policy` · `Strict-Transport-Security` ·
`X-Content-Type-Options` · `X-Frame-Options` · `Referrer-Policy` ·
`Permissions-Policy` · `Cross-Origin-Opener-Policy` ·
`Cross-Origin-Resource-Policy`

The CSP carries **no `'unsafe-inline'`**, for either scripts or styles. That is
only possible because every `style="..."` attribute was moved into `styles.css`
as a class (`.d-120`, `.intro__vision`, and friends). **If you add an inline
`style` attribute back, the browser will silently drop it** — use a class.

`script-src` pins one sha256, covering the inline `<script>` in `<head>` that
restores the saved language before the first paint. Change that snippet — even
its whitespace — and it stops running until you regenerate the hash.
`deploy/CSP.txt` has the one-liner.

> **GitHub Pages cannot set response headers at all.** If the site is deployed
> there, none of these apply and securityheaders.com will grade it F. Cloudflare
> Pages serves the same static files and honours `_headers` as-is.

## Before going live — placeholders to replace

1. **Email.** `info@al-shamaa.com` is a stand-in (the brief had no contact
   details). It appears in the CTA buttons, the CTA fact list and the footer.
   Add phone and location rows to `.cta__facts` if wanted.
2. **Figures.** The four stats in the About section and the three hero stat
   cards are derived from the brief rather than from real numbers. Once years of
   experience / projects completed are confirmed, swap them in — the
   `data-count` and `data-suffix` attributes drive the count-up animation.
3. **Domain.** Everything is wired to `https://al-shamaa.com` — the canonical
   link, `og:url`, the absolute `og:image`, the JSON-LD `@id`, `robots.txt` and
   `sitemap.xml`. If the real host differs, those are the six places to change.
4. **Arabic copy.** Still worth a native engineer's review before launch.
