import { useCallback, useMemo, useState } from 'react';

type UseBooleanReturn = {
  on: () => void;
  off: () => void;
  toggle: () => void;
  value: boolean;
};
type UseBoolean = (defValue?: boolean) => UseBooleanReturn;

export const useBoolean: UseBoolean = (defValue: boolean = false) => {
  const [value, setValue] = useState(defValue);

  const off = useCallback(() => {
    setValue(false);
  }, [setValue]);

  const on = useCallback(() => {
    setValue(true);
  }, [setValue]);

  const toggle = useCallback(() => {
    setValue((current) => !current);
  }, [setValue]);

  return useMemo(
    () => ({
      off,
      on,
      toggle,
      value,
    }),
    [off, on, toggle, value],
  );
};
