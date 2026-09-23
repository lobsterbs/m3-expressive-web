---
name: m3-expressive-web
description: Build, theme, and extend Material 3 Expressive web UIs using the m3-expressive-web component library. Triggers on requests involving Material Design 3 / Material You, M3 Expressive components (buttons, button groups, sliders, wavy progress, FAB menus, split buttons, toolbars), design tokens (--md-sys-*), state layers, spring motion, or shape morphing on the web. Also use when porting additional M3 components or verifying M3 spec values.
---

# m3-expressive-web — Material 3 Expressive for the web

A community port of Material 3 Expressive as Lit web components with exact
spec values (canonical spring constants, state-layer opacities, elevation
levels, corner scale). Works in any framework (React, Vue, Angular, Svelte,
vanilla).

## When you use this skill

- The user wants Material 3 / Material You / M3 Expressive UI on the web.
- The user asks to theme an app with --md-sys-* tokens or Material Theme
  Builder exports.
- The user wants to port a component not yet in the library.
- You need to verify an M3 spec value (never guess — see Exact values).

## Exact values (never approximate these)

State layer opacities: hover 8%, focus 10%, pressed 10%, dragged 16%,
hover+focus 12%.

Elevation levels: 0 none, 1=1dp, 2=3dp, 3=6dp, 4=8dp, 5=12dp. Surface tint
is deprecated.

Corner scale: none 0, extra-small 4, small 8, medium 12, large 16,
extra-large 28, extra-extra-large 48, full 9999px.

Motion springs (canonical, from MDC-Android tokens.xml, shared with Compose
MotionScheme.expressive()):

| Spring | Damping | Stiffness | Use |
| --- | --- | --- | --- |
| fast-spatial | 0.9 | 1400 | position/shape of small components |
| fast-effects | 1.0 | 3800 | color/opacity of small components |
| default-spatial | 0.9 | 700 | partial-screen (sheets, drawers) |
| default-effects | 1.0 | 1600 | partial-screen effects |
| slow-spatial | 0.9 | 300 | full-screen |
| slow-effects | 1.0 | 800 | full-screen effects |

All component motion uses the two fast tokens (aliases
--md-sys-motion-spring-spatial / -effects). Curves are pre-generated CSS
linear() in src/tokens/m3-tokens.css; regenerate with springToLinear().

## Using the components

Import once, then use the custom elements anywhere:

    import 'm3-expressive-web/src/index.ts';

    <md-filled-button>Save</md-filled-button>
    <md-button-group>...</md-button-group>
    <md-loading-indicator></md-loading-indicator>
    <md-fab-menu label="Create">...</md-fab-menu>
    <md-split-button variant="filled">Send</md-split-button>
    <md-toolbar><span slot="start">Inbox</span></md-toolbar>
    <md-slider></md-slider>
    <md-linear-wavy-progress></md-linear-wavy-progress>

## Theming

Two token tiers: --md-sys-* (system, at :root) and --md-comp-*
(per-component). Export a scheme from Material Theme Builder and map roles
to --md-sys-color-*; both light and dark values ship in the baseline
m3-tokens.css (which doubles as a checklist of consumed roles).

## Extending / porting a new component

Follow the repo's AGENTS.md contract strictly:

1. Read src/internal/interactive.ts and components/button/md-button-base.ts —
   the InteractiveController pattern is the contract (state layer + ripple +
   focus ring, never re-implement pointer/focus logic).
2. Style ONLY from tokens; every state (hover/focus/pressed/disabled) styled.
3. Motion only via --md-sys-motion-spring-* tokens; legacy easing is
   spec-parity only.
4. prefers-reduced-motion branch is mandatory; keyboard activation and ARIA
   are mandatory.
5. Unverifiable spec values get a TODO(spec) comment with the spec URL —
   never invent values. Verify via m3.material.io (JS-rendered; scrape with
   waitFor 5000+) or canonical token sources (MDC-Android tokens.xml,
   Compose source).
6. Export from src/index.ts and add a demo section in demo/index.html.

## Reference files in the repo

- AGENTS.md — full contributor/AI contract, research workflow
- docs/theming.md — token tiers, Theme Builder mapping
- docs/architecture.md — spec-to-web translation map
- src/tokens/m3-tokens.css — all tokens + generated spring curves
- src/motion/springs.ts — spring constants and linear() generator
- src/shape/shapes.ts — shape library and morph helper
