import { LitElement, html } from 'lit';
import { getLocale } from '@i18n/index';

import '@components/icons/edit';
import '@components/icons/delete';

import { styles } from './styles';

export class EmployeeTable extends LitElement {
  static styles = styles;

  static properties = {
    employees: { type: Array },
    selectedEmployees: { type: Object }
  };

  constructor() {
    super();
    this.employees = [];
    this.selectedEmployees = new Set();
  }

  toggleSelectAll(e) {
    this.dispatchEvent(new CustomEvent('toggle-all', {
      detail: { checked: e.target.checked },
      bubbles: true,
      composed: true
    }));
  }

  toggleSelectOne(empId, e) {
    this.dispatchEvent(new CustomEvent('toggle-one', {
      detail: { id: empId, checked: e.target.checked },
      bubbles: true,
      composed: true
    }));
  }

  editEmployee(emp) {
    this.dispatchEvent(new CustomEvent('edit-employee', {
      detail: { employee: emp },
      bubbles: true,
      composed: true
    }));
  }

  deleteEmployee(emp) {
    this.dispatchEvent(new CustomEvent('delete-employee', {
      detail: { employee: emp },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    const t = getLocale();
    return html`
      <table>
        <thead>
          <tr>
            <th><input type="checkbox" @change=${this.toggleSelectAll}></th>
            <th>${t.employeeTableColumns.name}</th>
            <th>${t.employeeTableColumns.surname}</th>
            <th>${t.employeeTableColumns.startDate}</th>
            <th>${t.employeeTableColumns.birthDate}</th>
            <th>${t.employeeTableColumns.phone}</th>
            <th>${t.employeeTableColumns.email}</th>
            <th>${t.employeeTableColumns.department}</th>
            <th>${t.employeeTableColumns.position}</th>
            <th>${t.employeeTableColumns.actions}</th>
          </tr>
        </thead>
        <tbody>
          ${this.employees.map(emp => html`
            <tr>
              <td>
                <span class="mobile-column">${t.employeeTableColumns.select}: </span>
                <input
                  type="checkbox"
                  .checked=${this.selectedEmployees.has(emp.id)}
                  @change=${(e) => this.toggleSelectOne(emp.id, e)}
                >
              </td>
              <td><span class="mobile-column">${t.employeeTableColumns.name}: </span>${emp.firstName}</td>
              <td><span class="mobile-column">${t.employeeTableColumns.surname}: </span>${emp.lastName}</td>
              <td><span class="mobile-column">${t.employeeTableColumns.employmentDate}: </span>${emp.employmentDate}</td>
              <td><span class="mobile-column">${t.employeeTableColumns.birthDate}: </span>${emp.dob}</td>
              <td><span class="mobile-column">${t.employeeTableColumns.phone}: </span>${emp.phone}</td>
              <td><span class="mobile-column">${t.employeeTableColumns.email}: </span>${emp.email}</td>
              <td><span class="mobile-column">${t.employeeTableColumns.department}: </span>${emp.department}</td>
              <td><span class="mobile-column">${t.employeeTableColumns.position}: </span>${emp.position}</td>
              <td class="actions">
                <span class="mobile-column">${t.employeeTableColumns.actions}: </span>
                <div @click=${() => this.editEmployee(emp)}>
                  <icon-edit />
                </div>
                <div @click=${() => this.deleteEmployee(emp)}>
                  <icon-delete />
                </div>
              </td>
            </tr>
          `)}
        </tbody>
      </table>
    `;
  }
}

customElements.define('employee-table', EmployeeTable);
