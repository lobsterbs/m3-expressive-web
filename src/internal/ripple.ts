/**
 * <md-ripple> — pressed-state ripple on top of the state layer.
 *
 * Ports the Material Web ripple: a growing circle from the pointer position
 * on press, fading out on release. Colors inherit via currentColor.
 */
import { LitElement, html, css } from 'lit';

interface RippleAnimation {
  readonly startEvent: PointerEvent;
  grewTo: number;
  animation: Animation | null;
}

export class MdRipple extends LitElement {
  static override properties = {
    disabled: { type: Boolean, reflect: true },
  };

  declare disabled: boolean;
  #ripples: RippleAnimation[] = [];

  constructor() {
    super();
    this.disabled = false;
  }

  static override styles = css`
    :host {
      position: absolute;
      inset: 0;
      pointer-events: none;
      border-radius: inherit;
      overflow: hidden;
      display: none;
    }
    :host(:not([disabled])) { display: block; }
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: currentColor;
      opacity: var(--md-sys-state-pressed-state-layer-opacity, 0.10);
      transform: scale(0);
    }
  `;

  protected override render() {
    return html`${this.#ripples.map((r, i) => this.#renderRipple(r, i))}`;
  }

  #renderRipple(r: RippleAnimation, index: number) {
    const maxDim = Math.max(this.clientWidth, this.clientHeight) || 96;
    const radius = maxDim;
    const { left, top } = this.getBoundingClientRect();
    const x = r.startEvent.clientX - left;
    const y = r.startEvent.clientY - top;
    return html`<div class="ripple"
      style="left:${x - radius / 2}px; top:${y - radius / 2}px; width:${radius}px; height:${radius}px;"
      data-index="${index}"></div>`;
  }

  /** Spawn a ripple at a pointer position. Call on pointerdown. */
  async startPress(event: PointerEvent): Promise<void> {
    if (this.disabled) return;
    const ripple: RippleAnimation = { startEvent: event, grewTo: 0, animation: null };
    this.#ripples.push(ripple);
    this.requestUpdate();
    await this.updateComplete;
    const el = this.shadowRoot?.querySelector<HTMLDivElement>(`[data-index="${this.#ripples.length - 1}"]`);
    if (!el) return;
    ripple.animation = el.animate(
      [{ transform: 'scale(0)' }, { transform: 'scale(1)' }],
      { duration: 450, fill: 'forwards', easing: 'cubic-bezier(0.2, 0, 0, 1)' }
    );
  }

  /** Release the most recent ripple. Call on pointerup/pointercancel. */
  async endPress(): Promise<void> {
    const ripple = this.#ripples.pop();
    if (!ripple?.animation) return;
    const el = this.shadowRoot?.querySelector<HTMLDivElement>(`[data-index="${this.#ripples.length}"]`);
    const fade = el?.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 250, fill: 'forwards' });
    await fade?.finished;
    ripple.animation.cancel();
    this.requestUpdate();
  }
}

customElements.define('md-ripple', MdRipple);
