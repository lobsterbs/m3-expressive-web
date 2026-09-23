# m3-expressive-web

A community port of **Material 3 Expressive** to the web — built with Lit web
components that work in any framework (React, Vue, Angular, Svelte, vanilla JS).

> Official status: Google's Material Web Components are in maintenance mode and
> M3 Expressive is not implemented on web by Google. This project ports the
> expressive design language (state layers, spring motion, shape morphing, and
> the expressive components) to the web as standards-based custom elements.

## What's inside

| Area | Contents |
| --- | --- |
| **Design tokens** (`src/tokens/m3-tokens.css`) | Full M3 token set as CSS custom properties: color roles (light + dark), state layer opacities, elevation levels 0–5, the 14-style corner scale, legacy easing/duration, and expressive spring `linear()` curves. |
| **Primitives** (`src/internal/`) | `<md-state-layer>`, `<md-ripple>`, `<md-elevation>`, `<md-focus-ring>` — the same architecture Material Web uses internally. |
| **Motion** (`src/motion/springs.ts`) | Spatial & effects spring presets generated from damped-spring physics as CSS `linear()` easing, with bezier fallback. |
| **Shape library** (`src/shape/shapes.ts`) | Expressive shapes as normalized point sequences with SVG path rendering and a `morphShapes()` helper using the Web Animations API. |
| **Components** (`src/components/`) | Common buttons (filled, tonal, outlined, elevated, text), button group with "bump and react" shape morph, loading indicator with shape-morph cycle, FAB menu with spring-staggered items. |

## Quick start

```bash
git clone https://github.com/lobsterbs/Material-You-3-Web.git
cd Material-You-3-Web
npm install
npm run dev        # opens the demo at localhost:8000/demo/
```

Use in any framework:

```html
<script type="module" src="m3-expressive-web/src/index.ts"></script>

<md-filled-button>Save</md-filled-button>
<md-button-group>
  <md-outlined-button>One</md-outlined-button>
  <md-outlined-button>Two</md-outlined-button>
</md-button-group>
```

## Theming

Override system tokens at `:root` (theme-wide) or component tokens per
instance. The fastest path is exporting a scheme from
[Material Theme Builder](https://m3.material.io/foundations/customization) and
mapping it to the `--md-sys-color-*` variables — see [docs/theming.md](docs/theming.md).

```css
:root {
  --md-sys-color-primary: #006a6a;
  --md-sys-color-on-primary: #ffffff;
}
```

## The expressive behaviors

- **State layers**: hover 8% · focus 10% · pressed 10% · dragged 16% · hover+focus 12% overlays using `currentColor`.
- **Spring motion**: transitions use `linear()` spring curves (spatial = bouncy, effects = smooth) with a bezier fallback and full `prefers-reduced-motion` support.
- **Shape morph**: buttons squeeze to medium rounding on press; button-group neighbors flex apart; the loading indicator cycles library shapes; all animatable shapes live in one place for reuse.

## Roadmap

- [ ] Remaining expressive components: split button, toolbars, updated sliders & progress indicators
- [ ] Full 35-shape library (currently a curated subset)
- [ ] Navigation bar / rail updates
- [ ] Emphasized typography styles as token pairs
- [ ] React/Vue wrapper examples + docs site

## Sources

- [M3 guidelines](https://m3.material.io/) · [M3 Expressive](https://m3.material.io/blog/building-with-m3-expressive) · [Design tokens](https://m3.material.io/foundations/design-tokens/overview)
- Architecture patterns adapted from [material-components/material-web](https://github.com/material-components/material-web) (Apache-2.0), which is in maintenance mode.

## License

Apache-2.0
