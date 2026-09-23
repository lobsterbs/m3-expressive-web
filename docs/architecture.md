# Architecture

How the port translates Material 3's spec architecture into web primitives.

## The three-layer translation

```
M3 spec (m3.material.io)          Material Web (reference)           this port
--------------------------        --------------------------         ------------------------------
Design tokens (ref/sys/comp)  ->  SCSS token pipeline + CSS vars ->  src/tokens/m3-tokens.css
State layers / ripple         ->  <md-ripple> internals          ->  <md-state-layer> + <md-ripple>
Elevation levels 0-5          ->  <md-elevation>                  ->  <md-elevation>
Focus indication             ->  <md-focus-ring>                 ->  <md-focus-ring>
Expressive springs (Compose)  ->  (none — unimplemented upstream) ->  motion/springs.ts (linear())
Shape library + morph (Compose)->  (none — unimplemented upstream) ->  shape/shapes.ts (SVG + WAAPI)
```

## Token pipeline

Material Web compiles SCSS token maps into per-component CSS custom properties
(`--md-{component}-*`) that default to system tokens (`--md-sys-*`). We keep
that exact contract but define tokens statically in CSS: simpler to theme,
zero build tooling. Anything that Material Web expresses as a component token
(e.g. `--md-elevated-button-container-elevation`) can be added here as an
override slot; nothing is hard-coded that a token could express.

## Interaction controller

`InteractiveController` (src/internal/interactive.ts) is the single place
where interaction state (hover/focus/pressed/dragged) is tracked and pushed
into the primitives:

```
host component
  ├── <md-state-layer .state={hover|focus|pressed|...}>   # opacity per M3 spec
  ├── <md-ripple>            # pressed ripple from pointer position
  ├── <md-focus-ring>        # keyboard focus visibility
  └── (optional) <md-elevation --md-elevation-level={0..5}>
```

Components never re-implement pointer/focus logic; they compose the controller
(see `components/button/md-button-base.ts` and `fab-menu`).

## Motion

The expressive motion system uses spring physics, not fixed curves. We
integrate a damped spring ODE at build-authoring time and emit sampled
`linear()` easing strings:

- `spring-spatial` (bouncy, underdamped) — position/scale: button shape
  squeeze, FAB menu stagger, button-group flex.
- `spring-effects` (critically damped) — opacity/color changes.

Every animated component also ships a `prefers-reduced-motion` branch.

## Shape morphing

The official 35-shape library exists only as the Compose `MaterialShapes`
API and Figma kit. The web port represents each shape as a normalized point
sequence (`src/shape/shapes.ts`), renders via SVG `<path>`, and morphs by
animating the path `d` with the Web Animations API (spatial-spring easing).
`resampleShape()` equalizes point counts so any two shapes can morph.

Known limitation: WAAPI `d` interpolation is not supported everywhere; the
helper sets the final path and animates where supported, degrading to an
instant switch otherwise. A future iteration may move to hand-rolled
per-frame point interpolation for universal morph support.

## Status vs. upstream

| Mechanic | Material Web | This port |
| --- | --- | --- |
| Tokens, state layers, ripple, elevation, focus ring | yes | yes |
| Expressive springs | no | yes (linear()) |
| Shape library + morph | no | yes (subset, SVG+WAAPI) |
| Button group, loading indicator, FAB menu | no | yes |
| Remaining 11 expressive components | no | roadmap |
