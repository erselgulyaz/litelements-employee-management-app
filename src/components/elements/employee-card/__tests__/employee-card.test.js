import { fixture, html, expect, oneEvent } from '@open-wc/testing';

const staticData = {
  employeeTableColumns: {
    name: 'Ad',
    surname: 'Soyad',
    startDate: 'İşe Başlama',
    birthDate: 'Doğum Tarihi',
    department: 'Departman',
    position: 'Pozisyon',
    email: 'E-posta',
    phone: 'Telefon',
  },
  edit: 'Düzenle',
  delete: 'Sil',
};

vi.mock('@i18n/index', () => {
  return {
    getLocale: vi.fn(() => staticData),
  };
});

import '../index';

const employeeData = {
  firstName: 'Ersel',
  lastName: 'Gülyaz',
  department: 'Tech',
  position: 'Senior',
  email: 'test@example.com',
  phone: '+1234567890',
  employmentDate: '2024-01-10',
  dob: '1990-12-10',
};

const normalize = (s) => s.replace(/\s+/g, ' ').trim();

describe('EmployeeCard Component', () => {
  it('should create a card section without content control', async () => {
    const el = await fixture(html`<employee-card></employee-card>`);
    const card = el.shadowRoot.querySelector('.card');
    expect(card).to.exist;
  });

  it('should create a card filled with employee information', async () => {
    const el = await fixture(
      html`<employee-card .employee=${employeeData}></employee-card>`
    );

    const text = normalize(el.shadowRoot.textContent);

    expect(text).to.contain(`${staticData.employeeTableColumns.name}: ${employeeData.firstName}`);
    expect(text).to.contain(`${staticData.employeeTableColumns.surname}: ${employeeData.lastName}`);
    expect(text).to.contain(`${staticData.employeeTableColumns.startDate}: ${employeeData.employmentDate}`);
    expect(text).to.contain(`${staticData.employeeTableColumns.birthDate}: ${employeeData.dob}`);
    expect(text).to.contain(`${staticData.employeeTableColumns.department}: ${employeeData.department}`);
    expect(text).to.contain(`${staticData.employeeTableColumns.position}: ${employeeData.position}`);
    expect(text).to.contain(`${staticData.employeeTableColumns.email}: ${employeeData.email}`);
    expect(text).to.contain(`${staticData.employeeTableColumns.phone}: ${employeeData.phone}`);

    const buttons = el.shadowRoot.querySelectorAll('.actions button');
    expect(buttons.length).to.equal(2);
    expect(buttons[0].textContent.trim()).to.contain(staticData.edit);
    expect(buttons[1].textContent.trim()).to.contain(staticData.delete);
  });

  it('should dispatch edit-employee event when edit button is clicked', async () => {
    const el = await fixture(html`<employee-card .employee=${employeeData}></employee-card>`);
    const editButton = el.shadowRoot.querySelector('.actions .edit-button');

    const evP = oneEvent(el, 'edit-employee');
    editButton.click();
    const event = await evP;

    expect(event).to.exist;
    expect(event.detail.employee).to.deep.equal(employeeData);
  });
  
  it('should dispatch delete-employee event when delete button is clicked', async () => {
    const el = await fixture(html`<employee-card .employee=${employeeData}></employee-card>`);
    const deleteButton = el.shadowRoot.querySelector('.actions button:last-of-type');

    const evP = oneEvent(el, 'delete-employee');
    deleteButton.click();
    const event = await evP;

    expect(event).to.exist;
    expect(event.detail.employee).to.deep.equal(employeeData);
  });

  it('when .employee prop is change, UI should change', async () => {
    const el = await fixture(
      html`<employee-card .employee=${employeeData}></employee-card>`
    );

    const newEmployeeData = {
      ...employeeData,
      firstName: 'NewName',
      lastName: 'NewSurname',
      position: 'Analytics',
    };
    el.employee = newEmployeeData;
    await el.updateComplete;

    const text = normalize(el.shadowRoot.textContent);
    expect(text).to.contain(`${staticData.employeeTableColumns.position}: ${newEmployeeData.position}`);
    expect(text).to.not.contain('Ersel');
    expect(text).to.not.contain('Gülyaz');
  });

});
