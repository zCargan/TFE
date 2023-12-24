import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import GetSounds from '../../../components/getSoundsFromUserID/getSoundsFromUserID';
import { IoIosInformationCircle } from "react-icons/io";
import Popup from 'reactjs-popup';

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
        // Vérifier si le son est déjà présent dans le tableau
        const isSoundAlreadySelected = soundTable.some(item => item.sound === selectedSoundName);

        // Si le son est déjà sélectionné, mettez à jour la valeur associée
        if (isSoundAlreadySelected) {
            const updatedTable = soundTable.map(item => {
                if (item.sound === selectedSoundName) {
                    console.log(id); // Afficher l'ancienne valeur associée
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
            // Si le son n'est pas déjà sélectionné, ajoutez-le au tableau
            console.log("Nom associé:", soundName);
            console.log(id);
            setDictionnaire(prevDictionnaire => ({
                ...prevDictionnaire,
                [id]: soundName,
            }));
            setSoundTable(prevTable => [...prevTable, { sound: selectedSoundName, inputValue: soundName }]);
        }

        // Réinitialisez les états
        setSoundName('');
        setSelectedSounds([]);
    };



    function validerExo() {



        const data = {
            description: document.getElementById('descriptionExo').value,
            type: "STT",
            reponses: dictionnaire
        }
        onSttData(data)

    }

    return (
        <div>
            <br />
            <Popup
                trigger={
                    <a href="#" title="Historique" id="InfoCircle">
                        <IoIosInformationCircle />
                    </a>}
                position="left center"
                open={popupOpen}
                on="hover"
                closeOnDocumentClick
            >
                <div>
                    <div id="fonctionnement">
                        <h3>Fonctionnement</h3>
                        <div>
                            <p>Afin de réussir la création de l'exercice:
                                <br />
                                <br />
                                1° Veuillez récupérer vos sons
                                <br />
                                2° Cliquez sur le son désiré (Son nom apparaitra à coté de "Sons séléctionnée")
                                <br />
                                3° Entrez le nom de l'image choisie et cliquez sur confirmer pour valider
                                <br />
                                4° Si la relation image apparait avec le nom que vous lui avez donné, c'est bon
                            </p>
                        </div>
                    </div>
                </div>
            </Popup>

            <div className='divsttWS'>
                <div>
                    <textarea id="descriptionExo" placeholder="Description de l'exercice" rows={7} cols={60}></textarea>
                </div>
                <div className='infoSonSelected'>
                    <div>
                        <h3 className='h3sttWS'>Sons sélectionnés : {selectedSoundName}</h3>
                    </div>
                    <input
                        placeholder="Nom donné au son pour l'exercice"
                        style={{ width: "250px" }}
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
                    </div>
                </div>
            </div>

            <GetSounds onSoundSelect={handleSoundSelect} />

            <div>
                <button className='buttonSTTWS' onClick={validerExo}>Valider</button>
            </div>
        </div>
    );
};

export default SoundToText;
