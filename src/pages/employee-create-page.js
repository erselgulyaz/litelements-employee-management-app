import { LitElement, html } from 'lit';
import { getLocale } from '@i18n/index';

import '@components/modules/employee-form';

export class EmployeeCreatePage extends LitElement {
  render() {
    const t = getLocale();
    return html`
      <container-box>
        <h2 style="color: var(--color-primary); padding: 0 15px;">${t.addNewEmployee}</h2>
        <employee-form></employee-form>
      </container-box>
    `;
  }
}

customElements.define('employee-create-page', EmployeeCreatePage);
