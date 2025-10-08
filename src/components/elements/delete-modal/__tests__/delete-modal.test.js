import { fixture, html, expect, oneEvent } from '@open-wc/testing';

const staticData = {
  deleteModal: {
    title: 'Emin misin?',
    okButton: 'Onayla',
    cancelButton: 'Çık',
  },
};

vi.mock('@i18n/index', () => {
  return {
    getLocale: vi.fn(() => staticData),
  };
});

import './../index';

describe('DeleteModal Component', () => {

  it('doesn`t render modal when open is false', async () => {
    const el = await fixture(html`<delete-modal></delete-modal>`);
    const root = el.shadowRoot;
    expect(root.querySelector(".modal")).to.not.exist;
  });

  it('should render modal when open is true', async () => {
    const el = await fixture(html`<delete-modal open message="Test message"></delete-modal>`);
    const modal = el.shadowRoot.querySelector('.modal');
    expect(modal).to.exist;
    expect(modal.querySelector('.modal-body').textContent).to.contain('Test message');
  });

  it('should control "cancel" event when cancel button is clicked', async () => {
    const el = await fixture(html`<delete-modal open message="Test"></delete-modal>`);
    const button = el.shadowRoot.querySelector('.cancel-btn');
    setTimeout(() => button.click());
    const event = await oneEvent(el, 'cancel');
    expect(event).to.exist;
  });

  it('should control "cancel" event when close (X) button is clicked', async () => {
    const el = await fixture(html`<delete-modal open message="Test"></delete-modal>`);
    const button = el.shadowRoot.querySelector('.close-btn');
    setTimeout(() => button.click());
    const event = await oneEvent(el, 'cancel');
    expect(event).to.exist;
  });

  it('when the open prop is set to false while the modal is open, the modal is generated from the DOM.', async () => {
    const el = await fixture(html`<delete-modal open></delete-modal>`);
    expect(el.shadowRoot.querySelector('.modal')).to.exist;

    el.open = false;
    await el.updateComplete;

    expect(el.shadowRoot.querySelector('.modal')).to.not.exist;
  });
});
