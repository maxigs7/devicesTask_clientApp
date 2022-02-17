import { useCallback, useMemo, useReducer } from 'react';
import { useDevices } from '../hooks/useDevices';
import { IDevice } from '../shared';
import { createdDevice, deletedDevice, requestDevices, requestDevicesSuccess, updatedDevice } from './actions';
import { reducer } from './reducer';
import { IDispatch, initialState, IState } from './state';

/// I created this store in order to manage the device list on the client side
/// adding, editing and deleting only the specific item instead of making a request
/// after every action is done.
export const useStore = (): [IState, IDispatch] => {
  const getDevices = useDevices();
  const [state, dispatch] = useReducer(reducer, initialState);

  const onCreatedDevice = useCallback((device: IDevice) => {
    dispatch(createdDevice(device));
  }, []);

  const onDeletedDevice = useCallback((id: string) => {
    dispatch(deletedDevice(id));
  }, []);

  const onRequestDevices = useCallback(async () => {
    dispatch(requestDevices());

    try {
      const devices = await getDevices();
      dispatch(requestDevicesSuccess(devices));
    } catch (error) {
      console.log(error);
    }
  }, [getDevices]);

  const onUpdatedDevice = useCallback((device: IDevice) => {
    dispatch(updatedDevice(device));
  }, []);

  const returnDispatch = useMemo(
    () => ({
      onCreatedDevice,
      onRequestDevices,
      onDeletedDevice,
      onUpdatedDevice,
    }),
    [onCreatedDevice, onRequestDevices, onDeletedDevice, onUpdatedDevice],
  );

  return [state, returnDispatch];
};
