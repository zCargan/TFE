import React, { useState } from 'react';
import GetPhotos from '../../components/getPhotos/getPhotos';
import UploadPhoto from '../../components/UploadPhoto/uploadPhoto';
import Swal from 'sweetalert2';
import axios from 'axios';
import Cookies from 'js-cookie';
import Navbar from '../../components/navbar/Navbar';

import './MB.css'

const MB = () => {
    const [tableData, setTableData] = useState([]);
    const [selectedImageInfo, setSelectedImageInfo] = useState({ id: null, name: null });
    const [dictionary, setDictionary] = useState({});

    const handleImageClick = (id, name) => {
        setSelectedImageInfo({ id, name });
    };

    function confirm() {
        if (selectedImageInfo.name) {
            const newId = selectedImageInfo.name;
            const newName = document.getElementById("name_photo").value;

            const idExists = tableData.some(row => row.id === newId);

            if (idExists) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Cette image est déjà utilisée pour un autre mot!",
                    showConfirmButton: false,
                    timer: 2000
                });
            } else {
                // Convertir la chaîne de caractères en tableau
                const nameArray = newName.split('');
                
                const newRow = { id: newId, photo: newId, name: nameArray };
                setTableData([...tableData, newRow]);

                const newDictionary = { ...dictionary };
                newDictionary[selectedImageInfo.id] = nameArray;
                setDictionary(newDictionary);
            }
        }
    }

    function saveExo() {

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
            type: "MB",
            reponses: dictionary
        }
        


        axios.post(`http://localhost:4000/exercice/registerMB`, {data}, config).then((res) => {

        })
        .catch((error) => {
            console.log(error)
        })

    }

    return (
        <div id="mbPage">
            <Navbar />
            <div>
                <br />
                <fieldset>
                    <legend>Choisissez l'année scolaire ciblée:</legend>
                    <input type="radio" name="anneeScolaire" value="1" />1er
                    <input type="radio" name="anneeScolaire" value="2" />2ème
                    <input type="radio" name="anneeScolaire" value="3" />3ème
                    <input type="radio" name="anneeScolaire" value="4" />4ème
                    <input type="radio" name="anneeScolaire" value="5" />5ème
                    <input type="radio" name="anneeScolaire" value="6" />6ème
                </fieldset>
            </div>
            <h3>Créez ici vos relations entre vos photos et un mot !</h3>
            <br />
            <div>
                <input id="nameExo" placeholder="Nom de l'exercice"></input>
                <br></br>
                <br></br>
                <textarea id="descriptionExo" placeholder="Description de l'exercice" rows="5" cols="100"></textarea>
            </div>
            <div>
                <p>Veuillez d'abord choisir une image</p>
                <GetPhotos onImageClick={handleImageClick} />
            </div>
            {selectedImageInfo.id && (
                <div>
                    <h3>Nom de l'image sélectionnée : {selectedImageInfo.name}</h3>
                </div>
            )}
            <div id="suite">
                <input placeholder='Placez ici le nom se rapportant à cette image' id="name_photo" style={{width: "300px"}}></input>
                <button onClick={confirm}>Confirmer</button>
            </div>
            <br />
            <div className="table-container">
                <table id="table">
                    <thead>
                        <tr>
                            <th style={{ display: "none" }}>ID de l'image</th>
                            <th>Nom de l'image</th>
                            <th>Mot(s) associé(s)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map(row => (
                            <tr key={row.photo}>
                                <td style={{ display: "none" }}>{row.id}</td>
                                <td>{row.photo}</td>
                                <td>{row.name.join('')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <br />
            <br />
            <button onClick={(e) => saveExo()}>Valider l'exercice</button>
        </div>
    );
};

export default MB;
