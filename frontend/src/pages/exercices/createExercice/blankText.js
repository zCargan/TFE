import React, { useState } from 'react';
import './blankText.css';
import { useNavigate, Redirect, useHistory } from 'react-router-dom';
import axios from 'axios'
import Cookies from 'js-cookie';
import { IoIosInformationCircle } from "react-icons/io";
import Popup from 'reactjs-popup';

const TexteATrou = ({ onTatData }) => {

    const [html, setHTML] = useState("")
    const [arrayEnonce, setArrayEnonce] = useState([])
    const [arrayFinal, setArrayFinal] = useState([])
    const [popupOpen, setPopupOpen] = useState(false);

    const navigate = useNavigate();

    let newSentence = "";
    let enonce = []
    let arrayOfWords = []



    function addWords() {

        let enonce = []
        let arrayOfWords = []

        if (document.getElementById("result").value === "") {
            alert("Veuillez entrez une phrase valide")
        } else {

            var textarea = document.getElementById("result").value;
            var motAAjouter = document.getElementById("motAAjouter").value;
            const motsTextArea = textarea.split(' '); // Diviser la chaîne en mots

            motsTextArea.forEach(mot => {
                enonce.push(mot)
                arrayOfWords.push(mot); // Afficher chaque mot dans la console
            });

            const motsInput = motAAjouter.split(' '); // Diviser la chaîne en mots

            motsInput.forEach(mot => {
                enonce.push(mot)
                arrayOfWords.push("inputUserExercice")
            });

            newSentence = html + textarea + "<span class='spanBT'>" + motAAjouter + "</span> "
            console.log(newSentence)
            document.getElementById("phrase").innerHTML = newSentence
            setHTML(newSentence)

            let enonceFinal = enonce.filter(mot => mot !== "");
            let arrayOfWordsFinal = arrayOfWords.filter(mot => mot !== "");

            setArrayEnonce(prevArray => [...prevArray, ...enonceFinal]);
            setArrayFinal(prevArray => [...prevArray, ...arrayOfWordsFinal]);
            console.log()


            console.log(arrayEnonce, arrayFinal)
        }


    }

    function reset() {
        setHTML("");
        document.getElementById('phrase').innerHTML = "";
        console.log(html, newSentence)
        enonce = []
        arrayOfWords = []
        setArrayEnonce([])
        setArrayFinal([])
    }

    function validateSentence() {

        const config = {
            headers: {
                'Authorization': `Bearer ${Cookies.get('JWT')}`
            }
        }

        const data = {
            description: document.getElementById("descriptionExo").value,
            type: "TAT",
            reponseInitiale: arrayEnonce,
            reponseFinale: arrayFinal
        }

        onTatData(data)
    }

    function changeValueText(event) {
    }


    return (
        <div id="texteATrou">
            <br />

            <br />
            <br />
            <textarea id="descriptionExo" onChange={changeValueText} placeholder="Description DE l'exercice" rows={7} cols={60}></textarea>
            <br />
            <br />
            <input placeholder="Votre phrase" className="inputTAT" id="result" rows={7} cols={60}></input>
            <br></br>
            <input id="motAAjouter" className="inputTAT" placeholder='Mot à ajouter'></input><button onClick={addWords}>Ajouter ce mot</button><button onClick={reset}>Remettre le texte à 0</button>
            <br />
            <br />
            <div id="phrase">Votre résultat apparaitra ici</div>
            <br></br>
            <button onClick={validateSentence}>Valider cette phrase</button>

        </div>
    );
};

export default TexteATrou;