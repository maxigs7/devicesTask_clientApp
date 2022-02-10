import { IDevice } from '../../shared';
import { DeviceItem } from '../device-item';
import { LoaderSvg } from '../loader';
import styles from './index.module.css';

interface IProps {
  devices?: IDevice[];
  isLoading: boolean;
  onDelete?: (device: IDevice) => void;
  onUpdate?: (device: IDevice) => void;
}

export const DeviceList: React.FC<IProps> = ({ devices = [], isLoading, onDelete, onUpdate }) => {
  return (
    <div className={styles.container}>
      {isLoading && (
        <div className={styles.loading}>
          <LoaderSvg />
        </div>
      )}
      {!isLoading &&
        devices.map((device) => (
          <DeviceItem key={device.id} device={device} onDelete={onDelete} onUpdate={onUpdate} className={styles.item} />
        ))}
    </div>
  );
};
