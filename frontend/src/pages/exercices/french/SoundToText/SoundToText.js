import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import GetSounds from '../../../../components/getSoundsFromUserID/getSoundsFromUserID';

const SoundToText = ({onSttData}) => {
    const [selectedSounds, setSelectedSounds] = useState([]);
    const [soundName, setSoundName] = useState('');
    const [soundTable, setSoundTable] = useState([]);
    const [selectedSoundName, setSelectedSoundName] = useState('');
    const [exerciseDictionary, setExerciseDictionary] = useState({});
    const [id, setId] = useState('');
    const [dictionnaire, setDictionnaire] = useState({});
    const [selectedSoundNames, setSelectedSoundNames] = useState([]);

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
            nom: document.getElementById('nameExo').value,
           
            description: document.getElementById('descriptionExo').value,
            type: "STT",
            reponses: dictionnaire
        }
        onSttData(data)

    }

    return (
        <div>
            <br />
            <h3>Créez ici vos relations entre vos sons et un mot !</h3>
            <br />
            <div>
                <input id="nameExo" placeholder="Nom de l'exercice"></input>
                <br></br>
                <br></br>
                <textarea id="descriptionExo" placeholder="Description de l'exercice" rows="5" cols="100"></textarea>
            </div>
                <p>Veuillez d'abord choisir un son</p>
            <GetSounds onSoundSelect={handleSoundSelect} />
            <div>
                <div>
                    <h3>Sons sélectionnés : {selectedSoundName}</h3>
                </div>
                <input
                    placeholder="Nom donné au son pour l'exercice"
                    style={{ width: "250px" }}
                    value={soundName}
                    onChange={handleNameChange}
                    id="inputSound"
                />
                <button onClick={confirmeNameToString}>Confirmer</button>
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
                <button onClick={validerExo}>Valider</button>
            </div>
        </div>
    );
};

export default SoundToText;
