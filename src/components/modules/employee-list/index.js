import { LitElement, html } from 'lit';
import { Router } from '@vaadin/router';
import { store } from '@state/store.js';
import { getLocale } from '@i18n/index.js';
import '@components/elements/container';
import '@components/elements/table-visibility-types';
import '@components/elements/employee-table';
import '@components/elements/employee-card';
import '@components/elements/delete-modal';

import { styles } from './styles.js';

export class EmployeeList extends LitElement {
  static styles = styles;

  static properties = {
    employees: { type: Array },
    searchQuery: { type: String },
    currentPage: { type: Number },
    itemsPerPage: { type: Number },
    employeeToDelete: { type: Object },
    viewMode: { type: String },
    selectedEmployees: { type: Object },
    bulkDeleteMode: { type: Boolean },
  };

  constructor() {
    super();
    this.searchQuery = '';
    this.currentPage = 1;
    this.itemsPerPage = 5;
    this.employeeToDelete = null;
    this.viewMode = 'table';
    this.employees = [];
    this.selectedEmployees = new Set();
    this.bulkDeleteMode = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.employees = store.getState('employees');
    this.unsubscribe = store.subscribe((state) => {
      this.employees = state.employees;
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.unsubscribe) this.unsubscribe();
  }

  get filteredEmployees() {
    return this.employees.filter(e =>
      e.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      e.lastName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      e.email.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  get totalPages() {
    return Math.ceil(this.filteredEmployees.length / this.itemsPerPage);
  }

  get paginatedEmployees() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredEmployees.slice(start, start + this.itemsPerPage);
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  goToPage(page) {
    this.currentPage = page;
  }

  toggleSelectAll(e) {
    if (e.target.checked) {
      this.paginatedEmployees.forEach(emp => this.selectedEmployees.add(emp.id));
    } else {
      this.paginatedEmployees.forEach(emp => this.selectedEmployees.delete(emp.id));
    }
    this.requestUpdate();
  }

  toggleSelectEmployee(empId, e) {
    if (e.target.checked) {
      this.selectedEmployees.add(empId);
    } else {
      this.selectedEmployees.delete(empId);
    }
    this.requestUpdate();
  }

  confirmDelete(emp) {
    this.employeeToDelete = emp;
    this.bulkDeleteMode = false;
  }

  confirmBulkDelete() {
    this.bulkDeleteMode = true;
  }

  deleteConfirmed() {
    if (this.bulkDeleteMode) {
      const newList = this.employees.filter(e => !this.selectedEmployees.has(e.id));
      store.setState('employees', newList);
      this.selectedEmployees.clear();
    } else {
      const newList = this.employees.filter(e => e.id !== this.employeeToDelete.id);
      store.setState('employees', newList);
    }
    this.employeeToDelete = null;
    this.bulkDeleteMode = false;
  }

  cancelDelete() {
    this.employeeToDelete = null;
    this.bulkDeleteMode = false;
  }

  goToEdit(emp) {
    Router.go(`/edit/${emp.id}`);
  }

  onViewChange(e) {
    this.viewMode = e.detail.view;
  }

  handleToggleAll(e) {
    const checked = e.detail.checked;
    const newSet = new Set(this.selectedEmployees);

    if (checked) {
      this.paginatedEmployees.forEach(emp => newSet.add(emp.id));
    } else {
      this.paginatedEmployees.forEach(emp => newSet.delete(emp.id));
    }

    this.selectedEmployees = newSet;
  }

  handleToggleOne(e) {
    const { id, checked } = e.detail;
    const newSet = new Set(this.selectedEmployees);

    if (checked) {
      newSet.add(id);
    } else {
      newSet.delete(id);
    }

    this.selectedEmployees = newSet;
  }

  handleEditEmployee(e) {
    const employee = e.detail.employee;
    this.goToEdit(employee);
  }

  handleDeleteEmployee(e) {
    const employee = e.detail.employee;
    this.confirmDelete(employee);
  }

  render() {
    const t = getLocale();

    return html`
      <container-box>
        <h2 class="page-title">${t.pageTitle}</h2>

        <div class="controls">
          <input type="text" class="search-input" placeholder=${t.searchPlaceholder} @input=${(e) => { this.searchQuery = e.target.value; this.currentPage = 1; }}>
          ${this.selectedEmployees.size > 0 ? html`
            <button class="bulk-delete-btn" @click=${this.confirmBulkDelete}>${t.deleteSelectedItems}</button>
          ` : ''}
          <table-visibility-types .activeView=${this.viewMode} @view-change=${this.onViewChange}></table-visibility-types>
        </div>

        ${this.viewMode === 'table' ? html`
          ${this.paginatedEmployees.length > 0 ? html`
            <employee-table
              .employees=${this.paginatedEmployees}
              .selectedEmployees=${this.selectedEmployees}
              @toggle-all=${this.handleToggleAll}
              @toggle-one=${this.handleToggleOne}
              @edit-employee=${(e) => this.goToEdit(e.detail.employee)}
              @delete-employee=${(e) => this.confirmDelete(e.detail.employee)}
            ></employee-table>
          ` : html`
            <p class="empty-content-info">${t.empty}</p>
          `}
        ` : html`
          <div class="card-grid">
            ${this.paginatedEmployees.map(emp => html`
              <employee-card
                .employee=${emp}
                @edit-employee=${(e) => this.goToEdit(e.detail.employee)}
                @delete-employee=${(e) => this.confirmDelete(e.detail.employee)}>
              </employee-card>
            `)}
          </div>
        `}

        <div class="pagination">
          ${this.totalPages > 1 ? html`
            <button class="pagination-button" ?disabled=${this.currentPage === 1} @click=${this.prevPage}>&lt;</button>
            ${Array.from({ length: Math.min(5, this.totalPages) }, (_, i) => i + 1).map(page => html`
              <button class='pagination-button ${this.currentPage === page ? 'active' : ''}' @click=${() => this.goToPage(page)}>${page}</button>
            `)}
            ${this.totalPages > 5 ? html`<span>...</span><button class="pagination-button" @click=${() => this.goToPage(this.totalPages)}>${this.totalPages}</button>` : ''}
            <button class="pagination-button" ?disabled=${this.currentPage === this.totalPages} @click=${this.nextPage}>&gt;</button>
          ` : ''}
        </div>

      </container-box>

      ${this.employeeToDelete || this.bulkDeleteMode ? html`
        <delete-modal
          .open=${this.employeeToDelete || this.bulkDeleteMode}
          .message=${this.bulkDeleteMode
            ? t.deleteModal.allSelectText
            : this.employeeToDelete
              ? `${this.employeeToDelete.firstName} ${this.employeeToDelete.lastName} ${t.deleteModal.singleSelectText}`
              : ''}
          @confirm=${this.deleteConfirmed}
          @cancel=${this.cancelDelete}>
        </delete-modal>
      ` : ''}
    `;
  }
}

customElements.define('employee-list', EmployeeList);
