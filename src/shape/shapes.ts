/**
 * M3 Expressive shape library (web port).
 *
 * The official 35-shape library ships for Android Compose only; on the web we
 * implement shapes as normalized point sequences (0..1 space) rendered as SVG
 * paths and animated with the `morphShapes` helper (Web Animations API +
 * spatial-spring easing). This is the "bump and react" mechanic behind button
 * groups and the loading indicator.
 *
 * Source: https://m3.material.io/styles/shape/shape-morph
 */

export interface M3Shape {
  readonly id: string;
  readonly points: ReadonlyArray<readonly [number, number]>;
}

const circlePoints = (n = 16): Array<readonly [number, number]> =>
  Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    return [0.5 + Math.cos(a) * 0.5, 0.5 + Math.sin(a) * 0.5] as const;
  });

/** Curated subset of the expressive shape library (extends toward all 35). */
export const SHAPES = {
  circle: { id: 'circle', points: circlePoints() },
  square: {
    id: 'square',
    points: [[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]],
  },
  softSquare: {
    id: 'soft-square',
    points: [[0.15, 0], [0.85, 0], [1, 0.15], [1, 0.85], [0.85, 1], [0.15, 1], [0, 0.85], [0, 0.15], [0.15, 0]],
  },
  pill: {
    id: 'pill',
    points: [[0.25, 0], [0.75, 0], [1, 0.5], [0.75, 1], [0.25, 1], [0, 0.5], [0.25, 0]],
  },
  cookie9: {
    id: 'cookie9',
    points: (() => {
      const pts: Array<readonly [number, number]> = [];
      const spikes = 9;
      for (let i = 0; i < spikes * 2; i++) {
        const a = (i / (spikes * 2)) * Math.PI * 2;
        const r = i % 2 === 0 ? 0.5 : 0.38;
        pts.push([0.5 + Math.cos(a) * r, 0.5 + Math.sin(a) * r]);
      }
      pts.push(pts[0]!);
      return pts;
    })(),
  },
  clover4: {
    id: 'clover4',
    points: (() => {
      const pts: Array<readonly [number, number]> = [];
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2;
        const r = i % 3 === 1 ? 0.5 : 0.28;
        pts.push([0.5 + Math.cos(a) * r, 0.5 + Math.sin(a) * r]);
      }
      pts.push(pts[0]!);
      return pts;
    })(),
  },
} as const satisfies Record<string, M3Shape>;

export type ShapeId = keyof typeof SHAPES;

/** Convert a shape to an SVG path in a w x h box. */
export function shapeToPath(shape: M3Shape, w: number, h: number): string {
  return shape.points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${(x * w).toFixed(2)},${(y * h).toFixed(2)}`).join(' ') + ' Z';
}

/**
 * Animate an SVG path element morphing between two shapes with the expressive
 * spatial spring. Point counts should match (use `resampleShape`).
 */
export function morphShapes(
  path: SVGPathElement,
  from: M3Shape,
  to: M3Shape,
  box: { width: number; height: number },
  durationMs = 550
): Animation {
  const a = shapeToPath(from, box.width, box.height);
  const b = shapeToPath(to, box.width, box.height);
  const anim = path.animate(
    [{ d: a }, { d: b }],
    { duration: durationMs, easing: 'cubic-bezier(0.05, 0.7, 0.1, 1)', fill: 'forwards' }
  );
  // WAAPI can't interpolate 'd' in all browsers; set the endpoint too.
  path.setAttribute('d', b);
  return anim;
}

/** Resample a shape to n points (enables morphing between different shapes). */
export function resampleShape(shape: M3Shape, n: number): M3Shape {
  const src = shape.points;
  const out: Array<readonly [number, number]> = [];
  for (let i = 0; i < n; i++) {
    const t = (i / (n - 1)) * (src.length - 1);
    const lo = Math.floor(t);
    const hi = Math.min(lo + 1, src.length - 1);
    const f = t - lo;
    const [x1, y1] = src[lo]!;
    const [x2, y2] = src[hi]!;
    out.push([x1 + (x2 - x1) * f, y1 + (y2 - y1) * f]);
  }
  return { id: shape.id + '-resampled', points: out };
}
