import { Controller, UseFormReturn } from 'react-hook-form';
import { SingleValue } from 'react-select';
import { DeviceOptions, IDevice } from '../../shared';
import { DeviceTypeDdl } from '../device-type-ddl';
import styles from './index.module.css';

interface IProps extends UseFormReturn<IDevice> {
  id?: string;
}

export const DeviceForm: React.FC<IProps> = ({ control, formState: { errors }, register }) => (
  <>
    <label htmlFor="system_name" className={styles.label}>
      <span>
        System Name <span className={styles.required}>*</span>
      </span>
      <input
        {...register('system_name', {
          required: true,
          validate: {
            isBlank: (value) => !!value.trim(),
          },
        })}
        placeholder={'System Name...'}
        className={styles.field}
      />
      {errors.system_name && <span className={styles.error}>This field is required</span>}
    </label>
    <label htmlFor="type" className={styles.label}>
      <span>
        Type <span className={styles.required}>*</span>
      </span>
      <Controller
        control={control}
        name="type"
        rules={{ required: true }}
        render={({ field: { value, onChange, onBlur } }) => (
          <DeviceTypeDdl
            name="type"
            placeholder={'Select a type...'}
            onBlur={onBlur} // notify when input is touched
            onChange={(newValue: SingleValue<any>) => onChange(newValue?.value)}
            value={DeviceOptions.filter((option) => value === option.value)}
          />
        )}
      />
      {errors.type && <span className={styles.error}>This field is required</span>}
    </label>
    <label htmlFor="hdd_capacity" className={styles.label}>
      <span>
        HDD Capacity <span className={styles.required}>*</span>
      </span>
      <Controller
        control={control}
        name="hdd_capacity"
        rules={{
          required: true,
          validate: {
            positive: (value) => value > 0 || 'The number has to be greater than 0',
          },
        }}
        render={({ field: { value, onChange, onBlur } }) => (
          <input
            type="number"
            name="hdd_capacity"
            className={styles.field}
            placeholder={'HDD Capacity...'}
            onBlur={onBlur}
            onChange={(e) => onChange(e.target.value)}
            defaultValue={value}
          />
        )}
      />
      {errors.hdd_capacity && <span className={styles.error}>{errors.hdd_capacity.message}</span>}
    </label>
  </>
);
