import { css } from 'lit';

export const styles = css`
    .form-wrapper {
      background-color: var(--color-white);
      display: grid;
      position: relative;
      gap: 50px;
      width: 100%;
      padding: 50px 20px;
      margin: 2rem auto;
      grid-template-columns: repeat(3, 1fr);
      box-sizing: border-box;
    }

    .form-item {
      margin-bottom: 10px;
    }

    .form-item label {
      font-weight: 500;
      display: block;
      padding-bottom: 8px;
    }

    .form-item input, .form-item select {
      padding: 10px 20px;
      width: 100%;
      box-sizing: border-box;
      border-radius: 4px;
      outline: none;
      border: 1px solid var(--color-borders);
    }
    
    .button-wrap {
      grid-column: 1 / -1;
      display: flex;
      justify-content: center;
      gap: 20px;
    }

    .send-button {
      background-color: var(--color-primary);
      color: var(--color-white);
      border: none;
      outline: none;
      padding: 10px 25px;
      border-radius: 10px;
      cursor: pointer;
      min-width: 300px;
    }

    .cancel-button {
      background-color: transparent;
      color: var(--color-secondary);
      border: 1px solid var(--color-secondary);
      outline: none;
      padding: 10px 25px;
      border-radius: 10px;
      cursor: pointer;
      min-width: 300px;
    }

    .error {
      color: red;
      font-size: 12px;
    }

    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .modal-content {
      background: var(--color-white);
      padding: 24px;
      border-radius: 8px;
      width: 90%;
      max-width: 400px;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      position: relative;
    }

    .modal-body {
      font-size: 16px;
      color: var(--color-borders);
      margin-bottom: 1.5rem;
    }
    .modal-actions {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .proceed-btn {
      background-color: var(--color-primary);
      color: var(--color-white);
      padding: 10px;
      border: none;
      border-radius: 6px;
      font-size: 16px;
      cursor: pointer;
    }
    .cancel-btn {
      background-color: transparent;
      color: var(--color-primary);
      padding: 10px;
      border: 1px solid var(--color-primary);
      border-radius: 6px;
      font-size: 16px;
      cursor: pointer;
    }
    .close-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      background: transparent;
      border: none;
      font-size: 22px;
      cursor: pointer;
      color: var(--color-primary);
    }

    .edit-message {
      position: absolute;
      left: 10px;
      top: 10px;
    }

    @media (max-width: 992px) {
      .form-wrapper {
        gap: 20px;
      }
    }
      
    @media (max-width: 768px) {
        .form-wrapper {
          grid-template-columns: repeat(1, 1fr);
          gap: 10px;
          padding-left: 10px;
          padding-right: 10px;
        }
        .button-wrap {
          display: flex;
          flex-direction: column;
        }
        
    }
  `;