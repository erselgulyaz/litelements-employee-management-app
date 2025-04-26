import { fixture, html, expect } from '@open-wc/testing';
import './../employee-create-page';

describe('EmployeeCreatePage', () => {
  it('should render the page title', async () => {
    const el = await fixture(html`<employee-create-page></employee-create-page>`);
    const heading = el.shadowRoot.querySelector('h2');
    expect(heading).to.exist;
    expect(heading.textContent).to.not.be.empty;
  });

  it('should render the employee form component', async () => {
    const el = await fixture(html`<employee-create-page></employee-create-page>`);
    const form = el.shadowRoot.querySelector('employee-form');
    expect(form).to.exist;
  });
});
