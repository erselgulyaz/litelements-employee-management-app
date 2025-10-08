import { LitElement, html } from 'lit';
import { Router } from '@vaadin/router';
import { getLocale } from '@i18n/index';

import '@components/modules/employee-form';

export class EmployeeEditPage extends LitElement {
  static properties = {
    employeeId: { type: Number },
    employee: { type: Object }
  };

  constructor() {
    super();
    this.employeeId = null;
    this.employee = null;
  }

  connectedCallback() {
    super.connectedCallback();
  
    const idStr = window.location.pathname.split('/edit/')[1];
    const id = Number(idStr);
    this.employeeId = id;
  
    const list = JSON.parse(localStorage.getItem('employees') || '[]');
    const found = list.find(e => e.id === id);
    if (found) {
      this.employee = found;
    } else {
      Router.go('/');
    }
  }
  

  render() {
    const t = getLocale();

    return html`
      <container-box>
        <h2 style="color: var(--color-primary); padding: 0 15px;">${t.editEmployee}</h2>
        ${this.employee
          ? html`<employee-form .employee=${this.employee} mode="edit"></employee-form>`
          : html`<p>${t.loading}...</p>`}
      </container-box>
    `;
  }
}

customElements.define('employee-edit-page', EmployeeEditPage);
