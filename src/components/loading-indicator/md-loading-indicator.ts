/**
 * <md-loading-indicator> — M3 Expressive loading indicator.
 *
 * Cycles through shape library shapes with shape morph to show progress with
 * style (the expressive replacement for determinate spinners in short waits).
 * Waveform/thickness customizable via CSS custom properties.
 *
 * Source: https://m3.material.io/components/loading-indicator/overview
 */
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { SHAPES, shapeToPath, type M3Shape } from '../../shape/shapes.js';

const CYCLE: M3Shape[] = [SHAPES.softSquare, SHAPES.circle, SHAPES.clover4, SHAPES.cookie9, SHAPES.pill];

@customElement('md-loading-indicator')
export class MdLoadingIndicator extends LitElement {
  static override properties = { running: { type: Boolean, reflect: true } };

  declare running: boolean;
  #raf = 0;
  #step = 0;

  constructor() {
    super();
    this.running = true;
  }

  static override styles = css`
    :host {
      display: inline-block;
      width: 48px;
      height: 48px;
      color: var(--md-sys-color-primary);
    }
    svg { width: 100%; height: 100%; display: block; }
    path {
      fill: currentColor;
      transform-origin: center;
    }
  `;

  protected override render() {
    return html`<svg viewBox="0 0 100 100" role="progressbar" aria-label="Loading">
      <path .d=${shapeToPath(CYCLE[0]!, 100, 100)}></path>
    </svg>`;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) this.#start();
  }

  override disconnectedCallback(): void {
    this.#stop();
    super.disconnectedCallback();
  }

  #start(): void {
    const loop = () => {
      const path = this.shadowRoot?.querySelector('path');
      if (path && this.running) {
        this.#step = (this.#step + 1) % CYCLE.length;
        const from = CYCLE[(this.#step - 1 + CYCLE.length) % CYCLE.length]!;
        const to = CYCLE[this.#step]!;
        path.animate(
          [{ d: shapeToPath(from, 100, 100) }, { d: shapeToPath(to, 100, 100) }],
          { duration: 750, easing: 'cubic-bezier(0.05, 0.7, 0.1, 1)', fill: 'forwards' }
        );
        path.setAttribute('d', shapeToPath(to, 100, 100));
      }
      this.#raf = window.setTimeout(loop, 1200);
    };
    this.#raf = window.setTimeout(loop, 400);
  }

  #stop(): void { clearTimeout(this.#raf); }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-loading-indicator': MdLoadingIndicator;
  }
}
