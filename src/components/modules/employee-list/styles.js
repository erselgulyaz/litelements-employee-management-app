import { css } from 'lit';

export const styles = css`
    .page-title {
      color: var(--color-primary);
      font-size: 24px;
      line-height: 32px;
      font-weight: 500;
    }

    .controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
    }

    .search-input {
      padding: 10px;
      box-sizing: border-box;
      width: 100%;
      max-width: 400px;
    }

    .bulk-delete-btn {
      background-color: var(--color-primary);
      color: var(--color-white);
      border: none;
      outline: none;
      padding: 10px 25px;
      border-radius: 10px;
      cursor: pointer;
    }

    .view-toggle {
      display: flex;
    }

    .view-toggle > * {
      padding: 5px;
      cursor: pointer;
    }

    .pagination {
      margin: 20px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }

    .pagination-button {
      width: 40px;
      height: 40px;
      border-radius: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      color: var(--color-primary);
      cursor: pointer;
      transition: all .2s ease-in-out;
      background-color: transparent;
    }

    .pagination-button[disabled] {
      cursor: default;
    }
    
    .pagination-button:hover {
      background: var(--color-primary);
      color: var(--color-white);
    }
    
    .pagination-button.active {
      background: var(--color-primary);
      color: var(--color-white);
    }
    
    .pagination-button[disabled]:hover {
      background: transparent;
      color: var(--color-primary);
    }

    .modal {
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: rgba(0,0,0,0.6);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .modal-content {
      background: white;
      padding: 24px;
      border-radius: 8px;
      max-width: 400px;
      width: 90%;
      text-align: center;
      box-shadow: 0 0 10px rgba(0,0,0,0.2);
    }

    .card-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      padding-top: 16px;
    }

    .card-grid employee-card {
      flex: 1 1 calc(33.333% - 1rem);
      display: flex;
      flex-direction: column;
    }

    .search-input {
      border: 1px solid var(--color-borders);
      border-radius: 4px;
      outline: none;
    }

    .empty-content-info {
      margin-top: 30px;
    }

    @media (max-width: 992px) {
      .card-grid employee-card {
        flex: 1 1 calc(50% - 1rem);
      }
        
      .controls {
        flex-direction: column;
      }

      .search-input {
        max-width: 100%;
      }
    }

    @media (max-width: 768px) {
      .card-grid employee-card {
        flex: 1 1 100%;
      }
    }

  `;