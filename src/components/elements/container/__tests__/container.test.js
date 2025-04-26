import { fixture, html, expect } from '@open-wc/testing';
import './../index';

describe('ContainerBox Component', () => {
  it('should render slot content inside the container', async () => {
    const el = await fixture(html`
      <container-box>
        <p>Test content</p>
      </container-box>
    `);
    const slotContent = el.shadowRoot.querySelector('slot');
    expect(slotContent).to.exist;
  });

  /* it('should have container class', async () => {
    const el = await fixture(html`
      <container-box></container-box>
    `);
    const div = el.shadowRoot.querySelector('div');
    expect(div).to.exist;
    expect(div.classList.contains('container')).to.be.true;
  }); */
});
