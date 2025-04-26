import { fixture, html, expect, oneEvent } from '@open-wc/testing';
import '../index';

describe('EmployeeCard Component', () => {
  it('should render a card div', async () => {
    const el = await fixture(html`<employee-card></employee-card>`);
    const card = el.shadowRoot.querySelector('.card');
    expect(card).to.exist;
  });

  it('should dispatch edit-employee event when edit button is clicked', async () => {
    const employeeData = {
      firstName: 'Ersel',
      lastName: 'Gülyaz',
      department: 'Tech',
      position: 'Senior',
      email: 'test@example.com',
      phone: '+1234567890'
    };
    const el = await fixture(html`<employee-card .employee=${employeeData}></employee-card>`);
    const editButton = el.shadowRoot.querySelector('button');

    setTimeout(() => editButton.click());
    const event = await oneEvent(el, 'edit-employee');

    expect(event).to.exist;
    expect(event.detail.employee).to.deep.equal(employeeData);
  });
});
