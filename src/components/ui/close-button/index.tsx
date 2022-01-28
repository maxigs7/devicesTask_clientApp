import { ComponentProps } from 'react';
import { cx } from '../../../shared/classnames';
import styles from './index.module.css';

export const CloseButton: React.FC<ComponentProps<'button'>> = ({ className, onClick }) => (
  <button type="button" className={cx(styles.close, className)} onClick={onClick}>
    &times;
  </button>
);
