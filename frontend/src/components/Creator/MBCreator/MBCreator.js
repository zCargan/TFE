import React, { useEffect, useState, useRef } from 'react';
import './MBCreator.css';
import axios from 'axios'
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const MBCreator = ({ exo }) => {

    const [arrayMotBonOrdre, setArrayMotBonOrdre] = useState([]);
    const [nom, setNom] = useState('');
    const [anneeScolaire, setAnneeScolaire] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [id, setId] = useState('');

    useEffect(() => {
        if (!getMBCalledRef.current) {
            getMB();
            getMBCalledRef.current = true;
        }
    }, []);

    let idExoMB = ""
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
        axios
            .get(`http://localhost:4000/exercice/getMB/${exo}`, config)
            .then((res) => {
                const img = res.data.reponses;
                console.log(img)
                idExoMB = res.data._id
                setId(res.data._id);
                setNom(res.data.nom);
                setAnneeScolaire(res.data.anneeScolaire);
                setDescription(res.data.description);
                setType(res.data.type);
                let cles = Object.keys(img);
                const imageContainer = document.getElementById('zoneExoMB');

                imageContainer.style.display = 'flex';
                imageContainer.style.flexWrap = 'wrap'; // Permettre le retour à la ligne si nécessaire
                imageContainer.style.justifyContent = 'center'; // Centrez horizontalement

                for (let i = 0; i < cles.length; i++) {
                    axios
                        .get(`http://localhost:4000/photos/getImage/${cles[i]}`, config)
                        .then((resPhoto) => {
                            reponsesAttendues.push(resPhoto.data.nom_d_origine);
                            console.log(res.data.reponses)

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
                                const imageName = concatenateLetters(cles[i], res.data.reponses);
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
        .get(`http://localhost:4000/exercice/getMB/${exo}`, config)
        .then((res) => {
            console.log(res)
            let inputUser = document.getElementsByClassName('answerExoMB');
            let score = 0;
            let nbrExos = 0;
            for(let i = 0; i < arrayMotBonOrdre.length; i ++) {
                if(inputUser[i].value.toUpperCase() === arrayMotBonOrdre[i]) {
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
                type: "MB",
                score: Math.floor((score/nbrExos)*100),
                idExercice: id
            }

            Swal.fire({
                title: 'Résultat',
                text: 'Vous avez obtenu la note de : ' + (score/nbrExos)*100 + "%",
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
            });

            axios
            .post("http://localhost:4000/exercice/registerAnswers", {data}, config)
            .then((res) => {
                setTimeout(() => {
                    navigate('/home');
                }, 1000);
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
        .catch((error) => {
            console.log(error);
        });
    }

    function seeCorrection() {
        let inputUser = document.getElementsByClassName('answerExoMB')
        for(let i = 0; i < inputUser.length; i ++) {
            inputUser[i].value = arrayMotBonOrdre[i]
        }
        Swal.fire({
            text: "Voici la correction de l'exercice",
            icon: 'success',
            showConfirmButton: false,
            timer: 1100
        });
        document.getElementById('valideReponse').style.display = 'none';
    }


    return (
        <div id='div_mb'>
            <h3>{nom}</h3>
            <p id="description">{description}</p>
            <p className='anneeScolaireCreator'>Année scolaire visée : {anneeScolaire}</p>
            <br />
            <div id="zone_mb">
                <div id="zoneExoMB"></div>
                <button id="valideReponse" onClick={valideReponsesMB} >Corriger mon exercice!</button>
                <br></br>
            </div>
        </div>
    );
};

export default MBCreator;