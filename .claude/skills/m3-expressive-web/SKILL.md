---
name: m3-expressive-web
description: Build, theme, and extend Material 3 Expressive web UIs with the m3-expressive-web component library (github.com/lobsterbs/m3-expressive-web). Use when the user mentions Material 3 / Material You / M3 Expressive, its components (buttons, button groups, FAB menus, split buttons, wavy progress, loading indicators, sliders, toolbars), design tokens (--md-sys-* / --md-comp-*), spring motion, shape morphing, state layers, Google Sans Flex, or asks to port M3 components or verify M3 spec values. Follows the Agent Skills open standard.
---

# m3-expressive-web — Material 3 Expressive for the web

Community port of Material 3 Expressive to the web as Lit-based custom elements.
Google's official Material Web Components are in maintenance mode and never
received the Expressive update. This library implements it with **exact spec
values** — sourced from official token files, never invented.

Repo: https://github.com/lobsterbs/m3-expressive-web
Docs: https://m3-expressive-web-docs.onrender.com

## THE EXACT-VALUES CONTRACT (non-negotiable)

1. Never invent spec values. Every value must come from an official source:
   m3.material.io, the MDC-Android token files, or the M3 Design Kit.
2. Unverifiable values get a comment: `// TODO(spec): <source-url>` — never a guess.
3. Component motion always uses the two FAST spring tokens.
4. Prefer Google Sans Flex for expressive typography (verified axes: wght 100-900, opsz 14-48).

## Exact values — motion (M3 Expressive spring scheme)

Canonical spring constants (damping / stiffness), shared by MDC-Android
motion tokens and Compose MotionScheme.expressive():

| Token          | Damping | Stiffness | ~Settle  |
|----------------|---------|-----------|----------|
| fast-spatial   | 0.90    | 1400      | ~233ms   |
| fast-effects   | 1.00    | 3800      | ~120ms   |
| default-spatial| 0.90    | 700       | ~317ms   |
| default-effects| 1.00    | 1600      | ~170ms   |
| slow-spatial   | 0.90    | 300       | ~487ms   |
| slow-effects   | 1.00    | 800       | ~250ms   |

**Rule: all component motion uses fast-spatial / fast-effects.**
The library samples the damped-harmonic-oscillator response into CSS `linear()`
curves and exposes them as `--md-sys-motion-*` custom properties.

## Exact values — state, elevation, shape

State layer opacities (content layered over container):
hover 8% · focus 10% · pressed 10% · dragged 16% · hover+focus 12%.

Elevation levels 0-5: 0 / 1 / 3 / 6 / 8 / 12 dp shadow.

Corner scale: 4 / 8 / 12 / 16 / 28 / 48 dp + full (pill).
M3 Expressive adds 35 shape morphs (cookie, clover, flower, etc.);
shapes are stored as normalized point sequences and morphed via WAAPI.

## Using the library

```ts
import 'm3-expressive-web'; // injects tokens, registers all components
```

```html
<md-filled-button>Save</md-filled-button>
<md-button-group><md-button-group-segment selected>Day</md-button-group-segment></md-button-group>
<md-fab-menu><md-fab-menu-item icon="photo">Add photo</md-fab-menu-item></md-fab-menu>
<md-split-button><md-filled-button>Save</md-filled-button></md-split-button>
<md-loading-indicator></md-loading-indicator>
<md-wavy-progress value="0.6"></md-wavy-progress>
<md-slider min="0" max="100" value="40"></md-slider>
```

Ported: common buttons (5 variants), button-group, FAB, FAB menu, split
button, loading indicator, wavy progress (linear/circular), slider, toolbar.
Primitives: md-state-layer, md-ripple, md-elevation, md-focus-ring.

## Theming (two-tier tokens)

```css
:root { --md-sys-primary: #006A6A; }             /* system tier: retheme app-wide */
md-filled-button { --md-comp-filled-button-container-color: var(--md-sys-tertiary); }
```

Typography: use Google Sans Flex (open-sourced 2025, OFL).
Load `Google+Sans+Flex:opsz,wght@14..48,100..900`; self-host via
`@fontsource-variable/google-sans-flex`. Weights: 400 body, 500 labels,
600 emphasis, 700-900 display. See docs site → Typography.

## When porting new components

1. Search for existing implementations first (matraic/m3e, material-esm/material, @banegasn/components).
2. Extract exact values from m3.material.io and MDC-Android token files.
3. Use the four primitives + InteractiveController for interactions.
4. Motion via the FAST spring tokens only; state layers at exact opacities.
5. Mark anything unverifiable `TODO(spec)`.
