import { css } from 'lit';

export const styles = css`
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
      padding: 20px;
      border-radius: 8px;
      width: 90%;
      max-width: 400px;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      position: relative;
    }
    .modal-header {
      color: var(--color-primary);
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .modal-body {
      font-size: 16px;
      color: var(--color-borders);
      margin-bottom: 15px;
    }
    .modal-actions {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .proceed-btn {
      background-color: var(--color-primary);
      color: #fff;
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
`;