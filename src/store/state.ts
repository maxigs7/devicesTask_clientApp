import { IDevice } from '../shared';

export interface IState {
  devices: IDevice[];
  isLoading: boolean;
}

export interface IDispatch {
  onCreatedDevice: (payload: IDevice) => void;
  onDeletedDevice: (payload: string) => void;
  onRequestDevices: () => void;
  onUpdatedDevice: (payload: IDevice) => void;
}

export const initialState: IState = {
  devices: [],
  isLoading: false,
};
