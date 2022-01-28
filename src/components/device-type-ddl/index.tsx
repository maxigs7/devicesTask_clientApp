import Select, { Props } from 'react-select';
import { DeviceOption, DeviceOptions } from '../../shared';

type SelectProps = Omit<Props<DeviceOption>, 'options' | 'name' | 'className' | 'classNamePrefix'> & {
  name: string;
};

export const DeviceTypeDdl: React.FC<SelectProps> = ({ name, onChange, ...props }) => {
  return (
    <Select {...props} name={name} options={DeviceOptions} className="basic-multi-select" classNamePrefix="select" onChange={onChange} />
  );
};
