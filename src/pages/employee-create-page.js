import { LitElement, html } from 'lit';
import { getLocale } from '@i18n/index';

import '@components/modules/employee-form';

export class EmployeeCreatePage extends LitElement {
  render() {
    const t = getLocale();
    return html`
      <h2 style="text-align:center">${t.addNewEmployee}</h2>
      <employee-form></employee-form>
    `;
  }
}

customElements.define('employee-create-page', EmployeeCreatePage);
