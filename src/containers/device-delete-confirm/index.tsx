import { useState } from 'react';
import { CloseButton } from '../../components/ui/close-button';
import { Modal } from '../../components/ui/modal';
import { useDeviceDelete } from '../../hooks/useDeviceDelete';
import { cx } from '../../shared/classnames';
import styles from './index.module.css';

interface IProps {
  confirm: () => void;
  dismiss: () => void;
  id: string;
  show: boolean;
}

export const DeviceDeleteConfirm: React.FC<IProps> = ({ confirm, dismiss, id, show }) => {
  const deleteFn = useDeviceDelete();
  const [isLoading, setIsLoading] = useState(false);
  const onConfirm = () => {
    setIsLoading(true);
    deleteFn(id as string).then(() => {
      setIsLoading(false);
      confirm();
      dismiss();
    });
  };

  return (
    <Modal show={show} dismiss={dismiss}>
      <header className={styles.header}>
        <h2>Delete Device</h2>
        <CloseButton className={styles.closeButton} onClick={dismiss} />
      </header>
      <div>
        <h3>Are you sure you want to delete this device?</h3>
        <p>This action cannot be undone</p>
      </div>

      <footer className={styles.footer}>
        <button type="button" className={styles.button} onClick={dismiss}>
          Cancel
        </button>
        <button type="button" className={cx(styles.button, styles.confirmButton)} onClick={onConfirm} disabled={isLoading}>
          Delete
        </button>
      </footer>
    </Modal>
  );
};
