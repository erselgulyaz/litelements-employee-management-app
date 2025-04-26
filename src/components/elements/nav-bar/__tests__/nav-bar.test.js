import { fixture, html, expect, oneEvent } from '@open-wc/testing';
import './../index';

describe('NavBar Component', () => {
  it('should render nav element', async () => {
    const el = await fixture(html`<nav-bar></nav-bar>`);
    const nav = el.shadowRoot.querySelector('nav');
    expect(nav).to.exist;
    expect(nav.querySelector('.logo').textContent).to.contain('LOGO');
  });

  /* it('should toggle dropdown visibility when lang button clicked', async () => {
    const el = await fixture(html`<nav-bar></nav-bar>`);
    const langButton = el.shadowRoot.querySelector('.lang');
    expect(el.dropdownOpen).to.be.false;
    langButton.click();
    await el.updateComplete;
    expect(el.dropdownOpen).to.be.true;
    const dropdown = el.shadowRoot.querySelector('.dropdown');
    expect(dropdown).to.exist;
  }); */
});
