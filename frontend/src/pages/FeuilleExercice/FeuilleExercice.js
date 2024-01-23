import React, { useEffect, useState } from 'react';
import './FeuilleExercice.css'
import { Provider, useDispatch, useSelector } from 'react-redux';
import Navbar from '../../components/navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';

const FeuilleExercice = () => {

    const [popupOpen, setPopupOpen] = useState(false);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const exerciceRedux = useSelector(state => (state))

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

    function testRedux() {
        console.log(exerciceRedux)
    }

    return (
        <div>
            <Navbar />
            <div>
                <h3>Bienvenuee dans la section de création d'une feuille d'exercice</h3>
                <p>Récapitulatif :</p>



            </div>
            <h3>Séléctionner un exercice à ajouter à votre feuille :</h3>
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
                        <img src="LDN.png" onClick={callLDN} width="100" height="100" />}
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
                        <img src="MB.png" onClick={callMB} width="100" height="100" />}
                    position="bottom center"
                    open={popupOpen}
                    on="hover"
                    closeOnDocumentClick
                >
                    <div className='popupExos'>
                        <h3>Mot bazar</h3>
                        <p>Réalisez un exercices dans lequel un mots possède les lettres mélangées d'une photo données</p>
                    </div>
                </Popup>
                <Popup
                    trigger={
                        <img src="mdn.png" onClick={callMDN} width="100" height="100" />}
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
                            Vous pouvez créer ici un exercice utilisant le son. Vous pouvez <a href="https://www.laclassedemadameseverine.be/uploadSound">
                                ajouter des sons ici
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
                <br />
                <button onClick={testRedux}>Test redux</button>
        </div>
    );
};

export default FeuilleExercice;