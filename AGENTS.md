# AGENTS.md — contributor & AI agent guide

Rules of engagement for humans and AI agents working on this repository.
Read this fully before making changes.

## Project context

This is a **port**, not a fork. Background you must know:

- Google's Material Web Components (@material/web) entered maintenance mode;
  engineers were reassigned to Google's internal Wiz framework. M3 Expressive
  was never implemented on web by Google.
- M3 Expressive (announced at Google I/O, May 2025) is an evolution of
  Material 3, not "M4": motion physics (springs), a 35-shape library with
  shape morphing, emphasized typography, vibrant color schemes, and 14 new or
  updated components. It is Android-Compose-first; at I/O 2026 Material
  announced Android is Compose-only going forward.
- Existing community ports (checked before building):
  - matraic/m3e — most complete (@m3e/web, 40+ components); approximates
    springs with cubic-beziers; uses clip-path for shape morphing.
  - material-esm/material — fork of Material Web, keeps MWC architecture.
  - @banegasn/components — smaller expressive component set.
- Our niche: exact spec fidelity — token values and motion physics taken
  verbatim from Google's token sources, not approximated.

## The exact-values contract

All spec values must come from a verifiable source. The canonical sources:

| Value family | Source of truth | Where it lives here |
| --- | --- | --- |
| Motion springs (damping 0.9/1.0; stiffness 1400/3800/700/1600/300/800) | MDC-Android motion/res/values/tokens.xml; same constants as Compose MotionScheme.expressive() | src/motion/springs.ts (M3_SPRINGS) + generated linear() curves in src/tokens/m3-tokens.css |
| State layer opacities (hover 8, focus 10, pressed 10, dragged 16, hover+focus 12) | m3.material.io state layers spec | --md-sys-state-* tokens |
| Elevation levels 0–5 (dp: 0/1/3/6/8/12; tint deprecated) | m3.material.io elevation tokens | --md-sys-elevation-level* |
| Corner scale (4/8/12/16/28/48/full) | m3.material.io shape corner scale | --md-sys-shape-corner-* |
| Color roles | Material Theme Builder export / baseline scheme | --md-sys-color-* |
| Component specs (sizes, padding) | m3.material.io component spec pages (interactive modules — need JS-rendered scrape or the Figma M3 Design Kit) | per-component CSS, always via tokens |

**If you cannot verify a value, do not invent it.** Leave a
// TODO(spec): verify <value> at <spec-url> comment instead. Never copy a
"close enough" number silently.

## Non-negotiables

1. **Tokens over hard-coded values.** No raw hex/px in component styles except
   documented token defaults. Styles read --md-sys-* / --md-comp-*.
2. **Reduced motion is mandatory.** Every animated component must handle
   prefers-reduced-motion: reduce.
3. **Keyboard accessibility is not optional.** Wire md-focus-ring, focus and
   blur handling, sensible ARIA roles, keyboard activation (Space/Enter).
4. **Strict TypeScript.** strict + noUncheckedIndexedAccess; no any in new
   code; exported functions declare return types.
5. **Springs, not bezels.** Animations use the --md-sys-motion-spring-* tokens
   (fast-spatial for position/shape, fast-effects for color/opacity — that
   pair drives all component motion per the spec). Legacy easing/duration
   tokens exist only for spec parity, not for new code.
6. **No duplicate static styles declarations** in a class; merge into one array.

## Architecture map

    src/
      tokens/m3-tokens.css          # all design tokens (CSS custom properties)
      internal/                     # primitives: state-layer, ripple, elevation,
                                    #   focus-ring + InteractiveController
      motion/springs.ts             # canonical constants -> linear() generator
      shape/shapes.ts               # shape library (normalized points) + morph
      components/<name>/            # one folder per component; base classes for variants
      index.ts                      # public entry — update when adding components
    demo/index.html                 # smoke test — update when adding components
    docs/                           # theming.md, architecture.md

### The interaction contract

Components never re-implement pointer/focus logic. They compose
InteractiveController (src/internal/interactive.ts), which tracks
hover/focus/pressed state and drives the four primitives:

    host component
      |- <md-state-layer .state={...}>   # opacity per M3 spec (currentColor)
      |- <md-ripple>                      # pressed ripple from pointer position
      |- <md-focus-ring>                 # keyboard focus visibility
      |- (optional) <md-elevation --md-elevation-level={0..5}>

Study components/button/md-button-base.ts before writing any new component.

### Motion contract

- CSS transitions: use var(--md-sys-motion-spring-fast-spatial) /
  ...fast-effects (they alias the two tokens the spec says drive component
  motion). Slow/default springs exist for full-screen or sheet-level work.
- WAAPI animations (ripple, shape morph): pass spring curves as easing via
  resolveSpring(), but check support — fall back to SPRING_FALLBACK.
- linear() curves are generated artifacts — regenerate with
  springToLinear(name); never hand-edit the numbers in m3-tokens.css.

### Shape morph contract

Shapes are normalized point sequences in src/shape/shapes.ts rendered as SVG
paths. Morph via morphShapes() (WAAPI d animation; sets the final path so
non-supporting browsers degrade to an instant switch). When adding shapes,
normalize to the same point count (resampleShape) so any pair can morph. The
official 35-shape library exists only in Compose MaterialShapes and the Figma
kit — when porting the rest, derive points from those sources.

## Component checklist

1. Create src/components/<name>/md-<name>.ts; use @customElement('md-<name>').
2. Compose the four primitives via InteractiveController.
3. All styles from tokens; style every state (hover/focus/pressed/disabled).
4. Reduced-motion branch + ARIA role/state + keyboard activation.
5. Export from src/index.ts; add a demo section to demo/index.html.
6. Run npm run check (tsc) — zero errors before committing.

## Research workflow (for agents)

Before porting any component or value:
1. Check the spec page on m3.material.io (Firecrawl with waitFor: 5000+
   handles its JS-rendered interactive modules; some values render only in
   the modules).
2. Check the canonical token sources: MDC-Android tokens.xml files and
   Jetpack Compose source (DeepWiki can query both androidx/androidx and
   material-components/material-components-android).
3. Check existing ports (m3e especially) for implementation approaches —
   but verify their values against Google sources; some approximate.
4. Record the value + source URL in the file header comment.

## Commit conventions

- Milestone pushes: Checkpoint N: <area> — <summary> (cohesive: tokens |
  primitives | components | docs | exact-values).
- Everything else: conventional commits (feat:, fix:, docs:).
- Never regenerate src/tokens/m3-tokens.css wholesale from scratch — extend
  it (the spring curves and color roles are generated/verified artifacts).
