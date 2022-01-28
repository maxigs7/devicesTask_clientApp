import { useEffect } from 'react';
import { DeviceFilters } from '../../components/device-filters';
import { DeviceList } from '../../components/device-list';
import { useAsync } from '../../hooks/useAsync';
import { useDevices } from '../../hooks/useDevices';
import { IDevice } from '../../shared';
import styles from './index.module.css';

export const DeviceManager: React.FC = () => {
  const getDevices = useDevices();
  const { data, execute, isLoading } = useAsync<IDevice[]>(getDevices);

  useEffect(() => {
    execute();
  }, [execute]);

  return (
    <div className={styles.container}>
      <DeviceFilters onCreate={() => console.log('Creating...')} className={styles.filters} />

      <DeviceList devices={data} isLoading={isLoading} />
    </div>
  );
};
