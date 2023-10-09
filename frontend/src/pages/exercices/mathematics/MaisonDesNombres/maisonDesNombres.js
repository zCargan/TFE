import React from 'react';
import './maisonDesNombres.css'
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from '../../../../features/exerciceSlice'
import { addExercice } from '../../../../features/userSlice'

const MaisonDesNombres = () => {

    let dictionnaire = {}
    const dispatch =  useDispatch();
    const exerciceRedux = useSelector(state => console.log(state))
    
    function checkValidity() {
        alert("changé!")
    }

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
        dispatch(
            addExercice(dictionnaire)
        )
    }

    function testTemp() {
        dispatch(
            addExercice(dictionnaire)
        )
    }
 

    return (
        <div>
            Nom de la maison des nombres <input id="nomMDN"></input>
            <br></br>
            Nombre de ligne de votre maison des nombres <input id="nombre"></input>
            <br></br>
            <button onClick={ok}>ok</button>
            <p>Votre maison des nombres :</p><p id="mdn"></p>
            <button onClick={saveSquelette}>Valider le squelette</button>
            <button onClick={final}>Valider les réponses</button>
        </div>
    );
};

export default MaisonDesNombres;