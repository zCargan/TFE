import React, { useState } from 'react';
import './maisonDesNombres.css'
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from '../../../features/exerciceSlice'
import { addExercice } from '../../../features/exerciceSlice'
import axios from 'axios'
import Cookies from 'js-cookie';
import Popup from 'reactjs-popup';
import Navbar from '../../../components/navbar/Navbar';

const MaisonDesNombres = ({ onMdnData }) => {
    let exo = {}
    let dictionnaire = {}
    const dispatch = useDispatch();
    const exerciceRedux = useSelector(state => (state))
    const [nbrItem, setNbrItem] = useState("");
    const [popupOpen, setPopupOpen] = useState(false);

    function verifyAvancement() {
        let dictionnaireFinal = {};
        dictionnaireFinal.name = document.getElementById("nomMDN").value;
        dictionnaireFinal.infoOriginale = dictionnaire;
        console.log(dictionnaireFinal)
        console.log(dictionnaireFinal.infoOriginale)
    }

    function showSqueleton() {
        var number = document.getElementById('nombreInput').value;
        if (/^[0-9]+$/.test(number)) {
            let texte = "<div class='triangle-container'>";
            texte += document.getElementById('descriptionExercice').value;
            texte += '<br />'
            texte += '<br />'
            //texte += '<div class="triangle-down"></div>'; // Conteneur pour le triangle
            texte += "<div id='mdnContent'>";
            for (let i = 0; i < number; i++) {
                texte += '<input id="' + i + '" class="inputMDNWS"></input><input id="' + i + '" class="inputMDNWS"></input>';
                texte += "<br></br>";
            }
            texte += "</div></div>"; // Fin du conteneur
            document.getElementById("mdn").innerHTML = texte;
        }
    }



    function saveSquelette() {
        exo.description = document.getElementById("descriptionExercice").value;
        exo.type = "MDN";
        exo.cols = Number(document.getElementById('nombreInput').value);

        let arrayEnonce = []

        let input = document.getElementsByClassName('inputMDNWS')
        console.log(input)

        for (let i = 0; i < input.length; i++) {
            console.log(input[i].value)
            arrayEnonce.push(input[i].value)
        }

        exo.reponseInitiale = arrayEnonce


    }

    function final() {
        let arrayFinal = []

        let input = document.getElementsByClassName('inputMDNWS')

        for (let i = 0; i < input.length; i++) {
            arrayFinal.push(input[i].value)
        }

        console.log(arrayFinal)

        exo.reponseFinal = arrayFinal

        onMdnData(exo)


    }


    function showRedux() {
        console.log(exerciceRedux)
        //axios.post('http://localhost:4000/exercice/post_mdn_exercices', exerciceRedux)
    }


    function valideReponses() {
        /**
         * Cette fonction permet de vérifier la validé des reponses et d'afficher un pourcentage de réussite
         */
        let reponseUser = [];
        let reponseUserFiltred = [];
        let reponseFinale = [];
        let reponseInitiale = [];
        const liste_resultante = [];
        const listeDifference = [];
        let score = 0;
        for (let j = 0; j < (nbrItem + 1); j++) {
            let ligne1 = document.getElementsByClassName(j);
            for (let i = 0; i < ligne1.length; i++) {
                reponseUser.push(ligne1[i].value)
            }
        }
        axios.get('http://localhost:4000/exercice/get_mdn_exercice').then((res) => {
            let dicFinale = res.data[0].reponseFinale;
            let dicInitiale = res.data[0].reponseInitiale;
            let idExercice = res.data[0]._id;

            for (const cle in dicFinale) {
                if (dicFinale.hasOwnProperty(cle)) {
                    liste_resultante.push(...dicFinale[cle]);
                    reponseFinale.push(...dicFinale[cle]);
                }
            }

            for (const cle in dicInitiale) {
                if (dicInitiale.hasOwnProperty(cle)) {
                    reponseInitiale.push(...dicInitiale[cle]);
                }
            }

            for (let i = 0; i < reponseFinale.length; i++) {
                if (!reponseInitiale.includes(reponseFinale[i])) {
                    listeDifference.push(reponseFinale[i]);
                }
            }

            console.log("Liste contenant les éléments différents : ", listeDifference);

            for (let k = 0; k < reponseUser.length; k++) {
                if (reponseInitiale[k] === "") {
                    reponseUserFiltred.push(reponseUser[k])
                }
            }


            const réponsesAttendues = liste_resultante.filter(element => !reponseUser.includes(element));
            console.log("Réponses attendues : ", listeDifference);
            console.log("Réponse filtrées : ", reponseUserFiltred)
            console.log("reponse initiale : ", reponseInitiale)


            let NumberAnswer = listeDifference.length;
            for (let i = 0; i < NumberAnswer; i++) {
                if (reponseUserFiltred[i] === listeDifference[i]) {
                    score += 1;
                }
            }
            //alert("Vous avez obtenu la note de " + Math.floor((score/NumberAnswer) * 100) + "%.")
            const config = {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('JWT')}`
                }
            }

            const data = {
                type: "MDN",
                score: Math.floor((score / NumberAnswer) * 100),
                idExercice: idExercice
            }

            axios.post("http://localhost:4000/exercice/registerAnswers", { data }, config)
        })

    }




    return (
        <div id="MDN_div">
            <div className='divMDNWS'>
                <textarea rows={7} cols={60} id="descriptionExercice" placeholder="Description de l'exercice"></textarea>
                <input id="nombreInput" placeholder='Nombre de colonnes'></input>
                <div className='divButtonMDNWS'>
                    <button onClick={showSqueleton}>Créer !</button>
                    <Popup
                        trigger={
                            <button onClick={saveSquelette}>Valider le squelette</button>}
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
                            <button onClick={final}>Valider les réponses</button>}
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
            <div className='resultMDNWS'>
                <p id="mdn">Votre résultat apparaitra ici</p>
            </div>

        </div>
    );
};

export default MaisonDesNombres;