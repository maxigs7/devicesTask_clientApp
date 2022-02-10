import { useEffect, useState } from 'react';
import { DeviceFilters } from '../../components/device-filters';
import { DeviceList } from '../../components/device-list';
import { useBoolean } from '../../hooks/useBoolean';
import { useFilters } from '../../providers/filters';
import { DeviceType, IDevice } from '../../shared';
import { useStore } from '../../store';
import { DeviceDeleteConfirm } from '../device-delete-confirm';
import { DeviceFormModal } from '../device-form-modal';
import styles from './index.module.css';

const filteringDevices = (devices: IDevice[], type: DeviceType[]) => {
  return devices.filter((device) => type.includes(device.type));
};

const sortingDevices = (devices: IDevice[], sortBy: keyof IDevice) => {
  return devices.sort((deviceA, deviceB) => {
    const valA = sortBy === 'hdd_capacity' ? Number(deviceA[sortBy]) : deviceA[sortBy].toLowerCase();
    const valB = sortBy === 'hdd_capacity' ? Number(deviceB[sortBy]) : deviceB[sortBy].toLowerCase();
    if (valA < valB) return -1;
    if (valA > valB) return 1;
    return 0;
  });
};

export const DeviceManager: React.FC = () => {
  const [state, dispatch] = useStore();
  const { sortBy, type } = useFilters();
  const { off, on, value } = useBoolean();
  const { off: offDelete, on: onDelete, value: valueDelete } = useBoolean();

  const [devices, setDevices] = useState<IDevice[]>([]);
  const [device, setDevice] = useState<IDevice>();

  const [idToDelete, setIdToDelete] = useState<string>();

  const onDeleteHandler = (device: IDevice) => {
    setIdToDelete(device.id);
    onDelete();
  };

  const onUpdateHandler = (device: IDevice) => {
    setDevice(device);
    on();
  };

  const saveDevice = (deviceConfirmed: IDevice) => {
    if (device?.id) {
      dispatch.onUpdatedDevice(deviceConfirmed);
    } else {
      dispatch.onCreatedDevice(deviceConfirmed);
    }
    onDismiss();
  };

  const onConfirmDelete = () => {
    dispatch.onDeletedDevice(idToDelete as string);
    onDismiss();
  };

  const onDismiss = () => {
    setDevice(undefined);
    setIdToDelete(undefined);
    off();
    offDelete();
  };

  useEffect(() => {
    let processed = [...state.devices];
    if (type.length) {
      processed = filteringDevices(processed, type);
    }
    if (sortBy) {
      processed = sortingDevices(processed, sortBy);
    }

    setDevices(processed);
  }, [state.devices, sortBy, type]);

  useEffect(() => {
    dispatch.onRequestDevices();
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <DeviceFilters onCreate={() => on()} className={styles.filters} />

      <DeviceList devices={devices} isLoading={state.isLoading} onDelete={onDeleteHandler} onUpdate={onUpdateHandler} />

      {value && <DeviceFormModal isOpen={value} dismiss={onDismiss} device={device} confirm={saveDevice} />}
      {valueDelete && <DeviceDeleteConfirm show={valueDelete} dismiss={onDismiss} id={idToDelete} confirm={onConfirmDelete} />}
    </div>
  );
};
