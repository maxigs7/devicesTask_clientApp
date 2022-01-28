import Select from 'react-select';
import { DeviceType } from '../../shared';

interface IProps {
  name: string;
  onChange: (value: ReadonlyArray<Option>) => void;
}

type Option = { label: string; value: DeviceType };

const options: Option[] = [
  { label: 'Mac', value: 'MAC' },
  { label: 'Windows Workstation', value: 'WINDOWS_WORKSTATION' },
  { label: 'Windows Server', value: 'WINDOWS_SERVER' },
];

export const DeviceTypeFilterDdl: React.FC<IProps> = ({ name, onChange }) => {
  return <Select isMulti name={name} options={options} className="basic-multi-select" classNamePrefix="select" onChange={onChange} />;
};
