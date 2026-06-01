# Sixense Website — Full Design & Development Specification

**Version:** 1.0  
**Prepared for:** Developer / Agency handoff  
**Contact:** rodney.ellias@sixense.com.au  
**Date:** June 2026

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

---

## 2. Brand Identity

### Personality

**Sharp and confident.** Sixense speaks plainly, without hedging. No buzzword soup. No "we leverage synergies." Sentences are short and declarative.

**Premium but not corporate.** This is not a Big Four consulting firm. It is a small, senior, hands-on team. The brand should feel like a trusted expert, not an enterprise vendor.

**Operator-first.** The audience are people who live with operational problems daily. The tone is direct, peer-to-peer, not top-down.

### Brand Voice (for any developer-written UI copy)

- Use plain English. Prefer "fix" over "optimise", "build" over "implement".
- No bullet point lists of features or benefits in UI chrome.
- Australian English throughout (e.g. "colour", "licence", "organisation").
- Oxford comma is not used.

---

## 3. Logo Specification

### Concept

The Sixense logo uses a precision-geometry mark — three interlocking hexagonal frames arranged around a central hub, evoking interconnection, intelligence and structure. The wordmark sits to the right. The current logo (supplied as `Sixense-Transparent.avif`) uses this same conceptual language but should be reworked as follows.

### Mark Rework Instructions

The developer should engage a designer or use the following vector specification to redraw the mark from scratch (or refine the supplied asset):

**Geometry:**
- Three hexagons, each rotated 120° from one another, overlapping at a central point
- Hexagon stroke weight: 2px, no fill (outline only), with hard precision corners — no excessive rounding. Corner radius on hexagons: 2px maximum
- Central connection node: a small filled circle, 6px diameter, at the intersection of all three hexagons
- Three thin lines (1.5px) radiating from the centre node to each hexagon's inner vertex — forming a hub-and-spoke

**Colour:**
- The mark uses a single colour: `#C8A04A` (warm burnished gold — see colour palette) on a light background; white on a dark background
- The mark is never rendered in the primary dark (`#1A1A18`) as a fill — it is always the accent colour or white

**Wordmark:**
- Font: `Freight Display Pro`, weight Semibold (or substitute: `Playfair Display`, weight 600)
- Text: `sixense` — all lowercase
- Tracking (letter-spacing): 0.04em
- Colour: `#1A1A18` on light backgrounds; `#F5F3EE` on dark backgrounds
- Tagline: `connected thinking` — set in the body sans-serif (see Typography section), weight 400, 65% opacity, font-size approximately 38% of wordmark size

**Proportions:**
- Mark width : wordmark width ratio ≈ 1 : 2.2
- Mark and wordmark are vertically centred
- Clearspace: minimum padding equal to the height of the letter "s" in the wordmark on all sides

**Variants required:**
- Full horizontal lockup (mark + wordmark + tagline) — for header and general use
- Mark only — for favicon, app icon, small contexts
- Reversed (white mark + white wordmark) — for dark backgrounds
- Monochrome dark — single `#1A1A18` colour version

**Favicon:**
- 32×32px and 16×16px: mark only, rendered in `#C8A04A` on transparent background
- 180×180px Apple touch icon: mark centred on `#1A1A18` background with 20px padding

---

## 4. Typography

### Type Scale

| Role | Font | Weight | Size (desktop) | Size (mobile) | Line Height |
|---|---|---|---|---|---|
| Display / Hero | Freight Display Pro | 500 (Medium) | 56px | 36px | 1.1 |
| H1 | Freight Display Pro | 500 | 44px | 30px | 1.15 |
| H2 | Freight Display Pro | 500 | 32px | 24px | 1.2 |
| H3 | Freight Display Pro | 500 | 22px | 20px | 1.3 |
| Body Large | DM Sans | 400 | 18px | 16px | 1.7 |
| Body | DM Sans | 400 | 16px | 15px | 1.7 |
| Body Small / Caption | DM Sans | 400 | 13px | 13px | 1.6 |
| Label / Tag | DM Sans | 500 | 11px | 11px | 1.4 |
| Nav | DM Sans | 500 | 14px | 14px | 1 |
| CTA Button | DM Sans | 500 | 15px | 15px | 1 |

**Freight Display Pro** is the primary display face — editorial, precise, with a quiet authority. Load via Adobe Fonts or purchase a web licence. Fallback stack: `'Playfair Display', Georgia, serif`.

**DM Sans** is the body and UI face — geometric, legible, neutral without being bland. Load via Google Fonts (`https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&display=swap`). Fallback: `'Inter', system-ui, sans-serif`.

### Type Rules

- Headings: sentence case throughout. Never all-caps, never title case.
- Body text maximum line length: 68 characters (approximately 640px at 16px body). Use `max-width: 640px` on body copy containers within wide layouts.
- Paragraph spacing: 1em between paragraphs.
- No justified text. Left-aligned body. Centred only for short hero/section-heading contexts where explicitly noted.

---

## 5. Colour Palette

### Core Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-ink` | `#1A1A18` | Primary text, headings, dark backgrounds |
| `--color-ink-secondary` | `#4A4A46` | Secondary text, captions |
| `--color-ink-tertiary` | `#8A8A84` | Placeholders, fine print, metadata |
| `--color-paper` | `#F5F3EE` | Primary background — warm off-white |
| `--color-paper-secondary` | `#EDEAE3` | Subtle section backgrounds, card fills |
| `--color-paper-dark` | `#1A1A18` | Dark section backgrounds |
| `--color-gold` | `#C8A04A` | Accent — CTAs, highlights, logo mark, ruled lines |
| `--color-gold-hover` | `#B08838` | Hover state for gold elements |
| `--color-border` | `rgba(26,26,24,0.12)` | Default borders |
| `--color-border-strong` | `rgba(26,26,24,0.25)` | Stronger borders, dividers |

### Colour Application Rules

- Background: `--color-paper` by default across all pages. Alternating sections use `--color-paper-secondary`. Dark sections (e.g. hero, closing CTA blocks) use `--color-paper-dark` with text in `--color-paper`.
- Gold is used sparingly as an accent — never as a dominant background fill on large areas. Use for: CTA buttons, active states, horizontal rules/dividers, tag/label outlines, logo mark.
- No blue, green or red used decoratively. This palette is intentionally restrained.
- Text on `--color-paper-dark` (dark background): use `--color-paper` (`#F5F3EE`) for primary, `rgba(245,243,238,0.6)` for secondary.

### Dark / Light Section Pattern

The site alternates between light (`--color-paper`) and dark (`--color-paper-dark`) sections for visual rhythm. The hero is dark. The footer is dark. Sections in between alternate light / secondary-light. This creates contrast without requiring decorative imagery.

---

## 6. Spacing & Layout System

### Grid

- Desktop: 12-column grid, 1280px max content width, 24px gutters, 80px horizontal padding
- Tablet (768px–1279px): 8-column grid, 32px horizontal padding
- Mobile (< 768px): 4-column grid, 20px horizontal padding

### Spacing Scale (8px base)

| Token | Value | Usage |
|---|---|---|
| `--space-1` | 8px | Tight element gaps (icon + label) |
| `--space-2` | 16px | Component internal padding |
| `--space-3` | 24px | Between related elements |
| `--space-4` | 32px | Between components |
| `--space-5` | 48px | Section sub-divisions |
| `--space-6` | 64px | Narrow section vertical padding |
| `--space-7` | 96px | Standard section vertical padding |
| `--space-8` | 128px | Large section vertical padding |

### Border Radius

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | 4px | Tags, labels, small chips |
| `--radius-md` | 8px | Buttons, inputs, small cards |
| `--radius-lg` | 16px | Cards, panels |
| `--radius-xl` | 24px | Large feature cards |

---

## 7. Component Library

### 7.1 Buttons

**Primary CTA button:**
- Background: `--color-gold`
- Text: `--color-ink` (`#1A1A18`)
- Font: DM Sans 500, 15px
- Padding: 14px 28px
- Border radius: `--radius-md`
- Hover: background `--color-gold-hover`, transition 200ms ease
- No box shadow. No border.

**Secondary button (ghost):**
- Background: transparent
- Border: 1.5px solid `--color-ink`
- Text: `--color-ink`
- Hover: background `rgba(26,26,24,0.06)`

**Ghost on dark backgrounds:**
- Border: 1.5px solid `--color-paper`
- Text: `--color-paper`
- Hover: background `rgba(245,243,238,0.1)`

**Button states:** All buttons have `cursor: pointer`, `transition: all 200ms ease`, and `outline: 2px solid --color-gold` on focus (accessibility).

### 7.2 Navigation

**Desktop nav:**
- Fixed to top. Background: `--color-paper` at 96% opacity with `backdrop-filter: blur(12px)`.
- Height: 72px
- Left: Logo (full horizontal lockup)
- Right: Nav links — Home, What We Do, How We Work, Our Outcomes, About — followed by a Primary CTA button: "Book a Fit Call"
- Nav link style: DM Sans 500, 14px, `--color-ink`, no underline. Hover: `--color-gold`. Active page: `--color-gold`.
- Separator between links and button: a vertical line 1px `--color-border` with 8px vertical margin
- On scroll: add `box-shadow: 0 1px 0 var(--color-border)`. No background colour change.

**Mobile nav (< 768px):**
- Hamburger icon (3 horizontal lines, 20px, `--color-ink`) at right
- Tap to reveal full-screen overlay: background `--color-paper-dark`, nav links stacked vertically, 32px apart, in Freight Display Pro 500 28px, colour `--color-paper`
- Close icon (×) at same position as hamburger
- CTA button full-width at bottom of menu

### 7.3 Cards (Outcomes / Service)

**Outcome card:**
- Background: `--color-paper`
- Border: 1px solid `--color-border`
- Border radius: `--radius-xl`
- Padding: 32px
- Sector tag: DM Sans 500, 11px, `--color-ink-tertiary`, uppercase letter-spacing 0.08em, no background
- Heading (Challenge / Solution / Outcome): DM Sans 500, 11px, `--color-gold`, uppercase letter-spacing 0.08em — used as a label above each block
- Body text: DM Sans 400, 15px, `--color-ink-secondary`
- Tags (IoT · Real-time etc.): DM Sans 500, 11px, `--color-ink`, border 1px solid `--color-border`, radius `--radius-sm`, padding 4px 10px, displayed as inline chips at card bottom
- Hover: `border-color: var(--color-gold)`, transition 200ms

**Service area card (What We Do):**
- Background: `--color-paper-secondary`
- Border radius: `--radius-lg`
- Padding: 28px 24px
- Heading: Freight Display Pro 500, 18px, `--color-ink`
- Body: DM Sans 400, 14px, `--color-ink-secondary`, line-height 1.6

### 7.4 Section Divider / Rule

A 1px horizontal rule in `--color-gold` at 40% opacity (`rgba(200,160,74,0.4)`), used between major page sections. Width: 64px, left-aligned within content columns. Not full-width. This acts as a subtle punctuation mark, not a structural divider.

### 7.5 Anchor/Tag Labels

For section labels (e.g. "How we work", "Our outcomes") appearing above section headings:
- DM Sans 500, 11px
- Text: `--color-gold`
- Letter-spacing: 0.1em
- Uppercase
- No background, no border — plain text label, like a byline

### 7.6 Horizontal Rule Divider (between page sections)

A full-width 1px line in `--color-border` used between sections of the same background colour. Not used between light-to-dark transitions (those are implied by the background change).

### 7.7 Forms (Contact page)

See Section 9 for full form specification.

---

## 8. Page Specifications

---

### 8.1 Home Page (`/`)

#### Section 1 — Hero (dark)

**Background:** `--color-paper-dark` (`#1A1A18`)  
**Vertical padding:** 160px top, 120px bottom  
**Layout:** Single column, content centred horizontally, max-width 760px

**Content:**

```
[Section label — gold, uppercase, 11px, DM Sans 500]
Automation & AI for operators

[Headline — Freight Display Pro 500, 56px desktop / 36px mobile, --color-paper]
You know exactly which parts of your business are slower,
messier and more manual than they should be. So does your team.
The question is why it's still that way.

[Subheading — DM Sans 400, 20px, rgba(245,243,238,0.65), max-width 600px, margin-top 24px]
Most business leaders we talk to have been living with the same operational 
frustrations for years. They assumed fixing it would be too expensive, too 
disruptive or too complex to hand to someone technical enough to help. 
It's usually none of those things.

[CTA — Primary gold button, margin-top 40px]
Book a free Fit Call — no pitch, 30 minutes

[Sub-note below button — DM Sans 400, 13px, rgba(245,243,238,0.4), margin-top 12px]
Free 30-minute conversation. No pitch.
```

**Decorative detail:** A single thin horizontal line in `--color-gold` (40% opacity, 64px wide) sits above the section label, left-aligned within the content block. This is the only decorative element in the hero.

---

#### Section 2 — The Problem (light)

**Background:** `--color-paper`  
**Vertical padding:** `--space-7` (96px)  
**Layout:** Two-column on desktop (heading left, body right), single column mobile

**Left column (40% width):**
```
[Section label — gold, uppercase, 11px]
The problem

[H2 — Freight Display Pro 500, 32px, --color-ink]
Growth adds people.
It doesn't have to.
```

**Right column (55% width, offset 5%):**
```
[Body — DM Sans 400, 18px, --color-ink-secondary, line-height 1.7]
Many businesses scale by adding headcount to absorb the workload — 
more staff handling more volume, doing things the way they've always 
been done. It works, until it doesn't. The cracks show up as errors, 
delays, key person dependencies and a growing sense that the business 
is harder to run than it should be.

[Paragraph break]

Automation and AI don't replace your people. They free them up to do 
the work that actually needs them.
```

---

#### Section 3 — Who We Work With (secondary background)

**Background:** `--color-paper-secondary`  
**Vertical padding:** `--space-7`  
**Layout:** Single column, centred, max-width 700px

```
[Section label — gold, uppercase, 11px, centred]
Who we work with

[H2 — Freight Display Pro 500, 32px, --color-ink, centred]
We work with operators, not IT departments.

[Body — DM Sans 400, 18px, --color-ink-secondary, centred, line-height 1.7, margin-top 24px]
Our clients are GMs, COOs, operations managers and business owners 
in asset-heavy, service-intensive and operationally complex businesses. 
They know their industry deeply. They don't need to know anything about 
technology — that's our job.
```

**Below the text — a three-column icon row:**

Three items displayed horizontally (stack vertically on mobile). Each item:
- Icon: a simple outlined SVG icon (see notes below), 32px, `--color-gold`
- Label: DM Sans 500, 14px, `--color-ink`
- Description: DM Sans 400, 13px, `--color-ink-secondary`

Items:
1. Icon: factory/industrial building outline | Label: Asset-heavy businesses | Description: Transport, utilities, logistics, infrastructure
2. Icon: gear/settings outline | Label: Service-intensive operations | Description: Healthcare, field service, maintenance
3. Icon: org-chart/hierarchy outline | Label: Operationally complex | Description: Multi-site, multi-system, high-volume

Use standard SVG outline icons (Heroicons or Phosphor outline set — developer to select from open-source library).

---

#### Section 4 — Proof Signal (light)

**Background:** `--color-paper`  
**Vertical padding:** `--space-7`  
**Layout:** Two-column on desktop, single column mobile

**Left column (40%):**
```
[Section label — gold, uppercase, 11px]
Proven outcomes

[H2 — Freight Display Pro 500, 32px, --color-ink]
We've done
this before.

[Body — DM Sans 400, 16px, --color-ink-secondary, margin-top 16px]
From a national transport operator with no live fleet visibility, to a 
utility managing thousands of contractors on high-voltage assets, to a 
logistics business drowning in manual invoicing — we've built working 
solutions across some of Australia's most operationally demanding businesses.

[Link — DM Sans 500, 15px, --color-gold, margin-top 24px, with right arrow →]
See our outcomes →
```

**Right column (55%, offset 5%):**

Three stat/proof blocks stacked vertically, separated by `--color-border` lines:

Block 1:
- Headline: `Industry award winner` — Freight Display Pro 500, 22px, `--color-ink`
- Detail: `Contractor authorisations platform — major Australian utility` — DM Sans 400, 14px, `--color-ink-tertiary`

Block 2:
- Headline: `Working prototype in 3 months` — Freight Display Pro 500, 22px
- Detail: `Energy dispatch optimisation — after 3 years of stalled attempts` — DM Sans 400, 14px, `--color-ink-tertiary`

Block 3:
- Headline: `Live fleet visibility in under 30 days` — Freight Display Pro 500, 22px
- Detail: `National passenger transport operator, 500+ vehicles` — DM Sans 400, 14px, `--color-ink-tertiary`

---

#### Section 5 — Closing CTA (dark)

**Background:** `--color-paper-dark`  
**Vertical padding:** `--space-7`  
**Layout:** Centred, max-width 600px

```
[H2 — Freight Display Pro 500, 36px, --color-paper, centred]
Not sure if this applies to you?

[Body — DM Sans 400, 18px, rgba(245,243,238,0.65), centred, margin-top 16px]
That's exactly what the Fit Call is for. Thirty minutes. No pitch. 
Just an honest conversation about whether there's something worth solving.

[CTA — Primary gold button, centred, margin-top 40px]
Book a free Fit Call

[Secondary link — DM Sans 500, 14px, rgba(245,243,238,0.5), centred, margin-top 16px]
Or contact us →  (links to /contact)
```

---

### 8.2 What We Do Page (`/what-we-do`)

#### Section 1 — Hero (dark)

**Background:** `--color-paper-dark`  
**Vertical padding:** 120px top, 80px bottom

```
[Section label — gold, uppercase, 11px]
What we do

[H1 — Freight Display Pro 500, 44px, --color-paper, max-width 720px]
We fix the operational problems that have been on your list too long. 
And we build the capabilities you haven't been able to reach.

[Body — DM Sans 400, 18px, rgba(245,243,238,0.65), max-width 620px, margin-top 24px]
Some of the businesses we work with have a specific problem they need fixed. 
Others can see an opportunity — a new capability, a better way of operating, 
something a competitor is doing that they can't yet — but have no way to build 
toward it. We do both.
```

---

#### Section 2 — Where We Work (light)

**Background:** `--color-paper`  
**Vertical padding:** `--space-7`

```
[Section label — gold, uppercase, 11px]
Where we work

[H2 — Freight Display Pro 500, 32px, --color-ink]
If your team is doing any of the following manually,
there's likely a better way.
```

**Below:** A grid of service area cards. Desktop: 3 columns. Tablet: 2 columns. Mobile: 1 column.

8 cards total (see Component 7.3 for card spec):

1. **Finance & accounts** — Invoice matching and approval workflows. Automated reconciliation. Payment follow-up and dunning. Month-end reporting without the scramble.
2. **Procurement & supplier management** — Purchase order automation. Supplier onboarding and credential tracking. Contract expiry alerts. Spend visibility across fragmented systems.
3. **Field service & scheduling** — Live job visibility and dispatch optimisation. Automated scheduling based on location, skills and availability. Real-time status updates without the phone calls.
4. **Document processing** — Automated document classification and data extraction. Contract review and flagging. Forms processing without manual rekeying.
5. **Warehouse & inventory** — Live inventory visibility across locations. Automated reorder triggers. Inbound and outbound reconciliation. Order status without chasing the warehouse.
6. **Sales operations** — Live product, pricing and inventory access for field reps. Order submission without back-office delays. Pipeline reporting that doesn't require a spreadsheet.
7. **Contact centre & service desk** — Intelligent triage and routing. Automated responses to common requests. Knowledge assistants that give agents the right answer faster.
8. **Reporting & business intelligence** — Automated data pipelines from fragmented sources. Dashboards that update without someone building them each week. Alerts when something needs attention.

---

#### Section 3 — Not All Automation is the Same (secondary background)

**Background:** `--color-paper-secondary`  
**Vertical padding:** `--space-7`  
**Layout:** Two-column desktop (label left, content right), single column mobile

**Left (30%):**
```
[Section label — gold, uppercase, 11px]
The approach

[H2 — Freight Display Pro 500, 28px, --color-ink]
Not all automation
is the same.
```

**Right (65%, offset 5%):**

Four approach blocks stacked, each separated by a thin border:

Each block format:
- Label: DM Sans 500, 11px, `--color-gold`, uppercase, letter-spacing 0.1em
- Heading: Freight Display Pro 500, 20px, `--color-ink`
- Body: DM Sans 400, 15px, `--color-ink-secondary`

Blocks:
1. Label: `Rule-based` | Heading: Task & rule automation | Body: Handles repeatable logic — consistent, fast, predictable.
2. Label: `Decision support` | Heading: Data analysis & recommendations | Body: Analyses data and surfaces recommendations for your team to act on.
3. Label: `Language & context` | Heading: GenAI applications | Body: Understands language, documents and unstructured data.
4. Label: `Autonomous` | Heading: Agentic systems | Body: Acts independently within defined boundaries — with human oversight built in.

Below blocks:
```
[DM Sans 400, 16px, --color-ink-secondary]
We match the right approach to the right problem. 
Often a single solution draws on more than one.
```

---

#### Section 4 — How We Engage (light)

**Background:** `--color-paper`  
**Vertical padding:** `--space-7`

```
[Section label — gold, uppercase, 11px]
How we engage

[H2 — Freight Display Pro 500, 32px, --color-ink]
Every engagement starts small and builds with purpose.
Nothing is open-ended.
```

**Two engagement option panels** — displayed side by side on desktop, stacked on mobile. Each panel is a card (border, `--radius-xl`, 32px padding):

Panel 1 — The Fit Call:
- Tag: `Free · 30 minutes` — DM Sans 500, 11px, `--color-gold`, border 1px solid `--color-gold`, radius `--radius-sm`, padding 4px 10px
- Heading: Freight Display Pro 500, 22px: `The Fit Call`
- Body: DM Sans 400, 15px: An honest conversation to find out if there's a real problem and whether we're the right fit. No pitch. If there's something worth solving, we'll say so. If there isn't, we'll say that too.
- CTA: Ghost button `Book a Fit Call →`

Panel 2 — The Discovery Sprint:
- Tag: `Fixed time · Fixed price` — same style as above
- Heading: Freight Display Pro 500, 22px: `The Discovery Sprint`
- Body: DM Sans 400, 15px: A structured working session requiring up to four hours of your time across five days. We map your most pressing processes, assess where automation can make the biggest difference and hand you a clear, plain-English report. Most clients find the clarity alone is worth the fee.
- CTA: Ghost button `Learn more →` (links to /how-we-work)

---

#### Section 5 — How We Build (secondary background)

**Background:** `--color-paper-secondary`  
**Vertical padding:** `--space-7`

```
[Section label — gold, uppercase, 11px]
How we build

[H2 — Freight Display Pro 500, 32px, --color-ink, max-width 520px]
From targeted fixes to autonomous workflows.
```

Three build-tier panels in a row on desktop, stacked on mobile. Each panel: no border, separated by subtle vertical dividers (1px `--color-border`) on desktop only.

Panel 1:
- Label: DM Sans 500, 11px, `--color-gold`, uppercase: `Tier 1`
- Heading: Freight Display Pro 500, 20px: `Task & workflow automation`
- Body: DM Sans 400, 14px, `--color-ink-secondary`: Targeted automation of specific manual tasks, handoffs and data flows. Fast to deliver, immediate in impact.

Panel 2:
- Label: `Tier 2`
- Heading: `Process & integrated automation`
- Body: Connecting the dots across systems, teams and functions. Eliminates coordination overhead and gives management real visibility.

Panel 3:
- Label: `Tier 3`
- Heading: `Agentic automation`
- Body: Goal-oriented AI that monitors, decides and acts across complex workflows — with human oversight built in. Not science fiction. We're building this now.

---

#### Section 6 — Closing CTA (dark)

Same structure as Home page closing CTA, same content.

---

### 8.3 How We Work Page (`/how-we-work`)

#### Section 1 — Hero (dark)

```
[Section label — gold, uppercase, 11px]
How we work

[H1 — Freight Display Pro 500, 44px, --color-paper]
We start with your business.
Not the technology.

[Three anchor lines — DM Sans 500, 14px, rgba(245,243,238,0.5), margin-top 24px, spaced 8px apart]
Process first. Experience led. Real solutions.
Start small. Prove value. Scale smart.
```

---

#### Section 2 — We Work Backwards (light, with image)

**Background:** `--color-paper`  
**Vertical padding:** `--space-7`  
**Layout:** Two-column desktop. Left: text. Right: image. Stack on mobile (image below text).

**Left (50%):**
```
[Section label — gold, uppercase, 11px]
Our approach

[H2 — Freight Display Pro 500, 32px, --color-ink]
We work backwards
from the outcome.

[Body — DM Sans 400, 17px, --color-ink-secondary, margin-top 20px]
Every engagement starts with a clear picture of what better looks like 
for your business — not a system requirement, not a features list. 
From there we work back through your processes, people, systems and 
data to understand what needs to change and what the right path forward 
looks like.

[Second paragraph]
This keeps solutions grounded in how your business actually works from 
day one. It also keeps scope honest — we're building toward a defined 
outcome, not generating work.
```

**Right (45%, offset 5%):**

Display the supplied image: `Working_backwards.avif`

- Display as-is, no filters or overlays
- Contained within a rounded container: `--radius-xl`, `overflow: hidden`
- Background of container: `--color-paper-secondary`
- Padding around image within container: 32px
- Image max-width: 100% of container
- Alt text: `Diagram illustrating working backwards from a defined outcome`

---

#### Section 3 — Short Cycles (secondary background, with image)

**Background:** `--color-paper-secondary`  
**Vertical padding:** `--space-7`  
**Layout:** Two-column desktop. Left: image. Right: text. Stack on mobile (image below text).

**Left (45%):**

Display the supplied image: `Start-small-prove-value-scale-smart.avif`

- Same display treatment as above image
- Alt text: `Diagram illustrating the agile approach: start small, prove value, scale smart`

**Right (50%, offset 5%):**
```
[Section label — gold, uppercase, 11px]
Our method

[H2 — Freight Display Pro 500, 32px, --color-ink]
We build in short cycles,
not long ones.

[Body — DM Sans 400, 17px, --color-ink-secondary, margin-top 20px]
We don't disappear for months and return with something finished. 
We build in short cycles, put working solutions in your hands quickly 
and improve from there. Every increment delivers something usable. 
Every milestone is a decision point — you stay in control of pace 
and investment throughout.

[Second paragraph]
It gets value into your hands fast. It surfaces the things that are 
hard to specify on paper but obvious the moment you can see something 
real. And it means everything we build can be extended and scaled 
without starting again.
```

---

#### Section 4 — Team Structure (light)

**Background:** `--color-paper`  
**Vertical padding:** `--space-7`  
**Layout:** Two-column desktop, single column mobile

**Left (40%):**
```
[Section label — gold, uppercase, 11px]
Our team

[H2 — Freight Display Pro 500, 32px, --color-ink]
Senior people.
Competitive cost.
No handoffs.
```

**Right (55%, offset 5%):**
```
[Body — DM Sans 400, 17px, --color-ink-secondary]
Our client-facing team is local and senior — experienced automation 
designers and engineers who understand both the technology and the 
business context behind it. They scope the work, lead the engagement 
and stay accountable for the outcome. You deal with the same people 
throughout. No account managers. No handoffs once the contract is signed.

[Second paragraph]
Behind them is an offshore delivery centre of 30-plus people, working 
under direct supervision of our local engineers to the same standards. 
It's what lets us deliver at a quality level that would otherwise cost 
significantly more.

[Third paragraph — Freight Display Pro 500, 18px, --color-ink, margin-top 32px]
The quality and accountability of a senior local firm, at a price point 
that makes sense for a mid-sized business.
```

---

#### Section 5 — How We Build (secondary background)

**Background:** `--color-paper-secondary`  
**Vertical padding:** `--space-7`

```
[H2 — Freight Display Pro 500, 32px, --color-ink, centred, margin-bottom 48px]
How we build
```

Four principle blocks in a 2×2 grid (desktop), stacked (mobile):

Each block: no card border, just padding and a left border accent (3px solid `--color-gold`) on a light container (`--color-paper`, `--radius-md`, 24px padding):

1. **Heading:** We start with your process, not a template — **Body:** Every solution is designed around how your business actually works — not a generic workflow from another industry or a platform's default settings.
2. **Heading:** We build in components, not monoliths — **Body:** Solutions are assembled from small, connected parts. Easier to change, extend and integrate. What we build today doesn't become a ceiling on what you can do tomorrow.
3. **Heading:** We pick the right tool for the job — **Body:** We're not advocates for any single platform. We select what fits your specific situation — weighing cost, performance, security and reliability.
4. **Heading:** We build AI responsibly — **Body:** Data privacy, security and responsible AI practices are built in from the start. Your data stays yours. AI is introduced where it genuinely adds value.

Heading style: Freight Display Pro 500, 18px, `--color-ink`  
Body style: DM Sans 400, 14px, `--color-ink-secondary`

---

#### Section 6 — What Working With Us Looks Like (light)

**Background:** `--color-paper`  
**Vertical padding:** `--space-7`  
**Layout:** Centred, max-width 680px

```
[Section label — gold, uppercase, 11px, centred]
What to expect

[H2 — Freight Display Pro 500, 32px, --color-ink, centred]
What working with us looks like.

[Body — DM Sans 400, 17px, --color-ink-secondary, centred, line-height 1.7, margin-top 24px]
We're a small, senior team — which means you get direct access to the 
people doing the work, not a layer of management between you and the delivery. 
We communicate plainly, flag problems early and don't generate unnecessary complexity.

[Second paragraph]
We're not here to make ourselves indispensable. We're here to build 
something that works, prove it quickly and earn the right to do more.
```

---

#### Section 7 — CTA (dark)

Same closing CTA structure as Home.

---

### 8.4 Our Outcomes Page (`/our-outcomes`)

#### Section 1 — Hero (dark)

```
[Section label — gold, uppercase, 11px]
Our outcomes

[H1 — Freight Display Pro 500, 44px, --color-paper]
Work we're proud of.

[Body — DM Sans 400, 18px, rgba(245,243,238,0.65), max-width 580px, margin-top 20px]
Every engagement here started with a business leader who could see a 
problem or an opportunity — and needed a team to build toward it. 
These are some of the solutions we've delivered.
```

---

#### Section 2 — Outcome Cards (light)

**Background:** `--color-paper`  
**Vertical padding:** `--space-7`

**Card layout:** 2-column grid on desktop (cards span equal width), single column on tablet/mobile. Gap: 24px.

**6 outcome cards** (see Component 7.3 for card spec). Each card contains:

- **Sector** (top of card, `--color-ink-tertiary`, DM Sans 400, 13px)
- **Challenge** label + body
- **Solution** label + body
- **Outcome** label + body
- **Tags** (chips at bottom)

Card content:

**Card 1 — Fleet visibility & dispatch intelligence**
- Sector: National passenger transport operator — ~1,000 staff, 500+ vehicles
- Challenge: No live visibility of fleet position, driver status or fare availability. Dispatch operated blind.
- Solution: Built a real-time IoT telemetry platform ingesting live vehicle data, processed through an event-driven pipeline and surfaced via an interactive web portal. Designed as a composable data layer for future AI capabilities.
- Outcome: Live fleet awareness delivered in under 30 days. Became the operational foundation for dispatch optimisation and mobile app bookings.
- Tags: IoT · Real-time data pipeline · Web platform · AI-ready foundation

**Card 2 — Integrated billing operations**
- Sector: National private healthcare operator
- Challenge: Two billing systems with no integration. Staff manually bridging the gap — rekeying, reconciling and chasing errors.
- Solution: Automated data integration pipeline connecting both systems. AI document understanding extracts billing data from unstructured sources, feeding intelligent reconciliation that matches and routes records without manual handling.
- Outcome: Billing workflow runs end-to-end with minimal human intervention. Fewer errors, faster time-to-invoice and the cashflow benefits that follow.
- Tags: System integration · Data pipeline · AI document understanding

**Card 3 — Energy dispatch optimisation platform**
- Sector: Major Australian utility — national grid operations
- Challenge: Three years of planning with no working solution. Dispatch decisions made without real-time inputs. Stakeholders losing confidence.
- Solution: High-frequency data ingestion platform pulling live forecasts, grid state and outage data, feeding an optimisation engine that models dispatch scenarios and surfaces least-cost recommendations automatically.
- Outcome: Working prototype delivered in three months. Program renewed with full stakeholder confidence.
- Tags: Real-time data ingestion · Optimisation engine · Decision support

**Card 4 — Contractor authorisations platform**
- Sector: Major Australian utility — thousands of contractors on high-voltage assets
- Challenge: Paper-based credential management across thousands of contractors. Expired licences and lapsed insurances creating serious safety, legal and compliance exposure.
- Solution: Self-service portal for contractor credential submission. AI-assisted document verification validates licences and insurance documents. Agentic expiry management monitors continuously and triggers automated renewal workflows.
- Outcome: Compliance staff shifted from chasing paperwork to managing exceptions. Real-time credential visibility. Industry award winner — now critical operational infrastructure.
- Tags: Workflow automation · Self-service portal · AI document verification · Agentic expiry management

**Card 5 — Digital field sales platform**
- Sector: National beverage & distribution company — 100+ mobile sales reps
- Challenge: Over 100 field reps operating from printed order books and static inventory lists — outdated before they arrived on site.
- Solution: Mobile-first platform with live integration to inventory and pricing systems. Order submission triggers automated back-office workflows end to end.
- Outcome: Field sales became dynamic, professional and data-driven. Back-office processing largely eliminated. Management gained real-time field visibility for the first time.
- Tags: Mobile platform · Live system integration · Workflow automation

**Card 6 — Invoicing & reconciliation automation**
- Sector: National logistics provider
- Challenge: Entire invoicing cycle managed through manual email exchanges. Order matching, invoice distribution and reconciliation all dependent on people — slow, error-prone and unscalable.
- Solution: Agentic automation workflow handling order scanning and matching, invoice generation, dunning sequences and payment reconciliation autonomously. AI interprets documents and orchestrates actions across systems.
- Outcome: End-to-end finance operations with minimal human intervention. Faster invoicing, fewer errors, better cashflow visibility.
- Tags: Finance workflow automation · Agentic AI · Document intelligence

---

#### Section 3 — Closing CTA (dark)

```
[H2 — Freight Display Pro 500, 36px, --color-paper, centred]
See something that looks familiar?

[Body — DM Sans 400, 18px, rgba(245,243,238,0.65), centred, margin-top 16px]
Most of our clients came to us with a problem they'd been living with 
for a long time. The Fit Call is the fastest way to find out 
if we can help.

[CTA — gold button, centred, margin-top 40px]
Book a free Fit Call →
```

---

### 8.5 About Page (`/about`)

#### Section 1 — Hero (dark)

```
[Section label — gold, uppercase, 11px]
About

[H1 — Freight Display Pro 500, 44px, --color-paper, max-width 660px]
We've always built things.
The question was who for.
```

---

#### Section 2 — Story (light)

**Background:** `--color-paper`  
**Vertical padding:** `--space-7`  
**Layout:** Two-column desktop (left narrower), single column mobile

**Left (30%):**
```
[Section label — gold, uppercase, 11px]
Our story
```

**Right (65%, offset 5%):**
```
[Body — DM Sans 400, 18px, --color-ink-secondary, line-height 1.75]
Sixense started in 2012 working with large enterprises. We were capable — 
but the fit was wrong. Those environments were slow, heavily process-driven 
and far removed from the sharp end of the business. The people we worked 
with were often too distant from the front line to make fast decisions or 
feel the real cost of delay.

[Second paragraph]
We moved towards mid-market businesses — where the operations manager lives 
with the inefficiency every day, where the owner sees it on the P&L every 
month, where decisions get made by people who feel the consequences. 
That's where we do our best work — and where we've stayed.
```

---

#### Section 3 — How We're Built (secondary background)

**Background:** `--color-paper-secondary`  
**Vertical padding:** `--space-7`  
**Layout:** Two-column desktop, single column mobile

**Left (30%):**
```
[Section label — gold, uppercase, 11px]
Our structure
```

**Right (65%, offset 5%):**
```
[H2 — Freight Display Pro 500, 28px, --color-ink]
How we're built.

[Body — DM Sans 400, 17px, --color-ink-secondary, margin-top 20px]
Our Australian team is small and senior — automation designers and 
engineers, all hands-on. The people you meet are the people who do the work.

[Second paragraph]
Behind them is an offshore delivery centre of 30-plus people, working 
under direct supervision of our local engineers to the same standards. 
It's what lets us deliver at a quality level that would otherwise cost 
significantly more.
```

**Below text — a two-column stat block:**

Left stat:
- Number: `30+` — Freight Display Pro 500, 48px, `--color-gold`
- Label: `Delivery team members` — DM Sans 400, 14px, `--color-ink-secondary`

Right stat:
- Number: `13+` — same style
- Label: `Years delivering for Australian businesses` — DM Sans 400, 14px

---

#### Section 4 — What We Believe (light)

**Background:** `--color-paper`  
**Vertical padding:** `--space-7`  
**Layout:** Two-column desktop, single column mobile

**Left (30%):**
```
[Section label — gold, uppercase, 11px]
What we believe
```

**Right (65%, offset 5%):**
```
[Body — DM Sans 400, 18px, --color-ink-secondary, line-height 1.75]
We work alongside our clients, not above them. We follow through on 
what we say. We understand that cost, time and disruption are real 
constraints and we design around them.

[Second paragraph]
We over-index on execution over strategy. Working solutions in your 
hands beat elegant ones on a roadmap. We measure ourselves by what 
actually changes in your business — not what we delivered on paper.

[Pull quote — Freight Display Pro 500, 22px, --color-ink, border-left 3px solid --color-gold, padding-left 24px, margin-top 32px]
"Bang for buck, we get more from you than anyone else" and "I didn't 
think that was possible in that timeframe." That makes us proud.
```

---

#### Section 5 — Why the Name (secondary background)

**Background:** `--color-paper-secondary`  
**Vertical padding:** `--space-7`  
**Layout:** Centred, max-width 640px

```
[Section label — gold, uppercase, 11px, centred]
Why the name

[H2 — Freight Display Pro 500, 32px, --color-ink, centred]
A sixth sense for operational problems.

[Body — DM Sans 400, 17px, --color-ink-secondary, centred, line-height 1.7, margin-top 20px]
Sixense is a take on sixth sense — connected, intuitive thinking. 
Seeing the shape of a problem before it's been fully described.

[Second paragraph]
We think that's what good looks like. After all these years, 
we'd like to think we've earned the name.
```

---

#### Section 6 — CTA (dark)

```
[H2 — Freight Display Pro 500, 36px, --color-paper, centred]
If this sounds like what you've been looking for, let's talk.

[CTA — gold button, centred, margin-top 40px]
Book a free Fit Call →
```

---

### 8.6 Contact Page (`/contact`)

#### Section 1 — Hero (dark)

```
[Section label — gold, uppercase, 11px]
Contact

[H1 — Freight Display Pro 500, 44px, --color-paper]
Let's have an honest conversation.

[Body — DM Sans 400, 18px, rgba(245,243,238,0.65), max-width 540px, margin-top 16px]
Whether you have a specific problem or you're not sure where to start — 
the Fit Call is free, 30 minutes and completely obligation-free.
```

---

#### Section 2 — Contact Form (light)

**Background:** `--color-paper`  
**Vertical padding:** `--space-7`  
**Layout:** Two-column desktop. Left: form. Right: additional contact info. Single column mobile (form first).

**Left — Form (55% width):**

See Section 9 for full form specification. Summary:
- Fields: First name, Last name, Company, Role, Email, Phone (optional), Inquiry details (textarea), How did you hear about us (optional select)
- Submit button: Primary gold CTA
- Success state: inline confirmation message (no page reload)

**Right — Contact details (40%, offset 5%):**

```
[H3 — Freight Display Pro 500, 22px, --color-ink]
Other ways to get in touch.

[Body — DM Sans 400, 16px, --color-ink-secondary, margin-top 16px]
Prefer email? Reach us directly at:

[Email link — DM Sans 500, 16px, --color-gold]
rodney.ellias@sixense.com.au

[Body — DM Sans 400, 16px, --color-ink-secondary, margin-top 24px]
Based in Australia. Working across the country.
```

Below:
```
[Section — margin-top 40px]
[Label — DM Sans 500, 11px, --color-ink-tertiary, uppercase, letter-spacing 0.1em]
Response time

[Body — DM Sans 400, 15px, --color-ink-secondary]
We respond to all enquiries within one business day.
```

---

## 9. Contact Form & Email Integration

### Form Fields

| Field | Type | Required | Placeholder |
|---|---|---|---|
| First name | Text input | Yes | First name |
| Last name | Text input | Yes | Last name |
| Company | Text input | Yes | Company name |
| Role / Title | Text input | No | Your role (optional) |
| Email address | Email input | Yes | your@email.com |
| Phone number | Tel input | No | Phone (optional) |
| Tell us about your situation | Textarea | Yes | Describe the problem or opportunity you're working with... |
| How did you hear about us | Select | No | Options: Google search, Referral, LinkedIn, Word of mouth, Other |

### Form Styling

- Label: DM Sans 500, 13px, `--color-ink`, displayed above each input
- Input/Textarea: 
  - Background: `--color-paper`
  - Border: 1px solid `--color-border-strong`
  - Border radius: `--radius-md`
  - Padding: 12px 16px
  - Font: DM Sans 400, 15px, `--color-ink`
  - Placeholder: `--color-ink-tertiary`
  - Focus state: border-color `--color-gold`, outline none, box-shadow `0 0 0 3px rgba(200,160,74,0.15)`
- Textarea height: 140px minimum, user-resizable vertically
- Error state: border-color `#C0392B`, error message below field in DM Sans 400, 13px, `#C0392B`
- Field spacing: 20px between fields
- First and Last name displayed side-by-side on desktop (50%/50%, 16px gap), stacked on mobile

### Submit Button

- Full-width on mobile, left-aligned on desktop
- Label: `Send enquiry`
- Loading state: replace label with a spinner and `Sending...`
- Disabled state during submission

### Email Delivery

**Method:** Use a server-side form handler or a transactional email service (e.g. EmailJS, Formspree, Resend, or a lightweight backend endpoint). Developer to confirm implementation approach.

**Recipient:** `rodney.ellias@sixense.com.au`  
**Reply-to:** Set to the submitter's email address so replies go directly to them.

**Email subject line:**
```
New enquiry from [First Name] [Last Name] — [Company]
```

**Email body (plain text format):**
```
New enquiry received via sixense.com.au

Name: [First Name] [Last Name]
Company: [Company]
Role: [Role]
Email: [Email]
Phone: [Phone]
How they heard about us: [Source]

Their message:
---
[Inquiry Details]
---

Reply directly to this email to respond.
```

### Success State

After successful submission (no page reload):
- Replace the form with:

```
[Gold checkmark icon — 32px]
[H3 — Freight Display Pro 500, 22px, --color-ink, margin-top 16px]
Thanks, [First Name]. We'll be in touch.
[Body — DM Sans 400, 16px, --color-ink-secondary, margin-top 8px]
Expect to hear from us within one business day.
```

### Validation

- Client-side validation before submission
- Required fields show error on blur if empty
- Email field validates format
- No submission until all required fields are valid
- Honeypot field included for basic spam protection (hidden input, auto-rejected if populated)

---

## 10. Navigation & Footer

### Global Navigation

See Component 7.2 for full navigation specification.

**Navigation links and destinations:**

| Label | Path |
|---|---|
| Home | `/` |
| What We Do | `/what-we-do` |
| How We Work | `/how-we-work` |
| Our Outcomes | `/our-outcomes` |
| About | `/about` |
| Book a Fit Call (button) | `/contact` |

**Active state:** Current page link uses `--color-gold` text.

### Footer

**Background:** `--color-paper-dark`  
**Vertical padding:** 64px top, 40px bottom

**Layout (desktop):** Three columns

**Column 1 — Brand:**
- Logo: reversed variant (white mark, white wordmark)
- Tagline below logo: `connected thinking` — DM Sans 400, 13px, `rgba(245,243,238,0.45)`
- Below tagline (margin-top 24px): DM Sans 400, 13px, `rgba(245,243,238,0.4)`:
  `© 2026 Sixense Pty Ltd. All rights reserved.`  
  `ABN: [TO BE SUPPLIED BY CLIENT]`

**Column 2 — Navigation:**
- Heading: `Site` — DM Sans 500, 11px, `rgba(245,243,238,0.4)`, uppercase, letter-spacing 0.1em
- Links stacked, DM Sans 400, 14px, `rgba(245,243,238,0.65)`, hover `--color-paper`:
  - Home
  - What We Do
  - How We Work
  - Our Outcomes
  - About
  - Contact

**Column 3 — Contact:**
- Heading: `Get in touch` — same style as Column 2 heading
- Email: `rodney.ellias@sixense.com.au` — DM Sans 400, 14px, `--color-gold`
- Below (margin-top 16px): `Book a free Fit Call →` — ghost-on-dark button

**Bottom bar (below a 1px `rgba(245,243,238,0.1)` divider, margin-top 40px):**

Fine print — DM Sans 400, 12px, `rgba(245,243,238,0.3)`, displayed as a single row on desktop, wrapped on mobile:

```
Privacy Policy  ·  Terms of Use  ·  This site does not use cookies for tracking.  
Sixense is committed to the responsible and ethical use of AI.
```

Privacy Policy and Terms of Use should link to `/privacy` and `/terms` respectively. These pages can be minimal placeholder pages initially with standard boilerplate text — developer to supply or client to provide content.

---

## 11. Image Assets

### Supplied Assets

The following image files are provided by the client and must be embedded as-is. No filters, colour treatments or overlays should be applied.

| File | Usage | Page | Section |
|---|---|---|---|
| `Sixense-Transparent.avif` | Logo source reference (for rework — see Section 3) | All pages | Header & footer |
| `Working_backwards.avif` | Inline illustrative image | How We Work | "We work backwards from the outcome" section |
| `Start-small-prove-value-scale-smart.avif` | Inline illustrative image | How We Work | "We build in short cycles" section |

**Image display spec for the two How We Work images:**

Both images are hand-drawn sketch-style illustrations on a white/light background. Display within a contained rounded panel:

- Container: `background: --color-paper-secondary`, `border-radius: --radius-xl`, `padding: 32px`
- Image: `max-width: 100%`, `height: auto`, `display: block`
- No border on the image itself
- No caption required

### Placeholder / Stock Photography

No additional photography has been specified. The design intentionally avoids photography as a primary visual device, using typographic hierarchy, whitespace and section colour contrast instead. If the client wishes to add photography in future, the following zones have been reserved:

- Hero sections (full-bleed behind dark overlay)
- About page team section (if headshots are supplied)

---

## 12. Animations & Interactions

### Principles

- Animations serve clarity, not decoration.
- All motion respects `prefers-reduced-motion` — if enabled, all animations are disabled.
- No parallax. No scroll-jacking. Standard page scroll only.

### Scroll-triggered Entrance Animations

Apply a simple fade-up entrance to:
- Section headings (on entering viewport)
- Body text blocks (slight delay after heading)
- Cards (staggered, 80ms delay between each in a grid)

Fade-up spec:
- Starting state: `opacity: 0; transform: translateY(20px)`
- End state: `opacity: 1; transform: translateY(0)`
- Duration: `500ms`
- Easing: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- Trigger: element 10% into viewport (IntersectionObserver, threshold 0.1)

### Hover States

- Nav links: colour transition to `--color-gold`, `200ms ease`
- Cards (Outcome and service cards): border-color to `--color-gold`, `200ms ease`
- Buttons: background/border colour, `200ms ease`
- Footer links: opacity from 0.65 to 1.0, `150ms ease`
- Logo mark: a subtle 200ms rotation of 5° on hover (mark only, not wordmark) — optional, implement only if achievable cleanly

### Page Transitions

Simple fade: outgoing page fades to 0 opacity over 150ms, incoming fades in over 250ms. Implement using CSS transitions on a root wrapper or a lightweight JS router approach.

---

## 13. Technical Requirements

### Stack

Developer is free to choose stack. The following guidance applies:

- **Static site generator or lightweight framework preferred.** Astro, Next.js (static export) or plain HTML/CSS/JS are all acceptable. No WordPress or heavy CMS required unless the client requests one in future.
- **No client-side framework required** — the site is largely static content with one interactive form.
- **CSS:** Use CSS custom properties (variables) for all palette tokens and spacing. No CSS-in-JS required.
- **Fonts:** Load DM Sans from Google Fonts. Freight Display Pro requires an Adobe Fonts account (or equivalent licence). Use `font-display: swap` on all web fonts.

### Performance

- Lighthouse score targets: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95
- All images served in modern formats (AVIF/WebP with fallback)
- Images lazy-loaded below the fold
- Core Web Vitals targets: LCP < 2.5s, CLS < 0.1, FID/INP < 200ms
- No unnecessary JavaScript. Keep JS payload minimal.

### SEO

**Meta titles and descriptions (per page):**

| Page | Title | Description |
|---|---|---|
| Home | `Automation & AI for Australian operators — Sixense` | `We build automation and AI solutions that eliminate operational drag and unlock capabilities your business couldn't reach before. Mid-market specialists.` |
| What We Do | `What we do — Sixense` | `We design and build automation and AI solutions across finance, field service, procurement, document processing and more. Fixed scope. Real outcomes.` |
| How We Work | `How we work — Sixense` | `We start with your business, not the technology. Short build cycles, senior people, no handoffs. Here's how we engage and deliver.` |
| Our Outcomes | `Our outcomes — Sixense` | `See the automation and AI solutions we've delivered for Australian operators across transport, utilities, healthcare, logistics and more.` |
| About | `About Sixense — automation & AI consultancy` | `We've been building for Australian businesses since 2012. A small, senior local team backed by a 30-person delivery centre.` |
| Contact | `Contact Sixense — book a free Fit Call` | `Get in touch to book a free 30-minute Fit Call. No pitch — just an honest conversation about whether there's something worth solving.` |

**Canonical URLs:** Set `<link rel="canonical">` on all pages.  
**Open Graph:** Include `og:title`, `og:description`, `og:image` (use logo mark on dark background as default OG image, 1200×630px).  
**Structured data:** Add `Organization` schema markup on the home page.

### Responsive Breakpoints

| Name | Range |
|---|---|
| Mobile | < 768px |
| Tablet | 768px–1279px |
| Desktop | ≥ 1280px |

All layouts must be fully functional and visually correct at all three breakpoints. Test at 375px (iPhone SE), 768px (iPad portrait) and 1440px (standard desktop).

### Browser Support

- Chrome (last 2 versions)
- Safari (last 2 versions)
- Firefox (last 2 versions)
- Edge (last 2 versions)
- iOS Safari 15+
- Android Chrome (last 2 versions)

### Hosting & Domain

- Developer to confirm with client. Recommended: Vercel, Netlify or Cloudflare Pages for a static/Astro build. All support HTTPS by default.
- Domain: `sixense.com.au` (client to manage DNS)

---

## 14. Accessibility & Legal

### Accessibility

- All interactive elements keyboard-navigable in logical order
- All images have descriptive `alt` text (specified per section above)
- Colour contrast ratios meet WCAG AA: minimum 4.5:1 for body text, 3:1 for large text and UI elements
- Focus indicators visible on all interactive elements (gold outline specified in button spec)
- Form fields have associated `<label>` elements (not placeholder-only)
- Screen reader landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>` with `aria-label` where needed
- Skip-to-main-content link at top of page (visually hidden until focused)

### Legal Pages

**Required pages (minimal):**

`/privacy` — Privacy Policy  
`/terms` — Terms of Use

Both pages should use the standard site template (nav + footer). Body content can be boilerplate text initially. Client to supply final legal copy or engage a legal copywriter.

**Footer fine print (see Section 10):**
- © 2026 Sixense Pty Ltd. All rights reserved.
- ABN: [CLIENT TO SUPPLY]
- Privacy Policy link
- Terms of Use link
- Cookie notice: `This site does not use cookies for tracking.`

**Trademark:** The Sixense name and logo are proprietary to Sixense Pty Ltd. The footer ™ notation is not required unless the client has registered the trademark — client to advise.

### Forms & Data

- Contact form submissions should not be stored in a client-side database unless the developer implements a secure backend
- If using a third-party form service (Formspree, EmailJS, etc.), ensure the service's privacy policy is referenced in the Sixense Privacy Policy
- GDPR/Australian Privacy Act compliance: the contact form should include a brief consent note: `By submitting this form, you agree to Sixense contacting you regarding your enquiry. We don't share your details with third parties.` — displayed below the submit button in DM Sans 400, 12px, `--color-ink-tertiary`.

---

*End of specification.*

*For questions regarding this brief, contact rodney.ellias@sixense.com.au*
