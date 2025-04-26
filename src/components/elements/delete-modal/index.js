import { LitElement, html } from 'lit';
import { styles } from './styles';
import { getLocale } from '@i18n/index';

export class DeleteModal extends LitElement {
  static styles = styles;

  static properties = {
    open: { type: Boolean },
    message: { type: String }
  };

  constructor() {
    super();
    this.open = false;
    this.message = '';
  }

  confirm() {
    this.dispatchEvent(new CustomEvent('confirm', { bubbles: true, composed: true }));
  }

  cancel() {
    this.dispatchEvent(new CustomEvent('cancel', { bubbles: true, composed: true }));
  }

  render() {
    if (!this.open) return html``;
    const t = getLocale();
    return html`
      <div class="modal">
        <div class="modal-content">
          <button class="close-btn" @click=${this.cancel}>×</button>
          <div class="modal-header">${t.deleteModal.title}</div>
          <div class="modal-body">${this.message}</div>
          <div class="modal-actions">
            <button class="proceed-btn" @click=${this.confirm}>${t.deleteModal.okButton}</button>
            <button class="cancel-btn" @click=${this.cancel}>${t.deleteModal.cancelButton}</button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('delete-modal', DeleteModal);
