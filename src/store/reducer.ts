import { Actions, CREATED_DEVICE, DELETED_DEVICE, REQUEST_DEVICES, REQUEST_DEVICES_SUCCESS, UPDATED_DEVICE } from './actions';
import { IState } from './state';

export const reducer = (state: IState, action: Actions): IState => {
  switch (action.type) {
    case CREATED_DEVICE:
      return {
        ...state,
        devices: [...state.devices, action.payload],
      };
    case DELETED_DEVICE:
      return {
        ...state,
        devices: [...state.devices.filter((device) => device.id !== action.payload)],
      };
    case REQUEST_DEVICES:
      return {
        ...state,
        isLoading: true,
        devices: [],
      };
    case REQUEST_DEVICES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        devices: action.payload,
      };
    case UPDATED_DEVICE:
      return {
        ...state,
        devices: [...state.devices.map((device) => (device.id === action.payload.id ? action.payload : device))],
      };

    default:
      return state;
  }
};
