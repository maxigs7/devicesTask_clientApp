import { ComponentProps } from 'react';
import { useFilters } from '../../providers/filters';
import { cx } from '../../shared/classnames';
import { DeviceSortDdl } from '../device-sort-ddl';
import { DeviceTypeFilterDdl } from '../device-type-filter-ddl';
import styles from './index.module.css';

interface IProps extends ComponentProps<'div'> {
  onCreate: () => void;
}

export const DeviceFilters: React.FC<IProps> = ({ className, onCreate }) => {
  const { setSortBy, setType } = useFilters();
  return (
    <div className={cx(styles.container, className)}>
      <label className={styles.label}>
        Device Type:
        <div className={styles.formControl}>
          <DeviceTypeFilterDdl name="deviceType" onChange={(val) => setType(val.map((v) => v.value))} />
        </div>
      </label>
      <label className={styles.label}>
        Sort By:
        <div className={styles.formControl}>
          <DeviceSortDdl name="sortBy" onChange={(val) => setSortBy(val?.value)} />
        </div>
      </label>
      <button type="button" onClick={onCreate} className={styles.button}>
        Create
      </button>
    </div>
  );
};
