/**
 * <md-linear-wavy-progress> and <md-circular-wavy-progress> — M3 Expressive
 * wavy progress indicators.
 *
 * Expressive replacement for classic linear/circular progress: the indicator's
 * path is a sine wave whose amplitude increases with value; the wave travels
 * (gap moves along the track). Exact wavelength/amplitude spec values live in
 * interactive modules — TODO(spec) markers note where to verify.
 *
 * Source: https://m3.material.io/components/progress-indicators (M3 Expressive)
 */
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/** Build a wavy path across [0,trackLen] with amplitude a and wavelength w. */
function wavyPath(trackLen: number, height: number, amp: number, wavelength: number, phase = 0): string {
  const mid = height / 2;
  const steps = Math.ceil(trackLen / 6);
  let d = `M0,${mid.toFixed(1)}`;
  for (let i = 1; i <= steps; i++) {
    const x = (i / steps) * trackLen;
    const t = phase + (i / steps) * (trackLen / wavelength) * Math.PI * 2;
    const y = mid + Math.sin(t) * amp;
    d += ` L${x.toFixed(1)},${y.toFixed(1)}`;
  }
  return d;
}

@customElement('md-linear-wavy-progress')
export class MdLinearWavyProgress extends LitElement {
  @property({ type: Number }) value = 0;   // 0..1
  @property({ type: Boolean }) indeterminate = false;

  static override styles = css`
    :host { display: block; width: 100%; height: 24px; color: var(--md-sys-color-primary); }
    svg { width: 100%; height: 100%; display: block; }
    path { fill: none; stroke: currentColor; stroke-width: 4; stroke-linecap: round; }
  `;

  protected override render() {
    return html`<svg viewBox="0 0 1000 24" preserveAspectRatio="none" role="progressbar"
      aria-valuemin="0" aria-valuemax="100" aria-valuenow=${Math.round(this.value * 100)}>
      <path .d=${wavyPath(1000, 24, Math.min(this.value, 1) * 8, 120)}></path>
    </svg>`;
  }
}

@customElement('md-circular-wavy-progress')
export class MdCircularWavyProgress extends LitElement {
  @property({ type: Number }) value = 0;   // 0..1

  static override styles = css`
    :host { display: inline-block; width: 48px; height: 48px; color: var(--md-sys-color-primary); }
    svg { width: 100%; height: 100%; display: block; }
    path { fill: none; stroke: currentColor; stroke-width: 4; stroke-linecap: round; }
  `;

  protected override render() {
    // Wavy circle: radius modulated by sine as we sweep around.
    const R = 40, cx = 50, cy = 50;
    const pts: string[] = [];
    for (let i = 0; i <= 120; i++) {
      const a = (i / 120) * Math.PI * 2 - Math.PI / 2;
      const r = R + Math.sin(a * 9) * (2 + this.value * 5);
      pts.push(`${i === 0 ? 'M' : 'L'}${(cx + Math.cos(a) * r).toFixed(1)},${(cy + Math.sin(a) * r).toFixed(1)}`);
    }
    const arc = 2 * Math.PI * R * Math.min(Math.max(this.value, 0), 1);
    return html`<svg viewBox="0 0 100 100" role="progressbar"
      aria-valuemin="0" aria-valuemax="100" aria-valuenow=${Math.round(this.value * 100)}>
      <path .d=${pts.join(' ') + ' Z'} style="stroke:color-mix(in srgb, currentColor 30%, transparent)"></path>
      <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor"
        stroke-width="4" stroke-linecap="round"
        stroke-dasharray="${arc} 999" transform="rotate(-90 50 50)"
        style="transition: stroke-dasharray var(--md-sys-motion-duration-medium-4, 400ms) var(--md-sys-motion-spring-fast-effects, ease-out)"></circle>
    </svg>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-linear-wavy-progress': MdLinearWavyProgress;
    'md-circular-wavy-progress': MdCircularWavyProgress;
  }
}
