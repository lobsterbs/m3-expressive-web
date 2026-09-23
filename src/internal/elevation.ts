/**
 * <md-elevation> — M3 elevation levels 0-5 as box-shadows.
 *
 * Surface tint is deprecated; elevation is a tokenized shadow level only.
 * The element fills its nearest positioned ancestor and reads
 * `--md-elevation-level` (0-5) to pick a shadow from the system tokens.
 *
 * Source: https://m3.material.io/styles/elevation/tokens
 */
import { LitElement, html, css } from 'lit';

export class MdElevation extends LitElement {
  static override styles = css`
    :host {
      position: absolute;
      inset: 0;
      pointer-events: none;
      border-radius: inherit;
      z-index: -1;
    }
    .shadow {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      transition: box-shadow var(--md-sys-motion-duration-medium-2, 300ms) var(--md-sys-motion-easing-standard, cubic-bezier(0.2, 0, 0, 1));
    }
    .shadow[data-level='0'] { box-shadow: var(--md-sys-elevation-level0); }
    .shadow[data-level='1'] { box-shadow: var(--md-sys-elevation-level1); }
    .shadow[data-level='2'] { box-shadow: var(--md-sys-elevation-level2); }
    .shadow[data-level='3'] { box-shadow: var(--md-sys-elevation-level3); }
    .shadow[data-level='4'] { box-shadow: var(--md-sys-elevation-level4); }
    .shadow[data-level='5'] { box-shadow: var(--md-sys-elevation-level5); }
    @media (prefers-reduced-motion: reduce) { .shadow { transition: none; } }
  `;

  protected override render() {
    return html`<div class="shadow" part="elevation"
      data-level="${this.style.getPropertyValue('--md-elevation-level') || 0}"></div>`;
  }
}

customElements.define('md-elevation', MdElevation);
