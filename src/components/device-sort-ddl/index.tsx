import Select from 'react-select';
import { IDevice } from '../../shared';

interface IProps {
  name: string;
  onChange: (value: Option | null | undefined) => void;
}

type Option = { label: string; value: keyof IDevice };

const options: Option[] = [
  { label: 'HDD Capacity', value: 'hdd_capacity' },
  { label: 'System Name', value: 'system_name' },
];

export const DeviceSortDdl: React.FC<IProps> = ({ name, onChange }) => {
  return <Select name={name} options={options} className="basic-multi-select" classNamePrefix="select" isClearable onChange={onChange} />;
};
