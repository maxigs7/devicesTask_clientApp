export type DeviceType = 'MAC' | 'WINDOWS_SERVER' | 'WINDOWS_WORKSTATION';

export interface IDevice {
  id: string;
  system_name: string;
  type: DeviceType;
  hdd_capacity: number;
}
