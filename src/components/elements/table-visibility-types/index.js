import { LitElement, html } from 'lit';
import '@components/elements/container';
import '@components/icons/table';
import '@components/icons/card';

import { styles } from './styles.js';

export class TableVisibilityTypes extends LitElement {
  static styles = styles;

  static properties = {
    activeView: { type: String }
  };

  constructor() {
    super();
    this.activeView = 'table';
  }

  setView(view) {
    this.dispatchEvent(new CustomEvent('view-change', {
      detail: { view },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
        <div class="view-toggle">
            <div @click=${() => this.setView('table')}>
              <icon-table />
            </div>
            <div @click=${() => this.setView('card')}>
              <icon-card />
            </div>
        </div>

    `;
  }
}

customElements.define('table-visibility-types', TableVisibilityTypes);
