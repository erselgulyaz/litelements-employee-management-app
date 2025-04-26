import { fixture, html, expect, oneEvent } from '@open-wc/testing';
import './../index';

describe('TableVisibilityTypes Component', () => {
  it('should render two view toggle buttons', async () => {
    const el = await fixture(html`<table-visibility-types></table-visibility-types>`);
    const buttons = el.shadowRoot.querySelectorAll('div.view-toggle > div');
    expect(buttons.length).to.equal(2);
  });
});
