/**
 * <md-split-button> — M3 Expressive split button.
 *
 * Pairs a primary button with a connected trailing action that opens a menu.
 * Segments stay visually connected (no gap) with a shared outline on
 * outlined variants; inner edges are squared where the segments meet.
 *
 * Source: https://m3.material.io/components/split-button
 */
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { InteractiveController } from '../../internal/interactive.js';
import '../../internal/state-layer.js';
import '../../internal/ripple.js';
import '../../internal/elevation.js';
import '../../internal/focus-ring.js';

@customElement('md-split-button')
export class MdSplitButton extends LitElement {
  static override properties = {
    variant: { type: String },      // filled | tonal | outlined | elevated
    open: { type: Boolean, reflect: true },
  };

  declare variant: 'filled' | 'tonal' | 'outlined' | 'elevated';
  declare open: boolean;
  declare private interactive: InteractiveController;

  constructor() {
    super();
    this.variant = 'filled';
    this.open = false;
    this.interactive = new InteractiveController(this);
    this.tabIndex = 0;
  }

  static override styles = css`
    :host {
      display: inline-flex;
      position: relative;
      outline: none;
      height: 40px;
      border-radius: var(--md-sys-shape-corner-full, 9999px);
      --_container-color: var(--md-sys-color-primary);
      --_on-container-color: var(--md-sys-color-on-primary);
      transition: border-radius var(--md-sys-motion-duration-medium-2, 300ms) var(--md-sys-motion-spring-fast-spatial, ease-out);
    }
    :host([variant='tonal']) { --_container-color: var(--md-sys-color-secondary-container); --_on-container-color: var(--md-sys-color-on-secondary-container); }
    :host([variant='outlined']) { --_container-color: transparent; --_on-container-color: var(--md-sys-color-primary); }
    :host([variant='elevated']) { --_container-color: var(--md-sys-color-surface-container-low); --_on-container-color: var(--md-sys-color-primary); }

    .segment {
      all: unset;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      background: var(--_container-color);
      color: var(--_on-container-color);
      cursor: pointer;
      box-sizing: border-box;
      position: relative;
    }
    .primary { padding: 0 24px 0 24px; border-radius: var(--md-sys-shape-corner-full, 9999px) 0 0 var(--md-sys-shape-corner-full, 9999px); }
    .chevron { padding: 0 12px; border-radius: 0 var(--md-sys-shape-corner-full, 9999px) var(--md-sys-shape-corner-full, 9999px) 0; }
    :host([variant='outlined']) .segment { box-shadow: inset 0 0 0 1px var(--md-sys-color-outline); }
    .chevron::before { content: ''; position: absolute; left: 0; top: 8px; bottom: 8px; width: 1px; background: currentColor; opacity: 0.3; }

    .chevron svg { transition: transform var(--md-sys-motion-duration-medium-2, 300ms) var(--md-sys-motion-spring-fast-spatial, ease-out); }
    :host([open]) .chevron svg { transform: rotate(180deg); }

    md-elevation { --md-elevation-level: 1; }
    :host([variant='elevated']) md-elevation { display: block; }
    md-elevation { display: none; }

    .menu {
      position: absolute;
      top: calc(100% + 8px);
      right: 0;
      min-width: 160px;
      background: var(--md-sys-color-surface-container);
      border-radius: var(--md-sys-shape-corner-medium, 12px);
      padding: 8px 0;
      display: none;
      box-shadow: var(--md-sys-elevation-level2);
      z-index: 8;
    }
    :host([open]) .menu { display: block; }
    ::slotted([slot='item']) {
      display: flex;
      padding: 10px 16px;
      cursor: pointer;
      font: 400 14px/20px var(--md-sys-typescale-body-medium-font, 'Roboto', sans-serif);
    }
    ::slotted([slot='item']:hover) { background: color-mix(in srgb, var(--md-sys-color-on-surface) 8%, transparent); }

    md-state-layer, md-ripple { color: var(--_on-container-color); }
    @media (prefers-reduced-motion: reduce) { .chevron svg, :host { transition: none; } }
  `;

  protected override render() {
    return html`
      <md-elevation></md-elevation>
      <div style="display:contents">
        <button class="segment primary" part="primary">
          <slot></slot>
        </button>
        <button class="segment chevron" part="chevron" aria-haspopup="menu" aria-expanded=${this.open ? 'true' : 'false'}
          @click=${() => { this.open = !this.open; this.dispatchEvent(new CustomEvent('open-changed', { detail: { open: this.open }, bubbles: true, composed: true })); }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <md-state-layer .state=${this.interactive.stateLayerState}></md-state-layer>
        <md-ripple></md-ripple>
        <md-focus-ring></md-focus-ring>
        <div class="menu" role="menu" @click=${() => { this.open = false; }}>
          <slot name="item"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-split-button': MdSplitButton;
  }
}
