import React, { useState } from 'react';
import GetPhotos from '../../components/getPhotos/getPhotos';
import UploadPhoto from '../../components/UploadPhoto/uploadPhoto';
import Swal from 'sweetalert2';
import axios from 'axios';
import Cookies from 'js-cookie';
import Navbar from '../../components/navbar/Navbar';

import { useNavigate } from 'react-router-dom';

import './TTI.css'

const TTI = () => {
    const [tableData, setTableData] = useState([]);
    const [selectedImageInfo, setSelectedImageInfo] = useState({ id: null, name: null });
    const [dictionary, setDictionary] = useState({});

    const navigate = useNavigate();

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
                    text: "Cette image est déja utilisée pour un autre mot!",
                    showConfirmButton: false,
                    timer: 2000
                });
            } else {
                const newRow = { id: newId, photo: newId, name: newName };
                setTableData([...tableData, newRow]);

                const newDictionary = { ...dictionary };
                newDictionary[selectedImageInfo.id] = newName;
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
            type: "TTI",
            reponses: dictionary
        }

        axios.post(`http://localhost:4000/exercice/registerTTI`, data, config).then((res) => {


            if (res.status == 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Texte à image créé!',
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
                    title: 'Une erreur s\'est produite durant la création du texte à image',
                    text: 'Veuillez réessayer plus tard.',
                });
            }

            let data = {
                idExo: res.data.data._id,
                type: "TTI"
            }

            axios.post(`http://localhost:4000/exercice/addExoToUser`, data, config)
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
    }

    return (
        <div>
            <Navbar />
            <div>
                <h2 className='MenuTTITitle'>Menu de création du "Texte avec images"</h2>
                <div className='anneeScolaireTTI'>
                    <p className='legendAnneeScolaireTTI'>Choisissez l'année scolaire ciblée:</p>
                    <div className="AnneeScolaireChoiceTTI">
                        <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="1" />1er
                        <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="2" />2ème
                        <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="3" />3ème
                        <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="4" />4ème
                        <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="5" />5ème
                        <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="6" />6ème
                    </div>
                </div>
            </div>
            <br />
            <div className='divInputsTTI'>
                <input className="inputTTIBottom" id="nameExo" placeholder="Nom de l'exercice"></input>
                <textarea className="textareaTTI" id="descriptionExo" placeholder="Description de l'exercice" rows="5" cols="100"></textarea>
            </div>
            <br />
            <div className="divDuDessous">
                <div id="bigdiv" className='divConfig'>
                    {selectedImageInfo.id && (
                        <div>
                            <h3 className='imgSelected'>Nom de l'image sélectionnée : {selectedImageInfo.name}</h3>
                        </div>
                    )}
                    <div id="suite">
                        <input className='sonImageTTI' placeholder='Placez ici le nom se rapportant à cette image' id="name_photo" style={{ width: "300px" }}></input>
                        <button className='buttonTTI' onClick={confirm}>Confirmer</button>
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
                                        <td>{row.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button className='buttonTTI' onClick={(e) => saveExo()}>Valider l'exercice</button>
                </div>
                <div>
                    <GetPhotos onImageClick={handleImageClick} />
                </div>
            </div>

            <div>
                <img id='creatifImg' src='creatif2.png'></img>
            </div>
            <br />
        </div>
    );
};

export default TTI;
