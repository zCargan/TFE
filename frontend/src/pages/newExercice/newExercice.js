import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar'
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import './newExercice.css'

import LDN from '../LDN/LDN'
import MDN from '../MDN/MDN'
import Abaque from '../Abaque/Abaque';
import TAT from '../TAT/TAT'

const NewExercice = () => {
    const [popupOpen, setPopupOpen] = useState(false);
    const navigate = useNavigate();


    function callAbaque() {
        navigate('/abaque')
    }

    function callLDN() {
        navigate('/ldn')
    }

    function callMDN() {
        navigate('/mdn')
    }

    function callMB() {
        navigate('/mb')
    }

    function callSTT() {
        navigate('/stt')
    }

    function callTAT() {
        navigate('/tat')
    }

    function callTTi() {
        navigate('/tti')
    }

    function callGetPhotos() {
        navigate('/photo')
    }

    function callUploadPhoto() {
        navigate('/uploadPhoto')
    }

    function callUploadSound() {
        navigate('/uploadSound')
    }

    function showAllSounds() {
        navigate('/showAllSound')
    }

    return (
        <div>
            <Navbar />
            <br />
            <div id="div_img_create_exercice">
                <h2>Liste des exercices disponibles :</h2>
                <Popup
                    trigger={
                        <img src="abaque.png" onClick={callAbaque} width="100" height="100" />
                    }
                    position="bottom center"
                    open={popupOpen}
                    on="hover"
                    closeOnDocumentClick
                >
                    <div className='popupExos'>
                        <h3>Abaque</h3>
                        <p>Permet de créer un abaque aux dimensions que vous souhaitez!</p>
                    </div>
                </Popup>
                <Popup
                    trigger={
                        <img src="LDN.jpg" onClick={callLDN} width="100" height="100" />}
                    position="bottom center"
                    open={popupOpen}
                    on="hover"
                    closeOnDocumentClick
                >
                    <div className='popupExos'>
                        <h3>Ligne des nombres</h3>
                        <p>Permet de créer une ligne horizontale à multiples inconnues</p>
                    </div>
                </Popup>
                <Popup
                    trigger={
                        <img src="MB.jpg" onClick={callMB} width="100" height="100" />}
                    position="bottom center"
                    open={popupOpen}
                    on="hover"
                    closeOnDocumentClick
                >
                    <div className='popupExos'>
                        <h3>Mot bazard</h3>
                        <p>Réalisez un exercices dans lequel un mots possède les lettres mélangées d'une photo données</p>
                    </div>
                </Popup>
                <Popup
                    trigger={
                        <img src="mdn.jpg" onClick={callMDN} width="100" height="100" />}
                    position="bottom center"
                    open={popupOpen}
                    on="hover"
                    closeOnDocumentClick
                >
                    <div className='popupExos'>
                        <h3>Maison des nombres</h3>
                        <p>Réaliser un abaque de 2 colonnes et de hauteur variable, dans lequel vous pouvez créer une structure possèdant 1 inconnue par ligne</p>
                    </div>
                </Popup>
                <Popup
                    trigger={
                        <img src="stt.png" onClick={callSTT} width="100" height="100" />}
                    position="bottom center"
                    open={popupOpen}
                    on="hover"
                    closeOnDocumentClick
                >
                    <div className='popupExos'>
                        <h3>Son avec texte</h3>
                        <p>
                            Vous pouvez créer ici un exercice utilisant le son. Vous pouvez <a href="http://localhost:3000/uploadSound">
                                uploader des sons ici
                            </a>.
                            Vous pouvez ensuite associer chaque son à sa valeur.
                        </p>
                    </div>
                </Popup>
                <Popup
                    trigger={
                        <img src="TAT.png" onClick={callTAT} width="100" height="100" />}
                    position="bottom center"
                    open={popupOpen}
                    on="hover"
                    closeOnDocumentClick
                >
                    <div className='popupExos'>
                        <h3>Texte à trou</h3>
                        <p>Réaliser un texte dans lequel il manque des valeurs
                            L'utilsateur devra trouver les bonnes valeurs afin de réussir l'exercice
                        </p>
                    </div>
                </Popup>
                <Popup
                    trigger={
                        <img src="tti.png" onClick={callTTi} width="100" height="100" />}
                    position="bottom center"
                    open={popupOpen}
                    on="hover"
                    closeOnDocumentClick
                >
                    <div className='popupExos'>
                    <h3>De texte à images</h3>
                        <p>
                            Réaliser un exercice ou l'utilisateur doit réussir à retrouver le mot correspondant à chaque image proposée
                        </p>
                    </div>
                </Popup>
            </div>
            <br />
            <br />
            <div id="div_photo_create_exercice">
                <h2>Partie photo : </h2>
                <img src="gallerie.png" onClick={callGetPhotos} width="100" height="100" />
                <img src="uploadPhoto.jpg" onClick={callUploadPhoto} width="100" height="100" />
            </div>
            <br />
            <br />
            <div id="div_son_create_exercice">
                <h2>Partie musique : </h2>
                <img src="musique.png" onClick={showAllSounds} width="100" height="100" />
                <img src="uploadMusique.png" onClick={callUploadSound} width="100" height="100" />
            </div>
        </div>
    );
};

export default NewExercice;