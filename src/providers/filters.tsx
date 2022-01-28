import { createContext, useContext, useState } from 'react';

import { DeviceType, IDevice } from '../shared';

interface IFilters {
  sortBy?: keyof IDevice;
  type: DeviceType[];
  setSortBy: (key?: keyof IDevice) => void;
  setType: (type: DeviceType[]) => void;
}

export const FiltersContext: React.Context<IFilters> = createContext<IFilters>({} as IFilters);

export const FiltersProvider: React.FC = ({ children }) => {
  const [sortBy, setSortBy] = useState<keyof IDevice>();
  const [type, setType] = useState<DeviceType[]>([]);

  const providerValue: IFilters = {
    setSortBy,
    setType,
    sortBy,
    type,
  };

  return <FiltersContext.Provider value={providerValue}>{children}</FiltersContext.Provider>;
};

export const useFilters = (): IFilters => {
  const context = useContext(FiltersContext);
  if (context === undefined) {
    throw new Error(`useFilters must be used within a FiltersProvider.`);
  }
  return context;
};
