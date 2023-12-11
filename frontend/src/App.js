import './App.css';
import { Provider } from 'react-redux';
import store from './app/store';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
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
import NewExercice from './pages/newExercice/newExercice';
import FormulaireDeRetour from './pages/formDeRetour/FormulaireDeRetour';
import FeuilleExercice from './pages/FeuilleExercice/FeuilleExercice';
import ShowWorksheet from './pages/showWorksheet/ShowWorksheet';
import ShowWorksheetById from './pages/ShowWorksheetById/ShowWorksheetById';

import MDN from './pages/MDN/MDN'
import LDN from './pages/LDN/LDN'
import Abaque from './pages/Abaque/Abaque';
import TAT from './pages/TAT/TAT'
import STT from './pages/STT/STT'
import TTI from './pages/TTI/TTI'
import MB from './pages/MB/MB'

import UploadPhoto from './pages/AddIMG/AddIMG'
import AddIMG from './pages/AddIMG/AddIMG';
import UploadSound from './pages/uploadSounds/uploadSound';
import ShowAllSounds from './pages/showAllSounds/showAllSounds';

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
            <Route path="/exercices" element={<GetExercicesBySearchBar />} />
            <Route path="/manage_exerices" element={<ManageExercice />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/reset-password2" element={<ResetPassword2 />} />
            <Route path='/newExercice' element={<NewExercice />} />
            <Route path='/request' element={<FormulaireDeRetour />} />
            <Route path='/feuilleExercice' element={<FeuilleExercice />} />
            <Route path='/showWorksheet' element={<ShowWorksheet />} />
            <Route path="/show_worksheet_by_id" element={<ShowWorksheetById />} />

            <Route path='/ldn' element={<LDN />} />
            <Route path='/mdn' element={<MDN />} />
            <Route path='/abaque' element={<Abaque />} />
            <Route path='/tat' element={<TAT />} />
            <Route path='/stt' element={<STT />} />
            <Route path='/tti' element={<TTI />} />
            <Route path='/mb' element={<MB />} />

            <Route path='/uploadPhoto' element={<AddIMG />} />
            <Route path='/uploadSound' element={<UploadSound />} />
            <Route path='/showAllSound' element={<ShowAllSounds />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
