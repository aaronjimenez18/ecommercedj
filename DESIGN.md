---
name: GDL. Producción & Música
description: E-commerce and service booking for DJ/producer industry in Mexico
colors:
  editorial-magenta: oklch(60% 0.28 330)
  editorial-magenta-glow: oklch(60% 0.28 330 / 0.15)
  editorial-magenta-soft: oklch(60% 0.28 330 / 0.08)
  electric-violet: oklch(55% 0.22 275)
  electric-violet-glow: oklch(55% 0.22 275 / 0.15)
  electric-violet-soft: oklch(55% 0.22 275 / 0.06)
  slate-noir-bg: oklch(0.5% 0.005 275)
  slate-noir-surface: oklch(4% 0.008 275)
  slate-noir-elevated: oklch(7% 0.01 275)
  slate-noir-fg: oklch(93% 0.008 275)
  slate-noir-fg-dim: oklch(73% 0.008 275)
  slate-noir-muted: oklch(38% 0.01 275)
  slate-noir-border: oklch(14% 0.015 275)
  slate-noir-border-hover: oklch(22% 0.015 275)
typography:
  display:
    fontFamily: Cormorant Garamond, Times New Roman, Times, serif
    fontSize: clamp(2.5rem, 8vw, 5rem)
    fontWeight: 400
    lineHeight: 0.85
    letterSpacing: -0.03em
  headline:
    fontFamily: Cormorant Garamond, Times New Roman, Times, serif
    fontSize: clamp(2rem, 5vw, 3.5rem)
    fontWeight: 400
    lineHeight: 1
    letterSpacing: -0.01em
  title:
    fontFamily: Cormorant Garamond, Times New Roman, Times, serif
    fontSize: clamp(1.1rem, 2vw, 1.6rem)
    fontWeight: 400
    lineHeight: 1.05
  body:
    fontFamily: ui-monospace, JetBrains Mono, IBM Plex Mono, Menlo, monospace
    fontSize: 0.85rem
    lineHeight: 1.5
  label:
    fontFamily: ui-monospace, JetBrains Mono, IBM Plex Mono, Menlo, monospace
    fontSize: 0.7rem
    fontWeight: 400
    letterSpacing: 0.1em
    textTransform: uppercase
rounded:
  sm: 8px
  md: 12px
  lg: 16px
spacing:
  3xs: 0.25rem
  2xs: 0.5rem
  xs: 0.75rem
  sm: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  2xl: 4rem
  3xl: 5rem
  4xl: 6rem
components:
  button-primary:
    backgroundColor: transparent
    textColor: "{colors.slate-noir-fg}"
    rounded: "{rounded.sm}"
    padding: 1rem 2rem
    border: 1px solid "{colors.slate-noir-fg}"
  button-primary-hover:
    backgroundColor: "{colors.slate-noir-fg}"
    textColor: "{colors.slate-noir-bg}"
    rounded: "{rounded.sm}"
    padding: 1rem 2rem
    border: 1px solid "{colors.slate-noir-fg}"
  button-accent:
    backgroundColor: transparent
    textColor: "{colors.editorial-magenta}"
    rounded: "{rounded.sm}"
    padding: 1rem 2rem
    border: 1px solid "{colors.editorial-magenta}"
  button-accent-hover:
    backgroundColor: "{colors.editorial-magenta}"
    textColor: "{colors.slate-noir-bg}"
    rounded: "{rounded.sm}"
    padding: 1rem 2rem
    border: 1px solid "{colors.editorial-magenta}"
  card-product:
    backgroundColor: transparent
    rounded: "{rounded.sm}"
    border: "1px solid {colors.slate-noir-border}"
    padding: "{spacing.lg}"
  input-text:
    backgroundColor: transparent
    textColor: "{colors.slate-noir-fg}"
    rounded: "{rounded.sm}"
    border: 1px solid "{colors.slate-noir-border}"
  input-text-focus:
    backgroundColor: transparent
    textColor: "{colors.slate-noir-fg}"
    rounded: "{rounded.sm}"
    border: 1px solid "{colors.editorial-magenta}"
---

# Design System: GDL. Producción & Música

## 1. Overview

**Creative North Star: "The Control Room"**

A studio console at midnight. Every surface purposeful, every knob within reach. Dark room, single monitor glow, precision gear. The interface exists in that liminal moment when the crowd has gone home and only the engineer remains, fine-tuning a mix. Gritty, refined, charged.

This system is raw without being rough, premium without being precious. It rejects the SaaS-cream template, the Shopify cookie-cutter, the overdesigned noise of a 2010s music site. Instead it builds from physical craft: the weight of a turntable platter, the cool of a metal faceplate, the single neon pilot light that tells you the amp is live.

**Key Characteristics:**

- Dark-by-necessity, not dark-by-trend. The control room needs darkness to see the meters.
- One accent does the work of ten. Editorial magenta is the single deviation from neutral.
- Monospace body anchors the interface in technical precision. Display serif brings the warmth of a vintage amp face.
- Breathe and compress. Spacing has a beat: tight clusters, wide separations, intentional silence.

## 2. Colors: The Slate Noir Palette

A cold, industrial dark that reads as mineral rather than digital. Every neutral is tinted toward blue-violet (hue 275) at chroma just above zero enough to feel cool, never neutral-grey.

### Primary

- **Editorial Magenta** (`oklch(60% 0.28 330)`): Full-strength accent. Nav underlines, active filters, kicker labels, service markers, buttons, tag badges, hover states, and focus indicators.
- **Editorial Magenta Glow** (`oklch(60% 0.28 330 / 0.15)`): Outer glow on focus rings and accent button hover. The bloom of a neon tube.
- **Editorial Magenta Soft** (`oklch(60% 0.28 330 / 0.08)`): Subtle wash for decorative borders (section headers, booking totals) and button inset highlights. Same hue, lower dosage.

### Neutral

- **Slate Noir Background** (`oklch(0.5% 0.005 275)`): Near-absolute black with a cold mineral trace. The control room wall.
- **Slate Noir Surface** (`oklch(4% 0.008 275)`): The desk surface. One step off the wall. Used for section backgrounds and card bases.
- **Slate Noir Elevated** (`oklch(7% 0.01 275)`): Hover state for surfaces. The panel that catches the monitor glow.
- **Slate Noir Text** (`oklch(93% 0.008 275)`): Primary text. Cold off-white, high contrast.
- **Slate Noir Text Dim** (`oklch(73% 0.008 275)`): Secondary text. Descriptions, metadata.
- **Slate Noir Muted** (`oklch(38% 0.01 275)`): Tertiary text. Placeholder, footer links, inactive labels.
- **Slate Noir Border** (`oklch(14% 0.015 275)`): Hairline borders and rules. Structural, not decorative.
- **Slate Noir Border Hover** (`oklch(22% 0.015 275)`): Border on interaction. Still within the dark range, barely perceptible lift.

### Named Rules

**The Magenta Spectrum Rule.** Full-strength magenta (`var(--accent)`) for interactive and structural highlights: nav, filters, buttons, tags, kickers, hover states. Soft magenta (`var(--accent-soft)`, 8% opacity) for decorative borders: section headers, booking totals. The same hue does different work at different opacities.

**The Cold Tint Rule.** Every neutral carries hue 275 at chroma 0.005-0.015. No pure grays, no warm browns. The cool is intentional, not incidental.

## 3. Typography

**Display Font:** Cormorant Garamond (with Times New Roman, Times, serif fallback)
**Body Font:** ui-monospace stack (JetBrains Mono, IBM Plex Mono, Menlo, monospace)

**Character:** The pairing is a deliberate friction. A swaggering serif for headlines cut against cold monospace for body. The serif carries warmth and heritage, like an amp faceplate from the 70s. The mono carries precision, like a frequency readout. Together they say: this is craft, not content.

### Hierarchy

- **Display** (400, `clamp(2.5rem, 8vw, 5rem)`, 0.85): Hero headlines. Tight letterspacing, uppercase. The wall statement.
- **Headline** (400, `clamp(2rem, 5vw, 3.5rem)`, 1.0): Section headings. Slightly loose.
- **Title** (400, `clamp(1.1rem, 2vw, 1.6rem)`, 1.05): Card titles, product names. Where the serif does its daily work.
- **Body** (400, 0.85rem, 1.5): All running text. Monospace, capped at 65-75ch max-width. Lowercase, no tracking.
- **Label** (400, 0.7rem, uppercase, 0.1em letter-spacing): Navigation, button text, metadata. Monospace, tracked, all-caps.

### Named Rules

**The Mono Body Rule.** Every paragraph, description, and product detail is set in monospace. The interface reads like a service manual, not a magazine. This is intentional friction: the site is gear documentation, not lifestyle content.

## 4. Elevation

The system is flat by default. Depth is conveyed through tonal layering, not shadows. The background is near-black; surfaces step up through lightness: bg (0.5%) to surface (4%) to elevated (7%). Each step is a material shift, not a z-index gesture.

There is no shadow vocabulary. A surface is either at rest (its lightness level) or hovered (the next lightness step up). The transition is a 0.4s cubic-bezier(0.23, 1, 0.32, 1) ease-out. The effect is geological, not gravitational.

Exceptions: focus rings use a 1px outline in Editorial Magenta with a 20px box-shadow glow via `var(--accent-glow)`. This is the only use of spatial bloom, and it is reserved for interactive fields.

### Named Rules

**The No-Shadow Rule.** Layering is lightness, not darkness. Drop shadows imply a light source above the interface. This room has no overhead light. Surfaces are stacked concrete, not floating paper.

## 5. Components

### Buttons

- **Shape:** Gently curved corners (0.625rem). 1px hairline border. Inset top highlight for a milled-metal look.
- **Primary (.btn):** Transparent bg, Slate Noir Text border and text. On hover: fills with Slate Noir Text, inverts to Slate Noir Background. Lifts 2px on capable hover devices. Transition: 160-200ms, cubic-bezier(0.23, 1, 0.32, 1).
- **Accent (.btn-accent):** Transparent bg, Editorial Magenta border and text. On hover: fills with Editorial Magenta, inverts to bg. Glow appears: `0 0 30px var(--accent-glow)`. Lifts 2px.
- **Small (.btn-sm):** Compact padding (0.5rem 1rem), kicker-size font (0.65rem). Used inline in cards and drawer.
- **Amazon (.btn-amazon):** Orange override (`#fa8b0c`). Hardcoded for external marketplace linking. Not part of the core system.
- **Full (.btn-full):** Width 100%. Used in modals and checkout.

### Cards

- **Corner Style:** Gentle radius (8px).
- **Background:** Transparent at rest. Elevated (Slate Noir Elevated, 7%) on hover.
- **Border:** 1px Slate Noir Border on right and bottom edges for a gridded, tiled feel. Top edge has a 1px gradient highlight (`transparent to rgba(255,255,255,0.04)`), like a rim light.
- **Internal Padding:** 2rem (lg).
- **State:** Hover lifts 2px, translates up. Title shifts to Editorial Magenta.

### Inputs / Fields

- **Style:** Transparent bg, 1px Slate Noir Border stroke, 8px radius. Monospace text, 1rem padding.
- **Focus:** Border shifts to Editorial Magenta. Outer glow via `0 0 20px var(--accent-glow)`.
- **Error / Disabled:** No dedicated tokens yet. Falls through to default.

### Navigation

- **Style:** Sticky header with backdrop blur. Hairline bottom border. Navigation is all-caps monospace labels (0.65rem, 0.1em tracking). Color Slate Noir Muted at rest, Slate Noir Text on hover. Magenta underline (`::after`) animates in on hover via width transition (0.4s).
- **Mobile:** Hamburger icon (three stacked lines). Fullscreen overlay nav panel with 0.95 opacity bg. Centered vertical list.
- **Logo:** Cormorant Garamond display at 2.2rem, tight letterspacing (-2px). Titlecase. GDL.

### Tags

- **Style:** Editorial Magenta background with Slate Noir Background text. Compact padding (4px 10px). Absolute-positioned top-right on product cards. Kicker-size font.

### The Page Loader

- **Style:** Five centered circles in descending Editorial Magenta chroma (0.28 through 0.06). Each circle pulses a 2x scale burst via `::before` pseudo-element, staggered 0.2s apart. Ease-out. Duration 2s loop. Fullscreen overlay with Slate Noir Background, fades out after page ready.

## 6. Do's and Don'ts

### Do

- **Do** use Editorial Magenta at full strength for all interactive and structural highlights: nav, filters, buttons, tags, kickers, hovers.
- **Do** use Editorial Magenta Soft (`var(--accent-soft)`) for decorative borders where full magenta would be too loud.
- **Do** keep body text in monospace at 0.85rem. The interface should read like a service manual.
- **Do** use tonal layering instead of shadows. Step from bg to surface to elevated; never drop shadow.
- **Do** cap body text at 65-75ch. Let it breathe.
- **Do** use the cold tint (hue 275) in every neutral. No warm grays, no browns.
- **Do** wrap each section in deliberate space: tight inside groups, generous between groups. Rhythm over uniformity.

### Don't

- **Don't** use `#000` or `#fff` anywhere. Tint every black and white toward hue 275.
- **Don't** use rounded corners above 16px. The radius should feel machined, not friendly.
- **Don't** use gradient text, glassmorphism, or side-stripe borders. These are absolute bans.
- **Don't** use Bootstrap blues, rounded-corner icons above headings, or stock photography of smiling people. Generic SaaS and corporate cliches are anti-references.
- **Don't** use em dashes. Use commas, colons, semicolons, periods, or parentheses.
- **Don't** nest cards. One level of containment is enough.
- **Don't** use full-strength magenta on decorative borders. Use `var(--accent-soft)` for section headers and booking totals instead.
- **Don't** use bounce, elastic, or spring easing. Stick to cubic-bezier(0.23, 1, 0.32, 1) for transitions and power3.out for GSAP timelines.
- **Don't** let the interface look like a 2010s music site. No excessive gradients, noise, or decorative chaos.
- **Don't** default to centered stacks. Asymmetric composition and strict grids are the vocabulary.

