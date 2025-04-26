import { fixture, html, expect } from '@open-wc/testing';
import '../index';

describe('EmployeeList Component', () => {
  it('should render a page title', async () => {
    const el = await fixture(html`<employee-list></employee-list>`);
    const title = el.shadowRoot.querySelector('h2.page-title');
    expect(title).to.exist;
  });

  it('should have currentPage initialized to 1', async () => {
    const el = await fixture(html`<employee-list></employee-list>`);
    expect(el.currentPage).to.equal(1);
  });
});
