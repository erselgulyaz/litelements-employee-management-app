import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';
import { store } from '@state/store';
import { getLocale } from '@i18n/index';

import '@components/elements/container';

import { styles } from './styles';

export class EmployeeForm extends LitElement {
  static styles = styles;

  static properties = {
    employee: { type: Object },
    errors: { type: Object },
    mode: { type: String },
    showConfirmModal: { type: Boolean }
  };

  constructor() {
    super();
    this.mode = 'create';
    this.showConfirmModal = false;
    this.employee = {
      firstName: '',
      lastName: '',
      dob: '',
      employmentDate: '',
      phone: '',
      email: '',
      department: '',
      position: ''
    };
    this.errors = {};
  }

  willUpdate(changedProps) {
    if (changedProps.has('employee') && this.mode === 'edit') {
      this.employee = { ...this.employee };
    }
  }

  normalizeEmail(email) {
    return (email || '').trim().toLowerCase();
  }
  
  isDuplicateEmployee(emp, list) {
    const email = this.normalizeEmail(emp.email);
    return list.some(e => {
      if (emp.id && e.id === emp.id) return false;
      const eEmail = this.normalizeEmail(e.email);
      return eEmail === email;
    });
  }  

  validate() {
    const t = getLocale();
    const errors = {};
    const phoneDigits = (this.employee.phone || '').replace(/\D/g, '');
  
    if (!this.employee.firstName) errors.firstName = t.formErrors.firstName;
    if (!this.employee.lastName) errors.lastName = t.formErrors.lastName;
    if (!this.employee.dob) errors.dob = t.formErrors.dob;
    if (!this.employee.employmentDate) errors.employmentDate = t.formErrors.employmentDate;
  
    if (!this.employee.phone) {
      errors.phone = t.formErrors.phone;
    } else if (!/^\d{10,15}$/.test(phoneDigits)) {
      errors.phone = t.formErrors.phoneNotCorrect;
    }
  
    if (!this.employee.email || !this.employee.email.includes('@')) {
      errors.email = t.formErrors.emailNotCorrect;
    }
  
    if (!this.employee.department) errors.department = t.formErrors.department;
    if (!this.employee.position)   errors.position   = t.formErrors.position;
  
    const list = store.getState('employees') || [];
    if (this.isDuplicateEmployee(this.employee, list)) {
      const existsByEmail = list.some(e => this.normalizeEmail(e.email) === this.normalizeEmail(this.employee.email) && e.id !== this.employee.id);
  
      if (existsByEmail) errors.email = t.formErrors?.emailExists ?? t.formErrors.isUsedEmail;
    }
  
    this.errors = errors;
    return Object.keys(errors).length === 0;
  }  

  handleInput(e) {
    const { name, value } = e.target;
  
    if (name === 'phone') {
      const rawValue = value.replace(/\D/g, '');
      let formattedValue = '';
  
      if (rawValue.length > 0) {
        formattedValue += '(' + rawValue.substring(0, 3);
      }
      if (rawValue.length >= 4) {
        formattedValue += ') ' + rawValue.substring(3, 6);
      }
      if (rawValue.length >= 7) {
        formattedValue += ' ' + rawValue.substring(6, 8);
      }
      if (rawValue.length >= 9) {
        formattedValue += ' ' + rawValue.substring(8, 10);
      }
  
      this.employee = { ...this.employee, [name]: formattedValue };
    } else {
      this.employee = { ...this.employee, [name]: value };
    }
  }  

  handleSubmit(e) {
    e.preventDefault();
    if (!this.validate()) return;

    if (this.mode === 'edit') {
      this.showConfirmModal = true;
    } else {
      this.saveNewEmployee();
    }
  }

  saveNewEmployee() {
    const list = store.getState('employees') || [];
    if (this.isDuplicateEmployee(this.employee, list)) {
      this.validate();
      return;
    }
    const newId = list.length > 0 ? Math.max(...list.map(emp => emp.id || 0)) + 1 : 1;
    const newList = [...list, { ...this.employee, id: newId }];
    store.setState('employees', newList);
    Router.go('/');
  }
  
  confirmUpdate() {
    const list = store.getState('employees') || [];
    if (this.isDuplicateEmployee(this.employee, list)) {
      this.validate();
      this.showConfirmModal = false;
      return;
    }
    const updatedList = list.map(emp =>
      emp.id === this.employee.id ? { ...this.employee } : emp
    );
    store.setState('employees', updatedList);
    this.showConfirmModal = false;
    Router.go('/');
  }  

  cancelUpdate() {
    this.showConfirmModal = false;
  }

  render() {
    const t = getLocale();

    return html`
      <container-box>
        <form class="form-wrapper" @submit=${this.handleSubmit}>
          ${this.employee.id ? html`<div class="edit-message">You are editing ${this.employee.firstName} ${this.employee.lastName}</div>` : null}
          <div class="form-item">
            <label>${t.formLabels.firstName}</label>
            <input name="firstName" .value=${this.employee.firstName} @input=${this.handleInput} />
            ${this.errors.firstName ? html`<div class="error">${this.errors.firstName}</div>` : ''}
          </div>
  
          <div class="form-item">
            <label>${t.formLabels.lastName}</label>
            <input name="lastName" .value=${this.employee.lastName} @input=${this.handleInput} />
            ${this.errors.lastName ? html`<div class="error">${this.errors.lastName}</div>` : ''}
          </div>
  
          <div class="form-item">
            <label>${t.formLabels.employmentDate}</label>
            <input type="date" name="employmentDate" .value=${this.employee.employmentDate} @input=${this.handleInput} />
            ${this.errors.employmentDate ? html`<div class="error">${this.errors.employmentDate}</div>` : ''}
          </div>

          <div class="form-item">
            <label>${t.formLabels.dob}</label>
            <input type="date" name="dob" .value=${this.employee.dob} @input=${this.handleInput} />
            ${this.errors.dob ? html`<div class="error">${this.errors.dob}</div>` : ''}
          </div>
  
          <div class="form-item">
            <label>${t.formLabels.phone}</label>
            <input name="phone" .value=${this.employee.phone} @input=${this.handleInput} />
            ${this.errors.phone ? html`<div class="error">${this.errors.phone}</div>` : ''}
          </div>
  
          <div class="form-item">
            <label>${t.formLabels.email}</label>
            <input name="email" .value=${this.employee.email} @input=${this.handleInput} />
            ${this.errors.email ? html`<div class="error">${this.errors.email}</div>` : ''}
          </div>
  
          <div class="form-item">
              <label>${t.formLabels.department}</label>
            <select name="department" .value=${this.employee.department} @change=${this.handleInput}>
              <option value="">Seçiniz</option>
              <option value="Analytics">Analytics</option>
              <option value="Tech">Tech</option>
            </select>
            ${this.errors.department ? html`<div class="error">${this.errors.department}</div>` : ''}
          </div>
  
          <div class="form-item">
            <label>${t.formLabels.position}</label>
            <select name="position" .value=${this.employee.position} @change=${this.handleInput}>
              <option value="">Seçiniz</option>
              <option value="Junior">Junior</option>
              <option value="MidLevel">MidLevel</option>
              <option value="Senior">Senior</option>
            </select>
            ${this.errors.position ? html`<div class="error">${this.errors.position}</div>` : ''}
          </div>
          <div class="button-wrap">
            <button class="send-button" type="submit">${this.mode === 'edit' ? t.update : t.save}</button>
            <button class="cancel-button" type="button" @click=${() => window.history.back()}>${t.cancel}</button>
          </div>
        </form>
      </container-box>

      ${this.showConfirmModal ? html`
        <div class="modal">
          <div class="modal-content">
            <button class="close-btn" @click=${this.cancelUpdate}>×</button>
            <div class="modal-body"><strong>${this.employee.firstName} ${this.employee.lastName}</strong> ${t.editModalDescription}</div>
            <div class="modal-actions">
              <button class="proceed-btn" @click=${this.confirmUpdate}>${t.yes}</button>
              <button class="cancel-btn" @click=${this.cancelUpdate}>${t.no}</button>
            </div>
          </div>
        </div>
      ` : ''}
    `;
  }
}

customElements.define('employee-form', EmployeeForm);
