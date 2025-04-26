import { LitElement, html } from 'lit';
import { getLocale } from '@i18n/index';

import { styles } from './styles';

export class EmployeeCard extends LitElement {
  static styles = styles;

  static properties = {
    employee: { type: Object },
    t: { type: Object },
  };

  constructor() {
    super();
    this.employee = {};
    this.t = {};
  }

  edit() {
    this.dispatchEvent(new CustomEvent('edit-employee', {
      detail: { employee: this.employee },
      bubbles: true,
      composed: true,
    }));
  }

  delete() {
    this.dispatchEvent(new CustomEvent('delete-employee', {
      detail: { employee: this.employee },
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    const { firstName, lastName, department, position, email, phone } = this.employee;
    const t = getLocale();

    return html`
      <div class="card">
        <span class="line"><strong>${firstName} ${lastName}</strong></span>
        <span class="line">${t.employeeTableColumns.department}: ${department}</span>
        <span class="line">${t.employeeTableColumns.position}: ${position}</span>
        <span class="line">${t.employeeTableColumns.email}: ${email}</span>
        <span class="line">${t.employeeTableColumns.phone}: ${phone}</span>
        <div class="actions">
          <button @click=${this.edit}>${t.edit}</button>
          <button @click=${this.delete}>${t.delete}</button>
        </div>
      </div>
    `;
  }
}

customElements.define('employee-card', EmployeeCard);
