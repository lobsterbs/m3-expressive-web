/**
 * <md-button-group> — M3 Expressive button group with shape morph.
 *
 * Buttons "bump and react" to each other: on press the pressed button keeps
 * its pill shape while neighbors squeeze/morph, using the shape library and
 * expressive spatial spring. This is the flagship expressive mechanic.
 *
 * Source: https://m3.material.io/components/button-groups/overview
 */
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { InteractiveController } from '../../internal/interactive.js';
import '../../internal/state-layer.js';
import '../../internal/ripple.js';
import '../../internal/focus-ring.js';

@customElement('md-button-group')
export class MdButtonGroup extends LitElement {
  static override properties = {
    selected: { type: Number },
  };

  declare selected: number;
  declare private interactive: InteractiveController;

  constructor() {
    super();
    this.selected = 0;
    this.role = 'group';
  }

  static override styles = css`
    :host {
      display: inline-flex;
      gap: 4px;
    }
    ::slotted(*) {
      --md-comp-button-container-shape: var(--md-sys-shape-corner-full, 9999px);
      transition: flex-grow var(--md-sys-motion-duration-medium-4, 400ms) var(--md-sys-motion-spring-spatial, cubic-bezier(0.05, 0.7, 0.1, 1));
      flex: 0 1 auto;
    }
    ::slotted([data-pressed]) { flex-grow: 1.4; }
    @media (prefers-reduced-motion: reduce) { ::slotted(*) { transition: none; } }
  `;

  protected override render() {
    return html`<slot @slotchange=${() => this.#wireChildren()} @pointerdown=${this.#onPointerDown} @pointerup=${this.#onPointerUp} @pointercancel=${this.#onPointerUp}></slot>`;
  }

  #wireChildren(): void {
    this.querySelectorAll(':scope > *').forEach((el) => {
      if (el instanceof HTMLElement) {
        el.addEventListener('pointerdown', () => el.setAttribute('data-pressed', ''));
        const release = () => el.removeAttribute('data-pressed');
        el.addEventListener('pointerup', release);
        el.addEventListener('pointerleave', release);
      }
    });
  }

  #onPointerDown(e: Event): void { this.#reflect(e); }
  #onPointerUp(e: Event): void { this.#reflect(e); }
  #reflect(e: Event): void {
    const target = (e.target as HTMLElement).closest?.(':scope > *');
    if (!target) return;
    this.selected = [...this.children].indexOf(target);
    this.dispatchEvent(new CustomEvent('selection-changed', { detail: { selected: this.selected }, bubbles: true, composed: true }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-button-group': MdButtonGroup;
  }
}
