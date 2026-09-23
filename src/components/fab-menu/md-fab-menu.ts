/**
 * <md-fab-menu> — M3 Expressive FAB menu.
 *
 * A FAB that opens a connected menu of related actions with expressive spring
 * motion: items scale in with the spatial spring, staggered.
 *
 * Source: https://m3.material.io/components/floating-action-button (FAB menu)
 */
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { InteractiveController } from '../../internal/interactive.js';
import '../../internal/state-layer.js';
import '../../internal/ripple.js';
import '../../internal/elevation.js';
import '../../internal/focus-ring.js';

@customElement('md-fab-menu')
export class MdFabMenu extends LitElement {
  static override properties = { open: { type: Boolean, reflect: true }, label: { type: String } };

  declare open: boolean;
  declare label: string;
  declare private interactive: InteractiveController;

  constructor() {
    super();
    this.open = false;
    this.label = 'Create';
    this.interactive = new InteractiveController(this);
    this.tabIndex = 0;
  }

  static override styles = css`
    :host {
      display: inline-flex;
      position: relative;
      outline: none;
    }
    .fab {
      all: unset;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      height: 56px;
      min-width: 56px;
      padding: 0 16px;
      border-radius: var(--md-sys-shape-corner-large, 16px);
      background: var(--md-sys-color-primary-container);
      color: var(--md-sys-color-on-primary-container);
      font: 500 var(--md-sys-typescale-label-large-size, 14px) / var(--md-sys-typescale-label-large-line-height, 20px) var(--md-sys-typescale-body-medium-font, 'Roboto', sans-serif);
      cursor: pointer;
      transition: border-radius var(--md-sys-motion-duration-medium-2, 300ms) var(--md-sys-motion-spring-spatial, cubic-bezier(0.05, 0.7, 0.1, 1));
    }
    .fab:hover { border-radius: var(--md-sys-shape-corner-extra-large, 28px); }
    .fab:active { border-radius: var(--md-sys-shape-corner-medium, 12px); }
    md-elevation { --md-elevation-level: 3; }

    .menu {
      position: absolute;
      bottom: calc(100% + 16px);
      left: 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
      pointer-events: none;
    }
    ::slotted([slot='item']) {
      opacity: 0;
      transform: scale(0.5) translateY(16px);
      transition: opacity var(--md-sys-motion-duration-medium-2, 300ms) var(--md-sys-motion-spring-effects, ease-out),
                  transform var(--md-sys-motion-duration-medium-4, 400ms) var(--md-sys-motion-spring-spatial, cubic-bezier(0.05, 0.7, 0.1, 1));
    }
    :host([open]) ::slotted([slot='item']) { opacity: 1; transform: none; pointer-events: auto; }
    :host([open]) ::slotted([slot='item']:nth-child(1)) { transition-delay: 0ms; }
    :host([open]) ::slotted([slot='item']:nth-child(2)) { transition-delay: 40ms; }
    :host([open]) ::slotted([slot='item']:nth-child(3)) { transition-delay: 80ms; }
    @media (prefers-reduced-motion: reduce) { .fab, ::slotted([slot='item']) { transition: none; } }
  `;

  protected override render() {
    return html`
      <md-elevation></md-elevation>
      <button class="fab" part="fab" aria-expanded=${this.open ? 'true' : 'false'} aria-haspopup="menu"
        @click=${() => { this.open = !this.open; this.dispatchEvent(new CustomEvent('open-changed', { detail: { open: this.open }, bubbles: true, composed: true })); }}>
        <slot name="icon"></slot>
        <span>${this.label}</span>
      </button>
      <md-state-layer .state=${this.interactive.stateLayerState}></md-state-layer>
      <md-ripple></md-ripple>
      <md-focus-ring></md-focus-ring>
      <div class="menu" role="menu" ?inert=${!this.open}>
        <slot name="item"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-fab-menu': MdFabMenu;
  }
}
