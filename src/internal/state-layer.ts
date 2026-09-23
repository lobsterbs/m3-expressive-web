/**
 * <md-state-layer> — Material 3 state layer primitive.
 *
 * A content-colored overlay whose *opacity* communicates interaction state:
 *   hover 8% | focus 10% | pressed 10% | dragged 16% | hover+focus 12%
 *
 * The layer renders as a pseudo-overlay using currentColor so it inherits the
 * component's on-* color. Reduced motion is honored for transitions.
 *
 * Source: https://m3.material.io/foundations/interaction/states/state-layers
 */
import { LitElement, html, css, nothing } from 'lit';

export type StateLayerState = 'none' | 'hover' | 'focus' | 'hover-and-focus' | 'pressed' | 'dragged';

export class MdStateLayer extends LitElement {
  static override properties = {
    state: { type: String, reflect: true },
  };

  declare state: StateLayerState;

  constructor() {
    super();
    this.state = 'none';
  }

  static override styles = css`
    :host {
      position: absolute;
      inset: 0;
      pointer-events: none;
      border-radius: inherit;
      overflow: hidden;
    }
    .layer {
      position: absolute;
      inset: 0;
      background: currentColor;
      opacity: 0;
      transition: opacity var(--md-sys-motion-duration-short-2, 150ms) var(--md-sys-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1));
    }
    :host([state='hover']) .layer { opacity: var(--md-sys-state-hover-state-layer-opacity, 0.08); }
    :host([state='focus']) .layer { opacity: var(--md-sys-state-focus-state-layer-opacity, 0.10); }
    :host([state='hover-and-focus']) .layer { opacity: var(--md-sys-state-hover-and-focus-state-layer-opacity, 0.12); }
    :host([state='pressed']) .layer { opacity: var(--md-sys-state-pressed-state-layer-opacity, 0.10); }
    :host([state='dragged']) .layer { opacity: var(--md-sys-state-dragged-state-layer-opacity, 0.16); }
    @media (prefers-reduced-motion: reduce) {
      .layer { transition: none; }
    }
  `;

  protected override render() {
    return html`<div class="layer" part="state-layer"></div>`;
  }
}

customElements.define('md-state-layer', MdStateLayer);
