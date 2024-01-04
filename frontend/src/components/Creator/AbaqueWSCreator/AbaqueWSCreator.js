import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios'
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'
import './AbaqueWSCreator.css'

const AbaqueWSCreator = ({ exo, onAbaqueDataChange }) => {

    const getMBCalledRef = useRef(false);

    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const [word, setWord] = useState("")
    const [nom, setNom] = useState('');
    const [anneeScolaire, setAnneeScolaire] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [id, setId] = useState('');
    const [reponses, setReponses] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (!getMBCalledRef.current) {
            recupereExo();
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
            'Content-Type': 'application/json' // Utilisation de 'application/json' pour le Content-Type
        }
    };

    let dictionnaire = {};

    function recupereExo() {

        if (exo.length !== 0) {
            let resultatAttendu = exo.reponseFinale
            //console.log(resultatAttendu) ==> ok
            setReponses(resultatAttendu)
            let reponseInitiale = exo.reponseInitiale;
            let hauteur = exo.hauteur;
            let description = exo.description;
            let longueur = exo.longueur;
            let titre = exo.nom;
            console.log(reponseInitiale)
            let texte = String("<div id='abaqueFromDB'><table><tbody>");
            let k = 0;
            for (let i = 0; i < hauteur; i++) {
                for (let j = 0; j < longueur; j++) {
                    if ((reponseInitiale[k]) == undefined) {
                        texte += "<input class='inputUserResponseAbaque'></input>"
                    } else {
                        texte += "<input class='inputUserResponseAbaque'" + " value='" + reponseInitiale[k] + "'></input>"
                    }
                    k += 1;
                }
                texte += "<br></br>"
            }
            texte += "</div>"

            document.getElementById("abaqueFromDB").innerHTML = texte;
        }
    }



    const buttonClicked = () => {
        if (exo.length !== 0) {

            console.log("aahahaha")

            let resultatAttendu = exo.reponseFinale;
            let resultatInitial = exo.reponseInitiale;

            let index = [];

            for (let l = 0; l < resultatAttendu.length; l++) {
                if (resultatAttendu[l] !== resultatInitial[l]) {
                    console.log(resultatAttendu[l])
                    index.push(l)
                }
            }


            let resultatRecu = []
            let a = document.getElementsByClassName("inputUserResponseAbaque")
            for (let i = 0; i < a.length; i++) {
                resultatRecu.push(a[i].value)
            }
            let tailleArray = resultatInitial.length;
            let nbrAnswer = 0;
            let score = 0;


        
            for (let i = 0; i < index.length; i++) {
                console.log(resultatAttendu[index[i]])
                if(resultatAttendu[index[i]] == resultatRecu[index[i]]) {
                    score += 1;
                }
                nbrAnswer += 1;
            }


            // for (let i = 0; i < tailleArray; i++) {
            //     if (resultatInitial[i] === "") {
            //         nbrAnswer += 1;
            //         if (resultatAttendu[i] !== resultatRecu[i]) {
            //         } else {
            //             score += 1;
            //         }
            //     }
            // }
            // console.log((score / nbrAnswer) * 100)
            onAbaqueDataChange((score / nbrAnswer) * 100);
        }
    }



    return (
        <div>
            {exo.length !== 0 ? (
                <div className='divShowWorksheet' id="abaqueWSCreator">
                    <h3>{exo.description}</h3>
                    <p id="description">{description}</p>
                    <br />
                    <p id="abaqueFromDB"></p>
                </div>
            ) : (
                <div>
                </div>
            )}
        </div>
    );
};

export default AbaqueWSCreator;