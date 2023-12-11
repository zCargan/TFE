import React, { useEffect, useState, useRef } from 'react';
import axios, { all } from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const MDNWSCreator = ({ exo, onMDNDataChange }) => {
    const [nbrItem, setNbrItem] = useState("");
    const [nom, setNom] = useState('');
    const [anneeScolaire, setAnneeScolaire] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [id, setId] = useState('');

    const getMBCalledRef = useRef(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!getMBCalledRef.current) {
            getMDN();
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

    function getMDN() {
        if (exo.length !== 0) {
            let length = exo.cols
            let reponseInitiale = exo.reponseInitiale
            let nom = exo.nom
            let texte = "<div id='mdn_resulat'>"
            let score = 0;
            for (let i = 0; i < length; i++) {
                texte += '<input class="answerUserMDN" value=' + reponseInitiale[score] + '>' + '</input><input class="answerUserMDN" value="' + reponseInitiale[score + 1] + '"></input>'
                texte += "<br></br>"
                score += 2;
            }

            texte += "</div>"
            document.getElementById("zoneExoMDN").innerHTML = texte

        }
    }

    const buttonClicked = () => {
        if (exo.length !== 0) {
            let reponseUser = [];
            let index = [];

            for (let j = 0; j < (nbrItem + 1); j++) {
                let ligne1 = document.getElementsByClassName("answerUserMDN");
                for (let i = 0; i < ligne1.length; i++) {
                    reponseUser.push(ligne1[i].value)
                }
            }

            let dicFinal = exo.reponseFinal;
            let dicInitiale = exo.reponseInitiale;

            for (let i = 0; i < dicInitiale.length; i++) {
                if (dicFinal[i] !== dicInitiale[i]) {
                    index.push(i)
                }
            }

            let score = 0;
            let nbrExos = 0;

            for (let j = 0; j < index.length; j++) {

                if (dicFinal[index[j]] === reponseUser[index[j]]) {
                    score += 1;
                }
                nbrExos += 1;
            }
            console.log(score)
            console.log(nbrExos)
            onMDNDataChange((score / nbrExos) * 100);
        }
    }

    return (
        <div>
            {exo.length !== 0 ? (
                <div id="div_mdn">
                    <h3>{nom}</h3>
                    <p id="description">{exo.description}</p>
                    <br />
                    <div id="zone_abaque">
                        <div id="zoneExoMDN"></div>
                    </div>
                </div>
            ) : (
                <div>
                </div>
            )}
        </div>
    );

};

export default MDNWSCreator;