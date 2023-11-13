import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const TTI = () => {

    let reponsesAttendues = [];
    const getMBCalledRef = useRef(false);

    useEffect(() => {
        if (!getMBCalledRef.current) {
            getExoTTI();
            getMBCalledRef.current = true;
        }
    }, []);

    const config = {
        headers: {
            'Authorization': `Bearer ${Cookies.get('JWT')}`,
            'Content-Type': 'application/json' // Utilisation de 'application/json' pour le Content-Type
        }
    };

    function getExoTTI() {
        axios
            .get('http://localhost:4000/exercice/getTTI', config)
            .then((res) => {
                console.log(res.data[0]._id)
                const img = res.data[0].reponses;
                let cles = Object.keys(img);
                const imageContainer = document.getElementById('zoneExos');
    
                imageContainer.style.display = 'flex';
                imageContainer.style.flexWrap = 'wrap'; // Permettre le retour à la ligne si nécessaire
                imageContainer.style.justifyContent = 'center'; // Centrez horizontalement
    
                for (let i = 0; i < cles.length; i++) {
                    axios
                        .get(`http://localhost:4000/photos/getImage/${cles[i]}`, config)
                        .then((res) => {
                            for (let j = 0; j < res.data.length; j++) {
                                reponsesAttendues.push(res.data[0].nom_d_origine)
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
                                inputElement.classList.add('answerExo'); // Ajout de la classe 'answerExo'
    
                                imageInputContainer.appendChild(imageElement);
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


    function Correction() {
        axios
            .get('http://localhost:4000/exercice/getTTI', config)
            .then((res) => {
                let inputs = document.getElementsByClassName('answerExo');
                let length = inputs.length
                let nbrExos = 0;
                let score = 0;
                for(let i = 0; i < length; i ++) {
                    console.log(inputs[i], reponsesAttendues[i])
                    if(inputs[i].value ===reponsesAttendues[i]) {
                        score += 1;
                    }
                    nbrExos += 1;
                }
                console.log(score/nbrExos)
        
                const config = {
                    headers: {
                        'Authorization': `Bearer ${Cookies.get('JWT')}`
                    }
                }
        
                const data = {
                    type: "TTI",
                    score: Math.floor((score/nbrExos) * 100),
                    idExercice: res.data[0]._id
                }
        
                axios.post("http://localhost:4000/exercice/registerAnswers", {data}, config)
            })
  
    }

    return (
        <div>
            <div id='zone_tti'>
                <p>Zone de test</p>
                <div>
                    <p>Zone chargement exercice</p>

                    <div id="zoneExos"></div>
                    <button onClick={Correction}>Correction</button>
                </div>
            </div>
        </div>
    );
};

export default TTI;