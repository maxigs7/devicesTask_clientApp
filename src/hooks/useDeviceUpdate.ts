import { useCallback } from 'react';
import { IDevice } from '../shared';
import { useFetch } from './useFetch';

type UseDeviceUpdateReturn = (device: IDevice) => Promise<IDevice>;
type UseDeviceUpdate = () => UseDeviceUpdateReturn;

export const useDeviceUpdate: UseDeviceUpdate = () => {
  const fetch = useFetch();
  return useCallback(
    ({ id, ...device }: IDevice) =>
      fetch(`devices/${id}`, {
        body: JSON.stringify(device),
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response: IDevice) => response),
    [fetch],
  );
};
