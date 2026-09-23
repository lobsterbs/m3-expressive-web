# Theming guide

All theming flows through CSS custom properties in two tiers, mirroring
Material Web's token architecture:

```
reference tokens  ->  system tokens (--md-sys-*)  ->  component tokens (--md-comp-*)
```

## Tier reference

| Tier | Prefix | Example | Override at |
| --- | --- | --- | --- |
| System | `--md-sys-*` | `--md-sys-color-primary` | `:root` — affects all components |
| Component | `--md-comp-*` (or inline `--md-elevation-level`) | `--md-comp-button-container-shape` | any element scope, per instance |

Component tokens fall back to system tokens, so overriding a system token
re-themes every component at once.

## Theming with Material Theme Builder

1. Open [Material Theme Builder](https://m3.material.io/foundations/customization)
   (web or Figma plugin) and pick your seed color(s).
2. Export the theme (DSP / CSS variables).
3. Map the exported roles onto our token names in `:root`:

```css
:root {
  /* light */
  --md-sys-color-primary: #006494;
  --md-sys-color-on-primary: #ffffff;
  --md-sys-color-primary-container: #cbe6ff;
  /* ...and so on for the 26+ roles you exported */
}
@media (prefers-color-scheme: dark) {
  :root {
    --md-sys-color-primary: #8fcaff;
    /* ... */
  }
}
```

The baseline file `src/tokens/m3-tokens.css` lists every role we consume —
it doubles as a checklist for your export mapping.

## What each token family controls

- `--md-sys-color-*` — all container/surface/on-* roles (light + dark).
- `--md-sys-state-*-state-layer-opacity` — interaction overlay strengths.
- `--md-sys-elevation-level0..5` — shadows used by `<md-elevation>`.
- `--md-sys-shape-corner-*` — the 14-style corner scale (component tokens pick one).
- `--md-sys-motion-*` — legacy easing/duration **and** spring `linear()` curves
  (`spring-spatial`, `spring-effects`); components animate via these.
- `--md-sys-typescale-*` — font family/size/weight/line-height per style.

## Per-component customization

```css
/* All buttons in a hero section */
.hero md-filled-button {
  --md-comp-button-container-shape: var(--md-sys-shape-corner-small);
}
/* One instance */
#special md-elevation { --md-elevation-level: 4; }
```

## Dark mode

The baseline tokens ship both schemes keyed to `prefers-color-scheme`. For a
manual toggle, override the `--md-sys-color-*` roles under your own class
(e.g. `[data-theme='dark']`) and set `color-scheme` accordingly.
