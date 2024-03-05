// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

export function App() {
  fetch('/api')
  .then(res => res.json())
  .then(res => console.log(res))
  return (
    <div>
    </div>
  );
}

export default App;
