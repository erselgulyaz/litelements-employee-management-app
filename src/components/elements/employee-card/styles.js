import { css } from 'lit';

export const styles = css`
    .card {
      background-color: var(--color-white);
      border: 1px solid var(--color-borders);
      padding: 16px;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    .card .line {
      margin: 0.3rem 0;
    }
    .actions {
      padding-top: 20px;
      margin-top: auto;
      display: flex;
      gap: 10px;
    }

    .card button {
      background-color: var(--color-primary);
      border: none;
      outline: none;
      color: var(--color-white);
      font-size: 14px;
      line-height: 22px;
      padding: 10px 20px;
      border-radius: 12px;
      cursor: pointer;
      transition: all .2s ease-in-out;
    }

    .card button:hover {
      background-color: var(--color-primary-dark);
    }
`;