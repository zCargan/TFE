import React, { useState } from 'react';
import './motBazard.css'
import GetPhotos from '../../../components/getPhotos/getPhotos';
import UploadPhoto from '../../../components/UploadPhoto/uploadPhoto';
import Swal from 'sweetalert2';
import axios from 'axios';
import Cookies from 'js-cookie';
import { IoIosInformationCircle } from "react-icons/io";
import Popup from 'reactjs-popup';

const MotBazard = ({ onMbData }) => {
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
        const config = {
            headers: {
                'Authorization': `Bearer ${Cookies.get('JWT')}`,
                'Content-Type': 'application/json' // Utilisation de 'application/json' pour le Content-Type
            }
        };

        const data = {
            description: document.getElementById('descriptionExo').value,
            type: "MB",
            reponses: dictionary
        }
        onMbData(data)

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
                                1° Veuillez récupérer vos images
                                <br />
                                2° Cliquez sur l'image désiré (Son nom apparaitra à coté de "Image séléctionnée")
                                <br />
                                3° Entrez le nom de l'image choisie et cliquez sur confirmer pour valider
                                <br /> 
                                4° Si la relation image apparait avec le nom que vous lui avez donné, c'est bon
                            </p>
                        </div>
                    </div>
                </div>
            </Popup>
            <div>
                <br></br>
                <textarea id="descriptionExo" placeholder="Description de l'exercice" rows={7} cols={60}></textarea>
            </div>
            <div>
                <input placeholder='Placez ici le nom se rapportant à cette image' id="name_photo" style={{ width: "300px" }}></input><button onClick={confirm}>Confirmer</button>
            </div>
            {selectedImageInfo.id && (
                <div>
                    <h3>Nom de l'image sélectionnée : {selectedImageInfo.name}</h3>
                </div>
            )}
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
                <div>
                    <GetPhotos onImageClick={handleImageClick} />
                </div>
            </div>
            <br />
            <br />
            <button onClick={(e) => saveExo()}>Valider l'exercice</button>
        </div>
    );
};

export default MotBazard;
