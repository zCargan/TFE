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

    //const nombreDItems = "";

    function verifyAvancement() {
        //console.log(dictionnaire)
        let dictionnaireFinal = {};
        dictionnaireFinal.name = document.getElementById("nomMDN").value;
        dictionnaireFinal.infoOriginale = dictionnaire;
        console.log(dictionnaireFinal)
        console.log(dictionnaireFinal.infoOriginale)
    }

    function ok() {
        /*
        let texte = "<div id='mdn'>"
        texte += '<h1>' + document.getElementById('nombre').value + '</h1>'
        document.getElementById("mdn").innerHTML = texte
        */

        var number = document.getElementById('nombre').value;
        if (/^[0-9]+$/.test(number)) {
            let texte = "<div id='mdn'>"
            texte += '<h1>' + document.getElementById('nomMDN').value + '</h1>'
            for(let i = 0; i <number; i ++) {
                texte += '<input id="' + i + '" class="' +  i+ '"></input><input id="' + i + '" class="' +  i+ '"></input>'
                texte += "<br></br>"
            }
            texte += "</div>"
            document.getElementById("mdn").innerHTML = texte
        } 

    }


    function saveSquelette() {
        /*

        fonction visant à récupérer les valeurs initiales de la maison des nombres

        */

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

    function testTemp() {
        console.log(exerciceRedux)
    }


    function test_mongodb() {
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

    /*
    function valideReponses() {
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
        })

        console.log(reponseUser)
    } 
    */
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
                score: Math.floor((score/NumberAnswer) * 100),
                idExercice: idExercice
            }

            axios.post("http://localhost:4000/exercice/registerAnswers", {data}, config)
        })

    }


    function seeCorrection() {
        axios.get('http://localhost:4000/exercice/get_mdn_exercice').then((res)=> {
            let exo = res.data[0];
            let nom = exo.nom;
            let reponseInitiale = exo.reponseInitiale;
            let reponseFinale = exo.reponseFinale;
            const nombreDItems = Object.keys(reponseInitiale).length;
            setNbrItem(nombreDItems)
            const cles = Object.keys(reponseInitiale);

            console.log("nombre d'items")
            console.log(nombreDItems)

            console.log("clés ")
            console.log(cles)
            
            console.log("reponse initiale ")
            console.log(reponseInitiale)
            


            let texte = "<div id='mdn_resulat'>"
            texte += '<h1>' + nom + '</h1>'
            for(let i = 0; i <nombreDItems; i ++) {
                //let clés = reponseInitiale.cles[nombreDItems-1]
                let clés = cles[i]
                console.log(clés)
                
                console.log(reponseInitiale[clés][0])
                
                texte += '<input id="' + (i+1) + '" class="' +  (i+1)+ '" value=' + reponseFinale[clés][0] + '>' + '</input><input id="' + (i+1) + '" class="' +  (i+1) + '" value="' + reponseFinale[clés][1] + '"></input>'
                texte += "<br></br>"

            }
            texte += "</div>"
            document.getElementById("resultat").innerHTML = texte
            alert("voici la correction des exercices :")
        })
    }

    function testTMP() {
        console.log(document.getElementById("selectSchoolYear").value)
    }


    return (
        <div id="MDN_div">
            Nom de la maison des nombres <input id="nomMDN"></input>
            <br></br>
            <p>Description de l'exercice :</p>
            <textarea id="descriptionExercice">

            </textarea>
            <br></br>
            Nombre de ligne de votre maison des nombres <input id="nombre"></input>
            <br></br>
            <button onClick={ok}>ok</button>
            <p>Votre maison des nombres :</p><p id="mdn"></p>
            <button onClick={saveSquelette}>Valider le squelette</button>
            <button onClick={final}>Valider les réponses</button>
            <button onClick={test_mongodb}>test mongodb</button>
            
            <div>
                <p id="resultat">Résultat</p>
                <button onClick={get_exos_mdn}>Afficher l'exercice vierge</button>
                <button id="valideReponse" onClick={valideReponses}>Valider mes réponses</button>
                <button onClick={seeCorrection}>Voir la correction</button>
            </div>
            <br></br>
            <div>
                <button onClick={testTemp}>Bouton de tests</button>
            </div>
        </div>
    );
};

export default MaisonDesNombres;