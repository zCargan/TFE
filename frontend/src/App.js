import './App.css';
import Navbar from './components/navbar/Navbar';
import { Provider } from 'react-redux';
import { storeTest } from './redux';

function App() {
  return (
    <div className="App">
      <Provider store={storeTest}>
        <div>
          <Navbar />
        </div>
        <div>
        </div>
      </Provider>
    </div>
  );
}

export default App;


