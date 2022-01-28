import { useCallback } from 'react';
import { IDevice } from '../shared';
import { useFetch } from './useFetch';

type UseDeviceCreateReturn = (device: IDevice) => Promise<IDevice>;
type UseDeviceCreate = () => UseDeviceCreateReturn;

export const useDeviceCreate: UseDeviceCreate = () => {
  const fetch = useFetch();
  return useCallback(
    (device: IDevice) =>
      fetch(`devices`, {
        body: JSON.stringify(device),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response: IDevice) => response),
    [fetch],
  );
};
