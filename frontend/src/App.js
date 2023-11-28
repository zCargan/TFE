import './App.css';
import { Provider } from 'react-redux';
import store from './app/store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Connection from './pages/connection/Connection';
import Home from './pages/home/Home';
import Test from './components/test/Test';
import Register from './pages/register/Register';
import CreateExercice from './pages/exercices/createExercice/createExercice';
import React, { useEffect } from 'react';
import Profile from './pages/profile/profile';
import History from './pages/history/history';
import InfoExercice from './pages/infoExercice/infoExercice';
import Photo from './pages/photo/photo';
import PhotoDetail from './pages/photoDetail/photoDetail';
import ShowExercice from './pages/showExercice/showExercice';
import GetExercicesBySearchBar from './pages/getExercicesBySearchBar/getExercicesBySearchBar';
import ManageExercice from './pages/manageExercice/manageExercice';
import ResetPassword from './pages/resetPassword/resetPassword';
import ResetPassword2 from './pages/resetPassword2/resetPassord2';

function App() {

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const modificationsNonEnregistrees = true; 

      if (modificationsNonEnregistrees) {
        event.preventDefault();
        document.cookie = "JWT=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);

    };
  }, []);

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
            <Route path="/exercices" element={<GetExercicesBySearchBar />} />
            <Route path="/manage_exerices" element={<ManageExercice />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/reset-password2" element={<ResetPassword2 />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
