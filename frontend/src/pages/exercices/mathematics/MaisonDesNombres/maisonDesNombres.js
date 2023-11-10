import React, { useState } from 'react';
import './maisonDesNombres.css'
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from '../../../../features/exerciceSlice'
import { addExercice } from '../../../../features/exerciceSlice'
import axios from 'axios'
import Cookies from 'js-cookie';
import Popup from 'reactjs-popup';

const MaisonDesNombres = () => {

    let dictionnaire = {}
    const dispatch =  useDispatch();
    const exerciceRedux = useSelector(state =>(state))
    const [nbrItem, setNbrItem] = useState("");


    function verifyAvancement() {
        let dictionnaireFinal = {};
        dictionnaireFinal.name = document.getElementById("nomMDN").value;
        dictionnaireFinal.infoOriginale = dictionnaire;
        console.log(dictionnaireFinal)
        console.log(dictionnaireFinal.infoOriginale)
    }

    function showSqueleton() {
        var number = document.getElementById('nombre').value;
        if (/^[0-9]+$/.test(number)) {
            let texte = "<div class='triangle-container'>";
            //texte += '<div class="triangle-down"></div>'; // Conteneur pour le triangle
            texte += '<h1>' + document.getElementById('nomMDN').value + '</h1>'; // Titre à l'intérieur du conteneur du triangle
            texte += "<div id='mdnContent'>";
            for (let i = 0; i < number; i++) {
                texte += '<input id="' + i + '" class="inputMDN"></input><input id="' + i + '" class="inputMDN"></input>';
                texte += "<br></br>";
            }
            texte += "</div></div>"; // Fin du conteneur
            document.getElementById("mdn").innerHTML = texte;
        }
    }
    


    function saveSquelette() {
        dictionnaire.nom = document.getElementById("nomMDN").value;
        dictionnaire.anneeScolaire = document.getElementById("selectSchoolYear").value;
        dictionnaire.description = document.getElementById("descriptionExercice").value;
        dictionnaire.type = "MDN";
        let dictionnaire1 = {}

        var number = document.getElementById('nombre').value
        for(let i = 0; i < number; i++) {
        let array_intermédiaire = []
            for(let j = 0; j < 2; j++) {
                //console.log("on passe")
                if(document.getElementsByClassName(i)[j].value !== "") {  
                    array_intermédiaire.push(document.getElementsByClassName(i)[j].value)
                } else {
                    array_intermédiaire.push("")
                }
            }
        let string = "ligne" + (i+1)
        dictionnaire1[string] = array_intermédiaire
        console.log(dictionnaire1)
        }
        dictionnaire.reponseInitiale = dictionnaire1
        console.log(dictionnaire)
        
    }

    function final() {
        let dictionnaire2 = {}
        var number = document.getElementById('nombre').value
        
        for(let i = 0; i < number; i++) {
            let array_final = []
            for(let j = 0; j < 2; j++) {
                //console.log("on passe")
                array_final.push(document.getElementsByClassName(i)[j].value)
                
            }
            console.log(array_final)
        let string = "ligne" + (i+1)
        dictionnaire2[string] = array_final
        }
        dictionnaire.reponseFinale = dictionnaire2;
        console.log(dictionnaire)
        dispatch(
            addExercice(dictionnaire)
        )
    }


    function showRedux() {
        console.log(exerciceRedux)
        //axios.post('http://localhost:4000/exercice/post_mdn_exercices', exerciceRedux)
    }

    function get_exos_mdn() {
        axios.get('http://localhost:4000/exercice/get_mdn_exercice').then((res)=> {
            let exo = res.data[0];
            let nom = exo.nom;
            let reponseInitiale = exo.reponseInitiale;
            let reponseFinale = exo.reponseFinale;
            const nombreDItems = Object.keys(reponseInitiale).length;
            setNbrItem(nombreDItems)
            const cles = Object.keys(reponseInitiale);

            /*
            console.log("nombre d'items")
            console.log(nombreDItems)

            console.log("clés ")
            console.log(cles)
            
            console.log("reponse initiale ")
            console.log(reponseInitiale)
            */


            let texte = "<div id='mdn_resulat'>"
            texte += '<h1>' + nom + '</h1>'
            for(let i = 0; i <nombreDItems; i ++) {
                //let clés = reponseInitiale.cles[nombreDItems-1]
                let clés = cles[i]
                
                /*
                console.log(clés)
                console.log(reponseInitiale[clés][0])
                */

                texte += '<input id="' + (i+1) + '" class="' +  (i+1)+ '" value=' + reponseInitiale[clés][0] + '>' + '</input><input id="' + (i+1) + '" class="' +  (i+1) + '" value="' + reponseInitiale[clés][1] + '"></input>'
                texte += "<br></br>"

            }
            texte += "</div>"
            document.getElementById("resultat").innerHTML = texte
        })
    }

    function valideReponses() {
        /**
         * Cette fonction permet de vérifier la validé des reponses et d'afficher un pourcentage de réussite
         */
        let reponseUser = [];
        let reponseUserFiltred = [];
        let reponseFinale= [];
        let reponseInitiale = [];
        const liste_resultante = [];
        const listeDifference = [];
        let score = 0;
        for(let j = 0; j < (nbrItem+1); j++) {
            let ligne1 = document.getElementsByClassName(j);
            for(let i = 0; i < ligne1.length; i ++) {
                reponseUser.push(ligne1[i].value)
            }
        }
        axios.get('http://localhost:4000/exercice/get_mdn_exercice').then((res)=> {
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

            for(let k = 0; k < reponseUser.length; k ++) {
                if(reponseInitiale[k] === "") {
                    reponseUserFiltred.push(reponseUser[k])
                }
            }


            const réponsesAttendues = liste_resultante.filter(element => !reponseUser.includes(element));
            console.log("Réponses attendues : ", listeDifference);  
            console.log("Réponse filtrées : " , reponseUserFiltred)
            console.log("reponse initiale : ", reponseInitiale)

        
            let NumberAnswer = listeDifference.length;
            for(let i = 0; i < NumberAnswer; i++) {
                if(reponseUserFiltred[i] === listeDifference[i]) {
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
                score: Math.floor((score/NumberAnswer) * 100),
                idExercice: idExercice
            }

            axios.post("http://localhost:4000/exercice/registerAnswers", {data}, config)
        })

    }




    return (
        <div id="MDN_div">
            <br />
            <input id="nomMDN" placeholder='Nom de la maison des nombres'></input>
            <br />
            <br />
            <textarea rows={5} cols={52} id="descriptionExercice" placeholder="Description de l'exercice">

            </textarea>
            <br />
            <br />
            <input id="nombre" placeholder='Nombre de ligne de votre maison des nombres'></input>
            <br></br>
            <button onClick={showSqueleton}>Voir mon squelette</button><button onClick={saveSquelette}>Valider le squelette</button><button onClick={final}>Valider les réponses</button>
            <p id="mdn"></p>
        </div>
    );
};

export default MaisonDesNombres;