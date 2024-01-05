import React, { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import Mathematics from '../mathematics/mathematics';
import French from '../french/french';
import { useNavigate } from 'react-router-dom';
import { store } from '../../../features/exerciceSlice'
import axios from 'axios';
import Navbar from '../../../components/navbar/Navbar';
import Resultat from '../resultat/resultat';
import Cookies from 'js-cookie';
import Popup from 'reactjs-popup';
import Swal from 'sweetalert2';
import { FaEye } from "react-icons/fa";
import { CSSTransition } from 'react-transition-group';
import InfoIcon from '@mui/icons-material/Info';

import BlankText from './blankText.js';
import TextToImg from './textToImg.js';
import MB from './motBazard.js'
import SoundToText from './SoundToText.js';
import MaisonDesNombres from './maisonDesNombres.js';
import LigneDeNombre from './ligneDeNombre.js';
import Abaque from './abaque.js';

import './createExercice.css'

const CreateExercice = () => {


    const [selectedOption, setSelectedOption] = useState('');
    const [exerciseDataArray, setExerciseDataArray] = useState([]);
    const [popupOpen, setPopupOpen] = useState(false);
    const [resetSelect, setResetSelect] = useState(false);
    const [anneeScolaire, setAnneeScolaire] = useState('');

    // Fonction pour gérer les changements de radio button
    const handleRadioChange = (event) => {
        setAnneeScolaire(event.target.value);
    };

    const config = {
        headers: {
            'Authorization': `Bearer ${Cookies.get('JWT')}`,
            'Content-Type': 'application/json' // Utilisation de 'application/json' pour le Content-Type
        }
    };

    const handleExerciseData = (data) => {
        const isElementPresent = exerciseDataArray.some((element) => element.type === data.type);

        if (isElementPresent) {
            Swal.fire({
                title: 'Erreur',
                text: "Vous avez déja ajouter un exercice de ce type sur la feuille",
                icon: 'error',
                showConfirmButton: true,
            });
        } else {

            setExerciseDataArray((prevData) => [...prevData, data]);
            setResetSelect(true);
            Swal.fire({
                title: 'Succès',
                text: "Ajouter avec succès. Vous pouvez valider la feuille d'exercice, ou ajouter un nouvel exercice",
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
            });
        }
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (Cookies.get('JWT')) {
            const config = {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('JWT')}`
                }
            };

            axios.post("http://51.77.150.97:4000/connection/checkToken", {}, config)
                .then(response => {
                    console.log(response.data.role)
                    if (response.data.role !== "professeur" || '') {
                        navigate('/')
                    }

                })
                .catch(error => {
                    console.log(error)
                });
        } else {
            navigate('/')
        }

    }, []);



    const exerciceRedux = useSelector(state => (state))

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);

    };


    function valider() {
        // exerciceRedux.user[0].text.reponseInitiale.ligne2[1] ==> e
        // exerciceRedux.user[1].text ==> 
        let nbrExercice = exerciceRedux.user.length
        console.log("exercice redux ")
        console.log(exerciceRedux)
        for (let i = 0; i < nbrExercice; i++) {
            axios.post('http://51.77.150.97:4000/exercice/send_test_exercice', exerciceRedux)
            /*
                .then(response => {
                console.log('Réponse du backend :', response.data);
                })
                .catch(error => {
                console.error('Erreur lors de la requête vers le backend :', error);
                });
            console.log(exerciceRedux.user[0])
            */
        }
    }

    function saveWorksheet() {

        var radios = document.getElementsByName('anneeScolaire');
        var valeur;
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                valeur = radios[i].value;
            }
        }

        console.log(valeur)

        let nom = document.getElementById('nameInput').value;
        let descriptionWorksheeto = document.getElementById('textareaCE').value;


        if (valeur !== undefined) {

            if (nom !== "") {

                if (descriptionWorksheeto !== "") {

                    if ((exerciseDataArray.length) !== 0) {
                        let data = {
                            nom: document.getElementById('nameInput').value,
                            descriptionWorksheet: document.getElementById('textareaCE').value,
                            anneeScolaire: valeur,
                            data: exerciseDataArray
                        }

                        axios
                            .post('http://51.77.150.97:4000/exercice/saveWorksheet', { data }, config)
                            .then((res) => {

                                if (res.status == 201) {
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Feuille d\'exercice créée!',
                                        showConfirmButton: false,
                                        timer: 1500
                                    }).then((result) => {
                                        if (result.dismiss === Swal.DismissReason.timer) {
                                            navigate('/');
                                        }
                                    });
                                } else {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Une erreur s\'est produite durant la création de la feuille d\'exercice',
                                        text: 'Veuillez réessayer plus tard.',
                                    });
                                }

                                let data = {
                                    idExo: res.data.data._id,
                                    type: "WS"
                                }

                                axios.post(`http://51.77.150.97:4000/exercice/addExoToUser`, data, config)
                                    .then((res) => {
                                        console.log(res)
                                    })
                                    .catch((error) => {
                                        console.log(error)
                                    })

                            })
                            .catch((error) => {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Erreur!',
                                    text: 'Une erreur s\'est produite.',
                                });
                            })
                    } else {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Erreur de saisie',
                            text: 'Veuillez ajouter au moins un exercice à la feuille de cours.'
                        });
                    }
                } else {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Erreur de saisie',
                        text: 'Veuillez choisir une description pour l\'exercice.'
                    });
                }

            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Erreur de saisie',
                    text: 'Veuillez choisir un nom.'
                });
            }

        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Erreur de saisie',
                text: 'Veuillez choisir une année scolaire.'
            });
        }



    }

    return (
        <div>
            <div>
                <Navbar />
            </div>
            <h1 className='MenuWSTitle'>Menu de création d'une feuille d'exercice</h1>
            <div id="divTopPage">
                <Popup
                    trigger={
                        <p>Preview</p>
                    }
                    position="bottom center"
                    open={popupOpen}
                    on="hover"
                    closeOnDocumentClick
                >
                    <div>
                        {exerciseDataArray.length > 0 && (
                            <div id="preview">
                                <h3>Noms des éléments dans le tableau :</h3>
                                <h4>Nombre d'exercice : {exerciseDataArray.length}</h4>
                                <h5>Titre de la feuille d'exercice : {document.getElementById('nameInput').value}</h5>
                                <h5>Description de la feuille d'exercice : {document.getElementById('textareaCE').value}</h5>
                                <h5>Année scolaire visée : {anneeScolaire}</h5>
                                {exerciseDataArray.map((item, index) => (
                                    <p key={index}>Type : {item.type}</p>
                                ))}
                            </div>
                        )}
                    </div>
                </Popup>
                <button className='buttonCreationWS' onClick={saveWorksheet}>Sauver la feuille d'exercice</button>
                <Popup
                    trigger={
                        <span className='important2'><InfoIcon className='infoLogo' /></span>
                    }
                    open={popupOpen}
                    position="bottom center"
                    on="hover"
                >
                    <div className='explicationExo'>
                        <h1>Explication de la réalisation d'une feuille d'exercice</h1>
                        <br />
                        <p>Vous devez renseigenre l'année scolaire étant visé par la feuille d'exercice que vous allez créer.</p>
                        <br />
                        <p>Veuillez préciser également le titre de la feuille d'exercice ainsi que sa description.</p>
                        <br />
                        <p>Une fois cela fait, vous pouvez commencer à ajouter des exercices avec la liste déroulant présente si dessous</p>
                        <br />
                        <p>Bonne création !</p>
                    </div>
                </Popup>
            </div>
            <div>
                <div>
                    <div className='anneeScolaireWS'>
                        <p className='legendAnneeScolaireWS'>Choisissez l'année scolaire ciblée:</p>
                        <div className="AnneeScolaireChoiceWS">
                            <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="1" />1er
                            <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="2" />2ème
                            <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="3" />3ème
                            <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="4" />4ème
                            <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="5" />5ème
                            <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="6" />6ème
                        </div>
                    </div>
                </div>
            </div>
            <div id="infoExoWS">
                <div>
                    <input className='nameWSGlobal' id="nameInput" placeholder="Nom de votre feuille d'exercice"></input>
                </div>
                <div>
                    <textarea className='descriptionWSGlobal' id="textareaCE" placeholder="Description de votre feuille d'exercice..." />
                </div>
            </div>
            <div>
                <select id="selectFeuilleExercice" className="custom-select" value={selectedOption} onChange={handleSelectChange}>
                    <option selected>Ajouter un exercice</option>
                    <option value="TAT">Texte à trou</option>
                    <option value="TTI">Texte avec images</option>
                    <option value="MB">Mot bazard</option>
                    <option value="STT">Texte avec du son</option>
                    <option value="Abaque">Abaque</option>
                    <option value="MDN">Maison des nombres</option>
                    <option value="LDN">Ligne des nombres</option>
                </select>
                {selectedOption === 'TAT' &&
                    <BlankText onTatData={handleExerciseData} />
                }
                {selectedOption === 'TTI' &&
                    <TextToImg onTtiData={handleExerciseData} />
                }
                {selectedOption === 'MB' &&
                    <MB onMbData={handleExerciseData} />
                }
                {selectedOption === 'STT' &&
                    <SoundToText onSttData={handleExerciseData} />
                }
                {selectedOption === 'LDN' &&
                    <LigneDeNombre onLdnData={handleExerciseData} />
                }
                {selectedOption === 'Abaque' &&
                    <Abaque onAbaqueData={handleExerciseData} />
                }
                {selectedOption === 'MDN' &&
                    <MaisonDesNombres onMdnData={handleExerciseData} />
                }
            </div>
            <br />
            <div>
                <img id='creatifImg' src='creatif2.png'></img>
            </div>
        </div>
    );
};

export default CreateExercice;