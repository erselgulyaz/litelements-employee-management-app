import { fixture, html, expect, oneEvent } from '@open-wc/testing';

const staticData = {
  employeeTableColumns: {
    name: 'Ad',
    surname: 'Soyad',
    startDate: 'İşe Başlama',
    employmentDate: 'İşe Başlama',
    birthDate: 'Doğum Tarihi',
    phone: 'Telefon',
    email: 'E-posta',
    department: 'Departman',
    position: 'Pozisyon',
    actions: 'İşlemler',
  },
};

vi.mock('@i18n/index', () => {
  return { getLocale: vi.fn(() => staticData) };
});

vi.mock('@components/icons/edit', () => {
  if (!customElements.get('icon-edit')) {
    customElements.define('icon-edit', class extends HTMLElement {});
  }
  return {};
});
vi.mock('@components/icons/delete', () => {
  if (!customElements.get('icon-delete')) {
    customElements.define('icon-delete', class extends HTMLElement {});
  }
  return {};
});

import '../index';

const employeeData = [
  {
    id: '1',
    firstName: 'Ersel',
    lastName: 'Gülyaz',
    employmentDate: '2024-01-10',
    dob: '1990-12-10',
    phone: '+90 555 000 0001',
    email: 'example@example.com',
    department: 'Tech',
    position: 'Senior',
  },
  {
    id: '2',
    firstName: 'Example',
    lastName: 'Name',
    employmentDate: '2023-05-03',
    dob: '1985-09-09',
    phone: '+90 555 000 0002',
    email: 'example@example.com',
    department: 'Analytics',
    position: 'Junior',
  },
];

describe('EmployeeTable Component', () => {
  it('should render a table element', async () => {
    const el = await fixture(html`<employee-table></employee-table>`);
    const table = el.shadowRoot.querySelector('table');
    expect(table).to.exist;
  });


  it('thead columns validation', async () => {
    const el = await fixture(
      html`<employee-table .employees=${employeeData}></employee-table>`
    );

    const ths = [...el.shadowRoot.querySelectorAll('thead th')].map((th) =>
      th.textContent.trim()
    );

    expect(ths).to.include.members([
      staticData.employeeTableColumns.name,
      staticData.employeeTableColumns.surname,
      staticData.employeeTableColumns.startDate,
      staticData.employeeTableColumns.birthDate,
      staticData.employeeTableColumns.phone,
      staticData.employeeTableColumns.email,
      staticData.employeeTableColumns.department,
      staticData.employeeTableColumns.position,
      staticData.employeeTableColumns.actions,
    ]);
  });

  it('table content rows validation with mock datas', async () => {
    const el = await fixture(
      html`<employee-table .employees=${employeeData}></employee-table>`
    );

    const rows = el.shadowRoot.querySelectorAll('tbody tr');
    expect(rows.length).to.equal(employeeData.length);

    const text = el.shadowRoot.textContent;
    expect(text).to.contain('Ersel');
    expect(text).to.contain('Gülyaz');
    expect(text).to.contain('example@example.com');

    expect(text).to.contain('Example');
    expect(text).to.contain('Name');
    expect(text).to.contain('example@example.com');
  });

  it('should dispatch toggle-all event when select all checkbox is clicked', async () => {
    const el = await fixture(html`<employee-table></employee-table>`);
    const checkbox = el.shadowRoot.querySelector('thead input[type="checkbox"]');

    setTimeout(() => checkbox.click());
    const event = await oneEvent(el, 'toggle-all');

    expect(event).to.exist;
    expect(event.detail.checked).to.be.a('boolean');
  });

  it('When the edit icon is clicked, the "edit-employee" event is published with employee.', async () => {
    const el = await fixture(
      html`<employee-table .employees=${employeeData}></employee-table>`
    );
    const firstDivInAction = el.shadowRoot.querySelector('tbody tr .actions div:first-of-type');
    const eventSelector = oneEvent(el, 'edit-employee');
    firstDivInAction.click();
    const ev = await eventSelector;

    expect(ev.bubbles).to.be.true;
    expect(ev.composed).to.be.true;
    expect(ev.detail).to.deep.equal({ employee: employeeData[0] });
  });

  it('when the delete icon is clicked, the "delete-employee" event is published with employee.', async () => {
    const el = await fixture(
      html`<employee-table .employees=${employeeData}></employee-table>`
    );
    const lastDivInAction = el.shadowRoot.querySelectorAll('tbody tr .actions div:last-of-type')[1];
    const evP = oneEvent(el, 'delete-employee');
    lastDivInAction.click();
    const ev = await evP;

    expect(ev.bubbles).to.be.true;
    expect(ev.composed).to.be.true;
    expect(ev.detail).to.deep.equal({ employee: employeeData[1] });
  });

  it('if employees is empty, the row will not render.', async () => {
    const el = await fixture(
      html`<employee-table .employees=${[]}></employee-table>`
    );
    const rows = el.shadowRoot.querySelectorAll('tbody tr');
    expect(rows.length).to.equal(0);
  });

});
