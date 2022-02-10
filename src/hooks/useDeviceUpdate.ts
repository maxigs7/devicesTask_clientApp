import { useCallback } from 'react';
import { IDevice } from '../shared';
import { useFetch } from './useFetch';

type UseDeviceUpdateReturn = (device: IDevice) => Promise<IDevice>;
type UseDeviceUpdate = () => UseDeviceUpdateReturn;

export const useDeviceUpdate: UseDeviceUpdate = () => {
  const fetch = useFetch();
  return useCallback(
    (device: IDevice) =>
      fetch(`devices/${device.id}`, {
        body: JSON.stringify(device),
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(() => device),
    [fetch],
  );
};
