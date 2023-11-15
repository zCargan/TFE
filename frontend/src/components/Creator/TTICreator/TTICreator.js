import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import './TTICreator.css'

const TTICreator = ({ exo }) => {
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
            .then((reponse) => {
                const img = reponse.data[0].reponses;
                setId(reponse.data[0]._id);
                setNom(reponse.data[0].nom);
                setAnneeScolaire(reponse.data[0].anneeScolaire);
                setDescription(reponse.data[0].description);
                setType(reponse.data[0].type);
                let cles = Object.keys(img);

                const imageContainer = document.getElementById('zoneExos');
    
                imageContainer.style.display = 'flex';
                imageContainer.style.flexWrap = 'wrap'; // Permettre le retour à la ligne si nécessaire
                imageContainer.style.justifyContent = 'center'; // Centrez horizontalement
    
                for (let i = 0; i < cles.length; i++) {
                    axios
                        .get(`http://localhost:4000/photos/getImage/${cles[i]}`, config)
                        .then((res) => {
                            reponsesAttendues.push(reponse.data[0].reponses[cles[i]])
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
                setReponses(reponsesAttendues)
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
                    console.log(reponses[i])
                    if(inputs[i].value === reponses[i]) {
                        score += 1;
                    }
                    nbrExos += 1;
                }
        
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

                Swal.fire({
                    title: 'Résultat',
                    text: 'Vous avez obtenu la note de : ' + (score/nbrExos) * 100 + "%",
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000
                });
        
                axios
                .post("http://localhost:4000/exercice/registerAnswers", {data}, config)
                .then((res) => {
                    setTimeout(() => {
                        navigate('/');
                      }, 2000);
                })
                .catch((error) => {
                    Swal.fire({
                        title: 'Erreur',
                        text: "Une erreur s'est produite lors de l'enregistrement de votre score",
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 1500
                    });
                })
            })
  
    }

    function seeCorrection() {
        let inputUser = document.getElementsByClassName('answerExo')
        for(let i = 0; i < inputUser.length; i ++) {
            inputUser[i].value = reponses[i]
        }
        Swal.fire({
            text: "Voici la correction de l'exercice",
            icon: 'success',
            showConfirmButton: false,
            timer: 1100
        });
        document.getElementById('buttonCorrection').style.display = 'none';
    }

    return (
        <div id='zone_tti'>
            <h3>{nom}</h3>
            <p id="description">{description}</p>
            <p>Année primaire visée: {anneeScolaire}</p>
            <br />
                <div>
                    <div id="zoneExos"></div>
                    <button onClick={Correction} id="buttonCorrection">Correction</button>
                    <br />
                    <button onClick={seeCorrection}>Voir la correction</button>
                </div>
        </div>
    );
};


export default TTICreator;