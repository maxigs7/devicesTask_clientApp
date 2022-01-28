export type DeviceType = 'MAC' | 'WINDOWS_SERVER' | 'WINDOWS_WORKSTATION';

export interface IDevice {
  id: string;
  system_name: string;
  type: DeviceType;
  hdd_capacity: number;
}

export type DeviceOption = { label: string; value: DeviceType };

export const DeviceOptions: DeviceOption[] = [
  { label: 'Mac', value: 'MAC' },
  { label: 'Windows Workstation', value: 'WINDOWS_WORKSTATION' },
  { label: 'Windows Server', value: 'WINDOWS_SERVER' },
];
