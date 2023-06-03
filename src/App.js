import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Page from './pages/Page';
import IFC from './pages/IFC'

import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path='/page' element={<Page />} />
            <Route path='/ifc' element={<IFC />} />
          </Routes>
        </div>
      </BrowserRouter>
      <div>
        <p>test</p>
      </div>
    </div>
  );
}

export default App;
