import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios'
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import './MBWSCreatorCorrection.css'

const MBWSCreatorCorrection = ({ exo, onMBDataChange }) => {

    const [arrayMotBonOrdre, setArrayMotBonOrdre] = useState([]);
    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (!getMBCalledRef.current) {
            getMB();
            getMBCalledRef.current = true;

            // Attacher l'événement de clic ici après le premier rendu
            const testVraitestElement = document.getElementById("testVraitest");
            if (testVraitestElement) {
                testVraitestElement.addEventListener("click", buttonClicked);
            }
        }
    }, []);

    let reponsesAttendues = [];

    const config = {
        headers: {
            'Authorization': `Bearer ${Cookies.get('JWT')}`
        }
    }


    const getMBCalledRef = useRef(false);
    const navigate = useNavigate();

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Échanger les éléments de manière aléatoire
        }
    }


    function concatenateLetters(id, reponses) {
        if (reponses[id] && Array.isArray(reponses[id])) {
            const originalOrderString = reponses[id].join('').toUpperCase();
            setArrayMotBonOrdre((prevArray) => [...prevArray, originalOrderString]); // Mettre à jour l'état
            const shuffledLetters = reponses[id].slice();
            shuffleArray(shuffledLetters);
            const concatenatedString = shuffledLetters.join('');
            return concatenatedString.toUpperCase();
        } else {
            return '';
        }
    }

    function getMB() {
        if (exo.length !== 0) {
            const img = exo.reponses;
            console.log(img)
            let cles = Object.keys(img);
            const imageContainer = document.getElementById('zoneExoMBWSCorrection');

            imageContainer.style.display = 'flex';
            imageContainer.style.flexWrap = 'wrap'; // Permettre le retour à la ligne si nécessaire
            imageContainer.style.justifyContent = 'center'; // Centrez horizontalement

            for (let i = 0; i < cles.length; i++) {
                axios
                    .get(`http://backendContainer:4000/photos/getImage/${cles[i]}`, config)
                    .then((resPhoto) => {
                        console.log(img[cles[i]]);
                        reponsesAttendues.push(img[cles[i]].join(''));
                        for (let j = 0; j < resPhoto.data.length; j++) {
                            console.log(resPhoto.data[j].image_data)

                            const imageBinaryData = resPhoto.data[j].image_data.data;
                            const blob = new Blob([new Uint8Array(imageBinaryData)], { type: resPhoto.data[j].type_mime });
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

                            const nameElement = document.createElement('div');
                            const imageName = concatenateLetters(cles[i], exo.reponses);
                            nameElement.textContent = imageName; // Ajouter le nom en tant que texte
                            nameElement.style.marginTop = '10px'; // Ajouter un espace en haut du texte

                            const headingElement = document.createElement('h4');
                            headingElement.innerText = img[cles[i]].join('');
                            headingElement.style.marginTop = '10px';

                            imageInputContainer.appendChild(imageElement);
                            imageInputContainer.appendChild(nameElement); // Ajout du nom
                            imageInputContainer.appendChild(headingElement);
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

            let inputUser = document.getElementsByClassName('answerExoMB');
            let score = 0;
            let nbrExos = 0;
            for (let i = 0; i < reponsesAttendues.length; i++) {
                console.log(inputUser[i].value.toLowerCase())
                console.log(reponsesAttendues[i])
                if (inputUser[i].value.toLowerCase() == reponsesAttendues[i]) {
                    score += 1;
                }
                nbrExos += 1;
            }
            console.log(score)
            console.log(nbrExos)
            onMBDataChange((score / nbrExos) * 100);
        }
    }


    return (
        <div>
            {exo.length !== 0 ? (
                <div id="mbwscc">
                    <h3>{nom}</h3>
                    <p id="description">{exo.description}</p>
                    <br />
                    <div id="zone_mb">
                        <div id="zoneExoMBWSCorrection"></div>
                        <p></p>
                    </div>
                </div>
            ) : (
                <div>
                </div>
            )}
        </div>
    );

};

export default MBWSCreatorCorrection;