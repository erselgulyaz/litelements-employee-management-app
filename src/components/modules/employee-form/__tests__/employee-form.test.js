import { fixture, html, expect } from '@open-wc/testing';
import './../index';

describe('EmployeeForm Component', () => {
  it('should render a form element inside the shadow DOM', async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
    const form = el.shadowRoot.querySelector('form');
    expect(form).to.exist;
  });

  it('should update employee.firstName when typing into firstName input', async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
    const input = el.shadowRoot.querySelector('input[name="firstName"]');
    input.value = 'Ersel';
    input.dispatchEvent(new Event('input'));
    await el.updateComplete;
    expect(el.employee.firstName).to.equal('Ersel');
  });


  it('should show validation errors when submitting empty form', async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
    const form = el.shadowRoot.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    await el.updateComplete;
    
    const errorTexts = el.shadowRoot.querySelectorAll('.error');
    expect(errorTexts.length).to.be.greaterThan(0);
  });
  

});
