import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import { supprimerEspaces } from '../../../pages/FonctionsUnitaires';
import './TATWSCreator.css'

const TATWSCreator = ({ exo, onTATDataChange }) => {

    const getMBCalledRef = useRef(false);

    useEffect(() => {
        if (!getMBCalledRef.current) {
            createExos();
            getMBCalledRef.current = true;

            const testVraitestElement = document.getElementById("testVraitest");
            if (testVraitestElement) {
                testVraitestElement.addEventListener("click", buttonClicked);
            }
        }
    }, []);

    const navigate = useNavigate();

    const config = {
        headers: {
            'Authorization': `Bearer ${Cookies.get('JWT')}`,
            'Content-Type': 'application/json'
        }
    };


    function createExos() {

        if (exo.length !== 0) {

            console.log(exo.reponseFinale)
            let reponsesFromDB = []
            let string = "";
            let length = exo.reponseInitiale.length;
            let reponseInitiale = exo.reponseFinale;
            let reponseFinale = exo.reponseInitiale;
            for (let i = 0; i < length; i++) {
                console.log(reponseInitiale[i])
                if (reponseInitiale[i] !== "inputUserExercice") {
                    string += reponseInitiale[i]
                    string += " "
                } else {
                    string += " <input class='inputTATuser'></input> "
                    reponsesFromDB.push(reponseFinale[i])
                }
            }

            console.log(string)
            document.getElementById("zoneExoTAT").innerHTML = string
        }

    }


    const buttonClicked = () => {
        if (exo.length !== 0) {

            console.log(exo.reponseInitiale)
            console.log(exo.reponseFinale)

            let arrayUserResponse = [];
            let inputUser = document.getElementsByClassName('inputTATuser')
            for (let i = 0; i < document.getElementsByClassName('inputTATuser').length; i++) {
                arrayUserResponse.push(document.getElementsByClassName('inputTATuser')[i].value)
            }
            let nbr = 0;

            let score = 0;
            let nbrExos = 0;

            for (let i = 0; i < exo.reponseInitiale.length; i++) {
                if ((exo.reponseFinale[i]) !== (exo.reponseInitiale[i])) {
                    console.log(supprimerEspaces(arrayUserResponse[nbr]));
                    console.log(exo.reponseInitiale[i])
                    if (supprimerEspaces(arrayUserResponse[nbr]) == (exo.reponseInitiale[i])) {
                        score += 1;
                    }
                    nbrExos += 1;
                    nbr += 1;
                }

            }
            onTATDataChange((score / nbrExos) * 100);
        }
    }

    return (
        <div>
            {exo.length !== 0 ? (
                <div className='divShowWorksheet' id="TATWSCreator">
                    <p id="description">{exo.description}</p>
                    <br />
                    <div id="zone_tat">
                        <br />
                        <div id="zoneExoTAT"></div>
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

export default TATWSCreator;