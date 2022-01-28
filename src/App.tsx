import { DeviceManager } from './containers/device-manager';
import { FiltersProvider } from './providers/filters';
import styles from './styles/App.module.css';

function App() {
  return (
    <FiltersProvider>
      <div className={styles.App}>
        <h1 className={styles.title}>NinjaRMM - Device Mananger</h1>
        <DeviceManager />
      </div>
    </FiltersProvider>
  );
}

export default App;
