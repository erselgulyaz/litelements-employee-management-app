import { LitElement, html } from 'lit';

export class IconPlus extends LitElement {

  createRenderRoot() {
    return this;
  }

  render() {

    return html`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
        <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
      </svg>
    `;
  }
}

customElements.define('icon-plus', IconPlus);
