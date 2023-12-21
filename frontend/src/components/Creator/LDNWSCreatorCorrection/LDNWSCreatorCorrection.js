import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import './LDNWSCreatorCorrection.css'

const LDNWSCreatorCorrection = ({ exo, onTATDataChange }) => {
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
            let length = exo.reponseFinale.length;
            let enonceIndex = exo.reponseInitiale;
            let direction = exo.direction

            let texte = String("<div id='ligneDuTemps'><table><tbody>")

            if (direction === "G") {
                texte += '◀'
                for (let i = 0; i < length; i++) {
                    texte += String("<input id='" + (i + 1) + "' class='inputUserAnswerLDN' value='" + resultatAttendu[i] + "'></input>");
                }
                texte += String("</tbody></table></div>");
            } else {
                for (let i = 0; i < length; i++) {
                    texte += String("<input id='" + (i + 1) + "' class='inputUserAnswerLDN' value='" + resultatAttendu[i] + "'></input>");
                }
                texte += '▶'
                texte += String("</tbody></table></div>");
            }
            document.getElementById("zoneExoLDNCorrection").innerHTML = texte
        }
    }


    const buttonClicked = () => {
        if (exo.length !== 0) {

            let inputUser = document.getElementsByClassName('inputUserAnswerLDN');
            let score = 0;
            let nbrExos = 0;
            for (let i = 0; i < exo.reponseInitiale.length; i++) {
                if (exo.reponseInitiale[i] === '') {
                    if ((inputUser[i].value) === exo.reponseFinale[i]) {
                        score += 1;
                    }
                    nbrExos += 1;
                }

            }
            console.log(score)
            console.log(nbrExos)
            onTATDataChange((score / nbrExos) * 100);
        }
    }


    return (
        <div>
            {exo.length !== 0 ? (
                <div id="ldnwscc">
                    <h3>{nom}</h3>
                    <p id="description">{exo.description}</p>
                    <br />
                    <br />
                    <div id='zone_ldn'>
                        <br />
                        <div id="zoneExoLDNCorrection"></div>
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

export default LDNWSCreatorCorrection;