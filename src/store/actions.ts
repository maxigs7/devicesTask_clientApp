import { IDevice } from '../shared';

export const CREATED_DEVICE = '[DEVICES] Created Device';
export const DELETED_DEVICE = '[DEVICES] Deleted Device';
export const REQUEST_DEVICES = '[DEVICES] Request Devices';
export const REQUEST_DEVICES_SUCCESS = '[DEVICES] Request Devices Success';
export const UPDATED_DEVICE = '[DEVICES] Updated Device';

export type Actions =
  | { type: typeof CREATED_DEVICE; payload: IDevice }
  | { type: typeof DELETED_DEVICE; payload: string }
  | { type: typeof REQUEST_DEVICES }
  | { type: typeof REQUEST_DEVICES_SUCCESS; payload: IDevice[] }
  | { type: typeof UPDATED_DEVICE; payload: IDevice };

export const createdDevice = (payload: IDevice): Actions => ({ type: CREATED_DEVICE, payload });
export const deletedDevice = (payload: string): Actions => ({ type: DELETED_DEVICE, payload });
export const requestDevices = (): Actions => ({ type: REQUEST_DEVICES });
export const requestDevicesSuccess = (payload: IDevice[]): Actions => ({ type: REQUEST_DEVICES_SUCCESS, payload });
export const updatedDevice = (payload: IDevice): Actions => ({ type: UPDATED_DEVICE, payload });
