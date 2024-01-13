import React, { useState } from 'react';
import GetPhotos from '../../components/getPhotos/getPhotos';
import UploadPhoto from '../../components/UploadPhoto/uploadPhoto';
import Swal from 'sweetalert2';
import axios from 'axios';
import Cookies from 'js-cookie';
import Navbar from '../../components/navbar/Navbar';

import Popup from 'reactjs-popup';
import InfoIcon from '@mui/icons-material/Info';

import { useNavigate } from 'react-router-dom';

import './TTI.css'

const TTI = () => {
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
                if (document.getElementById('name_photo').value !== "") {
                    const newRow = { id: newId, photo: newId, name: newName };
                    setTableData([...tableData, newRow]);

                    const newDictionary = { ...dictionary };
                    newDictionary[selectedImageInfo.id] = newName;
                    setDictionary(newDictionary);
                    document.getElementById("suite").value = ""
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
                        text: 'Veuillez donner un nom à l\'image chosi',
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
                if ((document.getElementById("nameExo").value !== "") && (document.getElementById("descriptionExoTTI").value !== "")) {
                    const config = {
                        headers: {
                            'Authorization': `Bearer ${Cookies.get('JWT')}`,
                            'Content-Type': 'application/json' // Utilisation de 'application/json' pour le Content-Type
                        }
                    };
                    const data = {
                        nom: document.getElementById('nameExo').value,
                        anneeScolaire: valeur,
                        description: document.getElementById('descriptionExoTTI').value,
                        type: "TTI",
                        reponses: dictionary
                    }
                    axios.post(`http://localhost:4000/exercice/registerTTI`, data, config).then((res) => {
                        if (res.status == 201) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Texte à image créé!',
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
                <h2 className='MenuTTITitle'>Menu de création du "Texte avec images"</h2>
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
                        <p>Ensuite, créer votre "Texte avec images" en séléctionnant le titre, la descritpion de votre "Texte avec images".</p>
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
                <textarea className="textareaTTI" id="descriptionExoTTI" placeholder="Description de l'exercice" rows="5" cols="100"></textarea>
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
                        <input className='sonImageTTI' placeholder='Placez ici le nom se rapportant à cette image' id="name_photo"></input>
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
