import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import GetSounds from '../../components/getSoundsFromUserID/getSoundsFromUserID';
import Navbar from '../../components/navbar/Navbar';
import Swal from 'sweetalert2';

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

    const navigate = useNavigate();

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

        const config = {
            headers: {
                'Authorization': `Bearer ${Cookies.get('JWT')}`,
                'Content-Type': 'application/json' // Utilisation de 'application/json' pour le Content-Type
            }
        };

        const data = {
            nom: document.getElementById('nameExo').value,
            anneeScolaire: valeur,
            description: document.getElementById('descriptionExo').value,
            type: "STT",
            reponses: dictionnaire
        }

        axios
            .post(`http://51.77.150.97:4000/exercice/registerSTT`, data, config)
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

                axios.post(`http://51.77.150.97:4000/exercice/addExoToUser`, data, config)
                    .then((res) => {
                        console.log(res)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            })
            .catch((error) => { })

    }

    return (
        <div>
            <Navbar />
            <div>
                <h2 className='MenuSTTTitle'>Menu de création du "Son à texte"</h2>
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
                <textarea className="textareaSTT" id="descriptionExo" placeholder="Description de l'exercice" rows="5" cols="100"></textarea>
            </div>
            <div id="soundPart">
                <div>
                    <h3 className='h3stt'>Sons sélectionnés : {selectedSoundName}</h3>
                </div>
                <div className='selectConfirmSTT'>
                    <input
                        placeholder="Nom donné au son pour l'exercice"
                        style={{ width: "250px" }}
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
                    <button className="buttonConfirmSTTValideExo" onClick={validerExo}>Valider</button>
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
