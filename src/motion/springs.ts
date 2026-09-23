/**
 * Expressive motion: spring physics for the web — EXACT spec values.
 *
 * M3 Expressive replaced fixed easing curves with spring physics. The canonical
 * spring constants come from MDC-Android `motion/res/values/tokens.xml` (shared
 * with Jetpack Compose's ExpressiveMotionTokens):
 *
 *   fast-spatial    damping 0.9  stiffness 1400   (buttons, switches — small components)
 *   fast-effects    damping 1.0  stiffness 3800   (small component color/opacity)
 *   default-spatial damping 0.9  stiffness 700    (bottom sheets, drawers — partial screen)
 *   default-effects damping 1.0  stiffness 1600   (partial-screen effects)
 *   slow-spatial    damping 0.9  stiffness 300     (full-screen transitions)
 *   slow-effects    damping 1.0  stiffness 800     (full-screen color/opacity)
 *
 * Per the spec, ALL component motion is driven by two tokens:
 *   expressive fast spatial + expressive fast effects.
 * (https://m3.material.io/styles/motion/overview/how-it-works)
 *
 * We integrate the damped harmonic oscillator at authoring time and emit
 * sampled CSS `linear()` easing strings (see m3-tokens.css for the generated
 * curves). Browsers without `linear()` fall back to an emphasized bezier.
 *
 * Sources:
 *  - https://m3.material.io/styles/motion/overview/how-it-works
 *  - https://github.com/material-components/material-components-android/blob/master/docs/theming/Motion.md
 */

/** Damped harmonic oscillator response to a unit step at time t (seconds). */
export function springPosition(t: number, dampingRatio: number, stiffness: number, mass = 1): number {
  const omega0 = Math.sqrt(stiffness / mass);
  if (dampingRatio < 1) {
    const omegaD = omega0 * Math.sqrt(1 - dampingRatio * dampingRatio);
    return 1 - Math.exp(-dampingRatio * omega0 * t) *
      (Math.cos(omegaD * t) + ((dampingRatio * omega0) / omegaD) * Math.sin(omegaD * t));
  }
  return 1 - Math.exp(-omega0 * t) * (1 + omega0 * t);
}

/** The six canonical M3 motion springs (dampingRatio, stiffness, settle ms). */
export const M3_SPRINGS = {
  'fast-spatial':    { dampingRatio: 0.9, stiffness: 1400, settleMs: 500 },
  'fast-effects':    { dampingRatio: 1.0, stiffness: 3800, settleMs: 500 },
  'default-spatial': { dampingRatio: 0.9, stiffness: 700,  settleMs: 750 },
  'default-effects': { dampingRatio: 1.0, stiffness: 1600, settleMs: 750 },
  'slow-spatial':    { dampingRatio: 0.9, stiffness: 300,  settleMs: 1300 },
  'slow-effects':    { dampingRatio: 1.0, stiffness: 800,  settleMs: 1300 },
} as const;

export type M3SpringName = keyof typeof M3_SPRINGS;

/**
 * Sample a canonical M3 spring into a CSS `linear()` easing string.
 * Used to regenerate the `--md-sys-motion-spring-*` tokens in m3-tokens.css.
 */
export function springToLinear(name: M3SpringName, steps = 32): string {
  const { dampingRatio, stiffness, settleMs } = M3_SPRINGS[name];
  const points: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * (settleMs / 1000);
    const raw = springPosition(t, dampingRatio, stiffness);
    const v = i === steps ? 1 : Math.max(-0.05, Math.min(1.15, raw)).toFixed(4);
    points.push(i === 0 || i === steps ? String(v) : `${v} ${((i / steps) * 100).toFixed(2)}%`);
  }
  return `linear(${points.join(', ')})`;
}

/** Bezier fallback for browsers without linear() support (emphasized decelerate). */
export const SPRING_FALLBACK = 'cubic-bezier(0.05, 0.7, 0.1, 1)';

/** Resolve a spring name to a usable easing at runtime (with fallback). */
export function resolveSpring(name: M3SpringName = 'fast-spatial'): string {
  const curve = springToLinear(name);
  if (typeof CSS !== 'undefined' && CSS.supports?.('transition-timing-function', curve)) {
    return curve;
  }
  return SPRING_FALLBACK;
}
