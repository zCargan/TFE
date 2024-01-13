import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import GetSounds from '../../../components/getSoundsFromUserID/getSoundsFromUserID';
import { IoIosInformationCircle } from "react-icons/io";
import Popup from 'reactjs-popup';
import InfoIcon from '@mui/icons-material/Info';
import Swal from 'sweetalert2';

import './SoundToText.css'

const SoundToText = ({ onSttData }) => {
    const [selectedSounds, setSelectedSounds] = useState([]);
    const [soundName, setSoundName] = useState('');
    const [soundTable, setSoundTable] = useState([]);
    const [selectedSoundName, setSelectedSoundName] = useState('');
    const [exerciseDictionary, setExerciseDictionary] = useState({});
    const [id, setId] = useState('');
    const [dictionnaire, setDictionnaire] = useState({});
    const [selectedSoundNames, setSelectedSoundNames] = useState([]);
    const [popupOpen, setPopupOpen] = useState(false);

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
    };



    function validerExo() {
        if (Object.keys(dictionnaire).length === 0) {
            Swal.fire({
                title: "Aucun son",
                text: "L'exercice n'est composé d'aucun son",
                icon: 'info',
                confirmButtonText: 'OK',
            });
        } else {
            if (document.getElementById('descriptionExoSTTWS').value !== "") {
                const data = {
                    description: document.getElementById('descriptionExoSTTWS').value,
                    type: "STT",
                    reponses: dictionnaire
                }
                onSttData(data)
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Erreur',
                    text: 'Veuillez choisir une description valide',
                    confirmButtonText: 'OK',
                });
            }
        }
    }

    return (
        <div>
            <br />
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
                    <p>Créer votre "Son à texte" en séléctionnant le titre, la descritpion de votre "Son à texte".</p>
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

            <div className='divsttWS'>
                <div>
                    <textarea id="descriptionExoSTTWS" placeholder="Description de l'exercice"></textarea>
                </div>
                <div className='infoSonSelected'>
                    <div>
                        <h3 className='h3sttWS'>Son sélectionné : {selectedSoundName}</h3>
                    </div>
                    <input
                        placeholder="Nom donné au son pour l'exercice"
                        value={soundName}
                        onChange={handleNameChange}
                        id="inputSound"
                    />
                    <button className='buttonSTTWS' onClick={confirmeNameToString}>Confirmer</button>
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
                        <button className='buttonSTTWS' onClick={validerExo}>Valider l'exercice</button>
                    </div>
                </div>
            </div>

            <GetSounds onSoundSelect={handleSoundSelect} />
        </div>
    );
};

export default SoundToText;
