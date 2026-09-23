import { customElement } from 'lit/decorators/custom-element.js';
import { MdButtonBase } from './md-button-base.js';

/** Text button — lowest emphasis, text link-style action. */
@customElement('md-text-button')
export class MdTextButton extends MdButtonBase {
  constructor() {
    super();
    this.variant = 'text';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-text-button': MdTextButton;
  }
}
