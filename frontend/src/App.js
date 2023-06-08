import './App.css';
import Navbar from './components/navbar/Navbar';
import { Provider } from 'react-redux';
import store from './app/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
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


