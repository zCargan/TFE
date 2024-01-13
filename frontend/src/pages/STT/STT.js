import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import GetSounds from '../../components/getSoundsFromUserID/getSoundsFromUserID';
import Navbar from '../../components/navbar/Navbar';
import Swal from 'sweetalert2';

import Popup from 'reactjs-popup';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';

import './STT.css'

const STT = () => {
    const [selectedSounds, setSelectedSounds] = useState([]);
    const [soundName, setSoundName] = useState('');
    const [soundTable, setSoundTable] = useState([]);
    const [selectedSoundName, setSelectedSoundName] = useState('');
    const [exerciseDictionary, setExerciseDictionary] = useState({});
    const [id, setId] = useState('');
    const [dictionnaire, setDictionnaire] = useState({});
    const [selectedSoundNames, setSelectedSoundNames] = useState([]);
    const [popupOpen, setPopupOpen] = useState(false);

    const navigate = useNavigate();

    const handleSoundSelect = (sound) => {
        setId(sound.id)
        setSelectedSoundName(sound.nom);
    };



    const handleNameChange = (event) => {
        setSoundName(event.target.value);
    };

    const confirmeNameToString = () => {

        const isSoundAlreadySelected = soundTable.some(item => item.sound === selectedSoundName);


        if (isSoundAlreadySelected) {
            const updatedTable = soundTable.map(item => {
                if (item.sound === selectedSoundName) {
                    console.log(id);
                    console.log("Nouveau nom associé:", soundName);
                    setDictionnaire(prevDictionnaire => ({
                        ...prevDictionnaire,
                        [id]: soundName,
                    }));
                    return { ...item, inputValue: soundName };
                }
                return item;
            });
            setSoundTable(updatedTable);
        } else {
            if (document.getElementById('inputSound').value !== "") {
                console.log("Nom associé:", soundName);
                console.log(id);
                setDictionnaire(prevDictionnaire => ({
                    ...prevDictionnaire,
                    [id]: soundName,
                }));
                setSoundTable(prevTable => [...prevTable, { sound: selectedSoundName, inputValue: soundName }]);
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Erreur',
                    text: 'Veuillez donner un nom au son chosi',
                    confirmButtonText: 'OK',
                });
            }
        }


        setSoundName('');
        setSelectedSounds([]);
        document.getElementById('inputSound').value = ""
    };



    function validerExo() {

        var radios = document.getElementsByName('anneeScolaire');
        var valeur;
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                valeur = radios[i].value;
            }
        }

        if (valeur === undefined) {
            Swal.fire({
                icon: 'warning',
                title: 'Erreur',
                text: 'Veuillez choisir une année scolaire valide',
                confirmButtonText: 'OK',
            });
        } else {
            if (Object.keys(dictionnaire).length === 0) {
                Swal.fire({
                    title: "Aucune image",
                    text: "L'exercice n'est composé d'aucune image",
                    icon: 'info',
                    confirmButtonText: 'OK',
                });
            } else {
                if ((document.getElementById("nameExo").value !== "") && (document.getElementById("descriptionExoSTT").value !== "")) {
                    const config = {
                        headers: {
                            'Authorization': `Bearer ${Cookies.get('JWT')}`,
                            'Content-Type': 'application/json'
                        }
                    };
                    const data = {
                        nom: document.getElementById('nameExo').value,
                        anneeScolaire: valeur,
                        description: document.getElementById('descriptionExoSTT').value,
                        type: "STT",
                        reponses: dictionnaire
                    }
                    axios
                        .post(`http://localhost:4000/exercice/registerSTT`, data, config)
                        .then((res) => {

                            if (res.status == 201) {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Son avec texte créé!',
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
                                    title: 'Une erreur s\'est produite durant la création du son avec texte',
                                    text: 'Veuillez réessayer plus tard.',
                                });
                            }

                            let data = {
                                idExo: res.data.data._id,
                                type: "STT"
                            }

                            axios.post(`http://localhost:4000/exercice/addExoToUser`, data, config)
                                .then((res) => {
                                    console.log(res)
                                })
                                .catch((error) => {
                                    console.log(error)
                                })
                        })
                        .catch((error) => { })
                } else {
                    Swal.fire({
                        title: 'Erreur',
                        text: 'Veuillez compléter tous les champs',
                        icon: 'warning',
                        confirmButtonText: 'OK'
                    });
                }
            }
        }
    }

    return (
        <div>
            <Navbar />
            <div>
                <h2 className='MenuSTTTitle'>Menu de création du "Son à texte"</h2>
                <Popup
                    trigger={
                        <span className='important2'><InfoIcon className='infoLogo' /></span>
                    }
                    open={popupOpen}
                    position="bottom center"
                    on="hover"
                >
                    <div className='explicationExo'>
                        <h1>Explication de la réalisation de l'exercice</h1>
                        <br />
                        <h3>Avant de commencer la création de votre exercice, assurez vous de bien avoir ajouté vos sons à votre compte. Vous pouvez le faire <span className='divSpanButton'><a href='http://51.77.150.97/uploadSound'>ici</a></span></h3>
                        <br />
                        <p>Afin de réaliser l'exercice, vous devez en premier lieu séléctionner une année ciblée</p>
                        <p>Ensuite, créer votre "Son à texte" en séléctionnant le titre, la descritpion de votre "Son à texte".</p>
                        <br />
                        <p>Appuyer sur le bouton <span className='divSpanButton'>Récupérer mes sons"</span> afin de récupérer les sons que vous avez ajouter à votre profil</p>
                        <br />
                        <p>Cliquer sur le son désiré. Le nom de ce dernièr sera affiché à coté de "Son séléctionné". Entrez le nom que vous désirez lui à l'endroit dédié</p>
                        <br />
                        <p>Cliquer sur <span className='divSpanButton'>"Confirmer"</span> afin d'ajouter le son avec son nom s'y rapportant dans le tableau</p>
                        <br />
                        <p>Une fois toute les sons désirés présents dans le tableau, cliquer sur <span className='divSpanButton'>"Valider l'exercice"</span> afin de valider votre exercice</p>
                        <br />
                        <p>Féliciation!</p>
                    </div>
                </Popup>
                <div className='anneeScolaireSTT'>
                    <p className='legendAnneeScolaireSTT'>Choisissez l'année scolaire ciblée:</p>
                    <div className="AnneeScolaireChoiceSTT">
                        <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="1" />1er
                        <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="2" />2ème
                        <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="3" />3ème
                        <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="4" />4ème
                        <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="5" />5ème
                        <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="6" />6ème
                    </div>
                </div>
            </div>
            <div className='divInputsSTT'>
                <input className="inputSTTBottom" id="nameExo" placeholder="Nom de l'exercice"></input>
                <br />
                <textarea className="textareaSTT" id="descriptionExoSTT" placeholder="Description de l'exercice"></textarea>
            </div>
            <div id="soundPart">
                <div>
                    <h3 className='h3stt'>Son sélectionné : {selectedSoundName}</h3>
                </div>
                <div className='selectConfirmSTT'>
                    <input
                        placeholder="Nom donné au son pour l'exercice"
                        value={soundName}
                        onChange={handleNameChange}
                        id="inputSound"
                    />
                    <button className="buttonConfirmSTT" onClick={confirmeNameToString}>Confirmer</button>
                </div>
                <div>
                    <div className="table-container">
                        <table id="table">
                            <thead>
                                <tr>
                                    <th>Nom du son</th>
                                    <th>Nom associé</th>
                                </tr>
                            </thead>
                            <tbody>
                                {soundTable.map((row, index) => (
                                    <tr key={index}>
                                        <td>{row.sound}</td>
                                        <td>{row.inputValue}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <button className="buttonConfirmSTTValideExo" onClick={validerExo}>Valider l'exercice</button>
                </div>
            </div>
            <GetSounds onSoundSelect={handleSoundSelect} />
            <div>
                <img id='creatifImg' src='creatif2.png'></img>
            </div>
            <br />
        </div>
    );
};

export default STT;
