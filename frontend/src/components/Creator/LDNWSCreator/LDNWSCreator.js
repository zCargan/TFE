import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import './LDNWSCreator.css'

const LDNWSCreator = ({ exo, onTATDataChange }) => {
    const [reponses, setReponses] = useState("");
    const [nom, setNom] = useState('');
    const [anneeScolaire, setAnneeScolaire] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [id, setId] = useState('');

    const navigate = useNavigate();
    const getMBCalledRef = useRef(false);

    useEffect(() => {
        if (!getMBCalledRef.current) {
            getExoLDN();
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
            'Authorization': `Bearer ${Cookies.get('JWT')}`
        }
    }

    function getExoLDN() {
        if (exo.length !== 0) {
            let resultatAttendu = exo.reponseFinale
            console.log(exo.reponseFinale)
            let length = exo.reponseFinale.length;
            let enonceIndex = exo.reponseInitiale;
            let direction = exo.direction

            let texte = String("<div id='ligneDuTemps'><table><tbody>")
            if (direction === "G") {
                texte += '◀'
                for (let i = 0; i < length; i++) {
                    texte += String("<input id='" + (i + 1) + "' class='inputUserAnswerLDN' value='" + enonceIndex[i] + "'></input>");
                }
                texte += String("</tbody></table></div>");
            } else {
                for (let i = 0; i < length; i++) {
                    texte += String("<input id='" + (i + 1) + "' class='inputUserAnswerLDN' value='" + enonceIndex[i] + "'></input>");
                }
                texte += '▶'
                texte += String("</tbody></table></div>");
            }
            document.getElementById("zoneExoLDN").innerHTML = texte
        }
    }


    const buttonClicked = () => {
        if (exo.length !== 0) {

            let inputUser = document.getElementsByClassName('inputUserAnswerLDN');
            let score = 0;
            let nbrExos = 0;

            let reponseFinale = exo.reponseFinale;
            let reponseInitiale = exo.reponseInitiale;

            let index = [];


            for (let l = 0; l < reponseFinale.length; l++) {
                if (reponseFinale[l] !== reponseInitiale[l]) {
                    index.push(l)
                }
            }


            for (let i = 0; i < index.length; i++) {

                if ((inputUser[index[i]].value) === exo.reponseFinale[index[i]]) {
                    console.log((inputUser[index[i]].value))
                    score += 1;
                }
                nbrExos += 1;
            }
            // console.log((score / nbrExos) * 100)
            // console.log(score)
            // console.log(nbrExos)
            onTATDataChange((score / nbrExos) * 100);
        }
    }


    return (
        <div>
            {exo.length !== 0 ? (
                <div className='divShowWorksheet' id="LDNWSCreator">
                    <h3>{nom}</h3>
                    <p id="description">{exo.description}</p>
                    <br />
                    <br />
                    <div id='zone_ldn'>
                        <br />
                        <div id="zoneExoLDN"></div>
                    </div>
                    <br />
                </div>
            ) : (
                <div>
                </div>
            )}
        </div>
    );

};

export default LDNWSCreator;