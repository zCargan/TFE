import React, { useState } from 'react';
import './textToImg.css';
import GetPhotos from '../../../components/getPhotos/getPhotos';
import UploadPhoto from '../../../components/UploadPhoto/uploadPhoto';
import Swal from 'sweetalert2';
import axios from 'axios';
import Cookies from 'js-cookie';
import { IoIosInformationCircle } from "react-icons/io";
import Popup from 'reactjs-popup';


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
                const newRow = { id: newId, photo: newId, name: newName };
                setTableData([...tableData, newRow]);

                const newDictionary = { ...dictionary };
                newDictionary[selectedImageInfo.id] = newName;
                setDictionary(newDictionary);
                document.getElementById('name_photo').value = "";
            }
        }
    }

    function saveExo() {


        const data = {
            description: document.getElementById('descriptionExo').value,
            type: "TTI",
            reponses: dictionary
        }
        onTtiData(data)
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
                <textarea id="descriptionExo" placeholder="Description DE l'exercice" rows={7} cols={60}></textarea>
            </div>
            {selectedImageInfo.id && (
                <div>
                    <h3>Image sélectionnée : {selectedImageInfo.name}</h3>
                </div>
            )}
            <div id="suite">
                <input placeholder='Placez ici le nom se rapportant à cette image' id="name_photo" style={{ width: "300px" }}></input>
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
                                <td>{row.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <GetPhotos onImageClick={handleImageClick} />
            </div>
            <br />
            <button onClick={(e) => saveExo()}>Valider l'exercice</button>
        </div>
    );
};

export default TextToImg;
