import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import './MB.css'

const MB = () => {


    let idExoMB = ""
    let reponsesAttendues = [];
    const [arrayMotBonOrdre, setArrayMotBonOrdre] = useState([]);

    const getMBCalledRef = useRef(false);

    useEffect(() => {
        if (!getMBCalledRef.current) {
            getMB();
            getMBCalledRef.current = true;
        }
    }, []);


    const config = {
        headers: {
          'Authorization': `Bearer ${Cookies.get('JWT')}`,
          'Content-Type': 'application/json'
        }
    };

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
        axios
            .get('http://localhost:4000/exercice/getMB')
            .then((res) => {
                console.log(res.data[0]._id);
                const img = res.data[0].reponses;
                idExoMB = res.data[0]._id
                let cles = Object.keys(img);
                const imageContainer = document.getElementById('zoneExoMB');
    
                imageContainer.style.display = 'flex';
                imageContainer.style.flexWrap = 'wrap'; // Permettre le retour à la ligne si nécessaire
                imageContainer.style.justifyContent = 'center'; // Centrez horizontalement
    
                for (let i = 0; i < cles.length; i++) {
                    axios
                        .get(`http://localhost:4000/photos/getImage/${cles[i]}`, config)
                        .then((resPhoto) => {
                            
                            for (let j = 0; j < resPhoto.data.length; j++) {
                                reponsesAttendues.push(resPhoto.data[0].nom_d_origine);
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
                                const imageName = concatenateLetters(cles[i], res.data[0].reponses);
                                nameElement.textContent = imageName; // Ajouter le nom en tant que texte
                                nameElement.style.marginTop = '10px'; // Ajouter un espace en haut du texte
    
                                const inputElement = document.createElement('input');
                                inputElement.type = 'text';
                                inputElement.placeholder = 'Saisir un texte ici';
                                inputElement.style.width = '200px';
                                inputElement.style.marginTop = '10px'; // Ajouter un espace en haut de l'input
    
                                inputElement.classList.add('answerExoMB'); // Ajout de la classe 'answerExo'
    
                                imageInputContainer.appendChild(imageElement);
                                imageInputContainer.appendChild(nameElement); // Ajout du nom
                                imageInputContainer.appendChild(inputElement);
                                imageContainer.appendChild(imageInputContainer);
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }


    function valideReponsesMB () {
        axios
        .get('http://localhost:4000/exercice/getMB')
        .then((res) => {
            let inputUser = document.getElementsByClassName('answerExoMB');
            let score = 0;
            let nbrExos = 0;
            for(let i = 0; i < arrayMotBonOrdre.length; i ++) {
                if(inputUser[i].value.toUpperCase() === arrayMotBonOrdre[i]) {
                    score += 1;
                }
                nbrExos += 1;
            }
            console.log((score/nbrExos)*100)
            const config = {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('JWT')}`
                }
            }

            const data = {
                type: "MB",
                score: Math.floor((score/nbrExos)*100),
                idExercice: res.data[0]._id
            }
            
            console.log(data)

            axios.post("http://localhost:4000/exercice/registerAnswers", {data}, config)
        })
        .catch((error) => {
            console.log(error);
        });
    }

    function seeCorrectionMB() {

    }

    return (
        <div>
            <div id="zone_mb">
                <button onClick={getMB}>Click ici pour un exo MB</button>
                <div id="zoneExoMB"></div>
                <button id="valideReponse" onClick={valideReponsesMB}>Valider mes réponses MB</button>
                <button onClick={seeCorrectionMB}>Voir la correction</button>
            </div>
        </div>
    );
};

export default MB;