import { DeviceManager } from './containers/device-manager';
import styles from './styles/App.module.css';

function App() {
  return (
    <div className={styles.App}>
      <h1 className={styles.title}>NinjaRMM - Device Mananger</h1>
      <DeviceManager />
    </div>
  );
}

export default App;
