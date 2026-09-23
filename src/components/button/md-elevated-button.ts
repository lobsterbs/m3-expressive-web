import { customElement } from 'lit/decorators/custom-element.js';
import { MdButtonBase } from './md-button-base.js';

/** Elevated button — separated from surface with elevation level 1. */
@customElement('md-elevated-button')
export class MdElevatedButton extends MdButtonBase {
  constructor() {
    super();
    this.variant = 'elevated';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-elevated-button': MdElevatedButton;
  }
}
