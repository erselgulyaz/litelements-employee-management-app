import { css } from 'lit';

export const styles = css`
    .card {
      background-color: var(--color-white);
      border: 1px solid var(--color-borders);
      padding: 16px;
      border-radius: 12px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }

    .card .column {
      margin: 0.3rem 0;
      display: flex; 
      flex-direction: column;
      font-size: 16px;
    }

    .card .column-title {
      color: var(--color-silver);
      font-size: 12px;
    }

    .actions {
      padding-top: 20px;
      margin-top: auto;
      display: flex;
      gap: 10px;
      width: 100%;
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

    .card .edit-button {
      background-color: var(--color-secondary);
    }
    
    .card .edit-button:hover {
      background-color: var(--color-secondary-dark);
    }

    .card .icon-wrap svg {
      width: 15px;
    }

    @media (max-width: 992px) {
      .card .actions {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        width: 100%;
      }
      .card {
        grid-template-columns: repeat(1, 1fr);
      }
    }
`;