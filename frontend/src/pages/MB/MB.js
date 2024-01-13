import React, { useState } from 'react';
import GetPhotos from '../../components/getPhotos/getPhotos';
import UploadPhoto from '../../components/UploadPhoto/uploadPhoto';
import Swal from 'sweetalert2';
import axios from 'axios';
import Cookies from 'js-cookie';
import Navbar from '../../components/navbar/Navbar';

import { useNavigate } from 'react-router-dom';

import Popup from 'reactjs-popup';
import InfoIcon from '@mui/icons-material/Info';
import './MB.css'

const MB = () => {
    const [tableData, setTableData] = useState([]);
    const [selectedImageInfo, setSelectedImageInfo] = useState({ id: null, name: null });
    const [dictionary, setDictionary] = useState({});
    const [popupOpen, setPopupOpen] = useState(false);

    const navigate = useNavigate();

    const handleImageClick = (id, name) => {
        setSelectedImageInfo({ id, name });
    };

    function confirm() {
        if (selectedImageInfo.name) {
            const newId = selectedImageInfo.name;
            const newName = document.getElementById("name_photo_mb").value;

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
                if (document.getElementById('name_photo_mb').value !== "") {
                    const nameArray = newName.split('');

                    const newRow = { id: newId, photo: newId, name: nameArray };
                    setTableData([...tableData, newRow]);

                    const newDictionary = { ...dictionary };
                    newDictionary[selectedImageInfo.id] = nameArray;
                    setDictionary(newDictionary);
                    document.getElementById("name_photo_mb").value = "";
                    Swal.fire({
                        title: 'Image ajoutée',
                        icon: 'success',
                        showCancelButton: false,
                        showConfirmButton: false,
                        timer: 1000
                    });
                } else {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Erreur',
                        text: 'Veuillez donner un nom à l\'image choisie',
                        confirmButtonText: 'OK',
                    });
                }
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

        if (valeur === undefined) {
            Swal.fire({
                icon: 'warning',
                title: 'Erreur',
                text: 'Veuillez choisir une année scolaire valide',
                confirmButtonText: 'OK',
            });
        } else {
            if (Object.keys(dictionary).length === 0) {
                Swal.fire({
                    title: "Aucune image",
                    text: "L'exercice n'est composé d'aucune image",
                    icon: 'info',
                    confirmButtonText: 'OK',
                });
            } else {
                if ((document.getElementById("name").value !== "") && (document.getElementById("descriptionExoMB").value !== "")) {
                    const config = {
                        headers: {
                            'Authorization': `Bearer ${Cookies.get('JWT')}`,
                            'Content-Type': 'application/json' // Utilisation de 'application/json' pour le Content-Type
                        }
                    };

                    const data = {
                        nom: document.getElementById('name').value,
                        anneeScolaire: valeur,
                        description: document.getElementById('descriptionExoMB').value,
                        type: "MB",
                        reponses: dictionary
                    }



                    axios.post(`http://localhost:4000/exercice/registerMB`, { data }, config).then((res) => {

                        if (res.status == 201) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Mot bazard créé!',
                                showConfirmButton: false,
                                timer: 1000
                            }).then((result) => {
                                if (result.dismiss === Swal.DismissReason.timer) {
                                    navigate('/');
                                }
                            });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Une erreur s\'est produite durant la création du mot bazard',
                                text: 'Veuillez réessayer plus tard.',
                            });
                        }

                        let data = {
                            idExo: res.data.data._id,
                            type: "MB"
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
                } else {
                    Swal.fire({
                        title: 'Erreur',
                        text: 'Veuillez compléter tous les champs',
                        icon: 'warning',
                        confirmButtonText: 'OK'
                    });
                }

            }
            console.log(dictionary)
        }


    }

    return (
        <div id="mbPage">
            <Navbar />
            <h2 className='MenuMBTitle'>Menu de création votre mot bazard</h2>
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
                    <h3>Avant de commencer la création de votre exercice, assurez vous de bien avoir ajouté vos images à votre compte. Vous pouvez le faire <span className='divSpanButton'><a href='http://51.77.150.97/photo'>ici</a></span></h3>
                    <br />
                    <p>Afin de réaliser l'exercice, vous devez en premier lieu séléctionner une année ciblée</p>
                    <p>Ensuite, créer votre "Mot bazard" en séléctionnant le titre, la descritpion de votre "Mot bazard".</p>
                    <br />
                    <p>Appuyer sur le bouton <span className='divSpanButton'>Récupérer mes photos"</span> afin de récupérer les images que vous avez ajouter à votre profil</p>
                    <br />
                    <p>Cliquer sur l'image désirée. Le nom de cette dernière sera affiché à coté de "Nom de l'image sélectionné". Entrez le nom que vous désirez lui à l'endroit dédié</p>
                    <br />
                    <p>Cliquer sur <span className='divSpanButton'>"Confirmer"</span> afin d'ajouter l'image avec son nom s'y rapportant dans le tableau</p>
                    <br />
                    <p>Une fois toute les images désirées présentes dans le tableau, cliquer sur <span className='divSpanButton'>"Valider l'exercice"</span> afin de valider votre exercice</p>
                    <br />
                    <p>Féliciation!</p>
                </div>
            </Popup>
            <div className='anneeScolaireMB'>
                <p className='legendAnneeScolaireMB'>Choisissez l'année scolaire ciblée:</p>
                <div className="AnneeScolaireChoiceMB">
                    <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="1" />1er
                    <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="2" />2ème
                    <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="3" />3ème
                    <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="4" />4ème
                    <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="5" />5ème
                    <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="6" />6ème
                </div>
            </div>
            <br />
            <div className="MBdivcreation">
                <input className="inputMB" placeholder="Titre du nom bazard" id="name"></input>
                <textarea placeholder="Description de l'exercice" className="descriptionMB" id="descriptionExoMB"></textarea>
            </div>
            <div id="divSuiteExo">
                <div>
                    {selectedImageInfo.id && (
                        <div>
                            <h3 className='h3img'>Nom de l'image sélectionnée : {selectedImageInfo.name}</h3>
                        </div>
                    )}
                </div>
                <div id="suite">
                    <input placeholder='Placez ici le nom se rapportant à cette image' id="name_photo_mb"></input>
                    <button className='buttonMB' onClick={confirm}>Confirmer</button>
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
                <button className='buttonMB' onClick={(e) => saveExo()}>Valider l'exercice</button>
            </div>

            <div>
                <GetPhotos onImageClick={handleImageClick} />
            </div>
            <div>
                <img id='creatifImg' src='creatif2.png'></img>
            </div>
            <br />
        </div>
    );
};

export default MB;
