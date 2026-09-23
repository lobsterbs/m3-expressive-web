# m3-expressive-web

A community port of **Material 3 Expressive** to the web — Lit web components
that work in any framework (React, Vue, Angular, Svelte, vanilla JS), built on
exact values from the official spec and Google's token sources.

> **Official status:** Google's Material Web Components are in maintenance mode
> and M3 Expressive is not implemented on web by Google. This project ports the
> expressive design language — state layers, spring motion physics, shape
> morphing, and the expressive components — to the web as standards-based
> custom elements.

## Why this port (vs existing projects)

| Project | Approach | Motion fidelity | Status |
| --- | --- | --- | --- |
| @material/web (official) | Lit, tokens, no expressive | none (legacy easing) | maintenance mode |
| matraic/m3e | from-scratch, 40+ components | bezier approximations (e.g. 350ms cubic-bezier(0.27, 1.06, 0.18, 1)) | active |
| material-esm/material | fork of MWC | MWC easing | active |
| **this project** | Lit + exact token pipeline | CSS linear() curves generated from the canonical M3 spring constants (damping 0.9/1.0, stiffness 1400–3800) | active |

The differentiator: motion here is **numerically faithful**. The spring tokens
come from MDC-Android's motion tokens.xml — the same constants Jetpack
Compose's MotionScheme.expressive() uses — integrated from the damped harmonic
oscillator and sampled into CSS linear() easing.

## Components

| Component | Element | Expressive features |
| --- | --- | --- |
| Common buttons | md-filled-button, md-filled-tonal-button, md-outlined-button, md-elevated-button, md-text-button | state layers (8/10/10/12%), ripple, corner morph on press |
| Button group | md-button-group | "bump and react" neighbor flex, spring-driven |
| Loading indicator | md-loading-indicator | shape-morph cycle through the shape library |
| FAB menu | md-fab-menu | spring-staggered items, corner morph |
| Split button | md-split-button | connected segments, chevron spring rotation, menu |
| Toolbar | md-toolbar | corner morph on hover, slots for controls |

## Exact values used (audit trail)

### Motion springs (canonical, from MDC-Android tokens.xml)

| Spring | Damping ratio | Stiffness | Used for |
| --- | --- | --- | --- |
| fast-spatial | 0.9 | 1400 | buttons, switches, small components (position/shape) |
| fast-effects | 1.0 | 3800 | small component color/opacity |
| default-spatial | 0.9 | 700 | bottom sheets, drawers |
| default-effects | 1.0 | 1600 | partial-screen effects |
| slow-spatial | 0.9 | 300 | full-screen transitions |
| slow-effects | 1.0 | 800 | full-screen color/opacity |

Per the motion spec (m3.material.io/styles/motion/overview/how-it-works), all
component motion is driven by two tokens: expressive fast spatial and
expressive fast effects. Components here default to those two.

Compose reference constants: Spring.DampingRatioLowBouncy = 0.75,
DampingRatioMediumBouncy = 0.5, StiffnessMediumLow = 400, StiffnessMedium = 1500.

### State layer opacities

hover 8% · focus 10% · pressed 10% · dragged 16% · hover+focus 12%

### Elevation levels (surface tint deprecated)

0 = none · 1 = 1dp · 2 = 3dp · 3 = 6dp · 4 = 8dp · 5 = 12dp

### Shape corner scale

none 0 · extra-small 4 · small 8 · medium 12 · large 16 · extra-large 28 · extra-extra-large 48 · full 9999px

## Quick start

    git clone https://github.com/lobsterbs/Material-You-3-Web.git
    cd Material-You-3-Web
    npm install
    npm run dev        # opens the demo at localhost:8000/demo/

    <script type="module" src="m3-expressive-web/src/index.ts"></script>

    <md-filled-button>Save</md-filled-button>

    <md-split-button variant="filled">
      Send
      <div slot="item">Send now</div>
      <div slot="item">Schedule for later</div>
    </md-split-button>

    <md-toolbar>
      <span slot="start">Inbox</span>
      <md-text-button slot="end">Archive</md-text-button>
    </md-toolbar>

## Theming

Everything themes through CSS custom properties in two tiers: --md-sys-*
(system) and --md-comp-* (component overrides). Export a scheme from Material
Theme Builder (m3.material.io/foundations/customization) and map it to the
tokens in src/tokens/m3-tokens.css — that file doubles as a checklist of every
consumed role. Full guide: docs/theming.md.

## Project layout

    src/
      tokens/m3-tokens.css      # design tokens: color, state, elevation, shape, motion, type
      internal/                 # primitives + InteractiveController
      motion/springs.ts         # canonical spring constants -> linear() generator
      shape/shapes.ts           # expressive shape library + morph helper
      components/<name>/        # one folder per component
    demo/index.html             # smoke-test page
    docs/                       # theming.md, architecture.md
    AGENTS.md                   # contributor & AI agent guide

## Roadmap

- [ ] Remaining expressive components: sliders, progress indicators, app bars, navigation bar/rail updates
- [ ] Full 35-shape library (curated subset today)
- [ ] Emphasized typography token pairs (15 styles)
- [ ] Standard motion scheme variant (the second official scheme)
- [ ] Framework wrapper docs (React/Vue/Angular usage notes)

## Sources

- M3 guidelines: https://m3.material.io/
- M3 Expressive announcement: https://m3.material.io/blog/building-with-m3-expressive
- Motion physics system: https://m3.material.io/styles/motion/overview/how-it-works
- MDC-Android Motion tokens (canonical spring constants): https://github.com/material-components/material-components-android/blob/master/docs/theming/Motion.md
- Architecture patterns adapted from material-components/material-web (Apache-2.0)

## License

Apache-2.0
