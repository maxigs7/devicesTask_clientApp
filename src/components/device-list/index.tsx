import { IDevice } from '../../shared';
import { DeviceItem } from '../device-item';
import styles from './index.module.css';

interface IProps {
  devices?: IDevice[];
  isLoading: boolean;
  onDelete?: (id: string) => void;
  onUpdate?: (id: string) => void;
}

export const DeviceList: React.FC<IProps> = ({ devices = [], isLoading, onDelete, onUpdate }) => {
  return (
    <div className={styles.container}>
      {devices.map((device) => (
        <DeviceItem key={device.id} device={device} onDelete={onDelete} onUpdate={onUpdate} className={styles.item} />
      ))}
    </div>
  );
};
