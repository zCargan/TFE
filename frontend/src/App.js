import './App.css';
import { Provider } from 'react-redux';
import store from './app/store';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Connection from './pages/connection/Connection';
import Home from './pages/home/Home';
import Test from './components/test/Test';
import Register from './pages/register/Register'
import ZoneTest from './components/zoneTest/zoneTest'
import CreateExercice from './pages/exercices/createExercice/createExercice';
import React, { useEffect } from 'react';
import Bubble from './components/bubble/Bubble';
import Profile from './pages/profile/profile';
import History from './pages/history/history';
import InfoExercice from './pages/infoExercice/infoExercice';
import Photo from './pages/photo/photo'
import PhotoDetail from './pages/photoDetail/photoDetail';
import ShowExercice from './pages/showExercice/showExercice';

function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={< Connection />} />
            <Route path="/" element={< Connection />} />
            <Route path="/home" element={< Home />} />
            <Route path="/test" element={<Test />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create_exercice" element={<CreateExercice />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/history" element={<History />} />
            <Route path="/infoExercice" element={<InfoExercice />} />
            <Route path="/photo" element={<Photo />} />
            <Route path="/photo_detail" element={<PhotoDetail />} />
            <Route path="/show_exercice" element={<ShowExercice />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;


