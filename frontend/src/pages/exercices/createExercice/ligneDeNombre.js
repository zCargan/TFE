import React, { useState } from 'react';
import './ligneDeNombre.css'
import axios from 'axios'
import Cookies from 'js-cookie';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from '../../../features/exerciceSlice'
import { addExercice } from '../../../features/exerciceSlice'
import Navbar from '../../../components/navbar/Navbar';
import Popup from 'reactjs-popup';


const LigneDeNombre = ({ onLdnData }) => {

    const dispatch = useDispatch();
    const exerciceRedux = useSelector(state => (state))

    const [popupOpen, setPopupOpen] = useState(false);

    let exercice = {}
    var texte = ""
    let exo = {};
    const exerciceTest = useSelector((state) => (state))

    function submit_squelette() {
        let allInput = document.querySelectorAll('.inputUser')
        allInput.forEach(element => {
            if (element.value !== "") {
                console.log(element.id)
                console.log(element.value)
            }
        });
        var div = document.getElementById("administratif");
        div.style.display = "none"
    }

    function test123() {
        console.log(document.getElementById("length").value)
        console.log(exerciceTest)
    }

    function saveSqueleton() {
        /*

        cette fonction a pour but de sauver le squelette de l'excerice

        */

        let reponsesEnoncees = []

        exo.description = document.getElementById("description").value;
        exo.type = 'LDN'
        let option = document.getElementById("direction").value;
        if (option === "gauche") {
            exo.direction = "G"
        } else {
            exo.direction = "D"
        }

        let inputClass = document.getElementsByClassName("inputUser");

        for (let i = 0; i < inputClass.length; i++) {
            reponsesEnoncees.push(inputClass[i].value)
        }

        exo.reponseInitiale = reponsesEnoncees



        console.log(exo)

        exercice.baseExercice = exo

    }


    function testSaveAll() {

        /*

        Cette fonction sauve l'exercice dans rédux avec les valeurs finales des inputs 

        */


        let reponsesFinales = []

        let inputClass = document.getElementsByClassName("inputUser");

        for (let i = 0; i < inputClass.length; i++) {
            reponsesFinales.push(inputClass[i].value)
        }

        exo.reponseFinale = reponsesFinales
        onLdnData(exo)

        
        console.log(exo)



    }

    function hidden() {
        var div = document.getElementById("administratif");
        if (div.style.display === "none") {
            div.style.display = "block"; // Vous pouvez également utiliser "inline", "inline-block", etc.
        } else {
            div.style.display = "none";
        }
    }


    function createLine() {
        document.getElementById("resultatP").innerHTML = "";
        texte += "";
        texte += String("<p>" + document.getElementById("description").value + "</p>")
        let length = document.getElementById('length').value;
        let option = document.getElementById("direction").value;

        if (option === "gauche") {
            texte += '◀'
            for (let i = 0; i < length; i++) {
                texte += String("<input class='inputUser'></input>");
            }
        } else {
            for (let i = 0; i < length; i++) {
                texte += String("<input class='inputUser'></input>");
            }
            texte += '▶'
        }
        console.log(texte)
        document.getElementById("resultatP").innerHTML = texte
    }



    function testRedux() {
        console.log(exerciceRedux)
    }

    return (

        <div>
            <br />
            <textarea placeholder="Description DE l'exercice" rows={7} cols={60} id="description"></textarea>
            <br></br>
            <input id="length" placeholder='Longueur de la ligne'></input>  Direction  <select id="direction"><option value="droite">▶</option><option value="gauche">◀</option></select><button onClick={createLine}>Créer !</button>
            <br />
            <p id="resultatP">Votre résultat apparaitra ici</p>
            <Popup
                trigger={
                    <button id="button_squelette" onClick={saveSqueleton}>Valider le squelette</button>}
                position="left center"
                open={popupOpen}
                on="hover"
                closeOnDocumentClick
            >
                <div>
                    <div id="fonctionnement">
                        <p>
                            En cliquant sur ce bouton, vous valider le squelette de l'exercice
                            <br />
                            Le squelette est le corps de l'exercice avec toute les inconnues, mais sans les réponses
                        </p>
                    </div>
                </div>
            </Popup>
            <Popup
                trigger={
                    <button onClick={testSaveAll}>Valider les réponses</button>}
                position="right center"
                open={popupOpen}
                on="hover"
                closeOnDocumentClick
            >
                <div>
                    <div id="fonctionnement">
                        <p>
                            Permet d'enregistrer l'exercice, avec les réponses introduites après avoir sauvé le squelette
                            <br />
                        </p>
                    </div>
                </div>
            </Popup>
        </div>

    );
};

export default LigneDeNombre;