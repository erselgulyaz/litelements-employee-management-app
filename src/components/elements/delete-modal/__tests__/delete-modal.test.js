import { fixture, html, expect, oneEvent } from '@open-wc/testing';
import './../index';

describe('DeleteModal Component', () => {

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
});
