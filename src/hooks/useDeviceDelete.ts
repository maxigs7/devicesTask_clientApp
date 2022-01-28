import { useCallback } from 'react';
import { useFetch } from './useFetch';

type UseDeviceDeleteReturn = (id: string) => Promise<void>;
type UseDeviceDelete = () => UseDeviceDeleteReturn;

export const useDeviceDelete: UseDeviceDelete = () => {
  const fetch = useFetch();

  return useCallback((id: string) => fetch(`devices/${id}`, { method: 'DELETE' }), [fetch]);
};
