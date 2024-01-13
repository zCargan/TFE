import React, { useState } from 'react';
import './textToImg.css';
import GetPhotos from '../../../components/getPhotos/getPhotos';
import UploadPhoto from '../../../components/UploadPhoto/uploadPhoto';
import Swal from 'sweetalert2';
import axios from 'axios';
import Cookies from 'js-cookie';
import { IoIosInformationCircle } from "react-icons/io";
import Popup from 'reactjs-popup';
import InfoIcon from '@mui/icons-material/Info';

const TextToImg = ({ onTtiData }) => {
    const [tableData, setTableData] = useState([]);
    const [selectedImageInfo, setSelectedImageInfo] = useState({ id: null, name: null });
    const [dictionary, setDictionary] = useState({});
    const [popupOpen, setPopupOpen] = useState(false);

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
                    document.getElementById('name_photo').value = "";
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
        if (Object.keys(dictionary).length === 0) {
            Swal.fire({
                title: "Aucune image",
                text: "L'exercice n'est composé d'aucune image",
                icon: 'info',
                confirmButtonText: 'OK',
            });
        } else {
            if (document.getElementById('descriptionExo').value !== "") {
                const data = {
                    description: document.getElementById('descriptionExo').value,
                    type: "TTI",
                    reponses: dictionary
                }
                onTtiData(data)
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
                    <h3>Avant de commencer la création de votre exercice, assurez vous de bien avoir ajouté vos images à votre compte. Vous pouvez le faire <span className='divSpanButton'><a href='http://51.77.150.97/photo'>ici</a></span></h3>
                    <br />
                    <p>Créer votre "Texte avec images" en séléctionnant la descritpion de votre "Texte avec images".</p>
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
            <div className='divTTIWS'>
                <div>
                    <textarea id="descriptionExo" placeholder="Description DE l'exercice" rows={7} cols={60}></textarea>
                </div>
                {selectedImageInfo.id && (
                    <div>
                        <h3 className='h3TTIWS'>Image sélectionnée : {selectedImageInfo.name}</h3>
                    </div>
                )}
                <div id="suite">
                    <input className='inputTTIWS' placeholder='Placez ici le nom se rapportant à cette image' id="name_photo"></input>
                    <button className='buttonTTIWS' onClick={confirm}>Confirmer</button>
                </div>
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
                    <button className='buttonTTIWS' onClick={(e) => saveExo()}>Valider l'exercice</button>
                </div>
            </div>


            <div>
                <GetPhotos onImageClick={handleImageClick} />
            </div>
            <br />

        </div>
    );
};

export default TextToImg;
