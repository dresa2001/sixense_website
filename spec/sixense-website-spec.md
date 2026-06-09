# Sixense Website — Complete Design & Development Specification
**Version:** 4.0 (Final)  
**Date:** June 2026  
**Contact:** automate@sixense.com.au  
**Note:** This is the single source of truth. All previous spec versions are superseded.

---

## Table of Contents

1. Project Overview
2. Brand Identity
3. Logo Specification
4. Typography
5. Colour Palette
6. Spacing & Layout System
7. Component Library
8. Page Specifications
9. Contact Form & Email Integration
10. Navigation & Footer
11. Image Assets
12. Animations & Interactions
13. Technical Requirements
14. Accessibility & Legal
15. Content Import Guide

---

## 1. Project Overview

### About the Business

Sixense is an Australian automation and AI consultancy serving mid-market operators — GMs, COOs, operations managers and business owners in asset-heavy, service-intensive and operationally complex businesses. They design and build automation and AI solutions that eliminate operational drag and unlock capabilities previously out of reach.

### Site Goals

- Establish credibility and trust with operationally-minded business leaders
- Communicate clearly what Sixense does without technical jargon
- Drive enquiries via a "Fit Call" CTA and a Contact page
- Reflect a "sharp, confident, premium but not corporate" brand personality

### Pages

1. Home (`/`)
2. What We Do (`/what-we-do`)
3. How We Work (`/how-we-work`)
4. Our Outcomes (`/our-outcomes`)
5. About (`/about`)
6. Contact (`/contact`)
7. Privacy Policy (`/privacy`) — placeholder
8. Terms of Use (`/terms`) — placeholder

---

## 2. Brand Identity

### Personality

**Sharp and confident.** Sixense speaks plainly, without hedging. No buzzword soup. Sentences are short and declarative.

**Premium but not corporate.** A small, senior, hands-on team. The brand should feel like a trusted expert, not an enterprise vendor.

**Operator-first.** The audience are people who live with operational problems daily. The tone is direct, peer-to-peer.

### Brand Voice

- Plain English. Prefer "fix" over "optimise", "build" over "implement".
- No bullet-point lists of features in UI chrome.
- Australian English throughout (e.g. "colour", "licence", "organisation").
- Oxford comma is not used.

---

## 3. Logo Specification

### Current Asset

The supplied file `Sixense-Transparent.avif` (updated version, June 2026) is the source reference. The mark is a trefoil of three rounded hexagons with hub-and-spoke centre. The tittle on the "i" in the wordmark is already rendered as a small gold dot in this file — the developer must replicate this exactly in the SVG implementation. The "connected thinking" tagline present in the source file is **not used** on the live site — remove it from all instances.

**Watermark source:** The animated background watermark used across all pages must be traced directly from this logo file's hexagonal mark paths — not approximated with polygon points. Extract the exact SVG paths from `Sixense-Transparent.avif` (convert to SVG first using a tool such as Inkscape's trace bitmap or equivalent) and use those paths for the `.hex` elements in the watermark animation. This ensures the watermark matches the logo mark geometry precisely.

### Mark Rework

**Geometry:**
- Three hexagons arranged in a trefoil, each rotated 120° from one another, meeting at a central hub
- Stroke weight: 2.5px, no fill, rounded corners (corner radius: 5px using quadratic Bezier curves — not sharp mitre joins)
- The connecting spokes must radiate cleanly from the hub centre to the inner vertex of each hexagon. Spokes should be trimmed so they terminate just inside the hexagon perimeter — they must not visually float between hexagons. This is a critical geometry fix: spokes meet the hexagons at their inner edge, not in mid-air
- Central hub: filled circle, 7px diameter, at the exact intersection point of all three hexagon inner vertices
- Three spokes: 1.5px lines from hub to each hexagon inner vertex, trimmed to ~55% of the hub-to-centre distance

**Colour:**
- Mark colour: `#F4C542` on all backgrounds
- Mark is never rendered as a flat dark fill

**Wordmark:**
- Font: Plus Jakarta Sans, weight 700
- Text: `sixense` — all lowercase
- Tracking: 0.02em
- Colour: `#F5F3EE` on dark backgrounds; `#1A1A18` on light backgrounds
- **The tittle (dot) above the letter "i" in "sixense" must be coloured `#F4C542` on all backgrounds — matching the mark exactly. Only the tittle is recoloured — the stem of the "i" remains the standard wordmark colour (`#F5F3EE` on dark, `#1A1A18` on light) and must not change.** Do not colour the entire "i" glyph. **Implemented approach:** render the "i" using the dotless-i character `ı` (U+0131) so the stem inherits the wordmark colour naturally, then overlay the gold tittle using a CSS `::after` pseudo-element (filled circle, `background: #F4C542`, `border-radius: 50%`, sized and positioned to sit at the tittle position above the stem). The `<span>` wrapping the dotless-i must be `display: inline-block; position: relative` to anchor the pseudo-element. Adjust `top`, `width`, and `height` values to match the font's tittle geometry at the rendered size.

**Tagline:** None. Removed from all instances.

**Proportions:**
- Mark width : wordmark width ≈ 1 : 2.4 (mark should feel prominent, not undersized relative to text)
- Mark and wordmark vertically centred
- Clearspace: minimum padding equal to the height of the letter "s" on all sides

**Variants required:**
- Full horizontal lockup (mark + wordmark with gold "i" tittle) — nav and general use (`variant="light"`)
- Mark only — favicon, small contexts (`Sixense-Mark.svg`)
- Dark variant (mark always gold `#F4C542`, wordmark `#F5F3EE`, gold tittle retained) — dark backgrounds (`variant="dark"`)
- The mark is **never** rendered white or inverted — it is always `#F4C542` on all backgrounds

**Nav sizing:** Minimum 160px wide on desktop, 130px on mobile. Set `flex-shrink: 0` on the logo container. The logo must feel prominent in the nav — not tucked away. Nav bar height: 96px.

**Footer logo:** Use `variant="dark"`. The SVG mark must remain `#F4C542` (gold) on dark backgrounds — never inverted to white. The wordmark is `#F5F3EE` (light paper). The stem of the "i" is `#F5F3EE` matching the wordmark; only the tittle (dot) is `#F4C542`. Do not apply `filter: brightness(0) invert(1)` to the logo on dark backgrounds. The `Logo` component accepts no `width` prop — sizing is controlled via CSS (`min-width: 160px` desktop, `130px` mobile).

### Logo Hover Animation

When a user hovers over the logo in the nav, animate the hexagonal mark only (not the wordmark). Two options — implement whichever is cleaner at the chosen stack:

**Option A — Pulse:**
```css
.nav-logo:hover .logo-mark {
  animation: logoPulse 600ms ease-in-out;
}
@keyframes logoPulse {
  0%   { transform: scale(1); }
  40%  { transform: scale(1.08); }
  100% { transform: scale(1); }
}
```

**Option B — Spin:**
```css
.nav-logo:hover .logo-mark {
  animation: logoSpin 500ms cubic-bezier(0.4, 0, 0.2, 1);
}
@keyframes logoSpin {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(120deg); }
}
```

120° rotation is preferred for spin as it returns the trefoil mark to a visually identical position (rotational symmetry). Apply `transform-origin: center` on the mark SVG group. The wordmark must not move during this animation.

**Favicon:**
- 32×32px and 16×16px: mark only, `#F4C542` on transparent background
- 180×180px Apple touch icon: mark centred on `#1A1A18` with 20px padding

---

## 4. Typography

### Fonts

```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet">
```

```css
--font-display: 'Plus Jakarta Sans', system-ui, sans-serif;
--font-body:    'DM Sans', system-ui, sans-serif;
```

**Plus Jakarta Sans** is the display and heading face — geometric, modern, confident. Applied to all H1/H2/H3, hero headline, card headings, stat numbers, pull quotes, CTA button text and the nav CTA button.

**DM Sans** is the body and UI face — clean and legible. Applied to all body/paragraph text, section labels, tags, form elements, nav links and footer fine print.

### Type Scale

```css
--text-hero:    clamp(38px, 5vw, 64px);
--text-h1:      clamp(32px, 4vw, 52px);
--text-h2:      clamp(26px, 3vw, 38px);
--text-h3:      clamp(20px, 2.5vw, 26px);
--text-body-lg: 18px;
--text-body:    16px;
--text-sm:      14px;
--text-xs:      12px;
--text-label:   13px;
```

### Weights and Tracking

```css
h1, h2          { font-weight: 700; letter-spacing: -0.01em; }
h1.hero         { font-weight: 700; letter-spacing: -0.02em; line-height: 1.05; }
h3              { font-weight: 600; }
.cta-button     { font-weight: 600; }
```

### Type Rules

- Headings: sentence case throughout. Never all-caps, never title case.
- Body text max line length: 68 characters (~640px at 16px). Use `max-width: 640px` on body copy containers within wide layouts.
- Paragraph spacing: 1em.
- No justified text. Left-aligned body. Centred only where explicitly noted.
- No H2 element below 32px on desktop.

### Section Label Style

```css
.section-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 16px;
}
.section-label::before {
  content: '';
  display: block;
  width: 2px;
  height: 16px;
  background: var(--color-accent);
  flex-shrink: 0;
  border-radius: 0;
}
```

Apply `.section-label` to every section label element across all pages.

**CRITICAL — Section label colour by context:**  
The `.section-label` CSS above sets `color: var(--color-accent)` as a base. This must be overridden per section context:
- On dark sections (`.section-dark .section-label`): `color: var(--color-accent)` — `#F4C542` ✓
---

## 5. Colour Palette

### Core Tokens

```css
--color-ink:           #1A1A18;   /* Primary text, dark backgrounds */
--color-ink-secondary: #4A4A46;   /* Secondary text, captions */
--color-ink-tertiary:  #8A8A84;   /* Placeholders, fine print */
--color-paper:         #F5F3EE;   /* Primary background — warm off-white */
--color-paper-secondary: #EDEAE3; /* Subtle sections, card fills */
--color-paper-dark:    #1A1A18;   /* Dark section backgrounds */
--color-accent:        #F4C542;   /* Bright gold — single accent, all contexts */
--color-accent-hover:  #DBA832;   /* Hover state */
--color-accent-glow:   rgba(244, 197, 66, 0.20); /* Focus rings */
--color-border:        rgba(26, 26, 24, 0.12);   /* Default borders */
--color-border-strong: rgba(26, 26, 24, 0.25);   /* Dividers */
```

### Contrast Note

`#F4C542` is used as the single accent colour across all backgrounds. On dark (`#1A1A18`) it produces ~9.1:1 contrast — well above WCAG AA. On light (`#F5F3EE`) it produces ~2.1:1, which does not meet WCAG AA for text. This is an accepted design decision. The gold functions as a graphic and decorative accent — borders, icons, watermark, button backgrounds, decorative rules — and is never the sole carrier of readable text. All body text, headings and meaningful labels remain in `--color-ink` (`#1A1A18`).

### Colour Application

`--color-accent` (`#F4C542`) is a single token used uniformly across all contexts. It is a graphic and decorative accent — never the sole carrier of text meaning.

**Used everywhere for:**
- Section labels and their left-bar decorators
- Nav active link and hover state
- All CTA button backgrounds (text: `#1A1A18`)
- Card top accent bars (3px)
- Card hover borders
- Icons and icon circle backgrounds: `rgba(244, 197, 66, 0.15)`
- Outcome card tag chip borders
- Principle block left borders
- Blockquote left borders
- Watermark SVG stroke
- Stat numbers (About page)
- Form input focus border and glow
- Inline text links
- Footer links on hover
- Logo mark on all backgrounds
- Tittle on "i" in wordmark

**Dark/light section pattern:**
- Background alternates: `--color-paper-dark` (hero, closing CTAs, footer) and `--color-paper` / `--color-paper-secondary` (content sections)
- Text on dark: primary `#F5F3EE`, secondary `rgba(245,243,238,0.6)`
- Text on light: `--color-ink` (`#1A1A18`) for all body and heading text regardless of accent colour proximity

---

## 6. Spacing & Layout System

### Grid

- Desktop: 12-column, 1280px max content width, 24px gutters, 80px horizontal padding
- Tablet (768–1279px): 8-column, 32px horizontal padding
- Mobile (<768px): 4-column, 20px horizontal padding

### Spacing Scale

```css
--space-1: 8px;   /* Tight gaps */
--space-2: 16px;  /* Component internal */
--space-3: 24px;  /* Related elements */
--space-4: 32px;  /* Between components */
--space-5: 48px;  /* Sub-divisions */
--space-6: 64px;  /* Narrow section padding */
--space-7: 96px;  /* Standard section padding */
--space-8: 128px; /* Large section padding */
```

### Border Radius

```css
--radius-sm: 4px;   /* Tags, chips */
--radius-md: 8px;   /* Buttons, inputs */
--radius-lg: 16px;  /* Cards, panels */
--radius-xl: 24px;  /* Feature cards */
```

---

## 7. Component Library

### 7.1 Buttons

**Primary CTA:**
```css
background: var(--color-accent);
color: var(--color-ink);
font-family: var(--font-display);
font-weight: 600;
font-size: 15px;
padding: 14px 28px;
border-radius: var(--radius-md);
border: none;
cursor: pointer;
transition: background 200ms ease;
```
Hover: `--color-accent-hover`. Focus: `outline: 2px solid var(--color-accent); outline-offset: 2px`.

**Ghost (on light bg):**
```css
background: transparent;
border: 1.5px solid var(--color-ink);
color: var(--color-ink);
```
Hover: `background: rgba(26,26,24,0.06)`.

**Ghost (on dark bg):**
```css
border: 1.5px solid #F5F3EE;
color: #F5F3EE;
```
Hover: `background: rgba(245,243,238,0.1)`.

### 7.2 Navigation

**Desktop:**
- Fixed to top. Background: `--color-paper` at 96% opacity + `backdrop-filter: blur(12px)`.
- Height: 96px.
- Permanent bottom border: `1px solid var(--color-border)`.
- Left: Logo, minimum 160px on desktop / 130px on mobile, `flex-shrink: 0`.
- Right: Nav links → vertical separator → "Book a Fit Call" button.
- Nav link: DM Sans 500, 16px, `--color-ink`. Hover: `--color-accent`. Active (current page): `--color-accent`, font-weight 700.
- CTA button: `--color-accent` background, `--color-ink` text, Plus Jakarta Sans 600.

**Mobile (<768px):**
- Hamburger icon (20px) at right.
- Full-screen overlay: `--color-paper-dark` background. Links stacked vertically, 32px apart, Plus Jakarta Sans 700, 28px, `--color-paper`.
- CTA button full-width at bottom.

**Nav links:**

| Label | Path |
|---|---|
| Home | `/` |
| What We Do | `/what-we-do` |
| How We Work | `/how-we-work` |
| Our Outcomes | `/our-outcomes` |
| About | `/about` |
| Book a Fit Call (button) | `/contact` |

### 7.3 Cards

**Outcome card:**
```css
background: var(--color-paper);
border: 1px solid var(--color-border);
border-top: 3px solid var(--color-accent);
border-radius: var(--radius-xl);
padding: 32px;
transition: transform 200ms ease, box-shadow 200ms ease;
```
Hover:
```css
transform: translateY(-4px);
box-shadow: 0 8px 32px rgba(244, 197, 66, 0.12);
border-color: var(--color-accent);
```
- Sector label: DM Sans 500, 13px, `--color-ink-tertiary`
- Challenge / Solution / Outcome labels: DM Sans 600, 11px, `--color-accent`, uppercase, letter-spacing 0.08em
- Body: DM Sans 400, 15px, `--color-ink-secondary`
- Tags: DM Sans 500, 11px, border `1px solid rgba(244,197,66,0.25)`, `--radius-sm`, padding 4px 10px

**Service area card:**
```css
background: var(--color-paper-secondary);
border-radius: var(--radius-lg);
padding: 28px 24px;
```
- Icon: 32px, `--color-accent`, inside 48px circle `rgba(244,197,66,0.15)`
- Heading: Plus Jakarta Sans 600, 16px, `--color-ink`
- Body: DM Sans 400, 14px, `--color-ink-secondary`, line-height 1.6

### 7.4 Section Labels

See Section 4 — Typography. Apply `.section-label` class universally.

### 7.5 Icons

**Icon library:** Phosphor Icons outline set.

```html
<script src="https://unpkg.com/phosphor-icons@1.4.2/src/index.js"></script>
```

**CRITICAL — Icons rendering as blank circles:**  
This is a known issue when the Phosphor web component script loads after the DOM has rendered. To fix it:

1. Load the Phosphor script in the `<head>` of the document, not at the bottom of `<body>`.
2. If using a framework (Astro, Next.js etc.), ensure the script is included with `strategy="beforeInteractive"` or equivalent so it executes before hydration.
3. Alternatively, replace the web component approach entirely with inline SVG icons using the Phosphor SVG sprite or individual icon imports. This is the most reliable method and the recommended approach for production.
4. Do not use `<ph-icon>` or `<i class="ph-...">` unless the script is confirmed loading correctly. Test on first render — not after a hot reload.
5. After implementing the fix, verify every icon on every page in a fresh browser window (cleared cache, no dev server) before sign-off.

- Standard size: 32px
- Compact size: 24px (inline, beside text)
- Small size: 20px (stat rows, callouts)
- Colour on dark sections: `--color-accent` (`#F4C542`)
- Colour on light sections: `--color-accent` (`#F4C542`)
- Circle background on light: `background: rgba(244,197,66,0.15)`, `border-radius: 50%`
- Circle background on dark: `background: rgba(244,197,66,0.12)`, `border-radius: 50%`

### 7.6 Watermark

The watermark appears **across all pages and all section types** — dark and light. Multiple instances appear within each section, not just one. Always subtle, never competing with content.

**Dark section watermark** (hero, closing CTAs, footer):
- Stroke: `#F4C542`, opacity `0.07`
- Each dark section contains **two watermark instances**: one right (partially off-screen), one left (partially off-screen). They animate independently with offset delays — never pulsing in sync. Add `.section-watermark--secondary` to the second instance (see Section 12 for CSS).

**Light section watermark** (`--color-paper`, `--color-paper-secondary`):
- Stroke: `#F4C542`, opacity `0.05`
- Each light section contains **one instance**, alternating left/right placement per section
- Always partially clipped by `overflow: hidden` — never fully visible in frame

**All section containers** must have `position: relative; overflow: hidden`. All content at `z-index: 1`. Watermarks at `z-index: 0`.

On mobile: reduce to 240px, centred, opacity halved. Dark sections: one instance only on mobile.

See Section 12 for full CSS and animation code.

### 7.7 How We Build — Principle Blocks

```css
background: var(--color-paper);
border-left: 3px solid var(--color-accent);
border-radius: var(--radius-md);
padding: 24px;
border-radius: 0;  /* left border only — no rounded corners */
```
- Heading: Plus Jakarta Sans 600, 18px, `--color-ink`
- Body: DM Sans 400, 14px, `--color-ink-secondary`

---

## 8. Page Specifications

---

### 8.1 Home Page (`/`)

#### Section 1 — Hero (dark)

**Background:** `--color-paper-dark`  
**Vertical padding:** 160px top, 120px bottom  
**Layout:** Full viewport width — no max-width constraint on the section itself. Content inside is left-aligned with standard horizontal padding (80px desktop, 32px tablet, 20px mobile). The hero bleeds edge-to-edge.  
**Watermark:** Yes — right side, large (520px), opacity 0.07

```
[.section-label]
Automation & AI for operations leaders

[H1 hero — Plus Jakarta Sans 700, --text-hero, #F5F3EE, letter-spacing -0.02em, max-width 800px]
You already know what better looks like.
What's the hold up?

[Body lg — DM Sans 400, 20px, rgba(245,243,238,0.65), max-width 560px, margin-top 24px]
Most business leaders we talk to have been living with the same operational
frustrations for years — assuming it would be too expensive or too complex
to fix. It's usually none of those things.

[Primary CTA button — margin-top 40px]
Book a free Fit Call — no pitch, 30 minutes
```

No sub-note below the button. The button stands alone.

---

#### Section 2 — The Problem (light)

**Background:** `--color-paper`  
**Vertical padding:** `--space-7`  
**Layout:** Two-column desktop (40% left / 55% right, 5% offset), single column mobile

**Left:**
```
[.section-label] The problem

[H2 — Plus Jakarta Sans 700, --text-h2, --color-ink]
Growth adds people.
It doesn't have to.
```

**Right:**
```
[Body — DM Sans 400, 18px, --color-ink-secondary, line-height 1.7]
Many businesses scale by adding headcount to absorb the workload — more staff
handling more volume, doing things the way they've always been done. It works,
but it erodes productivity. The cracks show up in myriad ways — errors, delays,
key person dependencies, missed opportunities, knowledge siloes, frustrated
customers and a growing sense that the business is harder to run than it
should be.

Automation and AI don't replace your people. They free them up to do the work
that actually needs them.
```

---

#### Section 3 — Who We Work With (secondary background)

**Background:** `--color-paper-secondary`  
**Vertical padding:** `--space-7`  
**Layout:** Two-column desktop — left column (55%) contains the label, heading and body text; right column (40%, offset 5%) contains the three icon blocks stacked vertically. Single column mobile (text first, icons below).

**Left column:**
```
[.section-label] Who we work with

[H2 — Plus Jakarta Sans 700, --text-h2, --color-ink]
We work with operators, not IT departments.

[Body — DM Sans 400, 18px, --color-ink-secondary, line-height 1.7, margin-top 24px]
Our clients are GMs, COOs, operations managers and business owners in
asset-heavy, service-intensive and operationally complex businesses.
They know their industry deeply. They don't need to know anything about
technology — that's our job.
```

**Right column — three icon blocks stacked vertically, spaced 32px apart:**

Each block: icon (36px, `--color-accent`) in a 56px circle (`rgba(244,197,66,0.15)`), with label and sub-label to the right of the icon (horizontal inline layout within each block).

Icons must be rendered as actual Phosphor icons — not blank circles. Ensure the icon component script is loaded before these render.

| Icon | Label | Sub-label |
|---|---|---|
| `Buildings` | Asset-heavy businesses | Transport, utilities, logistics, infrastructure, real estate, construction, fleet |
| `Storefront` | Service-intensive operations | Healthcare, field service, maintenance, retail, logistics, supply chain |
| `FolderOpen` | Data & document-rich domains | Finance ops, HR ops, compliance, safety |

**Label:** Plus Jakarta Sans 600, 17px, `--color-ink`  
**Sub-label:** DM Sans 400, 15px, `--color-ink-secondary`

**Note:** Add `padding-top` to the right column container to shift the icon blocks down slightly, improving visual alignment with the left column content (label + heading + body text).

---

#### Section 4 — Proof Signal (light)

**Background:** `--color-paper`  
**Vertical padding:** `--space-7`  
**Layout:** Two-column desktop (40% left / 55% right), `align-items: center` on the row — both columns vertically centred. Single column mobile.

**Left:**
```
[.section-label] Proven outcomes

[H2 — Plus Jakarta Sans 700, --text-h2, --color-ink]
We've done this before.

[Body — DM Sans 400, 16px, --color-ink-secondary, margin-top 16px]
From a national transport operator needing live fleet visibility, to a utility
vetting thousands of contractors working on high-voltage assets, to a logistics
business consumed by manual invoicing — we've built working solutions across
some of Australia's most operationally demanding businesses.

[Link — DM Sans 700, 15px, --color-ink, margin-top 24px]
See our outcomes →
```

**Right — three proof blocks, stacked vertically with equal spacing:**

The right column contains the proof blocks. Use `align-self: center` on the container.

Each block layout (horizontal): icon (28px, `--color-accent`, in 44px circle `rgba(244,197,66,0.15)`) on the left, then headline and detail stacked to the right. Gap between icon and text: 16px.

**Icons must render as actual Phosphor icons. Ensure Phosphor script is loaded.**

| Icon | Headline | Detail |
|---|---|---|
| `Trophy` | Industry award winner | Contractor authorisations platform — major Australian utility |
| `Timer` | Working pilot in 3 months | Dispatch schedule optimisation — after 3 years of stalled attempts |
| `Eye` | Live fleet visibility in 50 days | National passenger transport operator - 1,200+ vehicles |

Headline: Plus Jakarta Sans 600, 17px, `--color-ink`. Detail: DM Sans 400, 15px, `--color-ink-secondary`.

**Typography note:** Headline and detail styles intentionally match the Who We Work With icon item labels (`.who-label` / `.who-desc`) for visual consistency across both sections.

---

#### Section 5 — Closing CTA (dark)

**Background:** `--color-paper-dark`  
**Vertical padding:** `--space-7`  
**Layout:** Centred, max-width 600px  
**Watermark:** Yes

```
[H2 — Plus Jakarta Sans 700, --text-h2, #F5F3EE, centred]
Not sure if this applies to you?

[Body — DM Sans 400, 18px, rgba(245,243,238,0.65), centred, margin-top 16px]
That's exactly what the Fit Call is for. Thirty minutes. No pitch.
Just an honest conversation about whether there's something worth solving.

[Primary CTA — centred, margin-top 40px]
Book a free Fit Call
```

**Note to developer:** "Not sure if this applies to you?" is a single-line heading — do not break it across two lines in the markup.

---

### 8.2 What We Do Page (`/what-we-do`)

#### Section 1 — Hero (dark)

**Watermark:** Yes — all sections on this page carry the watermark per global spec (Section 7.6 and Section 12). No further per-section notes needed.

```
[.section-label] What we do

[H1 — Plus Jakarta Sans 700, --text-h1, #F5F3EE, max-width 720px]
Fix what's broken. Build what's missing.

[Body — DM Sans 400, 18px, rgba(245,243,238,0.65), max-width 620px, margin-top 24px]
Some of the businesses we work with have a specific problem they need fixed.
Others can see an opportunity — a new capability, a better way of operating,
something a competitor is doing that they can't yet — but have no way to build
toward it. We do both.

We design and build automation and AI solutions that eliminate operational drag
and unlock capabilities that were previously out of reach. Each solution is built
to stand alone and connect forward — so what we build today becomes the
foundation for something more powerful tomorrow.
```

---

#### Section 2 — Outcomes We Enable (light)

**Background:** `--color-paper`  
**Vertical padding:** `--space-7`

```
[.section-label] Outcomes we enable

[H2 — Plus Jakarta Sans 700, --text-h2, --color-ink]
If your team is doing any of the following manually,
there's likely a better way.
```

**Card grid — 3 columns desktop, 2 tablet, 1 mobile. Gap: 20px.**

Each card: icon (32px, `--color-accent`) in a 48px circle (`rgba(244,197,66,0.15)`) top-left, heading (Plus Jakarta Sans 600, 16px, `--color-ink`), body (DM Sans 400, 14px, `--color-ink-secondary`, line-height 1.6).

**All 9 icons must render as actual Phosphor outline icons.** Ensure the Phosphor script is loaded. Do not render blank circles.

| Icon | Heading | Body |
|---|---|---|
| `Receipt` | Finance & accounts | Invoice matching and approval workflows. Automated reconciliation. Payment follow-up and dunning. Month-end reporting without the scramble. |
| `ClipboardText` | Procurement & supplier management | Purchase order automation. Supplier onboarding and credential tracking. Contract expiry alerts. Spend visibility across fragmented systems. |
| `MapPin` | Field service & scheduling | Live job visibility and dispatch optimisation. Automated scheduling based on location, skills and availability. Real-time status updates without the phone calls. |
| `FileText` | Document processing | Automated document classification and data extraction. Contract review and flagging. Forms processing without manual rekeying. |
| `Package` | Warehouse & inventory | Live inventory visibility across locations. Automated reorder triggers. Inbound and outbound reconciliation. Order status without chasing the warehouse. |
| `ChartLineUp` | Sales operations | Live product, pricing and inventory access for field reps. Order submission without back-office delays. Pipeline reporting without a spreadsheet. |
| `Headset` | Contact centre & service desk | Intelligent triage and routing. Automated responses to common requests. Knowledge assistants that give agents the right answer faster. |
| `ChartBar` | Reporting & business intelligence | Automated data pipelines from fragmented sources. Dashboards that update without someone building them each week. Alerts when something needs attention. |
| `Wrench` | Asset operations | Failure prediction and maintenance optimisation. Work order scheduling automation. Language-first work execution via voice or text. Document intelligence for maintenance records and compliance. |

The 9 cards form a 3×3 grid on desktop. The grid must be symmetrical — no orphaned single card at the end.

---

#### Section 3 — How We Engage (secondary background)

**Background:** `--color-paper-secondary`  
**Vertical padding:** `--space-7`

```
[.section-label] How we engage

[H2 — Plus Jakarta Sans 700, --text-h2, --color-ink]
Every engagement starts small and builds with purpose.
Nothing is open-ended.
```

**Two panels side-by-side desktop, stacked mobile. Each panel: border `1px solid --color-border`, `--radius-xl`, padding 32px.**

Panel 1 — The Fit Call:
- Icon: `Phone` — 48px, `--color-accent`, centred inside a 72px circle `rgba(244,197,66,0.15)`, displayed at top of card, margin-bottom 20px. **Must render as the Phosphor Phone icon — not a blank circle.**
- Tag: `Free · 30 minutes` — DM Sans 600, 11px, `--color-accent`, background `--color-ink`, border `1px solid --color-ink`, `--radius-sm`, padding 4px 10px, margin-bottom 16px
- Heading: Plus Jakarta Sans 700, 22px, `--color-ink`: `The Fit Call`
- Body: DM Sans 400, 15px, `--color-ink-secondary`: An honest conversation to find out if there's a real problem and whether we're the right fit. No pitch. If there's something worth solving, we'll say so. If there isn't, we'll say that too.
- CTA: Ghost button `Book a Fit Call →`, margin-top 24px

Panel 2 — The Discovery Sprint:
- Icon: `MagnifyingGlass` — 48px, `--color-accent`, same circle treatment as above. **Must render as actual icon.**
- Tag: `Fixed time · Fixed price` — DM Sans 600, 11px, `--color-accent`, background `--color-ink`, border `1px solid --color-ink`, `--radius-sm`, padding 4px 10px, margin-bottom 16px
- Heading: Plus Jakarta Sans 700, 22px, `--color-ink`: `The Discovery Sprint`
- Body: DM Sans 400, 15px, `--color-ink-secondary`: A structured working session requiring up to four hours of your time across five days. We map your most pressing processes, assess where automation can make the biggest difference and hand you a clear, plain-English report. Most clients find the clarity alone is worth the fee.
- CTA: Ghost button `Learn more →`, links to `/how-we-work`, margin-top 24px

---

#### Section 5 — How We Build (light)

**Background:** `--color-paper`  
**Vertical padding:** `--space-7`  
**Layout:** Two-column desktop — left column (38%) contains heading and intro text; right column (58%, offset 4%) contains the four-tier staircase. Single column mobile (left content above, tiers below).

**Left column:**
```
[.section-label] How we build

[H2 — Plus Jakarta Sans 700, --text-h2, --color-ink]
From targeted enhancements to autonomous operations.

[Body — DM Sans 400, 16px, --color-ink-secondary, line-height 1.75, margin-top 20px]
Think of automation as a ladder. Most businesses start with a single rung —
a specific task, a recurring bottleneck, something that takes too long and
costs too much. Each step up connects more of your operations, until the
business is running on intelligence rather than effort.
```

**Right column — four-tier staircase with hover-expand:**

Each tier is a row that steps progressively to the right: Tier 1: 0px offset, Tier 2: 32px, Tier 3: 64px, Tier 4: 96px. On tablet reduce offsets by 50%. On mobile: no offset, full width stacked.

**Default (collapsed) state — each tier shows:**
- Stylised numeral + heading + sub-label only
- Height: auto (compact)

**On hover — each tier expands to show body text below the sub-label:**
```css
.tier-body {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: max-height 350ms ease, opacity 300ms ease, padding 300ms ease;
}
.tier-row:hover .tier-body {
  max-height: 200px;
  opacity: 1;
  padding-top: 10px;
}
```

**Each tier row:**
```css
background: var(--color-paper);
border-left: 3px solid var(--color-accent);
border-radius: var(--radius-md);
padding: 18px 24px;
margin-bottom: 12px;
display: flex;
align-items: flex-start;
gap: 20px;
cursor: default;
transition: box-shadow 200ms ease;
```
Hover: `box-shadow: 0 4px 16px rgba(244,197,66,0.12)`.

**Stylised numeral — left of each row:**

Render as a large display numeral, not a label. Plus Jakarta Sans 700, 48px, `rgba(26,26,24,0.15)` (washed-out dark ink — visible but not dominant). `line-height: 1`, `width: 48px`, `flex-shrink: 0`, `align-self: center`. The numerals are 1, 2, 3, 4 — no "Tier" text prefix.

**Tier content (right of numeral):**
1. Heading: Plus Jakarta Sans 700, 17px, `--color-ink`
2. Sub-label: DM Sans 600, 13px, `--color-accent`, uppercase, letter-spacing 0.08em, italic, margin-top 4px
3. Body (hidden until hover): DM Sans 400, 13px, `--color-ink-secondary`, line-height 1.6

| Numeral | Heading | Sub-label | Body |
|---|---|---|---|
| 1 | Insights & intelligence | Seeing ahead | Continuous analysis of operational data to surface patterns, predict outcomes and recommend action. Transforms the data your operations generate into a strategic asset — helping you see what's coming rather than react to what happened. |
| 2 | Task & workflow automation | Clearing bottlenecks | Targeted automation of specific manual tasks, handoffs and data flows. Fast to deliver, immediate in impact. AI plays a role here too — extracting meaning from documents, routing requests intelligently, flagging exceptions before they become problems. |
| 3 | Process & integrated automation | Working on autopilot | Connecting the dots across systems, teams and functions. Where task automation removes individual pain points, process automation eliminates the coordination overhead between them — integrating platforms, orchestrating multi-step workflows and giving management real visibility. |
| 4 | Agentic automation | Reimagining operations | Goal-oriented AI that monitors, decides and acts across complex workflows — with human oversight built in. Not science fiction. We're building and delivering agentic solutions now, across logistics, finance and field operations. |

**Note to developer:** On mobile, the hover effect does not apply. Show all tier content (body text visible) in a simple stacked list with no offset. Add a subtle bottom border between tiers instead of the staircase gap.

---

#### Section 6 — Technology Choice (secondary background)

**Background:** `--color-paper-secondary`  
**Vertical padding:** `--space-7`  
**Layout:** Full-width heading block above, then four equal columns in a single row below. Single column mobile (stacked).

**Heading block (centred, margin-bottom 48px):**
```
[.section-label — centred] Technology choice

[H2 — Plus Jakarta Sans 700, --text-h2, --color-ink, centred]
Fitting the right technical frameworks to your operations and environment is pivotal.
```

**Four-column row — desktop: 4 equal columns, gap 24px. Tablet: 2×2 grid. Mobile: stacked.**

Each column is a card: `background: --color-paper-secondary`, `border-radius: --radius-lg`, `padding: 28px 24px`, `border-top: 3px solid --color-accent`.

Each card structure (top to bottom):
1. Icon: 36px, `--color-accent`, in 56px circle `rgba(244,197,66,0.15)`, margin-bottom 20px
2. Label: DM Sans 600, 13px, `--color-accent`, uppercase, letter-spacing 0.1em, margin-bottom 8px
3. Heading: Plus Jakarta Sans 700, 18px, `--color-ink`, margin-bottom 12px
4. Body: DM Sans 400, 14px, `--color-ink-secondary`, line-height 1.65

| Icon | Label | Heading | Body |
|---|---|---|---|
| `GitBranch` | Rule-based | Task & rule automation | Handles repeatable logic — consistent, fast and predictable. The right foundation for any process that follows defined steps every time. |
| `ChartLine` | Decision support & insights | Data analysis & recommendations | Analyses data from across your systems and surfaces clear recommendations for your team to act on. Turns information overload into decision clarity. |
| `Sparkle` | AI | Agents and bots | Understands and generates language, documents, images, audio and other unstructured data. Handles the interactions and processing that used to require a person. |
| `Robot` | Autonomous | Agentic systems | Goal-oriented AI that monitors, decides and acts across complex workflows — with human oversight built in. Not science fiction. We're building and delivering this now. |

---

#### Section 7 — Closing CTA (dark)

**Background:** `--color-paper-dark`  
**Vertical padding:** `--space-7`  
**Layout:** Centred, max-width 600px  
**Watermark:** Yes — two instances

```
[H2 — Plus Jakarta Sans 700, --text-h2, #F5F3EE, centred]
Not sure where you sit?

[Body — DM Sans 400, 18px, rgba(245,243,238,0.65), centred, margin-top 16px]
Start with the Fit Call. It's free and it'll be obvious pretty quickly.

[Primary CTA — centred, margin-top 40px]
Book a free Fit Call →
```

---

### 8.3 How We Work Page (`/how-we-work`)

#### Section 1 — Hero (dark)

**Watermark:** Yes — two instances per dark section per global spec.

```
[.section-label] How we work

[H1 — Plus Jakarta Sans 700, --text-h1, #F5F3EE, max-width 760px]
Process first. Experience led. Real solutions.

[Body — DM Sans 400, 20px, rgba(245,243,238,0.65), max-width 580px, margin-top 24px]
We start with your business, not the technology, and build in shorter
iterations rather than drawn-out cycles.
```

**Note to developer:** The previous anchor lines ("Start small. Prove value. Scale smart." and "Process first. Experience led. Real solutions.") are no longer displayed in the hero. "Process first. Experience led. Real solutions." is now the H1. "Start small. Prove value. Scale smart." becomes the H2 heading of Section 3 (Our Method). Remove all anchor line elements from the hero markup.

---

#### Section 2 — Our Approach (light, with image)

**Background:** `--color-paper`  
**Vertical padding:** `--space-7`  
**Layout:** Two-column desktop — image left (45%), text right (50%, offset 5%). `align-items: flex-start`. Single column mobile (image below heading, above body text).

**Left column structure (top to bottom):**
```
[.section-label] Our approach

[H2 — Plus Jakarta Sans 700, --text-h2, --color-ink]
We work backwards
from the outcome.

[Image container — Working_backwards.avif — below H2, margin-top 24px]
```

- Asset: `Working_backwards.avif`
- Container: `background: --color-paper-secondary`, `border-radius: --radius-xl`, padding 32px
- `align-self: flex-start`, margin-top 24px
- Image: `max-width: 100%`, `height: auto`, `display: block`
- Alt text: `Diagram illustrating working backwards from a defined outcome`

**Right column (body text, `padding-top` matched to heading height so body text aligns with top of image):**

The right column body text must be offset downward to visually align with the image rather than the heading. Calculate the combined height of `.section-label` + `H2` + `margin-top 24px` and apply that value as `padding-top` on the right column, so the body text starts level with the top of the image container.

```
[Body — DM Sans 400, 17px, --color-ink-secondary, line-height 1.75]
Every engagement starts with a clear picture of what better looks like for
your business — not a system requirement, not a features list. From there
we work back through your processes, people, systems and data to understand
what needs to change and what the right path forward looks like.

This keeps solutions grounded in how your business actually works from day one.
It also keeps scope honest — we're building toward a defined outcome,
not generating work.
```

**Note:** Do not include any callout chips or label rows (e.g. "Outcome-first", "Iterative", "Collaborative") below the two-column layout. This section ends after the right column body text above.

---

#### Section 3 — Our Method (secondary background, with image)

**Background:** `--color-paper-secondary`  
**Vertical padding:** `--space-7`  
**Layout:** Two-column desktop — text left (50%), image right (45%, offset 5%). `align-items: flex-start`. Single column mobile (image below heading, above body text).

**Left column (text):**
```
[.section-label] Our method

[H2 — Plus Jakarta Sans 700, --text-h2, --color-ink]
Start small. Prove value. Scale smart.

[Body — DM Sans 400, 17px, --color-ink-secondary, margin-top 20px]
We don't disappear for months and return with something finished. We build in
short cycles, put working solutions in your hands quickly and improve from
there. Every increment delivers something usable. Every milestone is a
decision point — you stay in control of pace and investment throughout.

It gets value into your hands fast. It surfaces the things that are hard to
specify on paper but obvious the moment you can see something real. And it
means everything we build can be extended and scaled without starting again.
```

**Right column (image):**
- Asset: `Start-small-prove-value-scale-smart.avif`
- Container: `background: --color-paper`, `border-radius: --radius-xl`, padding 32px
- Image must be offset downward to align with the body text, not the heading. Apply `margin-top` to the image container equal to the combined height of `.section-label` + `H2` + 20px gap — so the top of the image sits level with the first line of body text.
- Image: `max-width: 100%`, `height: auto`, `display: block`
- Alt text: `Diagram illustrating the approach: start small, prove value, scale smart`

---

#### Section 4 — How We Build (light)

**Background:** `--color-paper`  
**Note to developer:** This section must use `--color-paper` (light background), NOT `--color-paper-secondary`. The preceding Our Method section uses `--color-paper-secondary`. Using the same background for two consecutive sections makes them read as one block — a distinct background colour is required here to visually separate them.
**Vertical padding:** `--space-7`

```
[.section-label] Our principles

[H2 — Plus Jakarta Sans 700, --text-h2, --color-ink, centred, margin-bottom 48px]
How we build
```

**2×2 grid desktop, stacked mobile. Each block:**
```css
background: var(--color-paper);
border-left: 3px solid var(--color-accent);
padding: 24px;
border-radius: 0;
```

Icon (28px, `--color-accent`) above heading. Heading: Plus Jakarta Sans 600, 18px, `--color-ink`. Body: DM Sans 400, 14px, `--color-ink-secondary`.

| Icon | Heading | Body |
|---|---|---|
| `Sliders` | We start with your process, not a template | Every solution is designed around how your business actually works — not a generic workflow or a platform's default settings. |
| `Puzzle` | We build in components, not monoliths | Solutions are assembled from small, connected parts. Easier to change, extend and integrate. What we build today doesn't become a ceiling on what you can do tomorrow. |
| `Wrench` | We pick the right tool for the job | We're not advocates for any single platform. We select what fits — weighing cost, performance, security and reliability. |
| `ShieldCheck` | We build AI responsibly | Data privacy, security and responsible AI practices are built in from the start. Your data stays yours. AI is introduced where it genuinely adds value. |

---

#### Section 5 — Who You'll Work With (secondary background)

**Background:** `--color-paper-secondary`  
**Note to developer:** This section must use `--color-paper-secondary` to visually distinguish it from the preceding How We Build section which uses `--color-paper`. Two consecutive light sections with identical backgrounds read as one block.
**Vertical padding:** `--space-7`  
**Layout:** Two-column desktop (40% left / 55% right), single column mobile

**Left:**
```
[.section-label] Our team

[H2 — Plus Jakarta Sans 700, --text-h2, --color-ink]
Senior people.
Direct access.
No handoffs.
```

**Right:**
```
[Body — DM Sans 400, 17px, --color-ink-secondary, line-height 1.75]
You deal with the same people throughout — the ones who scoped the work and
are accountable for the outcome. No account managers. No handoffs once the
contract is signed. We communicate plainly, flag problems early and don't
generate unnecessary complexity.

We're not here to make ourselves indispensable. We're here to build something
that works, prove it quickly and earn the right to do more.

[Pull quote — Plus Jakarta Sans 600, 18px, --color-ink, border-left 3px solid --color-accent, padding-left 24px, margin-top 32px]
The quality and accountability of a senior local firm, at a price point
that makes sense for a mid-sized business.
```

---

#### Section 6 — CTA (dark)

**Background:** `--color-paper-dark`  
**Vertical padding:** `--space-7`  
**Layout:** Centred, max-width 600px  
**Watermark:** Yes — two instances

```
[.section-label — centred] Work with us

[H2 — Plus Jakarta Sans 700, --text-h2, #F5F3EE, centred]
Ready to see how this applies to your business?

[Body — DM Sans 400, 18px, rgba(245,243,238,0.65), centred, margin-top 16px]
Start with a free Fit Call. Thirty minutes, no pitch — just an honest look
at whether there's a problem worth solving together.

[Primary CTA — centred, margin-top 40px]
Book a free Fit Call →
```

---

### 8.4 Our Outcomes Page (`/our-outcomes`)

#### Section 1 — Hero (dark)

**Watermark:** Yes

```
[.section-label] Our outcomes

[H1 — Plus Jakarta Sans 700, --text-h1, #F5F3EE]
Work we're proud of.

[Body — DM Sans 400, 18px, rgba(245,243,238,0.65), max-width 580px, margin-top 20px]
Every engagement here started with a business leader who could see a problem or
an opportunity — and needed a team to build toward it. These are some of the
solutions we've delivered.
```

**Stat row — 4 columns, below intro text, margin-top 48px:**

Each stat: icon (20px, `--color-accent`) + number (Plus Jakarta Sans 700, 22px, `#F5F3EE`) + label (DM Sans 400, 12px, `rgba(245,243,238,0.55)`).

| Icon | Number | Label |
|---|---|---|
| `Buildings` | 6 | Case studies |
| `Trophy` | 1 | Industry award |
| `Timer` | <30 days | Fastest delivery |
| `MapPin` | Australia-wide | Where we operate |

---

#### Section 2 — Outcome Cards (light)

**Background:** `--color-paper`  
**Vertical padding:** `--space-7`  
**Layout:** 2-column grid desktop, 1 column tablet/mobile. Gap: 24px.

**Card interaction — collapsed default, expand on hover:**

Cards default to a compact state showing only the sector, title and outcome paragraph. On hover (desktop) or tap (mobile), the card expands smoothly to reveal the full content (Challenge, Solution, Outcome, Tags). On mouse-leave the card returns to collapsed state.

```css
/* Collapsed state */
.outcome-card { 
  cursor: pointer;
  transition: all 300ms ease;
  min-height: 180px;
}
.outcome-card .card-expanded-content {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: max-height 400ms ease, opacity 300ms ease;
}

/* Expanded state */
.outcome-card:hover .card-expanded-content,
.outcome-card.expanded .card-expanded-content {
  max-height: 600px;
  opacity: 1;
}
.outcome-card:hover,
.outcome-card.expanded {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(244, 197, 66, 0.12);
  border-color: var(--color-accent);
}
```

**Default (collapsed) card shows:**
1. Sector label (DM Sans 500, 13px, `--color-ink-tertiary`)
2. Icon + card title (Plus Jakarta Sans 700, 18px, `--color-ink`)
3. Outcome paragraph only (DM Sans 400, 15px, `--color-ink-secondary`)

**On hover/tap (expanded) additionally reveals:**
4. Challenge label + text
5. Solution label + text
6. Tag chips

**Note to developer:** On mobile, hover does not exist. Use a tap-to-toggle pattern — first tap expands, second tap collapses. Add a small chevron icon (`ChevronDown` / `ChevronUp`, 16px, `--color-accent`) in the bottom-right of each card to signal expandability. On desktop the chevron can be hidden (hover is the affordance). Add `aria-expanded` attribute toggled by JS for accessibility.

Icon (20px, `--color-accent`) sits beside the card title in both states.

**Card 1 — Fleet visibility & dispatch intelligence**
- Icon: `Truck`
- Sector: National passenger transport operator — ~1,000 staff, 500+ vehicles
- Challenge: No live visibility of fleet position, driver status or fare availability. Dispatch operated blind.
- Solution: Built a real-time IoT telemetry platform ingesting live vehicle data, processed through an event-driven pipeline and surfaced via an interactive web portal. Designed as a composable data layer for future AI capabilities.
- Outcome: Live fleet awareness delivered in under 30 days. Became the operational foundation for dispatch optimisation and mobile app bookings.
- Tags: IoT · Real-time data pipeline · Web platform · AI-ready foundation

**Card 2 — Integrated billing operations**
- Icon: `Receipt`
- Sector: National private healthcare operator
- Challenge: Two billing systems with no integration. Staff manually bridging the gap — rekeying, reconciling and chasing errors.
- Solution: Automated data integration pipeline connecting both systems. AI document understanding extracts billing data from unstructured sources, feeding intelligent reconciliation that matches and routes records without manual handling.
- Outcome: Billing workflow runs end-to-end with minimal human intervention. Fewer errors, faster time-to-invoice and the cashflow benefits that follow.
- Tags: System integration · Data pipeline · AI document understanding

**Card 3 — Energy dispatch optimisation platform**
- Icon: `Lightning`
- Sector: Major Australian utility — national grid operations
- Challenge: Three years of planning with no working solution. Dispatch decisions made without real-time inputs. Stakeholders losing confidence.
- Solution: High-frequency data ingestion platform pulling live forecasts, grid state and outage data, feeding an optimisation engine that models dispatch scenarios and surfaces least-cost recommendations automatically.
- Outcome: Working prototype delivered in three months. Program renewed with full stakeholder confidence.
- Tags: Real-time data ingestion · Optimisation engine · Decision support

**Card 4 — Contractor authorisations platform**
- Icon: `ShieldCheck`
- Sector: Major Australian utility — thousands of contractors on high-voltage assets
- Challenge: Paper-based credential management. Expired licences and lapsed insurances creating serious safety, legal and compliance exposure.
- Solution: Self-service portal for contractor credential submission. AI-assisted document verification validates licences and insurance documents. Agentic expiry management monitors continuously and triggers automated renewal workflows.
- Outcome: Compliance staff shifted from chasing paperwork to managing exceptions. Real-time credential visibility. Industry award winner — now critical operational infrastructure.
- Tags: Workflow automation · Self-service portal · AI document verification · Agentic expiry management

**Card 5 — Digital field sales platform**
- Icon: `DeviceMobile`
- Sector: National beverage & distribution company — 100+ mobile sales reps
- Challenge: Over 100 field reps operating from printed order books and static inventory lists — outdated before they arrived on site.
- Solution: Mobile-first platform with live integration to inventory and pricing systems. Order submission triggers automated back-office workflows end to end.
- Outcome: Field sales became dynamic, professional and data-driven. Back-office processing largely eliminated. Management gained real-time field visibility for the first time.
- Tags: Mobile platform · Live system integration · Workflow automation

**Card 6 — Invoicing & reconciliation automation**
- Icon: `CurrencyDollar`
- Sector: National logistics provider
- Challenge: Entire invoicing cycle managed through manual email exchanges. Order matching, invoice distribution and reconciliation all dependent on people — slow, error-prone and unscalable.
- Solution: Agentic automation workflow handling order scanning and matching, invoice generation, dunning sequences and payment reconciliation autonomously. AI interprets documents and orchestrates actions across systems.
- Outcome: End-to-end finance operations with minimal human intervention. Faster invoicing, fewer errors, better cashflow visibility.
- Tags: Finance workflow automation · Agentic AI · Document intelligence

---

#### Section 3 — Closing CTA (dark)

**Watermark:** Yes

```
[H2 — Plus Jakarta Sans 700, --text-h2, #F5F3EE, centred]
See something that looks familiar?

[Body — DM Sans 400, 18px, rgba(245,243,238,0.65), centred, margin-top 16px]
Most of our clients came to us with a problem they'd been living with for a
long time. The Fit Call is the fastest way to find out if we can help.

[Primary CTA — centred, margin-top 40px]
Book a free Fit Call →
```

---

### 8.5 About Page (`/about`)

#### Section 1 — Hero (dark)

**Watermark:** Yes — two instances

```
[.section-label] About

[H1 — Plus Jakarta Sans 700, --text-h1, #F5F3EE, max-width 760px]
We build things that work on Monday morning.
That's rarer than it sounds.

[Body — DM Sans 400, 18px, rgba(245,243,238,0.65), max-width 620px, margin-top 28px]
Sixense started in 2012. We spent our early years in large enterprise
environments and learned quickly that capability alone isn't enough —
proximity to the problem matters. We moved towards mid-market operators,
where the people making decisions also feel the consequences. Where
inefficiency shows up on the P&L. Where a working solution this month
is worth more than a perfect one next year. That's where we've stayed.
```

---

#### Section 2 — Our Structure (secondary background)

**Background:** `--color-paper-secondary`  
**Vertical padding:** `--space-7`  
**Layout:** Full content width. Two-column desktop — left column (40%) contains the stats displayed large and prominently; right column (55%, offset 5%) contains the section label, heading and body. Single column mobile (stats above text).

**Left column — three stats stacked vertically, each separated by 1px `--color-border` line:**

Each stat: number (Plus Jakarta Sans 700, 48px, `--color-accent`, line-height 1) + label (DM Sans 400, 14px, `--color-ink-secondary`, margin-top 4px). Number size reduced from 64px to 48px to keep the left column visually proportionate to the right column text — the numbers remain prominent without dominating. No icons.

| Number | Label |
|---|---|
| 30+ | People in our delivery team |
| 13+ | Years building for Australian businesses |
| 6 | Industries we've worked across |

Stat padding: 20px 0 per stat. Left-aligned within the column. The total height of the three stats with separators should be approximately equal to the height of the right column content — developer to verify and adjust padding per stat accordingly to achieve visual balance.

**Right column:**
```
[.section-label] Our structure

[H2 — Plus Jakarta Sans 700, --text-h2, --color-ink]
How we're built.

[Body — DM Sans 400, 17px, --color-ink-secondary, margin-top 20px, line-height 1.75]
Our Australian team is small and senior — automation designers and engineers,
all hands-on. The people you meet are the people who do the work.

Behind them is an offshore delivery centre of 30-plus people, working under
direct supervision of our local engineers to the same standards. It's what
lets us deliver at a quality level that would otherwise cost significantly more.
```

---

#### Section 4 — What We Believe (light)

**Background:** `--color-paper`  
**Vertical padding:** `--space-7`  
**Layout:** Full content width. Section label and H2 centred above, then three equal pillar columns, then the quote feature block below. Single column mobile (pillars stack).

**Heading block — centred, margin-bottom 56px:**
```
[.section-label — centred] What we believe

[H2 — Plus Jakarta Sans 700, --text-h2, --color-ink, centred]
How we work with our clients.
```

**Three-pillar row — equal columns (3×), gap 32px:**

Each pillar: `background: --color-paper-secondary`, `border-radius: --radius-xl`, padding 32px, `border-top: 3px solid --color-accent`.

Pillar structure (top to bottom):
1. Icon: 36px, `--color-accent`, in 56px circle `rgba(244,197,66,0.15)`, margin-bottom 20px
2. Heading: Plus Jakarta Sans 700, 18px, `--color-ink`, margin-bottom 12px
3. Body: DM Sans 400, 15px, `--color-ink-secondary`, line-height 1.7

| Icon | Heading | Body |
|---|---|---|
| `Handshake` | Your operations. Your outcomes. | We work alongside our clients, not above them. Your operations and your experience are the centre of our solutions. We follow through on what we say and design around the real constraints of cost, time and disruption. |
| `Rocket` | Execution over strategy. | Working solutions in your hands beat elegant ones on a roadmap. We over-index on delivery. We measure ourselves by what actually changes in your business — not what we delivered on paper. |
| `Target` | Unashamedly pragmatic. | Specific and focused increments of work, with regular demos and tight feedback loops, ensure the focus is always on tangible outcomes and value to your business. |

**Note to developer — icon:** Use `Handshake` (not `HandshakeSimple`) for the first pillar. `HandshakeSimple` does not exist in Phosphor Icons 1.4.2 and will render as a blank circle. Use `ph-handshake` in the icon class.

**Quote block — full content width, margin-top 56px:**

```css
padding: 32px 0;
border-top: 1px solid var(--color-border);
border-bottom: 1px solid var(--color-border);
text-align: center;
```

```
[Quote text — Plus Jakarta Sans 600, clamp(18px, 2.5vw, 24px), --color-ink,
 max-width 640px, margin: 0 auto, line-height 1.4, font-style: italic]
"Bang for buck, this outcome is one of the best we've delivered for our business."

[Attribution — DM Sans 400, 13px, --color-ink-tertiary, margin-top 12px, text-align: centre]
CTO, Australia's largest private transport operator.
Our yardstick for every engagement.
```

**Note to developer:** Quote text and attribution are both centred. `max-width: 640px; margin: 0 auto` on the quote text ensures it doesn't stretch too wide on large screens. Quote is italic; attribution is not.

---

#### Section 5 — Why the Name (secondary background)

**Background:** `--color-paper-secondary`  
**Vertical padding:** `--space-7`  
**Layout:** Centred, max-width 640px

```
[.section-label — centred] Why the name

[H2 — Plus Jakarta Sans 700, --text-h2, --color-ink, centred]
A sixth sense for business
```

The H2 contains a strikethrough effect on the word "problems" only. Implement as:

```html
<h2>
  A sixth sense for business <span class="strikethrough-gold">problems</span> automation.
</h2>
```

```css
.strikethrough-gold {
  text-decoration: line-through;
  text-decoration-color: var(--color-accent); /* gold line only */
  color: var(--color-ink); /* text itself stays dark ink — identical to surrounding heading text */
}
```

**Critical:** Only the word "problems" carries the strikethrough. "business" is plain heading text with no decoration. The strikethrough line is gold (`text-decoration-color: var(--color-accent)`); the text colour of the span remains `--color-ink`, identical to the rest of the heading.

```
[Body — DM Sans 400, 17px, --color-ink-secondary, centred, line-height 1.7, margin-top 20px]
Sixense is a take on sixth sense — connected, intuitive thinking. Seeing the
shape of a problem before it's been fully described.

We think that's what good looks like. After all these years,
we'd like to think we've earned the name.
```

---

#### Section 6 — CTA (dark)

**Watermark:** Yes — two instances

```
[.section-label — centred] Work with us

[H2 — Plus Jakarta Sans 700, --text-h2, #F5F3EE, centred]
If this sounds like what you've been looking for, let's talk.

[Primary CTA — centred, margin-top 40px]
Book a free Fit Call →
```

---

### 8.6 Contact Page (`/contact`)

#### Section 1 — Hero (dark)

**Watermark:** Yes

```
[.section-label] Contact

[H1 — Plus Jakarta Sans 700, --text-h1, #F5F3EE]
Let's have an honest conversation.

[Body — DM Sans 400, 18px, rgba(245,243,238,0.65), max-width 540px, margin-top 16px]
Whether you have a specific problem or you're not sure where to start —
the Fit Call is free, 30 minutes and completely obligation-free.
```

---

#### Section 2 — Contact Form (light)

**Background:** `--color-paper`  
**Vertical padding:** `--space-7`  
**Layout:** Two-column desktop (55% form / 40% contact info). Single column mobile.

**Right column — contact details:**

```
[H3 — Plus Jakarta Sans 600, --text-h3, --color-ink]
Other ways to reach us.
```

Three icon+text rows (icon 20px, `--color-accent`; label DM Sans 400, 15px, `--color-ink-secondary`):

- `Envelope` — automate@sixense.com.au (rendered as `--color-accent` link)
- `MapPin` — Based in Australia. Working across the country.
- `Clock` — We respond to all enquiries within one business day.

---

## 9. Contact Form & Email Integration

### Form Fields

| Field | Type | Required | Placeholder |
|---|---|---|---|
| First name | Text | Yes | First name |
| Last name | Text | Yes | Last name |
| Company | Text | Yes | Company name |
| Role / Title | Text | No | Your role (optional) |
| Email address | Email | Yes | your@email.com |
| Phone number | Tel | No | Phone (optional) |
| Tell us about your situation | Textarea | Yes | Describe the problem or opportunity... |
| How did you hear about us | Select | No | Google search / Referral / LinkedIn / Word of mouth / Other |

First name + last name: side-by-side on desktop (50/50, 16px gap), stacked on mobile.

### Form Styling

```css
label {
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 500;
  color: var(--color-ink);
  display: block;
  margin-bottom: 6px;
}

input, select, textarea {
  width: 100%;
  background: var(--color-paper);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  padding: 12px 16px;
  font-family: var(--font-body);
  font-size: 15px;
  color: var(--color-ink);
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px var(--color-accent-glow);
}

input.error, textarea.error {
  border-color: #C0392B;
}

.error-message {
  font-size: 13px;
  color: #C0392B;
  margin-top: 4px;
}
```

Textarea: min-height 140px, user-resizable vertically. Field spacing: 20px.

### Submit Button

Full-width on mobile. Label: `Send enquiry`. Loading state: spinner + `Sending...`. Disabled during submission.

### Email Delivery

**Recipient:** `automate@sixense.com.au`  
**Reply-to:** Submitter's email address  
**Method:** Server-side handler or transactional service (Resend, Formspree, EmailJS — developer to confirm)

**Subject line:**
```
New enquiry from [Company] via sixense.com.au
```

**Body:**
```
New enquiry received via sixense.com.au

Company: [Company]
Name: [First Name] [Last Name]
Role: [Role]
Email: [Email]
Phone: [Phone]
How they found us: [Source]

Message:
---
[Inquiry Details]
---

Reply directly to this email to respond.
```

### Success State

Replace form with:
```
[Cyan checkmark icon — 32px]
[H3 — Plus Jakarta Sans 600, 22px, --color-ink, margin-top 16px]
Thanks, [First Name]. We'll be in touch.
[Body — DM Sans 400, 16px, --color-ink-secondary, margin-top 8px]
Expect to hear from us within one business day.
```

### Validation

- Client-side, on blur for required fields
- Email format validated
- Honeypot hidden field for spam protection
- No submission until all required fields valid

**Privacy consent note — below submit button:**
```
[DM Sans 400, 12px, --color-ink-tertiary]
By submitting this form, you agree to Sixense contacting you regarding your
enquiry. We don't share your details with third parties.
```

---

## 10. Navigation & Footer

### Global Navigation

See Component 7.2.

### Footer

**Background:** `--color-paper-dark`  
**Vertical padding:** 64px top, 40px bottom

**Three-column layout desktop:**

**Column 1 — Brand:**
- Logo: reversed variant (mark + wordmark, no tagline), 110px wide, mark in `#F4C542`, gold tittle on "i" retained
- Below logo (margin-top 24px): DM Sans 400, 13px, `rgba(245,243,238,0.4)`:
  `© 2026 Sixense Pty Ltd. All rights reserved.`
  `ABN: 19 643 253 122`

**Column 2 — Navigation:**
- Heading: `Site` — DM Sans 600, 11px, `rgba(245,243,238,0.4)`, uppercase, letter-spacing 0.1em
- Links: DM Sans 400, 14px, `rgba(245,243,238,0.65)`. Hover: `--color-accent`
- Home / What We Do / How We Work / Our Outcomes / About / Contact

**Column 3 — Contact:**
- Heading: `Get in touch` — same style
- Email: `automate@sixense.com.au` — DM Sans 400, 14px, `--color-accent`
- Below (margin-top 16px): `Book a free Fit Call →` — ghost-on-dark button

**Bottom bar** (below 1px `rgba(245,243,238,0.1)` divider, margin-top 40px):

DM Sans 400, 12px, `rgba(245,243,238,0.3)`, single row desktop, wrapped mobile:
```
Privacy Policy  ·  Terms of Use  ·  This site does not use cookies for tracking.
Sixense is committed to the responsible and ethical use of AI.
```

Privacy Policy → `/privacy`. Terms of Use → `/terms`.

---

## 11. Image Assets

### Supplied Assets

| File | Usage | Page | Notes |
|---|---|---|---|
| `Sixense-Transparent.avif` | Logo source reference | — | Visual reference only; not used directly on the live site |
| `Sixense-Mark.svg` | Reusable mark asset | All pages | SVG mark only — `#F4C542`, transparent bg, viewBox `50 15 100 102`. Use for favicon generation and any context requiring the mark standalone |
| `Working_backwards.avif` | Inline illustration | How We Work | Section 2 — displayed as-is |
| `Start-small-prove-value-scale-smart.avif` | Inline illustration | How We Work | Section 3 — displayed as-is |

**Image display for the two How We Work illustrations:**
- Container: `background: --color-paper-secondary`, `border-radius: --radius-xl`, padding 32px
- `align-self: flex-start` — critical for correct vertical alignment with adjacent text
- Image: `max-width: 100%`, `height: auto`, `display: block`
- No filters, overlays or colour treatments

---

## 12. Animations & Interactions

### Principles

- Animation serves clarity, not decoration.
- All motion respects `prefers-reduced-motion`.
- No parallax. No scroll-jacking.

### Watermark Animation

The watermark appears on **all sections across all pages** — dark and light. Two variants with different opacities and stroke colours.

**Dark section watermark** (hero, closing CTAs, footer):
- Stroke: `#F4C542`
- Opacity: `0.07`
- Position: right side, partially off-screen, vertically centred

**Light section watermark** (`--color-paper`, `--color-paper-secondary`):
- Stroke: `#F4C542`
- Opacity: `0.05`
- Position: alternates left/right per section (first light section: right; second: left; third: right; etc.)
- Always partially clipped by section `overflow: hidden` — never fully visible

**All section containers** must have `position: relative; overflow: hidden`. All content inside at `z-index: 1`. Watermark at `z-index: 0`.

```html
<div class="section-watermark" aria-hidden="true">
  <svg class="watermark-mark" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill="none">
    <!-- Use exact traced SVG paths from Sixense-Transparent.avif -->
    <polygon class="hex hex-1" points="100,18 122,31 122,57 100,70 78,57 78,31"
      stroke="currentColor" stroke-width="1.5"/>
    <polygon class="hex hex-2" points="126,62 148,75 148,101 126,114 104,101 104,75"
      stroke="currentColor" stroke-width="1.5"/>
    <polygon class="hex hex-3" points="74,62 96,75 96,101 74,114 52,101 52,75"
      stroke="currentColor" stroke-width="1.5"/>
    <circle class="hub" cx="100" cy="88" r="3" fill="currentColor"/>
    <line class="spoke spoke-1" x1="100" y1="85" x2="100" y2="68" stroke="currentColor" stroke-width="1"/>
    <line class="spoke spoke-2" x1="100" y1="88" x2="118" y2="95" stroke="currentColor" stroke-width="1"/>
    <line class="spoke spoke-3" x1="100" y1="88" x2="82" y2="95" stroke="currentColor" stroke-width="1"/>
  </svg>
</div>
```

```css
/* Dark section variant */
.section-dark .section-watermark {
  position: absolute;
  right: -80px;
  top: 50%;
  transform: translateY(-50%);
  width: 520px;
  height: 520px;
  pointer-events: none;
  z-index: 0;
  color: #F4C542;
}
.section-dark .watermark-mark {
  width: 100%;
  height: 100%;
  opacity: 0.07;
}

/* Second watermark instance in dark sections — left side, offset animation */
.section-dark .section-watermark--secondary {
  right: auto;
  left: -80px;
  top: 40%;
  transform: translateY(-50%);
  width: 420px;
  height: 420px;
}
.section-dark .section-watermark--secondary .hex-1 { animation-delay: 2.5s; }
.section-dark .section-watermark--secondary .hex-2 { animation-delay: 3.2s; }
.section-dark .section-watermark--secondary .hex-3 { animation-delay: 3.9s; }
.section-dark .section-watermark--secondary .hub   { animation-delay: 4.6s; }
.section-dark .section-watermark--secondary .spoke-1 { animation-delay: 4.7s; }
.section-dark .section-watermark--secondary .spoke-2 { animation-delay: 4.9s; }
.section-dark .section-watermark--secondary .spoke-3 { animation-delay: 5.1s; }

/* Light section variant */
.section-light .section-watermark {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 480px;
  height: 480px;
  pointer-events: none;
  z-index: 0;
  color: #F4C542;
}
.section-light .watermark-mark {
  width: 100%;
  height: 100%;
  opacity: 0.05;
}

/* Alternate left/right placement for light sections */
.section-light:nth-of-type(odd)  .section-watermark { right: -60px; left: auto; }
.section-light:nth-of-type(even) .section-watermark { left: -60px; right: auto; }

/* Animation — same keyframes for both */
.hex {
  stroke-dasharray: 300;
  stroke-dashoffset: 300;
  animation: hexDraw 5s ease-in-out infinite;
}
.hex-1 { animation-delay: 0s; }
.hex-2 { animation-delay: 0.7s; }
.hex-3 { animation-delay: 1.4s; }

.hub {
  opacity: 0;
  animation: hubAppear 5s ease-in-out infinite;
  animation-delay: 2.1s;
}

.spoke {
  stroke-dasharray: 40;
  stroke-dashoffset: 40;
  animation: spokeDraw 0.6s ease-out infinite;
}
.spoke-1 { animation-delay: 2.2s; }
.spoke-2 { animation-delay: 2.4s; }
.spoke-3 { animation-delay: 2.6s; }

@keyframes hexDraw {
  0%   { stroke-dashoffset: 300; opacity: 0; }
  15%  { opacity: 1; }
  50%  { stroke-dashoffset: 0; opacity: 1; }
  80%  { stroke-dashoffset: 0; opacity: 0.6; }
  100% { stroke-dashoffset: 0; opacity: 0; }
}
@keyframes hubAppear {
  0%   { opacity: 0; }
  20%  { opacity: 1; }
  70%  { opacity: 1; }
  100% { opacity: 0; }
}
@keyframes spokeDraw {
  0%   { stroke-dashoffset: 40; }
  100% { stroke-dashoffset: 0; }
}

@media (max-width: 767px) {
  .section-watermark {
    right: 50% !important;
    left: auto !important;
    transform: translate(50%, -50%);
    width: 240px;
    height: 240px;
  }
  .section-dark .watermark-mark  { opacity: 0.04; }
  .section-light .watermark-mark { opacity: 0.025; }
}

@media (prefers-reduced-motion: reduce) {
  .hex, .hub, .spoke {
    animation: none;
    stroke-dashoffset: 0;
    opacity: 1;
  }
  .watermark-mark { opacity: 0.04 !important; }
}
```

### Scroll-triggered Entrance Animations

```css
/* Starting state applied via JS on page load */
.animate-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
              transform 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.animate-in.visible {
  opacity: 1;
  transform: translateY(0);
}
```

Apply to: section headings, body text blocks, cards (staggered 80ms per card). Trigger via IntersectionObserver at 10% visibility threshold.

### Hover States

- Nav links: colour → `--color-accent` (light nav background), 200ms ease
- Cards: border-color → `--color-accent`, translateY(-4px), 200ms ease
- Buttons: background/border colour, 200ms ease
- Footer links: opacity 0.65 → 1.0, 150ms ease

### Page Transitions

Fade out 150ms, fade in 250ms on root wrapper.

---

## 13. Technical Requirements

### Stack

Static site generator preferred — Astro, Next.js (static export) or plain HTML/CSS/JS. No CMS required. CSS custom properties for all tokens. `font-display: swap` on all web fonts.

### Performance

- Lighthouse targets: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95
- Images: AVIF/WebP with fallback, lazy-loaded below fold
- Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms
- Minimal JS payload

### SEO — Meta per page

| Page | Title | Description |
|---|---|---|
| Home | `Automation & AI for Australian operators — Sixense` | `We build automation and AI solutions that eliminate operational drag and unlock capabilities your business couldn't reach before. Mid-market specialists.` |
| What We Do | `What we do — Sixense` | `We design and build automation and AI solutions across finance, field service, procurement, document processing and more. Fixed scope. Real outcomes.` |
| How We Work | `How we work — Sixense` | `We start with your business, not the technology. Short build cycles, senior people, no handoffs. Here's how we engage and deliver.` |
| Our Outcomes | `Our outcomes — Sixense` | `See the automation and AI solutions we've delivered for Australian operators across transport, utilities, healthcare, logistics and more.` |
| About | `About Sixense — automation & AI consultancy` | `We've been building for Australian businesses since 2012. A small, senior local team backed by a 30-person delivery centre.` |
| Contact | `Contact Sixense — book a free Fit Call` | `Get in touch to book a free 30-minute Fit Call. No pitch — just an honest conversation about whether there's something worth solving.` |

Canonical URLs on all pages. Open Graph tags. `Organization` schema markup on home page.

### Responsive Breakpoints

| Name | Range |
|---|---|
| Mobile | < 768px |
| Tablet | 768px–1279px |
| Desktop | ≥ 1280px |

Test at 375px, 768px and 1440px.

### Browser Support

Chrome, Safari, Firefox, Edge (last 2 versions each). iOS Safari 15+. Android Chrome (last 2 versions).

### Hosting

Vercel, Netlify or Cloudflare Pages recommended. Domain: `sixense.com.au` (client manages DNS). HTTPS required.

---

## 14. Accessibility & Legal

### Accessibility

- All interactive elements keyboard-navigable in logical order
- All images have descriptive `alt` text (specified per section above)
- WCAG AA contrast: minimum 4.5:1 body text, 3:1 large text and UI elements
- `#F4C542` on `#1A1A18`: ~7.2:1 ✓ (dark sections). `#F4C542` on `#F5F3EE`: ~4.6:1 ✓ (light sections)
- Never use `#F4C542` directly on light backgrounds for text or small elements — always use `#F4C542`
- Form fields have associated `<label>` elements
- Screen reader landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>` with `aria-label`
- Skip-to-main-content link at top of page (visually hidden until focused)
- Watermark SVG has `aria-hidden="true"`

### Legal Pages

`/privacy` — Privacy Policy  
`/terms` — Terms of Use

Both use standard site template (nav + footer). Both pages contain substantive placeholder legal copy and do not display a "placeholder content" notice — that notice has been removed. Final legal copy to be reviewed and confirmed by Sixense or a qualified legal copywriter before launch.

**Contact email on Privacy Policy and Terms of Use pages:** Any contact reference within these pages must use `admin@sixense.com.au` — not `automate@sixense.com.au` or any other address.

### Footer Fine Print

```
© 2026 Sixense Pty Ltd. All rights reserved.
ABN: 19 643 253 122
Privacy Policy  ·  Terms of Use  ·  This site does not use cookies for tracking.
Sixense is committed to the responsible and ethical use of AI.
```

### Form Data & Privacy

- Contact form submissions not stored client-side
- If using third-party form service, reference its privacy policy in Sixense Privacy Policy
- Consent note on form: `By submitting this form, you agree to Sixense contacting you regarding your enquiry. We don't share your details with third parties.`
- Australian Privacy Act compliant

---

## 15. Content Import Guide

This section documents exactly how to merge an updated `spec/CONTENT.md` back into the site. The client edits `CONTENT.md` and returns it. The developer follows this guide to apply changes without breaking anything.

---

### 15.1 Process Overview

1. Receive the updated `CONTENT.md`
2. Replace the file at `spec/CONTENT.md` with the new version
3. Open it side-by-side with the previous version (use `git diff spec/CONTENT.md` to see exactly what changed)
4. For each changed block, locate the corresponding source file and field using the map in Section 15.2 below
5. Apply the change — copy the new text exactly as written, preserving any HTML entities (e.g. `&amp;`, `&nbsp;`)
6. Do not alter surrounding code, component structure, CSS or imports
7. Build and check the affected pages before marking complete

**What is safe to change:** Any text inside a ` ``` ` block in CONTENT.md maps directly to a string in the source. Edit only that string.

**What is never safe to change without developer review:**
- Field labels, section headings or structural tags in CONTENT.md (these are navigation aids, not content)
- Icon names (e.g. `ph-trophy`) — these reference the Phosphor icon library
- URL paths (e.g. `/contact`, `/how-we-work`)
- CSS class names or inline style attributes
- Array structure or object keys in `.astro` frontmatter

---

### 15.2 Content-to-File Map

For each CONTENT.md section, the table below identifies the exact source file and the variable, prop or inline location to update.

---

#### Page 1 — Home (`src/pages/index.astro`)

| CONTENT.md field | Location in source |
|---|---|
| Hero — Section Label | Inline: `<span class="section-label">` in Section 1 |
| Hero — H1 | Inline: `<h1 id="hero-heading">` |
| Hero — Body | Inline: `<p class="hero-sub">` |
| Hero — CTA Button | Inline: `<a href="/contact" class="btn btn-primary">` |
| The Problem — Section Label | Inline: `<span class="section-label">` in Section 2 |
| The Problem — H2 | Inline: `<h2 id="problem-heading">` |
| The Problem — Body paragraphs | Inline: `<p class="body-large">` (two paragraphs) |
| Who We Work With — Section Label | Inline: `<span class="section-label">` in Section 3 |
| Who We Work With — H2 | Inline: `<h2 id="who-heading">` |
| Who We Work With — Body | Inline: `<p class="animate-in body-large">` |
| Who We Work With — Icon Items (Label + Description) | Inline: `.who-label` / `.who-desc` paragraphs within each `.who-item` |
| Proven Outcomes — Section Label | Inline: `<span class="section-label">` in Section 4 |
| Proven Outcomes — H2 | Inline: `<h2 id="proof-heading">` |
| Proven Outcomes — Body | Inline: `<p>` inside the right column div |
| Proven Outcomes — Link Text | Inline: `<a href="/our-outcomes" class="accent-link">` |
| Proven Outcomes — Proof Blocks (Headline + Detail) | Inline: `.proof-headline` / `.proof-detail` paragraphs in each `.proof-block` |
| Closing CTA — H2, Body, CTA Button | Component: `<ClosingCTA />` — uses default props defined in `src/components/ClosingCTA.astro` (edit defaults there, or pass as props on the `<ClosingCTA />` call in index.astro) |

---

#### Page 2 — What We Do (`src/pages/what-we-do.astro`)

All card/tier/tech arrays live in the frontmatter (`---` block) at the top of the file.

| CONTENT.md field | Location in source |
|---|---|
| Hero — Section Label, H1, Body paragraphs | Inline in `<!-- Hero -->` section |
| Outcomes We Enable — Section Label, H2 | Inline in `<!-- Outcomes We Enable -->` section |
| Service Cards 1–9 (Heading + Body) | Frontmatter array: `const serviceCards = [...]` — each object has `heading` and `body` keys |
| How We Engage — Section Label, H2 | Inline in `<!-- How We Engage -->` section |
| How We Engage — Panel 1 & 2 (Tag, Heading, Body, CTA) | Inline within each `.engage-panel` div |
| How We Build — Section Label, H2, Intro Body | Inline in `<!-- How We Build -->` section |
| How We Build — Tiers 1–4 (Heading, Sub-label, Body) | Frontmatter array: `const buildStaircase = [...]` — each object has `heading`, `sublabel`, `body` keys |
| Technology Choice — Section Label, H2 | Inline in `<!-- Technology Choice -->` section |
| Technology Choice — Cards 1–4 (Label, Heading, Body) | Frontmatter array: `const techCards = [...]` — each object has `label`, `heading`, `body` keys |
| Closing CTA — H2, Body, CTA Button | Props on `<ClosingCTA heading="..." body="..." ctaLabel="..." />` call at the bottom |

---

#### Page 3 — How We Work (`src/pages/how-we-work.astro`)

| CONTENT.md field | Location in source |
|---|---|
| Hero — Section Label, H1, Body | Inline in `<!-- Hero -->` section |
| Our Approach — Section Label, H2, Body paragraphs | Inline in `<!-- Our Approach -->` section |
| Our Method — Section Label, H2, Body paragraphs | Inline in `<!-- Our Method -->` section |
| Our Principles — Section Label, H2 | Inline in `<!-- How We Build -->` section |
| Principles 1–4 (Heading + Body) | Frontmatter array: `const principles = [...]` — each object has `heading` and `body` keys |
| Our Team — Section Label, H2, Body paragraphs, Pull Quote | Inline in `<!-- Who You'll Work With -->` section; pull quote is in `<p class="pull-quote">` |
| Closing CTA — Section Label, H2, Body, CTA Button | Inline in `<!-- CTA -->` section at the bottom |

---

#### Page 4 — Our Outcomes (`src/pages/our-outcomes.astro`)

| CONTENT.md field | Location in source |
|---|---|
| Hero — Section Label, H1, Body | Inline in `<!-- Hero -->` section |
| Stats Row (Number + Label, 4 stats) | Frontmatter array: `const stats = [...]` — each object has `number` and `label` keys |
| Outcome Cards 1–6 (all fields) | Frontmatter array: `const outcomes = [...]` — each object has `sector`, `heading`, `challenge`, `solution`, `outcome`, `tags` keys. Tags are an array of strings: `['Tag one', 'Tag two']` |
| Closing CTA — H2, Body, CTA Button | Props on `<ClosingCTA heading="..." body="..." ctaLabel="..." />` call at the bottom |

---

#### Page 5 — About (`src/pages/about.astro`)

| CONTENT.md field | Location in source |
|---|---|
| Hero — Section Label, H1, Body | Inline in `<!-- Hero -->` section |
| Our Structure — Section Label, H2, Body paragraphs | Inline in `<!-- Our Structure -->` section |
| Our Structure — Stats (Number + Label) | Inline: `.stat-big` span + `.stat-desc` paragraph in each `.stat-item` |
| What We Believe — Section Label, H2 | Inline in `<!-- What We Believe -->` section |
| Pillars 1–3 (Heading + Body) | Inline: `.pillar-heading` / `.pillar-body` in each `.pillar` div |
| Quote + Attribution | Inline: `.quote-text` paragraph + `.quote-attr` paragraph |
| Why the Name — Section Label, H2, Body paragraphs | Inline in `<!-- Why the Name -->` section. **Important:** the H2 uses `<span class="strikethrough-gold">problems</span>` — only the word "problems" is wrapped in this span. Do not alter the span, only the surrounding text if needed. |
| Closing CTA — Section Label, H2, CTA Button | Inline in `<!-- CTA -->` section at the bottom |

---

#### Page 6 — Contact (`src/pages/contact.astro`)

| CONTENT.md field | Location in source |
|---|---|
| Hero — Section Label, H1, Body | Inline in `<!-- Hero -->` section |
| Form field labels | `<label class="form-label">` for each field |
| Form field placeholders | `placeholder="..."` attribute on each `<input>` or `<textarea>` |
| Dropdown options | `<option value="...">` elements inside the `<select>` |
| Submit button text | `<span id="submit-label">` |
| Consent note | `<p class="consent-note">` |
| Success message | `<h3 id="success-name">` is populated by JS as `"Thanks, ${firstName}. We'll be in touch."` — edit the JS string in the `<script>` block at the bottom |
| Success sub-message | `<p class="success-body">` |
| Aside — Heading | `<h3 class="aside-heading">` |
| Aside — Email | `<a href="mailto:...">` inside the first `.contact-row` |
| Aside — Location, Response time | `<p class="aside-body">` in second and third `.contact-row` |

---

#### Page 7 — Privacy Policy (`src/pages/privacy.astro`)

| CONTENT.md field | Location in source |
|---|---|
| Last updated | `<p class="last-updated">` |
| Sections 1–7 body text | `<p>` elements inside `.legal-content`, each under an `<h2>` heading |
| Section 7 contact email | `<a href="mailto:admin@sixense.com.au">` — update both the `href` attribute and the link text if changed |

---

#### Page 8 — Terms of Use (`src/pages/terms.astro`)

| CONTENT.md field | Location in source |
|---|---|
| Last updated | `<p class="last-updated">` |
| Sections 1–6 body text | `<p>` elements inside `.legal-content`, each under an `<h2>` heading |
| Section 6 contact email | `<a href="mailto:admin@sixense.com.au">` — update both the `href` attribute and the link text if changed |

---

#### Global — Footer (`src/components/Footer.astro`)

| CONTENT.md field | Location in source |
|---|---|
| Copyright line + ABN | `<p class="footer-legal">` |
| Footer fine print | `<p class="footer-fine">` — the static text portions between the Privacy Policy and Terms of Use links |
| Footer email | `<a href="mailto:...">` with class `footer-email` |
| Footer CTA button | `<a href="/contact" class="btn btn-ghost-dark footer-cta">` |

---

### 15.3 Editing Rules for the Developer

1. **Match text exactly.** Copy the new text from CONTENT.md verbatim. Do not reformat, reflow or correct the client's wording — that is their choice.
2. **Preserve HTML entities.** If the source uses `&amp;` for `&` or `&nbsp;` for a non-breaking space, keep it. Do not introduce raw `&` characters inside HTML attributes or Astro expressions.
3. **Preserve JSX/Astro expressions.** If the existing text contains `{variable}` interpolations, do not remove them. Only replace the surrounding static text.
4. **Preserve line breaks.** If the original H1 or H2 uses a `<br />` for a deliberate line break, keep it unless the new copy clearly no longer needs it.
5. **Arrays:** When updating frontmatter arrays (service cards, tiers, tech cards, outcomes, stats), edit only the string values. Do not add, remove or reorder array entries unless the client has explicitly asked for that. Do not alter the key names (`heading`, `body`, `sector`, etc.).
6. **Tags (outcome cards):** Tags are comma-separated in CONTENT.md using `|` as a separator for readability. In the source they are a JavaScript string array: `['Tag one', 'Tag two']`. Convert accordingly — each tag between `|` characters becomes a quoted string in the array.
7. **Strikethrough in About H2:** The H2 in "Why the Name" uses `<span class="strikethrough-gold">problems</span>`. Only the word inside the span should be struck through. If the client changes the surrounding words, update only the surrounding text — do not remove or alter the `<span>`.
8. **Build and check after every page.** Run `npm run dev` and visually verify each changed page before committing.

---

*End of specification.*  
*Single source of truth — all previous versions superseded.*  
*Questions: automate@sixense.com.au*
