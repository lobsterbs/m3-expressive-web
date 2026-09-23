/**
 * Shared button base: M3 common buttons (filled, filled tonal, outlined,
 * elevated, text) in one themed class. Shape morphs to the "fully rounded"
 * pill on press — an expressive-update behavior.
 *
 * Source: https://m3.material.io/components/all-buttons
 */
import { LitElement, html, css, nothing } from 'lit';
import { InteractiveController } from '../../internal/interactive.js';
import '../../internal/state-layer.js';
import '../../internal/ripple.js';
import '../../internal/elevation.js';
import '../../internal/focus-ring.js';

export type ButtonVariant = 'filled' | 'tonal' | 'outlined' | 'elevated' | 'text';

export abstract class MdButtonBase extends LitElement {
  static override properties = {
    variant: { type: String },
    disabled: { type: Boolean, reflect: true },
  };

  declare variant: ButtonVariant;
  declare disabled: boolean;
  declare protected interactive: InteractiveController;

  constructor() {
    super();
    this.variant = 'filled';
    this.disabled = false;
    const interactive = new InteractiveController(this);
    this.interactive = interactive;
    this.role = 'button';
    this.tabIndex = 0;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.interactive.wire();
  }

  static override get styles() { return [css`
    :host {
      display: inline-flex;
      position: relative;
      outline: none;
      border-radius: var(--md-comp-button-container-shape, var(--md-sys-shape-corner-full, 9999px));
      height: 40px;
      --_container-color: var(--md-sys-color-primary);
      --_on-container-color: var(--md-sys-color-on-primary);
      color: var(--_on-container-color);
      font: var(--md-sys-typescale-body-medium-weight, 500) var(--md-sys-typescale-label-large-size, 14px) / var(--md-sys-typescale-label-large-line-height, 20px) var(--md-sys-typescale-body-medium-font, 'Roboto', sans-serif);
      letter-spacing: 0.1px;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }
    :host([variant='filled']) { --_container-color: var(--md-sys-color-primary); --_on-container-color: var(--md-sys-color-on-primary); }
    :host([variant='tonal']) { --_container-color: var(--md-sys-color-secondary-container); --_on-container-color: var(--md-sys-color-on-secondary-container); }
    :host([variant='elevated']) { --_container-color: var(--md-sys-color-surface-container-low); --_on-container-color: var(--md-sys-color-primary); }
    :host([variant='outlined']) { --_container-color: transparent; --_on-container-color: var(--md-sys-color-primary); }
    :host([variant='text']) { --_container-color: transparent; --_on-container-color: var(--md-sys-color-primary); }

    button {
      all: unset;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      height: 100%;
      padding: 0 24px;
      border-radius: inherit;
      background: var(--_container-color);
      color: var(--_on-container-color);
      box-sizing: border-box;
      cursor: inherit;
      width: 100%;
      transition: border-radius var(--md-sys-motion-duration-medium-2, 300ms) var(--md-sys-motion-spring-spatial, cubic-bezier(0.05, 0.7, 0.1, 1));
    }
    :host([variant='outlined']) button { box-shadow: inset 0 0 0 1px var(--md-sys-color-outline); }
    :host([variant='elevated']) md-elevation { --md-elevation-level: 1; }
    :host(:not([disabled]):active) button { border-radius: var(--md-sys-shape-corner-medium, 12px); }

    md-state-layer, md-ripple { color: var(--_on-container-color); z-index: 1; }
    :host([disabled]) { pointer-events: none; opacity: 0.38; }
    @media (prefers-reduced-motion: reduce) { button { transition: none; } }
  `]; }

  protected override render() {
    return html`
      ${this.variant === 'elevated' ? html`<md-elevation></md-elevation>` : nothing}
      <button part="button" ?disabled=${this.disabled}>
        <slot></slot>
      </button>
      <md-state-layer .state=${this.interactive.stateLayerState}></md-state-layer>
      <md-ripple ?disabled=${this.disabled}></md-ripple>
      <md-focus-ring></md-focus-ring>
    `;
  }
}
