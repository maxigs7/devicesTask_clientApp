import { ComponentProps } from 'react';
import { IDevice } from '../../shared';
import { cx } from '../../shared/classnames';
import styles from './index.module.css';

interface IProps extends ComponentProps<'div'> {
  device: IDevice;
  onDelete?: (device: IDevice) => void;
  onUpdate?: (device: IDevice) => void;
}

export const DeviceItem: React.FC<IProps> = ({ className, device, onDelete, onUpdate }) => {
  const onDeleteHandler = () => onDelete && onDelete(device);
  const onUpdateHandler = () => onUpdate && onUpdate(device);

  return (
    <div className={cx(styles.container, className)}>
      <h2 className={styles.name}>{device.system_name}</h2>
      <p className={styles.type}>{device.type}</p>
      <p className={styles.capacity}>{device.hdd_capacity} GB</p>
      <div className={styles.actions}>
        <button className={cx(styles.button, styles.update)} type="button" onClick={onUpdateHandler}>
          Update
        </button>
        <button className={cx(styles.button, styles.delete)} type="button" onClick={onDeleteHandler}>
          Delete
        </button>
      </div>
    </div>
  );
};
