import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import './TTIWSCreator.css'

const TTIWSCreator = ({ exo, onTTIDataChange }) => {
    let reponsesAttendues = [];
    const getMBCalledRef = useRef(false);
    const navigate = useNavigate();

    const [nom, setNom] = useState('');
    const [anneeScolaire, setAnneeScolaire] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [id, setId] = useState('');
    const [reponses, setReponses] = useState('');



    useEffect(() => {
        if (!getMBCalledRef.current) {
            getExoTTI();
            getMBCalledRef.current = true;

            // Attacher l'événement de clic ici après le premier rendu
            const testVraitestElement = document.getElementById("testVraitest");
            if (testVraitestElement) {
                testVraitestElement.addEventListener("click", buttonClicked);
            }
        }
    }, []);

    const config = {
        headers: {
            'Authorization': `Bearer ${Cookies.get('JWT')}`,
            'Content-Type': 'application/json'
        }
    };

    function getExoTTI() {

        if (exo.length !== 0) {

            let cles = Object.keys(exo.reponses);

            console.log(cles)

            // const img = reponse.data.reponses;
            // console.log(reponse.data.description)
            // setId(reponse.data._id);
            // setNom(reponse.data.nom);
            // setAnneeScolaire(reponse.data.anneeScolaire);
            // setDescription(reponse.data.description);
            // setType(reponse.data.type);
            // let cles = Object.keys(img);

            const imageContainer = document.getElementById('zoneExos');

            imageContainer.style.display = 'flex';
            imageContainer.style.flexWrap = 'wrap'; // Permettre le retour à la ligne si nécessaire
            imageContainer.style.justifyContent = 'center'; // Centrez horizontalement

            for (let i = 0; i < cles.length; i++) {
                axios
                    .get(`http://localhost:4000/photos/getImage/${cles[i]}`, config)
                    .then((res) => {
                        reponsesAttendues.push(exo.reponses[cles[i]].toLowerCase())
                        for (let j = 0; j < res.data.length; j++) {
                            const imageBinaryData = res.data[j].image_data.data;
                            const blob = new Blob([new Uint8Array(imageBinaryData)], { type: res.data[j].type_mime });
                            const objectURL = URL.createObjectURL(blob);

                            const imageInputContainer = document.createElement('div');
                            imageInputContainer.style.margin = '20px';
                            imageInputContainer.style.textAlign = 'center'; // Centrer le contenu
                            imageInputContainer.style.display = 'flex'; // Conteneur en colonne
                            imageInputContainer.style.flexDirection = 'column'; // Alignement en colonne

                            const imageElement = document.createElement('img');
                            imageElement.src = objectURL;
                            imageElement.style.width = '200px';
                            imageElement.style.height = '200px';


                            const inputElement = document.createElement('input');
                            inputElement.type = 'text';
                            inputElement.placeholder = 'Saisir un texte ici';
                            inputElement.style.width = '200px';
                            inputElement.style.marginTop = '10px'; // Ajouter un espace en haut de l'input

                            inputElement.value = ''; // Valeur par défaut
                            inputElement.classList.add('answerExoTTI'); // Ajout de la classe 'answerExo'

                            imageInputContainer.appendChild(imageElement);
                            imageInputContainer.appendChild(inputElement);
                            imageContainer.appendChild(imageInputContainer);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
    }
    const buttonClicked = () => {
        if (exo.length !== 0) {
            console.log(reponsesAttendues)
            let inputUser = document.getElementsByClassName('answerExoTTI');
            let length = inputUser.length
            let nbrExos = 0;
            let score = 0;

            for (let i = 0; i < reponsesAttendues.length; i++) {          
                console.log(String(inputUser[i].value).trim().toLowerCase() === String(reponsesAttendues[i]).trim().toLowerCase());
                if (String(inputUser[i].value).trim().toLowerCase() === String(reponsesAttendues[i]).trim().toLowerCase()) {
                    score += 1;
                }
                nbrExos += 1;
            }

            // for (let i = 0; i < length; i++) {
            //     console.log(reponsesAttendues[i])
            //     if (inputs[i].value === reponsesAttendues[i]) {
            //         score += 1;
            //     }
            //     nbrExos += 1;
            // }
            // console.log(((score / nbrExos) * 100));
            onTTIDataChange((score / nbrExos) * 100);
        }

    }


    return (
        <div>
            {exo.length !== 0 ? (
                <div className='divShowWorksheet' id="TTIWSCreator">
                    <h3>{nom}</h3>
                    <p id="description">{exo.description}</p>
                    <br />
                    <div>
                        <div id="zoneExos"></div>
                    </div>
                </div>
            ) : (
                <div>
                </div>
            )}
        </div>

    );
};


export default TTIWSCreator;