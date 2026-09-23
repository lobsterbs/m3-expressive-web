/**
 * Expressive motion: spring physics for the web.
 *
 * M3 Expressive replaced fixed easing curves with spring physics:
 *  - SPATIAL springs  -> position / scale (bouncy, mirror real object movement)
 *  - EFFECTS springs  -> color / opacity  (smooth, no overshoot)
 *
 * We approximate damped-spring integration with CSS `linear()` easing by
 * sampling the spring ODE. Browsers without `linear()` fall back to the
 * emphasized cubic-bezier curve via `springFallback`.
 *
 * Source: https://m3.material.io/blog/building-with-m3-expressive
 */

/** Damped spring position sample: x(t) for stiffness/damping spring. */
function springSample(t: number, damping: number, stiffness: number, mass = 1): number {
  const omega0 = Math.sqrt(stiffness / mass);
  const zeta = damping / (2 * Math.sqrt(stiffness * mass));
  if (zeta < 1) {
    const omegaD = omega0 * Math.sqrt(1 - zeta * zeta);
    return 1 - Math.exp(-zeta * omega0 * t) * (Math.cos(omegaD * t) + (zeta * omega0 / omegaD) * Math.sin(omegaD * t));
  }
  return 1 - Math.exp(-omega0 * t) * (1 + omega0 * t);
}

/**
 * Sample a spring into a CSS `linear()` easing string.
 * @param durationMs Approximate settle duration.
 * @param damping    Damping coefficient (lower = bouncier).
 * @param stiffness  Spring stiffness (higher = snappier).
 */
export function springToLinear(durationMs = 550, damping = 12, stiffness = 170): string {
  const steps = 24;
  const points: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * (durationMs / 1000);
    const v = springSample(t, damping, stiffness).toFixed(4);
    const pct = ((i / steps) * 100).toFixed(2);
    points.push(i === 0 ? v : i === steps ? v : `${v} ${pct}%`);
  }
  return `linear(${points.join(', ')})`;
}

/** Preset expressive springs (match the tokens in m3-tokens.css). */
export const SPRINGS = {
  /** Spatial spring: position/scale, bouncy. */
  spatial: springToLinear(550, 12, 170),
  /** Effects spring: color/opacity, critically damped (no overshoot). */
  effects: springToLinear(400, 26, 170),
} as const;

/** Bezier fallback for browsers without linear() support. */
export const SPRING_FALLBACK = 'cubic-bezier(0.05, 0.7, 0.1, 1)';

/** Resolve a spring token to a usable easing function at runtime. */
export function resolveSpring(name: keyof typeof SPRINGS = 'spatial'): string {
  if (typeof CSS !== 'undefined' && typeof (CSS as { supports?: (s: string) => boolean }).supports === 'function' && CSS.supports('transition-timing-function', SPRINGS.spatial)) {
    return SPRINGS[name];
  }
  return SPRING_FALLBACK;
}
