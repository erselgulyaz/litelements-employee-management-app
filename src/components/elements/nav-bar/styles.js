import { css } from 'lit';

export const styles = css`
    nav {
      background-color: var(--color-white);
      color: white;
      padding: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
    }

    nav svg {
      width: 20px;
      margin-bottom: -4px;
      stroke: var(--color-primary);
    }

    .links a {
      color: var(--color-primary);
      text-decoration: none;
      margin-left: 10px;
    }
      
    .logo {
      font-weight: bold;
      color: var(--color-primary);
    }

    .lang-switch {
      margin-left: 10px;
    }

    button.lang {
      background: none;
      border: none;
      color: var(--color-primary);
      font-size: 16px;
      cursor: pointer;
    }

    .lang-switch {
      position: relative;
      display: inline-block;
    }

    .lang-switch .dropdown {
      position: absolute;
      top: 100%;
      right: 0;
      background: white;
      border: 1px solid var(--color-borders);
      border-radius: 5px;
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
      z-index: 10;
    }

    .lang-switch .dropdown button {
      background: none;
      border: none;
      padding: 10px 20px;
      width: 100%;
      text-align: left;
      cursor: pointer;
      white-space: nowrap;
    }

    .lang-switch .dropdown button:hover {
      background-color: var(--color-borders);
    }

`;