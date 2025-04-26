import { LitElement, html } from 'lit';
import { styles } from './styles';

export class Container extends LitElement {
  static styles = styles;

  render() {

    return html`<div class="container">
        <slot></slot>
    </div>`;
  }
}

customElements.define('container-box', Container);
