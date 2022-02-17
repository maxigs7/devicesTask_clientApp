import { useEffect, useState } from 'react';
import { DeviceFilters } from '../../components/device-filters';
import { DeviceList } from '../../components/device-list';
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
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [devices, setDevices] = useState<IDevice[]>([]);
  const [device, setDevice] = useState<IDevice>();

  //***** FORM MODAL *****/
  const onCreateHandler = () => {
    setDevice(undefined);
    setIsFormModalOpen(true);
  };

  const onUpdateHandler = (device: IDevice) => {
    setIsFormModalOpen(true);
    setDevice(device);
  };

  const onSaveDevice = (deviceConfirmed: IDevice) => {
    if (device?.id) {
      dispatch.onUpdatedDevice(deviceConfirmed);
    } else {
      dispatch.onCreatedDevice(deviceConfirmed);
    }

    onCancelFormModal();
  };

  const onCancelFormModal = () => {
    setDevice(undefined);
    setIsFormModalOpen(false);
  };

  //***** DELETE CONFIRMATION *****/
  const onDeleteHandler = (device: IDevice) => {
    setIsDeleteOpen(true);
    setDevice(device);
  };

  const onConfirmDelete = () => {
    const id = device?.id as string; // We need to force this cast. It will always have a value at this point
    dispatch.onDeletedDevice(id);
    onCancelDelete();
  };

  const onCancelDelete = () => {
    setDevice(undefined);
    setIsDeleteOpen(false);
  };

  //***** EFFECTS *****/

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
      <DeviceFilters onCreate={onCreateHandler} className={styles.filters} />

      <DeviceList devices={devices} isLoading={state.isLoading} onDelete={onDeleteHandler} onUpdate={onUpdateHandler} />

      <DeviceFormModal isOpen={isFormModalOpen} dismiss={onCancelFormModal} device={device} confirm={onSaveDevice} />
      {device && <DeviceDeleteConfirm show={isDeleteOpen} dismiss={onCancelDelete} id={device.id} confirm={onConfirmDelete} />}
    </div>
  );
};
