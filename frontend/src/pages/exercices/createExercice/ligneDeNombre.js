import React, { useState } from 'react';
import './ligneDeNombre.css'
import axios from 'axios'
import Cookies from 'js-cookie';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from '../../../features/exerciceSlice'
import { addExercice } from '../../../features/exerciceSlice'
import Navbar from '../../../components/navbar/Navbar';
import Popup from 'reactjs-popup';
import InfoIcon from '@mui/icons-material/Info';

const LigneDeNombre = ({ onLdnData }) => {

    const dispatch = useDispatch();
    const exerciceRedux = useSelector(state => (state))

    const [popupOpen, setPopupOpen] = useState(false);

    let exercice = {}
    var texte = ""
    let exo = {};
    const exerciceTest = useSelector((state) => (state))

    function submit_squelette() {
        let allInput = document.querySelectorAll('.inputUserLDNWS')
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

        exo.description = document.getElementById("descriptionLDN").value;
        exo.type = 'LDN'
        let option = document.getElementById("direction").value;
        if (option === "gauche") {
            exo.direction = "G"
        } else {
            exo.direction = "D"
        }

        let inputClass = document.getElementsByClassName("inputUserLDNWS");

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

        let inputClass = document.getElementsByClassName("inputUserLDNWS");

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
        texte += String("<p>" + document.getElementById("descriptionLDN").value + "</p>")
        texte += String("<div id='ligneDuTemps'>")
        let length = document.getElementById('length').value;
        let option = document.getElementById("direction").value;

        if (option === "gauche") {
            texte += '◀'
            for (let i = 0; i < length; i++) {
                texte += String("<input class='inputUserLDNWS'></input>");
            }
        } else {
            for (let i = 0; i < length; i++) {
                texte += String("<input class='inputUserLDNWS'></input>");
            }
            texte += '▶'
        }
        texte += "</div>"
        console.log(texte)
        document.getElementById("resultatP").innerHTML = texte
    }



    function testRedux() {
        console.log(exerciceRedux)
    }

    return (

        <div>
            <br />
            <Popup
                trigger={
                    <span className='important2'><InfoIcon className='infoLogo' /></span>
                }
                open={popupOpen}
                position="bottom center"
                on="hover"
            >
                <div className='explicationExo'>
                    <h1>Explication de la réalisation de l'exercice</h1>
                    <br />
                    <p>Créer votre ligne des nombres en séléctionnant la descritpion, le nombre de case ainsi que la direction de votre ligne des nombres</p>
                    <br />
                    <p>Appuyer sur le bouton <span className='divSpanButton'>"Créer ma ligne des nombres"</span> afin d'obtenir le squelette de l'exercice</p>
                    <br />
                    <p>Entrez les données connues de votre exercice sans entrer les réponses. Une fois fini, cliquer sur <span className='divSpanButton'>"Valider le squelette"</span></p>
                    <br />
                    <p>Pour finir, entrez les réponses attendues de l'exercices et cliquer sur <span className='divSpanButton'>"Valider les réponses"</span> pour sauver votre exercice</p>
                    <p>Si tout les champs sont bien remplis et si aucune erreur n'est survenue, votre exercice est bien créer!</p>
                    <br />
                    <p>Féliciation!</p>
                </div>
            </Popup>
            <div className='divLDNWS'>
                <textarea placeholder="Description DE l'exercice" rows={7} cols={60} id="descriptionLDN"></textarea>
                <input className='longueurLDNWS' id="length" placeholder='Longueur de la ligne'></input>
                <br />
                <div id="selectLDNWScreation">
                    Direction de ma droite des nombres <select id="direction"><option value="droite">▶</option><option value="gauche">◀</option></select>
                </div>
                <div className='buttonLDNWS'>
                    <button onClick={createLine}>Créer ma ligne des nombres</button>
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
            </div>
            <div className='resultLDNWS'>
                <p id="resultatP">Votre résultat apparaitra ici</p>
            </div>
        </div>

    );
};

export default LigneDeNombre;