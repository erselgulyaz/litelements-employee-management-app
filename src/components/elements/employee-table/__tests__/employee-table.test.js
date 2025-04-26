import { fixture, html, expect, oneEvent } from '@open-wc/testing';
import '../index';

describe('EmployeeTable Component', () => {
  it('should render a table element', async () => {
    const el = await fixture(html`<employee-table></employee-table>`);
    const table = el.shadowRoot.querySelector('table');
    expect(table).to.exist;
  });

  it('should dispatch toggle-all event when select all checkbox is clicked', async () => {
    const el = await fixture(html`<employee-table></employee-table>`);
    const checkbox = el.shadowRoot.querySelector('thead input[type="checkbox"]');

    setTimeout(() => checkbox.click());
    const event = await oneEvent(el, 'toggle-all');

    expect(event).to.exist;
    expect(event.detail.checked).to.be.a('boolean');
  });
});
