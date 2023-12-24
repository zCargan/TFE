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

        if (document.getElementById("textArea").value === "") {
            alert("Veuillez entrez une phrase valide")
        } else {

            var textarea = document.getElementById("textArea").value;
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
            description: document.getElementById("descriptionTAT").value,
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
            <div className='divInputsTAT'>
                <textarea className="textareaTAT" id="descriptionTAT" rows={5} cols={52} placeholder="Description de l'exercice"></textarea>
                <div>
                    <input className='phraseTATBottom' id="textArea" onChange={changeValueText} placeholder='Ecrivez votre phrase ici'></input>
                    <input className='wordTATBottom' id="motAAjouter" placeholder='Mot à ajouter'></input><button className="boutonbottomTAT" onClick={addWords}>Ajouter ce mot</button>
                    <br />
                    <p className='resultTATPhrase'>Résultat de la phrase :</p><p id="phrase"></p>
                </div>
                <div>
                <button className="boutonbottomTAT" onClick={validateSentence}>Valider cette phrase</button>
                </div>
            </div>

        </div>
    );
};

export default TexteATrou;