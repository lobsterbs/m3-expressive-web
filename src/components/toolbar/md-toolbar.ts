/**
 * <md-toolbar> — M3 Expressive toolbar.
 *
 * A flexible container that displays frequently used actions; can hold
 * buttons, icon buttons, and can be paired with a FAB. Morphs its corner
 * shape on hover (expressive shape behavior).
 *
 * Source: https://m3.material.io/components/toolbars (M3 Expressive, May 2025)
 */
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';

@customElement('md-toolbar')
export class MdToolbar extends LitElement {
  static override styles = css`
    :host {
      display: flex;
      align-items: center;
      gap: 8px;
      min-height: 64px;
      padding: 8px 16px;
      border-radius: var(--md-sys-shape-corner-extra-large, 28px);
      background: var(--md-sys-color-surface-container);
      color: var(--md-sys-color-on-surface);
      box-shadow: var(--md-sys-elevation-level2);
      box-sizing: border-box;
      transition: border-radius var(--md-sys-motion-duration-medium-2, 300ms) var(--md-sys-motion-spring-fast-spatial, ease-out);
    }
    :host(:hover) { border-radius: var(--md-sys-shape-corner-extra-extra-large, 48px); }
    .start, .center, .end { display: flex; align-items: center; gap: 8px; }
    .center { flex: 1; }
    @media (prefers-reduced-motion: reduce) { :host { transition: none; } }
  `;

  protected override render() {
    return html`
      <div class="start"><slot name="start"></slot></div>
      <div class="center"><slot></slot></div>
      <div class="end"><slot name="end"></slot></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-toolbar': MdToolbar;
  }
}
