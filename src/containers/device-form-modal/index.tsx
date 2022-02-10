import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { DeviceForm } from '../../components/device-form';
import { CloseButton } from '../../components/ui/close-button';
import { Modal } from '../../components/ui/modal';
import { useDeviceCreate } from '../../hooks/useDeviceCreate';
import { useDeviceUpdate } from '../../hooks/useDeviceUpdate';
import { IDevice } from '../../shared';
import { cx } from '../../shared/classnames';
import styles from './index.module.css';

interface IProps {
  confirm: (device: IDevice) => void;
  device?: IDevice;
  dismiss: () => void;
  isOpen: boolean;
}

export const DeviceFormModal: React.FC<IProps> = ({ confirm, device, dismiss, isOpen }) => {
  const useFormProps = useForm<IDevice>();
  const {
    formState: { isSubmitting },
    handleSubmit,
    reset,
  } = useFormProps;

  const create = useDeviceCreate();
  const update = useDeviceUpdate();

  const onSubmit = handleSubmit((data: IDevice) => {
    const promise = data.id ? update : create;
    return promise(data).then((response) => {
      const dev = response.id ? response : data;
      onConfirm(dev);
    });
  });

  const title = useMemo(() => (device?.id ? 'Update Device' : 'Add Device'), [device?.id]);

  const onConfirm = (device: IDevice) => {
    confirm(device);
    onClose();
  };

  const onClose = () => {
    reset({});
    dismiss();
  };

  useEffect(() => {
    if (device) {
      reset(device);
    }
  }, [device, reset]);

  return (
    <Modal show={isOpen} dismiss={onClose}>
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
