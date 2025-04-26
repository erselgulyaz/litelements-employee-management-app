import { fixture, html, expect } from '@open-wc/testing';
import './../employee-edit-page';

describe('EmployeeEditPage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should render page title', async () => {
    window.history.pushState({}, '', '/edit/1');
    const el = await fixture(html`<employee-edit-page></employee-edit-page>`);
    const heading = el.shadowRoot.querySelector('h2');
    expect(heading).to.exist;
    expect(heading.textContent).to.not.be.empty;
  });

  /* it('should render employee-form if employee exists', async () => {
    const employeeData = [{ id: 1, firstName: 'Test', lastName: 'User' }];
    localStorage.setItem('employees', JSON.stringify(employeeData));
    window.history.pushState({}, '', '/edit/1');
    const el = await fixture(html`<employee-edit-page></employee-edit-page>`);
    await el.updateComplete;
    const form = el.shadowRoot.querySelector('employee-form');
    expect(form).to.exist;
  }); */
});
