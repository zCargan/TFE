import './App.css';
import { Provider } from 'react-redux';
import store from './app/store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Connection from './pages/connection/Connection';
import Home from './pages/home/Home';
import Test from './components/test/Test';
import Register from './pages/register/Register'
import GetExos from './components/getExos/getExos'
import CreateExercice from './pages/exercices/createExercice/createExercice';

function App() {


  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/connection" element={<Connection />} />             
            <Route path='/' element={< Home/>} />
            <Route path="/test" element={<Test />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create_exercice" element={<CreateExercice />} />
          </Routes>
        </BrowserRouter>
      </Provider>
      <div>
        <p>Test</p>
        <GetExos></GetExos>
      </div>
    </div>
  );
}

export default App;


