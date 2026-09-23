/**
 * Shared controller wiring the M3 interaction primitives (state layer, ripple,
 * focus ring) into a host component. Ports the pattern used by Material Web's
 * internal SharedFab/SharedButton classes.
 */
import type { LitElement } from 'lit';
import { MdStateLayer, type StateLayerState } from './state-layer.js';
import { MdRipple } from './ripple.js';
import { MdFocusRing } from './focus-ring.js';

export class InteractiveController {
  #host: LitElement;
  hovered = false;
  focused = false;
  pressed = false;

  constructor(host: LitElement) {
    this.#host = host;
    host.addController(this);
  }

  hostUpdated(): void { /* re-render driven by host state */ }

  get stateLayerState(): StateLayerState {
    if (this.pressed) return 'pressed';
    if (this.hovered && this.focused) return 'hover-and-focus';
    if (this.hovered) return 'hover';
    if (this.focused) return 'focus';
    return 'none';
  }

  wire(): void {
    const el = this.#host as unknown as HTMLElement & { disabled?: boolean };
    el.addEventListener('pointerenter', () => { this.hovered = true; this.#host.requestUpdate(); });
    el.addEventListener('pointerleave', () => { this.hovered = false; this.pressed = false; this.#host.requestUpdate(); });
    el.addEventListener('pointerdown', (e) => {
      if (el.disabled) return;
      this.pressed = true;
      this.#ripple()?.startPress(e as PointerEvent);
      this.#host.requestUpdate();
    });
    const release = () => { this.pressed = false; this.#ripple()?.endPress(); this.#host.requestUpdate(); };
    el.addEventListener('pointerup', release);
    el.addEventListener('pointercancel', release);
    el.addEventListener('focus', () => { this.focused = true; this.#ring().visible = true; this.#host.requestUpdate(); });
    el.addEventListener('blur', () => { this.focused = false; this.#ring().visible = false; this.#host.requestUpdate(); });
    el.addEventListener('keydown', (e) => { if ((e as KeyboardEvent).key === ' ' || (e as KeyboardEvent).key === 'Enter') { this.pressed = true; this.#host.requestUpdate(); } });
    el.addEventListener('keyup', () => { this.pressed = false; this.#host.requestUpdate(); });
  }

  #ripple(): MdRipple | null { return this.#host.renderRoot.querySelector('md-ripple'); }
  #ring(): MdFocusRing { return this.#host.renderRoot.querySelector('md-focus-ring')!; }
}

declare module 'lit' {
  interface ReactiveElementHost {
    addController(c: { hostUpdated?(): void }): void;
  }
}
