# M3 Expressive reference library

Every documentation source scouted for this port, with the exact values each one
contributes. Values below were verified against the linked source at scout time.

## Canonical value sources

### Motion (spring scheme)
- **MDC-Android Motion.md** — canonical spring tokens, shared with Compose
  `MotionScheme.expressive()`:
  <https://github.com/material-components/material-components-android/blob/master/docs/theming/Motion.md>
  - fast-spatial 0.9/1400 · fast-effects 1.0/3800 · default-spatial 0.9/700
  - default-effects 1.0/1600 · slow-spatial 0.9/300 · slow-effects 1.0/800
  - Rule: **all component motion uses the two FAST tokens**
- **m3.material.io motion pages** — spatial vs effects distinction, spring tokens:
  <https://m3.material.io/styles/motion/overview/how-it-works>

### Shape
- **m3.material.io shape overview** — 35 new shapes + shape morphing, added to
  the Figma Design Kit and Compose; rectangular shapes fully-rounded by default:
  <https://m3.material.io/styles/shape/overview-principles>
- **Shape scale tokens** — corner scale 4/8/12/16/28/48 + full:
  <https://m3.material.io/styles/shape/shape-scale-tokens>

### Typography
- **m3.material.io type scale tokens** — 15 baseline + **15 emphasized** styles
  (emphasized = higher weight and/or size, added in the expressive update):
  <https://m3.material.io/styles/typography/type-scale-tokens>
- **Google Sans Flex** (OFL, open-sourced 2025) — verified axes via the Google
  Fonts CSS API: `wght 100–900`, `opsz 14–48`:
  <https://fonts.google.com/specimen/Google+Sans+Flex> ·
  Google Design making-of: <https://design.google/library/google-sans-flex-font/>

### Interaction / elevation
- **State layers** — hover 8%, focus 10%, pressed 10%, dragged 16%,
  hover+focus 12%: <https://m3.material.io/foundations/interaction/states/state-layers>
- **Elevation tokens** — levels 0–5 = 0/1/3/6/8/12 dp:
  <https://m3.material.io/styles/elevation/tokens>

## Component specs with verified
 defaults (MDC-Android docs)

### Slider — <https://github.com/material-components/material-components-android/blob/master/docs/components/Slider.md>
| Attribute | Default |
|---|---|
| trackHeight | 16dp |
| thumbWidth | 4dp |
| thumbHeight | 44dp |
| trackStopIndicatorSize | 4dp |
| trackCornerSize | trackHeight / 2 |
| trackInsideCornerSize | 2dp |
| labelBehavior | floating |
| minSeparation (adjacent thumbs) | 0dp |

### Wavy progress — <https://github.com/material-components/material-components-android/blob/master/docs/components/ProgressIndicator.md>
| Attribute | Default |
|---|---|
| waveAmplitude | 0 (flat; wave disabled until set) |
| wavelength | 0 |
| waveAmplitudeRampProgressMin | 0.1 |
| indicatorInset | 4dp |
| Wavy recommendation: trackCornerRadius | 4dp |
| Wavy recommendation: indicatorSize (linear) | 44dp |

Compose defaults: `amplitude = WavyProgressIndicatorDefaults.indicatorAmplitude`
(1f), `wavelength = LinearDeterminateWavelength`, `waveSpeed = wavelength`
(<https://kotlinlang.org/api/compose-multiplatform/material3/androidx.compose.material3/-linear-wavy-progress-indicator.html>)

### Loading indicator
- Morphs between shapes while loading; shape set configurable:
  <https://joebirch.co/android/material-3-expressive-for-compose-loading-indicator/>
- 9to5Google coverage of the Android 16 indicator:
  <https://9to5google.com/2025/05/16/material-3-expressive-loading-indicator/>

### Carousel layout strategies
- Multi-browse: at least one large, medium, and small item visible:
  <https://m3.material.io/components/carousel/guidelines>
- MDC-Android carousel docs:
  <https://github.com/material-components/material-components-android/blob/master/docs/components/Carousel.md>

### Lists (expressive shapes) — <https://m3.material.io/components/lists/specs>
Common set combines baseline tokens with new expressive shapes and sizes.

### Button groups / split buttons
- <https://m3.material.io/components/button-groups/specs> — standard groups add
  paddin
g between buttons, scaled to guarantee minimum accessible target size
- <https://m3.material.io/components/split-button/specs> — the menu button
  spins and changes shape when activated

## M3 Expressive overview articles
- Building with M3 Expressive (official blog): <https://m3.material.io/blog/building-with-m3-expressive>
- Supercharge overview: <https://supercharge.design/blog/material-3-expressive>

## Sibling ports (scouted, credit in README Thanks)
- matraic/m3e — from-scratch, 40+ components, bezier approximations
- material-esm/material — MWC fork
- @banegasn/components — Angular M3 components
- abhixv/m3-expressive-design-skill — agent skill with 2,587 reference images
- c-orter/material_3_expressive — Flutter port with live demo
  (<https://paadevelopments.github.io/material_3_expressive/>)
- material3_expressive_loading_indicator (pub.dev) — Flutter wavy/loading set

## Ports found: none on web implement exact linear() spring curves — that remains
this project's differentiator.
