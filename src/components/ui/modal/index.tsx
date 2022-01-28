import React from 'react';
import { createPortal } from 'react-dom';

import styles from './index.module.css';
import { Backdrop } from '../backdrop';

interface IProps {
  dismiss?: () => void;
  show: boolean;
}

const modalRoot = document.getElementById('modal');

export const Modal: React.FC<IProps> = ({ children, dismiss, show }) => {
  if (!show) return null;

  return createPortal(
    <>
      <Backdrop show={show} onClose={dismiss} />
      <div
        className={styles.modal}
        style={{
          transform: show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: show ? 1 : 0,
        }}
      >
        {children}
      </div>
    </>,
    modalRoot as HTMLElement,
  );
};
