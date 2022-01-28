import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { DeviceForm } from '../../components/device-form';
import { CloseButton } from '../../components/ui/close-button';
import { Modal } from '../../components/ui/modal';
import { useAsync } from '../../hooks/useAsync';
import { useDevice } from '../../hooks/useDevice';
import { useDeviceCreate } from '../../hooks/useDeviceCreate';
import { useDeviceUpdate } from '../../hooks/useDeviceUpdate';
import { IDevice } from '../../shared';
import { cx } from '../../shared/classnames';
import styles from './index.module.css';

interface IProps {
  confirm?: () => void;
  dismiss?: () => void;
  id?: string;
  show: boolean;
}

export const DeviceFormModal: React.FC<IProps> = ({ confirm, dismiss, id, show }) => {
  const useFormProps = useForm<IDevice>();
  const {
    formState: { isSubmitting },
    handleSubmit,
    reset,
  } = useFormProps;

  const create = useDeviceCreate();
  const update = useDeviceUpdate();
  const get = useDevice();
  const getAsync = useCallback(() => get(id as string), [get, id]);

  const { data: device, execute } = useAsync(getAsync);

  const onSubmit = handleSubmit((data: IDevice) => {
    const promise = id ? update : create;
    return promise(data).then(() => {
      onConfirm();
    });
  });

  const title = useMemo(() => (id ? 'Update Device' : 'Add Device'), [id]);

  const onConfirm = () => {
    confirm && confirm();
    onClose();
  };

  const onClose = () => {
    reset({});
    dismiss && dismiss();
  };

  useEffect(() => {
    if (device) {
      reset(device);
    }
  }, [device, reset]);

  useEffect(() => {
    if (id) {
      execute();
    }
  }, [execute, id]);

  return (
    <Modal show={show} dismiss={onClose}>
      <header className={styles.header}>
        <h2>{title}</h2>
        <CloseButton className={styles.closeButton} onClick={onClose} />
      </header>
      <form onSubmit={onSubmit}>
        <DeviceForm {...useFormProps} />

        <footer className={styles.footer}>
          <button type="button" className={styles.button} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={cx(styles.button, styles.confirmButton)} disabled={isSubmitting}>
            Save
          </button>
        </footer>
      </form>
    </Modal>
  );
};
