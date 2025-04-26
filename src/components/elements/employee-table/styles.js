import { css } from 'lit';

export const styles = css`
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
      border: 1px solid var(--color-white);
    }

    tr {
      border-top: 1px solid var(--color-borders);
      border-bottom: 1px solid var(--color-borders);
      background-color: var(--color-white);
    }

    th, td {
      text-align: left;
      height: 83px;
      padding: 0 20px;
      font-size: 12px;
    }

    tr input[type="checkbox"] {
      width: 16px;
      height: 16px;
    }

    tr td:nth-child(2), tr td:nth-child(3) {
      font-weight: 500;
    }

    .actions {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .actions svg {
      width: 24px; 
      padding: 5px;
      stroke: var(--color-primary);
      cursor: pointer;
    }

    .mobile-column {
      display: none;
    }
    
    @media (max-width: 768px) {
      .mobile-column {
        display: inline-block;
      }
      table, thead, tbody, th, td, tr {
        display: block;
      }
      thead tr {
        display: none;
      }
      tr {
        margin-bottom: 30px;
        border-radius: 10px;
        border: 1px solid rgba(173, 167, 167, 0.3);
      }
      th { display: none; }
      td::before { content: attr(data-label); }
      th, td {
        height: 30px;
        padding: 12px 5px 4px;
        box-shadow: 0px 0px 3px 0px rgba(173, 167, 167, 0.3);
      }
    }
`;