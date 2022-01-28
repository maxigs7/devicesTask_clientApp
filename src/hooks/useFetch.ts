import { useCallback } from 'react';
import { API_URL } from '../shared';

type UseFetchHookReturn = (url: string, init?: RequestInit) => Promise<any>;
type UseFetchHook = () => UseFetchHookReturn;

export const useFetch: UseFetchHook = () => {
  return useCallback(
    (path: string, init?: RequestInit) =>
      fetch(`${API_URL}/${path}`, init).then((response) => {
        if (response.ok) return response.json();
        throw Error(response.statusText);
      }),
    [],
  );
};
