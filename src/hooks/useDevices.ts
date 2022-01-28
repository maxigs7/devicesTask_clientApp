import { useCallback } from 'react';
import { IDevice } from '../shared';
import { useFetch } from './useFetch';

type UseDevicesReturn = () => Promise<IDevice[]>;
type UseDevices = () => UseDevicesReturn;

export const useDevices: UseDevices = () => {
  const fetch = useFetch();

  return useCallback(() => fetch(`devices`).then((response: IDevice[]) => response), [fetch]);
};
