import { useCallback } from 'react';
import { IDevice } from '../shared';
import { useFetch } from './useFetch';

type UseDeviceReturn = (id: string) => Promise<IDevice>;
type UseDevice = () => UseDeviceReturn;

export const useDevice: UseDevice = () => {
  const fetch = useFetch();

  return useCallback((id: string) => fetch(`devices/${id}`).then((response: IDevice) => response), [fetch]);
};
