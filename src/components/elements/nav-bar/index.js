import { LitElement, html } from 'lit';
import { Router } from '@vaadin/router';
import { getLocale } from '@i18n/index';

import '@components/icons/user';
import '@components/icons/plus';

import { styles } from './styles';

export class NavBar extends LitElement {
  static styles = styles;

  static properties = {
    dropdownOpen: { type: Boolean }
  };

  constructor() {
    super();
    this.dropdownOpen = false;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  navigate(path) {
    Router.go(path);
  }

  switchLang(lang) {
    localStorage.setItem('lang', lang);
    location.reload();
  }

  render() {
    const t = getLocale();

    return html`
      <nav>
        <div class="logo">LOGO</div>
        <div class="links">
          <a href="/" @click=${(e) => { e.preventDefault(); this.navigate('/'); }}><icon-user></icon-user>${t.menuItems.employees}</a>
          <a href="/add" @click=${(e) => { e.preventDefault(); this.navigate('/add'); }}><icon-plus></icon-plus>${t.menuItems.addNew}</a>
          <span class="lang-switch">
            <button class="lang" @click=${this.toggleDropdown}>
              🌐 ${t.menuItems.lang}
            </button>

            ${this.dropdownOpen ? html`
              <div class="dropdown">
                <button @click=${() => this.switchLang('tr')}>🇹🇷 Türkçe</button>
                <button @click=${() => this.switchLang('en')}>🇬🇧 English</button>
              </div>
            ` : ''}
          </span>

        </div>
      </nav>
    `;
  }
}

customElements.define('nav-bar', NavBar);
