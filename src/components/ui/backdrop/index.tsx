import React from 'react';

import styles from './index.module.css';

interface IProps {
  onClose?: () => void;
  show: boolean;
}

export const Backdrop: React.FC<IProps> = ({ onClose, show }) => {
  if (!show) return null;

  return <div className={styles.backdrop} onClick={onClose}></div>;
};
