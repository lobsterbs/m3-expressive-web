import { customElement } from 'lit/decorators/custom-element.js';
import { MdButtonBase } from './md-button-base.js';

/** Outlined button — medium emphasis, important but not primary. */
@customElement('md-outlined-button')
export class MdOutlinedButton extends MdButtonBase {
  constructor() {
    super();
    this.variant = 'outlined';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-outlined-button': MdOutlinedButton;
  }
}
