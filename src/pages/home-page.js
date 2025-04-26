import { LitElement, html } from 'lit';
import '../components/modules/employee-list';

export class HomePage extends LitElement {
  render() {
    return html`
      <employee-list></employee-list>
    `;
  }
}

customElements.define('home-page', HomePage);
