import { fixture, html, expect } from '@open-wc/testing';
import './../home-page';

describe('HomePage', () => {
  it('should render employee-list component', async () => {
    const el = await fixture(html`<home-page></home-page>`);
    const employeeList = el.shadowRoot.querySelector('employee-list');
    expect(employeeList).to.exist;
  });
});
