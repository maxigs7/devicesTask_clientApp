import Select from 'react-select';
import { DeviceOption, DeviceOptions } from '../../shared';

interface IProps {
  name: string;
  onChange: (value: ReadonlyArray<DeviceOption>) => void;
}

export const DeviceTypeFilterDdl: React.FC<IProps> = ({ name, onChange }) => {
  return <Select isMulti name={name} options={DeviceOptions} className="basic-multi-select" classNamePrefix="select" onChange={onChange} />;
};
