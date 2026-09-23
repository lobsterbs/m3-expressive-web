/**
 * <md-focus-ring> — visible focus indicator for keyboard navigation.
 *
 * Follows the M3 accessibility requirement: focus states must be visible;
 * the ring only shows for keyboard (not pointer) focus by default.
 */
import { LitElement, html, css } from 'lit';

export class MdFocusRing extends LitElement {
  static override properties = { visible: { type: Boolean, reflect: true } };

  declare visible: boolean;

  constructor() {
    super();
    this.visible = false;
  }

  static override styles = css`
    :host {
      position: absolute;
      inset: -2px;
      pointer-events: none;
      border-radius: inherit;
      display: none;
    }
    :host([visible]) { display: block; }
    .ring {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      outline: 3px solid var(--md-sys-color-primary);
      outline-offset: 2px;
      opacity: 0.9;
    }
  `;

  protected override render() {
    return html`<div class="ring" part="focus-ring"></div>`;
  }
}

customElements.define('md-focus-ring', MdFocusRing);
