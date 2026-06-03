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

The supplied file `Sixense-Transparent.avif` is the source reference. The mark (three interlocking hexagons with hub-and-spoke centre) is retained conceptually but reworked for precision and updated colour. The "connected thinking" tagline is removed from all instances.

### Mark Rework

**Geometry:**
- Three hexagons arranged in a trefoil, each rotated 120° from one another, meeting at a central hub
- Stroke weight: 2.5px, no fill, rounded corners (corner radius: 5px using quadratic Bezier curves — not sharp mitre joins)
- The connecting spokes must radiate cleanly from the hub centre to the inner vertex of each hexagon. Spokes should be trimmed so they terminate just inside the hexagon perimeter — they must not visually float between hexagons. This is a critical geometry fix: spokes meet the hexagons at their inner edge, not in mid-air
- Central hub: filled circle, 7px diameter, at the exact intersection point of all three hexagon inner vertices
- Three spokes: 1.5px lines from hub to each hexagon inner vertex, trimmed to ~55% of the hub-to-centre distance

**Colour:**
- Mark on dark backgrounds (`#1A1A18`): `#00C2FF`
- Mark on light backgrounds (`#F5F3EE`, `#EDEAE3`): `#0099CC` (deeper cyan — maintains 4.5:1 contrast)
- Mark is never rendered as a flat dark fill

**Wordmark:**
- Font: Plus Jakarta Sans, weight 700
- Text: `sixense` — all lowercase
- Tracking: 0.02em
- Colour: `#F5F3EE` on dark backgrounds; `#1A1A18` on light backgrounds
- **The dot above the letter "i" in "sixense" must be rendered in `#00C2FF` (electric cyan).** This requires the wordmark to be implemented as SVG text with a custom glyph override or as a layered SVG where the tittle (dot) of the "i" is separately coloured. This is a distinctive brand detail and must be present in all logo instances including nav, footer, and any rendered image assets.

**Tagline:** None. Removed from all instances.

**Proportions:**
- Mark width : wordmark width ≈ 1 : 2.4 (mark should feel prominent, not undersized relative to text)
- Mark and wordmark vertically centred
- Clearspace: minimum padding equal to the height of the letter "s" on all sides

**Variants required:**
- Full horizontal lockup (mark + wordmark with cyan "i" dot) — nav and general use
- Mark only — favicon, small contexts
- Reversed (white mark + white wordmark, cyan "i" dot retained) — dark backgrounds
- Monochrome dark — single `#1A1A18` version (cyan "i" dot becomes dark ink)

**Nav sizing:** Minimum 160px wide on desktop, 130px on mobile. Set `flex-shrink: 0` on the logo container. The logo must feel prominent in the nav — not tucked away.

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
- 32×32px and 16×16px: mark only, `#00C2FF` on transparent background
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
  font-size: 13px;
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
--color-accent:        #00C2FF;   /* Electric cyan — primary accent, all contexts */
--color-accent-deep:   #0099CC;   /* Logo mark on light backgrounds only */
--color-accent-hover:  #00A8DC;   /* Hover state */
--color-accent-glow:   rgba(0, 194, 255, 0.15); /* Focus rings */
--color-border:        rgba(26, 26, 24, 0.12);  /* Default borders */
--color-border-strong: rgba(26, 26, 24, 0.25);  /* Dividers */
```

### Contrast Note

`#00C2FF` produces ~9.5:1 contrast against `#1A1A18`. A single accent token works across both light and dark backgrounds at all text sizes — no dark-mode variant required. Use `--color-accent-deep` (`#0099CC`) only for the logo mark SVG on light backgrounds.

### Colour Application

**`--color-accent` used for:**
- All section labels and their left-bar decorators
- Nav active link and "Book a Fit Call" button (text: `#1A1A18`)
- All CTA button backgrounds (text: `#1A1A18`)
- Card top accent bars (3px)
- Card hover border
- Outcome card tag chip borders
- All icons across all pages
- Icon circle backgrounds: `rgba(0, 194, 255, 0.08)`
- How We Build principle block left borders
- Blockquote left border (About page)
- Watermark SVG stroke (at low opacity)
- Stat numbers on About page
- Form input focus border and glow
- Footer links on hover
- Inline text links ("See our outcomes →" etc.)

**Dark/light section pattern:**
- Background alternates: `--color-paper-dark` (hero, closing CTAs, footer) and `--color-paper` / `--color-paper-secondary` (content sections)
- Text on dark: primary `#F5F3EE`, secondary `rgba(245,243,238,0.6)`

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
- Height: 80px.
- Permanent bottom border: `1px solid var(--color-border)`.
- Left: Logo, minimum 140px, `flex-shrink: 0`.
- Right: Nav links → vertical separator → "Book a Fit Call" button.
- Nav link: DM Sans 500, 15px, `--color-ink`. Hover/active: `--color-accent`.
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
box-shadow: 0 8px 32px rgba(0, 194, 255, 0.08);
border-color: var(--color-accent);
```
- Sector label: DM Sans 500, 13px, `--color-ink-tertiary`
- Challenge / Solution / Outcome labels: DM Sans 600, 11px, `--color-accent`, uppercase, letter-spacing 0.08em
- Body: DM Sans 400, 15px, `--color-ink-secondary`
- Tags: DM Sans 500, 11px, border `1px solid rgba(0,194,255,0.35)`, `--radius-sm`, padding 4px 10px

**Service area card:**
```css
background: var(--color-paper-secondary);
border-radius: var(--radius-lg);
padding: 28px 24px;
```
- Icon: 32px, `--color-accent`, inside 48px circle `rgba(0,194,255,0.08)`
- Heading: Plus Jakarta Sans 600, 16px, `--color-ink`
- Body: DM Sans 400, 14px, `--color-ink-secondary`, line-height 1.6

### 7.4 Section Labels

See Section 4 — Typography. Apply `.section-label` class universally.

### 7.5 Icons

**Icon library:** Phosphor Icons outline set.

```html
<script src="https://unpkg.com/phosphor-icons@1.4.2/src/index.js"></script>
```

- Standard size: 32px
- Compact size: 24px (inline, beside text)
- Small size: 20px (stat rows, callouts)
- Colour: `--color-accent` (`#00C2FF`)
- Circle background: 56px diameter, `background: rgba(0,194,255,0.08)`, `border-radius: 50%`

### 7.6 Watermark

The watermark appears **across all pages and all section types** — not only dark sections. It is always subtle and never competes with content.

**Two opacity levels:**
- Dark sections (`--color-paper-dark`): `opacity: 0.07` — cyan stroke on dark background
- Light sections (`--color-paper`, `--color-paper-secondary`): `opacity: 0.04` — use `--color-accent-deep` (`#0099CC`) stroke on light backgrounds for subtlety

**Placement rules:**
- Every dark section (hero, closing CTAs, footer): right side, partially bleeding off-screen
- Every light content section: positioned to the far right or far left, alternating per section, partially clipped by `overflow: hidden`. Never centred over text content.
- The watermark is always `position: absolute`, `z-index: 0`. All content is `z-index: 1`.
- On mobile: reduce to 240px, centred, opacity halved again

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
until it doesn't. The cracks show up as errors, delays, key person dependencies
and a growing sense that the business is harder to run than it should be.

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

Each block: icon (36px, `--color-accent`) in a 56px circle (`rgba(0,194,255,0.08)`), with label and sub-label to the right of the icon (horizontal inline layout within each block).

Icons must be rendered as actual Phosphor icons — not blank circles. Ensure the icon component script is loaded before these render.

| Icon | Label | Sub-label |
|---|---|---|
| `Buildings` | Asset-heavy businesses | Real estate, construction, fleet |
| `Storefront` | Service-intensive operations | Retail, logistics, supply chain |
| `FolderOpen` | Data & document-rich operations | Finance ops, HR ops, compliance, safety |

**Label:** Plus Jakarta Sans 600, 15px, `--color-ink`  
**Sub-label:** DM Sans 400, 13px, `--color-ink-secondary`

---

#### Section 4 — Proof Signal (light)

**Background:** `--color-paper`  
**Vertical padding:** `--space-7`  
**Layout:** Two-column desktop (40% / 55%), `align-items: center` on the row — both columns vertically centred relative to each other. Single column mobile.

**Left:**
```
[.section-label] Proven outcomes

[H2 — Plus Jakarta Sans 700, --text-h2, --color-ink]
We've done
this before.

[Body — DM Sans 400, 16px, --color-ink-secondary, margin-top 16px]
From a national transport operator with no live fleet visibility, to a utility
managing thousands of contractors on high-voltage assets, to a logistics
business drowning in manual invoicing — we've built working solutions across
some of Australia's most operationally demanding businesses.

[Link — DM Sans 500, 15px, --color-accent, margin-top 24px]
See our outcomes →
```

**Right — three stat blocks, stacked vertically with equal spacing:**

The right column must be vertically centred relative to the left column content. Use `align-self: center` on the right column container. Each stat block is separated by a 1px `--color-border` line. Padding above the first block and below the last block: 8px minimum so the border lines don't sit flush against the column edges.

Each block: icon (24px, `--color-accent`) + headline (Plus Jakarta Sans 600, 22px, `--color-ink`) + detail (DM Sans 400, 14px, `--color-ink-tertiary`). Padding per block: 20px 0.

| Icon | Headline | Detail |
|---|---|---|
| `Trophy` | Industry award winner | Contractor authorisations platform — major Australian utility |
| `Timer` | Working prototype in 3 months | Energy dispatch optimisation — after 3 years of stalled attempts |
| `Eye` | Live fleet visibility in 30 days | National passenger transport operator, 500+ vehicles |

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

[Secondary link — DM Sans 500, 14px, rgba(245,243,238,0.5), centred, margin-top 16px]
Or contact us →  (links to /contact)
```

---

### 8.2 What We Do Page (`/what-we-do`)

#### Section 1 — Hero (dark)

**Watermark:** Yes

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

#### Section 2 — Where We Work (light)

**Background:** `--color-paper`  
**Vertical padding:** `--space-7`

```
[.section-label] Where we work

[H2 — Plus Jakarta Sans 700, --text-h2, --color-ink]
If your team is doing any of the following manually,
there's likely a better way.
```

**Service area card grid — 3 columns desktop, 2 tablet, 1 mobile. Gap: 20px.**

Each card: icon (32px in 48px circle) top-left, heading (Plus Jakarta Sans 600, 16px), body (DM Sans 400, 14px, `--color-ink-secondary`).

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

---

#### Section 3 — Not All Automation Is the Same (secondary background)

**Background:** `--color-paper-secondary`  
**Vertical padding:** `--space-7`  
**Layout:** Two-column desktop (30% left / 65% right), single column mobile

**Left:**
```
[.section-label] The approach

[H2 — Plus Jakarta Sans 700, --text-h2, --color-ink]
Not all automation
is the same.
```

**Right — four approach blocks, separated by 1px --color-border lines:**

Each block: icon (24px, `--color-accent`) + label (DM Sans 600, 11px, `--color-accent`, uppercase) + heading (Plus Jakarta Sans 600, 20px, `--color-ink`) + body (DM Sans 400, 15px, `--color-ink-secondary`).

| Icon | Label | Heading | Body |
|---|---|---|---|
| `GitBranch` | Rule-based | Task & rule automation | Handles repeatable logic — consistent, fast, predictable. |
| `Brain` | Decision support | Data analysis & recommendations | Analyses data and surfaces recommendations for your team to act on. |
| `Sparkle` | Language & context | GenAI applications | Understands language, documents and unstructured data. |
| `Robot` | Autonomous | Agentic systems | Acts independently within defined boundaries — with human oversight built in. |

Below blocks:
```
[DM Sans 400, 16px, --color-ink-secondary, margin-top 24px]
We match the right approach to the right problem.
Often a single solution draws on more than one.
```

---

#### Section 4 — How We Engage (light)

**Background:** `--color-paper`  
**Vertical padding:** `--space-7`

```
[.section-label] How we engage

[H2 — Plus Jakarta Sans 700, --text-h2, --color-ink]
Every engagement starts small and builds with purpose.
Nothing is open-ended.
```

**Two panels side-by-side desktop, stacked mobile. Each: border, --radius-xl, 32px padding.**

Panel 1 — The Fit Call:
- Icon: `Phone` (48px, `--color-accent`, in 72px circle) — top of card
- Tag: `Free · 30 minutes` — DM Sans 600, 11px, `--color-accent`, border `1px solid --color-accent`, `--radius-sm`, padding 4px 10px
- Heading: Plus Jakarta Sans 700, 22px: `The Fit Call`
- Body: DM Sans 400, 15px: An honest conversation to find out if there's a real problem and whether we're the right fit. No pitch. If there's something worth solving, we'll say so. If there isn't, we'll say that too.
- CTA: Ghost button `Book a Fit Call →`

Panel 2 — The Discovery Sprint:
- Icon: `MagnifyingGlass` (48px) — top of card
- Tag: `Fixed time · Fixed price`
- Heading: `The Discovery Sprint`
- Body: A structured working session requiring up to four hours of your time across five days. We map your most pressing processes, assess where automation can make the biggest difference and hand you a clear, plain-English report. Most clients find the clarity alone is worth the fee.
- CTA: Ghost button `Learn more →` (links to /how-we-work)

---

#### Section 5 — How We Build (secondary background)

**Background:** `--color-paper-secondary`  
**Vertical padding:** `--space-7`

```
[.section-label] How we build

[H2 — Plus Jakarta Sans 700, --text-h2, --color-ink, max-width 520px]
From targeted fixes to autonomous workflows.
```

Three panels in a row desktop, stacked mobile. Separated by 1px `--color-border` vertical dividers on desktop only.

| Label | Heading | Body |
|---|---|---|
| Tier 1 | Task & workflow automation | Targeted automation of specific manual tasks, handoffs and data flows. Fast to deliver, immediate in impact. |
| Tier 2 | Process & integrated automation | Connecting the dots across systems, teams and functions. Eliminates coordination overhead and gives management real visibility. |
| Tier 3 | Agentic automation | Goal-oriented AI that monitors, decides and acts across complex workflows — with human oversight built in. Not science fiction. We're building this now. |

Label: DM Sans 600, 11px, `--color-accent`, uppercase. Heading: Plus Jakarta Sans 600, 20px. Body: DM Sans 400, 14px.

---

#### Section 6 — The Growth Program (light)

**Background:** `--color-paper`  
**Vertical padding:** `--space-6` (64px — slightly tighter than standard, this is a short section)  
**Layout:** Two-column desktop (30% left label / 65% right content), single column mobile

**Left:**
```
[.section-label] Ongoing engagement
```

**Right:**
```
[H3 — Plus Jakarta Sans 600, --text-h3, --color-ink]
The Growth Program

[Body — DM Sans 400, 17px, --color-ink-secondary, margin-top 16px]
Once we've delivered something together and you know how we work, we can stay
engaged — continuously improving what's been built and finding the next
opportunity. This isn't something we lead with. It's something clients ask for.
```

---

#### Section 7 — Closing CTA (dark)

**Background:** `--color-paper-dark`  
**Vertical padding:** `--space-7`  
**Layout:** Centred, max-width 600px  
**Watermark:** Yes

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

**Watermark:** Yes

```
[.section-label] How we work

[H1 — Plus Jakarta Sans 700, --text-h1, #F5F3EE]
We start with your business.
Not the technology.

[Anchor lines — DM Sans 500, 15px, rgba(245,243,238,0.5), margin-top 20px, 8px apart]
Process first. Experience led. Real solutions.
Start small. Prove value. Scale smart.
```

---

#### Section 2 — We Work Backwards (light, with image)

**Background:** `--color-paper`  
**Vertical padding:** `--space-7`  
**Layout:** Two-column desktop — text left (50%), image right (45%, offset 5%). `align-items: flex-start`. Single column mobile (image below text).

**Left:**
```
[.section-label] Our approach

[H2 — Plus Jakarta Sans 700, --text-h2, --color-ink]
We work backwards
from the outcome.

[Body — DM Sans 400, 17px, --color-ink-secondary, margin-top 20px]
Every engagement starts with a clear picture of what better looks like for
your business — not a system requirement, not a features list. From there
we work back through your processes, people, systems and data to understand
what needs to change and what the right path forward looks like.

This keeps solutions grounded in how your business actually works from day one.
It also keeps scope honest — we're building toward a defined outcome,
not generating work.
```

**Three callout icons below body text — horizontal row, margin-top 32px:**

Each: icon (20px, `--color-accent`) + label (DM Sans 500, 13px, `--color-accent`).

- `Target` — Outcome-first
- `ArrowsClockwise` — Iterative
- `UsersThree` — Collaborative

**Right (image):**
- Asset: `Working_backwards.avif`
- Container: `background: --color-paper-secondary`, `border-radius: --radius-xl`, padding 32px
- `align-self: flex-start`
- Image: `max-width: 100%`, `height: auto`, `display: block`
- Alt text: `Diagram illustrating working backwards from a defined outcome`

---

#### Section 3 — Short Cycles (secondary background, with image)

**Background:** `--color-paper-secondary`  
**Vertical padding:** `--space-7`  
**Layout:** Two-column desktop — image left (45%), text right (50%, offset 5%). `align-items: flex-start`. Single column mobile.

**Left (image):**
- Asset: `Start-small-prove-value-scale-smart.avif`
- Same display treatment as above
- `align-self: flex-start`
- Alt text: `Diagram illustrating the agile approach: start small, prove value, scale smart`

**Right:**
```
[.section-label] Our method

[H2 — Plus Jakarta Sans 700, --text-h2, --color-ink]
We build in short cycles,
not long ones.

[Body — DM Sans 400, 17px, --color-ink-secondary, margin-top 20px]
We don't disappear for months and return with something finished. We build in
short cycles, put working solutions in your hands quickly and improve from
there. Every increment delivers something usable. Every milestone is a
decision point — you stay in control of pace and investment throughout.

It gets value into your hands fast. It surfaces the things that are hard to
specify on paper but obvious the moment you can see something real. And it
means everything we build can be extended and scaled without starting again.
```

---

#### Section 4 — Team Structure (light)

**Background:** `--color-paper`  
**Vertical padding:** `--space-7`  
**Layout:** Two-column desktop (40% / 55%), single column mobile

**Left:**
```
[.section-label] Our team

[H2 — Plus Jakarta Sans 700, --text-h2, --color-ink]
Senior people.
Competitive cost.
No handoffs.
```

**Right:**
```
[Body — DM Sans 400, 17px, --color-ink-secondary]
Our client-facing team is local and senior — experienced automation designers
and engineers who understand both the technology and the business context
behind it. They scope the work, lead the engagement and stay accountable for
the outcome. You deal with the same people throughout. No account managers.
No handoffs once the contract is signed.

[Icon callout — UserCircle 24px + DM Sans 400 14px, margin-top 20px]
The same people throughout. No account managers.

Behind them is an offshore delivery centre of 30-plus people, working under
direct supervision of our local engineers to the same standards. It's what lets
us deliver at a quality level that would otherwise cost significantly more.

[Icon callout — Buildings 24px + DM Sans 400 14px]
30+ person offshore delivery centre under direct local supervision.

[Pull quote — Plus Jakarta Sans 600, 18px, --color-ink, margin-top 32px]
The quality and accountability of a senior local firm, at a price point
that makes sense for a mid-sized business.
```

---

#### Section 5 — How We Build (secondary background)

**Background:** `--color-paper-secondary`  
**Vertical padding:** `--space-7`

```
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

Icon (28px, `--color-accent`) above heading. Heading: Plus Jakarta Sans 600, 18px. Body: DM Sans 400, 14px.

| Icon | Heading | Body |
|---|---|---|
| `Sliders` | We start with your process, not a template | Every solution is designed around how your business actually works — not a generic workflow or a platform's default settings. |
| `Puzzle` | We build in components, not monoliths | Solutions are assembled from small, connected parts. Easier to change, extend and integrate. What we build today doesn't become a ceiling on what you can do tomorrow. |
| `Wrench` | We pick the right tool for the job | We're not advocates for any single platform. We select what fits — weighing cost, performance, security and reliability. |
| `ShieldCheck` | We build AI responsibly | Data privacy, security and responsible AI practices are built in from the start. Your data stays yours. AI is introduced where it genuinely adds value. |

---

#### Section 6 — What Working With Us Looks Like (light)

**Background:** `--color-paper`  
**Vertical padding:** `--space-7`  
**Layout:** Centred, max-width 680px

```
[.section-label — centred] What to expect

[H2 — Plus Jakarta Sans 700, --text-h2, --color-ink, centred]
What working with us looks like.

[Body — DM Sans 400, 17px, --color-ink-secondary, centred, line-height 1.7, margin-top 24px]
We're a small, senior team — which means you get direct access to the people
doing the work, not a layer of management between you and the delivery.
We communicate plainly, flag problems early and don't generate unnecessary
complexity.

We're not here to make ourselves indispensable. We're here to build something
that works, prove it quickly and earn the right to do more.
```

---

#### Section 7 — CTA (dark)

**Background:** `--color-paper-dark`  
**Vertical padding:** `--space-7`  
**Layout:** Centred, max-width 600px  
**Watermark:** Yes

```
[H2 — Plus Jakarta Sans 700, --text-h2, #F5F3EE, centred]
Sound familiar?

[Primary CTA — centred, margin-top 32px]
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

Each card uses the Outcome card spec from Section 7.3. Icon (20px, `--color-accent`) sits beside the card title.

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

**Watermark:** Yes

```
[.section-label] About

[H1 — Plus Jakarta Sans 700, --text-h1, #F5F3EE, max-width 660px]
We've always built things.
The question was who for.
```

---

#### Section 2 — Story (light)

**Background:** `--color-paper`  
**Vertical padding:** `--space-7`  
**Layout:** Two-column desktop (30% left / 65% right), single column mobile

**Left:**
```
[.section-label] Our story
```

**Right:**
```
[Body — DM Sans 400, 18px, --color-ink-secondary, line-height 1.75]
Sixense started in 2012 working with large enterprises. We were capable —
but the fit was wrong. Those environments were slow, heavily process-driven
and far removed from the sharp end of the business. The people we worked
with were often too distant from the front line to make fast decisions or
feel the real cost of delay.

We moved towards mid-market businesses — where the operations manager lives
with the inefficiency every day, where the owner sees it on the P&L every
month, where decisions get made by people who feel the consequences.
That's where we do our best work — and where we've stayed.
```

---

#### Section 3 — How We're Built (secondary background)

**Background:** `--color-paper-secondary`  
**Vertical padding:** `--space-7`  
**Layout:** Two-column desktop (30% / 65%), single column mobile

**Left:**
```
[.section-label] Our structure
```

**Right:**
```
[H2 — Plus Jakarta Sans 700, --text-h2, --color-ink]
How we're built.

[Body — DM Sans 400, 17px, --color-ink-secondary, margin-top 20px]
Our Australian team is small and senior — automation designers and engineers,
all hands-on. The people you meet are the people who do the work.

Behind them is an offshore delivery centre of 30-plus people, working under
direct supervision of our local engineers to the same standards. It's what
lets us deliver at a quality level that would otherwise cost significantly more.
```

**Three-column stat row, margin-top 40px:**

Each: icon (24px, above number), number (Plus Jakarta Sans 700, 48px, `--color-accent`), label (DM Sans 400, 14px, `--color-ink-secondary`).

| Icon | Number | Label |
|---|---|---|
| `Users` | 30+ | Delivery team members |
| `Calendar` | 13+ | Years in Australian businesses |
| `Buildings` | 6 | Industries served |

---

#### Section 4 — What We Believe (light)

**Background:** `--color-paper`  
**Vertical padding:** `--space-7`  
**Layout:** Two-column desktop (30% / 65%), single column mobile

**Left:**
```
[.section-label] What we believe
```

**Right:**
```
[Body — DM Sans 400, 18px, --color-ink-secondary, line-height 1.75]
```

Three belief paragraphs, each with a small icon (24px, `--color-accent`) to the left of the opening line:

- `HandshakeSimple` — We work alongside our clients, not above them. We follow through on what we say. We understand that cost, time and disruption are real constraints and we design around them.
- `Rocket` — We over-index on execution over strategy. Working solutions in your hands beat elegant ones on a roadmap. We measure ourselves by what actually changes in your business — not what we delivered on paper.
- `CheckCircle` — The feedback we hear most: "bang for buck, we get more from you than anyone else" and "I didn't think that was possible in that timeframe." That makes us proud.

**Blockquote — below paragraphs, margin-top 32px:**
```css
border-left: 3px solid var(--color-accent);
padding-left: 24px;
border-radius: 0;
```
Text: Plus Jakarta Sans 600, 20px, `--color-ink`.

---

#### Section 5 — Why the Name (secondary background)

**Background:** `--color-paper-secondary`  
**Vertical padding:** `--space-7`  
**Layout:** Centred, max-width 640px

```
[.section-label — centred] Why the name

[H2 — Plus Jakarta Sans 700, --text-h2, --color-ink, centred]
A sixth sense for operational problems.

[Body — DM Sans 400, 17px, --color-ink-secondary, centred, line-height 1.7, margin-top 20px]
Sixense is a take on sixth sense — connected, intuitive thinking. Seeing the
shape of a problem before it's been fully described.

We think that's what good looks like. After all these years,
we'd like to think we've earned the name.
```

---

#### Section 6 — CTA (dark)

**Watermark:** Yes

```
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
- Logo: reversed variant (mark + wordmark, no tagline), 110px wide, mark in `#00C2FF`, cyan dot on "i" retained
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
| `Sixense-Transparent.avif` | Logo source reference | All pages | Rework per Section 3 |
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
- Stroke: `#00C2FF`
- Opacity: `0.07`
- Position: right side, partially off-screen, vertically centred

**Light section watermark** (`--color-paper`, `--color-paper-secondary`):
- Stroke: `#0099CC`
- Opacity: `0.04`
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
  color: #00C2FF;
}
.section-dark .watermark-mark {
  width: 100%;
  height: 100%;
  opacity: 0.07;
}

/* Light section variant */
.section-light .section-watermark {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 480px;
  height: 480px;
  pointer-events: none;
  z-index: 0;
  color: #0099CC;
}
.section-light .watermark-mark {
  width: 100%;
  height: 100%;
  opacity: 0.04;
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

- Nav links: colour → `--color-accent`, 200ms ease
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
- `#00C2FF` on `#1A1A18`: ~9.5:1 ✓. `#0099CC` on `#F5F3EE`: ~4.6:1 ✓
- Focus indicators visible on all interactive elements
- Form fields have associated `<label>` elements
- Screen reader landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>` with `aria-label`
- Skip-to-main-content link at top of page (visually hidden until focused)
- Watermark SVG has `aria-hidden="true"`

### Legal Pages

`/privacy` — Privacy Policy (client to supply content)  
`/terms` — Terms of Use (client to supply content)

Both use standard site template (nav + footer).

**Contact email on Privacy Policy and Terms of Use pages:** Any contact reference within the Privacy Policy or Terms of Use page content must use `admin@sixense.com.au` — not `automate@sixense.com.au` or any other address. This applies to any "contact us about this policy" or data request references within those pages.

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

*End of specification.*  
*Single source of truth — all previous versions superseded.*  
*Questions: automate@sixense.com.au*
