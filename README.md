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
| matraic/m3e | from-scratch, 40+ components | bezier approximations | active |
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
| Slider | md-slider | expressive tall thumb, corner morph on drag, spring growth |
| Wavy progress | md-linear-wavy-progress, md-circular-wavy-progress | amplitude grows with value, spring-eased |

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
expressive fast effects.

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

## Theming

Everything themes through CSS custom properties in two tiers: --md-sys-*
(system) and --md-comp-* (component overrides). Export a scheme from Material
Theme Builder (m3.material.io/foundations/customization) and map it to the
tokens in src/tokens/m3-tokens.css. Full guide: docs/theming.md.

## AI agent skills

The `agent-skills` branch packages this repo's knowledge as an Agent
Skills open-standard SKILL.md that works in Claude Code, Codex CLI, Cursor,
OpenCode, and other compatible agents:

    git clone -b agent-skills https://github.com/lobsterbs/Material-You-3-Web.git
    cp -r Material-You-3-Web/skills/m3-expressive-web ~/.claude/skills/

## Roadmap

- [ ] Remaining expressive components: app bars, navigation bar/rail updates
- [ ] Full 35-shape library (curated subset today)
- [ ] Emphasized typography token pairs (15 styles)
- [ ] Standard motion scheme variant (the second official scheme)
- [ ] Framework wrapper docs (React/Vue/Angular usage notes)
- [ ] Verify TODO(spec) values in slider/wavy progress against the Figma kit

## Thanks 🙏

This port stands on the shoulders of these projects and their maintainers:

- **[material-components/material-web](https://github.com/material-components/material-web)**
  (Apache-2.0) — the official Material Web Components whose token
  architecture (two-tier --md-sys-*/--md-comp-* CSS custom properties),
  primitive decomposition (ripple, elevation, focus ring), and naming scheme
  this port directly follows. It entered maintenance mode; we're grateful for
  the years of work by the Google team.
- **[material-components/material-components-android](https://github.com/material-components/material-components-android)**
  — source of the canonical motion spring constants (damping/stiffness in
  motion/res/values/tokens.xml) used to generate our exact linear() curves.
- **[matraic/m3e](https://github.com/matraic/m3e)** — the most complete
  community M3 Expressive web port; its component coverage and shape-morph
  approach (clip-path, normalized points) informed our implementation
  choices, and its bezier approximations motivated our exact-values niche.
- **[material-esm/material](https://github.com/material-esm/material)** —
  community fork of Material Web keeping it alive; a useful cross-reference
  for component behavior.
- **[@banegasn/components](https://banegasn.dev/blog/m3-expressive-library/)**
  — an early community M3 Expressive component set that validated the
  community demand.
- **Google's Material Design team** — for publishing the full M3 Expressive
  spec, guidelines, and Figma Design Kit at [m3.material.io](https://m3.material.io/).
- **[DeepWiki](https://deepwiki.com)** — repository documentation used to
  mine the exact token names and internal architecture of material-web.
- **[Firecrawl](https://firecrawl.dev)** — used to scrape the JS-rendered
  spec pages on m3.material.io.

If your project was used as a reference and you'd like it listed or removed,
open an issue.

## Sources

- M3 guidelines: https://m3.material.io/
- M3 Expressive announcement: https://m3.material.io/blog/building-with-m3-expressive
- Motion physics system: https://m3.material.io/styles/motion/overview/how-it-works
- MDC-Android Motion tokens: https://github.com/material-components/material-components-android/blob/master/docs/theming/Motion.md
- Architecture patterns adapted from material-components/material-web (Apache-2.0)

## License

Apache-2.0
