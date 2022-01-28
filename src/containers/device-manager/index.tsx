import { useEffect, useMemo, useState } from 'react';
import { DeviceFilters } from '../../components/device-filters';
import { DeviceList } from '../../components/device-list';
import { useAsync } from '../../hooks/useAsync';
import { useBoolean } from '../../hooks/useBoolean';
import { useDevices } from '../../hooks/useDevices';
import { useFilters } from '../../providers/filters';
import { IDevice } from '../../shared';
import { DeviceDeleteConfirm } from '../device-delete-confirm';
import { DeviceFormModal } from '../device-form-modal';
import styles from './index.module.css';

export const DeviceManager: React.FC = () => {
  const getDevices = useDevices();
  const { sortBy, type } = useFilters();
  const { off, on, value } = useBoolean();
  const { off: offDelete, on: onDelete, value: valueDelete } = useBoolean();

  const [id, setId] = useState<string>();
  const [idToDelete, setIdToDelete] = useState<string>();
  const { data, execute, isLoading } = useAsync<IDevice[]>(getDevices);

  const onDeleteHandler = (id: string) => {
    setIdToDelete(id);
    onDelete();
  };

  const onUpdateHandler = (id: string) => {
    setId(id);
    on();
  };

  const onConfirm = () => {
    execute();
    onDismiss();
  };

  const onDismiss = () => {
    setId(undefined);
    setIdToDelete(undefined);
    off();
    offDelete();
  };

  const processedData = useMemo(() => {
    if (!data) {
      return [];
    }

    let processed = [...data];
    if (type.length) {
      processed = processed.filter((device) => type.includes(device.type));
    }

    if (sortBy) {
      processed = processed.sort((deviceA, deviceB) => {
        const valA = sortBy === 'hdd_capacity' ? Number(deviceA[sortBy]) : deviceA[sortBy];
        const valB = sortBy === 'hdd_capacity' ? Number(deviceB[sortBy]) : deviceB[sortBy];
        if (valA < valB) return -1;
        if (valA > valB) return 1;
        return 0;
      });
    }

    return processed;
  }, [data, sortBy, type]);

  useEffect(() => {
    execute();
  }, [execute]);

  return (
    <div className={styles.container}>
      <DeviceFilters onCreate={() => on()} className={styles.filters} />

      <DeviceList devices={processedData} isLoading={isLoading} onDelete={onDeleteHandler} onUpdate={onUpdateHandler} />

      {value && <DeviceFormModal show={value} dismiss={onDismiss} id={id} confirm={onConfirm} />}
      {valueDelete && <DeviceDeleteConfirm show={valueDelete} dismiss={onDismiss} id={idToDelete} confirm={onConfirm} />}
    </div>
  );
};
