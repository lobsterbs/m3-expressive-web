/**
 * <md-slider> — M3 Expressive slider.
 *
 * Expressive updates (vs classic M3): taller active track, a large thumb that
 * morphs from pill to rounded square on drag, spring-driven handle growth.
 * Track 4px inactive / 6px active, thumb 44px tall when engaged (classic M3
 * handle is 20x20px). Where the interactive spec modules hide exact values,
 * values are marked TODO(spec).
 *
 * Source: https://m3.material.io/components/sliders (M3 Expressive, May 2025)
 */
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('md-slider')
export class MdSlider extends LitElement {
  @property({ type: Number }) value = 50;
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 100;

  static override styles = css`
    :host {
      display: block;
      position: relative;
      height: 44px;
      width: 100%;
      touch-action: none;
      outline: none;
    }
    .track {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 4px;
      transform: translateY(-50%);
      border-radius: var(--md-sys-shape-corner-full, 9999px);
      background: var(--md-sys-color-surface-container-highest);
      transition: height var(--md-sys-motion-duration-short-4, 200ms) var(--md-sys-motion-spring-fast-spatial, ease-out);
    }
    .track.active {
      left: 0;
      right: auto;
      height: 6px;
      background: var(--md-sys-color-primary);
    }
    .thumb {
      position: absolute;
      top: 50%;
      width: 4px;
      height: 44px;
      border-radius: var(--md-sys-shape-corner-full, 9999px);
      background: var(--md-sys-color-primary);
      transform: translate(-50%, -50%);
      transition:
        height var(--md-sys-motion-duration-medium-2, 300ms) var(--md-sys-motion-spring-fast-spatial, ease-out),
        width var(--md-sys-motion-duration-medium-2, 300ms) var(--md-sys-motion-spring-fast-spatial, ease-out),
        border-radius var(--md-sys-motion-duration-medium-2, 300ms) var(--md-sys-motion-spring-fast-spatial, ease-out);
    }
    :host(:hover) .thumb { height: 44px; }
    :host(:active) .thumb {
      width: 32px;
      height: 44px;
      border-radius: var(--md-sys-shape-corner-medium, 12px); /* TODO(spec): exact engaged corner */
    }
    :host(:focus-visible) { outline: none; }
    .stop {
      position: absolute;
      top: 50%;
      width: 4px;
      height: 4px;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background: var(--md-sys-color-on-surface);
      opacity: 0.4;
      pointer-events: none;
    }
    @media (prefers-reduced-motion: reduce) { .thumb, .track { transition: none; } }
  `;

  protected override render() {
    const pct = ((this.value - this.min) / (this.max - this.min)) * 100;
    return html`
      <div class="track" role="presentation"></div>
      <div class="track active" style="width:${pct}%"></div>
      <div class="thumb" style="left:${pct}%"></div>
      <input type="range"
        min=${this.min} max=${this.max} .value=${String(this.value)}
        aria-label="slider"
        style="position:absolute;inset:0;opacity:0;cursor:pointer;width:100%;margin:0"
        @input=${this.#onInput}>
    `;
  }

  #onInput(e: Event): void {
    this.value = Number((e.target as HTMLInputElement).value);
    this.dispatchEvent(new CustomEvent('value-changed', { detail: { value: this.value }, bubbles: true, composed: true }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-slider': MdSlider;
  }
}
