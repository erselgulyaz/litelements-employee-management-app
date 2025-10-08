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
    const { firstName, lastName, department, position, email, phone, employmentDate, dob } = this.employee;

    const t = getLocale();

    return html`
      <div class="card">
        <div class="column">
          <span class="column-title">${t.employeeTableColumns.name}:</span>
          ${firstName}
        </div>
        <div class="column">
          <span class="column-title">${t.employeeTableColumns.surname}:</span>
          ${lastName}
        </div>
        <div class="column">
          <span class="column-title">${t.employeeTableColumns.startDate}:</span>
          ${employmentDate}
        </div>
        <div class="column">
          <span class="column-title">${t.employeeTableColumns.birthDate}:</span>
          ${dob}
        </div>
        <div class="column">
          <span class="column-title">${t.employeeTableColumns.phone}:</span>
          ${phone}
        </div>
        <div class="column">
          <span class="column-title">${t.employeeTableColumns.email}:</span>
          ${email}
        </div>
        <div class="column">
          <span class="column-title">${t.employeeTableColumns.department}:</span>
          ${department}
        </div>
        <div class="column">
          <span class="column-title">${t.employeeTableColumns.position}:</span>
          ${position}
        </div>
        <div class="actions">
          <button class="edit-button" @click=${this.edit}>
            <span class="icon-wrap">
              <icon-edit />
            </span>
            ${t.edit}
          </button>
          <button @click=${this.delete}>
            <span class="icon-wrap">
              <icon-delete />
            </span>
            ${t.delete}
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define('employee-card', EmployeeCard);
