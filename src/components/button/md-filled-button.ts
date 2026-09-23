import { customElement } from 'lit/decorators/custom-element.js';
import { MdButtonBase } from './md-button-base.js';

/** Filled button — highest emphasis, for the primary action of a view. */
@customElement('md-filled-button')
export class MdFilledButton extends MdButtonBase {
  constructor() {
    super();
    this.variant = 'filled';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-filled-button': MdFilledButton;
  }
}
