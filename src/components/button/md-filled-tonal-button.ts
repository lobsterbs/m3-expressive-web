import { customElement } from 'lit/decorators/custom-element.js';
import { MdButtonBase } from './md-button-base.js';

/** Filled tonal button — secondary emphasis with a softer container. */
@customElement('md-filled-tonal-button')
export class MdFilledTonalButton extends MdButtonBase {
  constructor() {
    super();
    this.variant = 'tonal';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-filled-tonal-button': MdFilledTonalButton;
  }
}
