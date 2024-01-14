import React, { useState } from 'react';
import './blankText.css';
import { useNavigate, Redirect, useHistory } from 'react-router-dom';
import axios from 'axios'
import Cookies from 'js-cookie';
import { IoIosInformationCircle } from "react-icons/io";
import Popup from 'reactjs-popup';
import InfoIcon from '@mui/icons-material/Info';
import Swal from 'sweetalert2';


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
            Swal.fire({
                title: 'Attention',
                text: "Veuillez entrez une phrase valide",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            });
        } else {

            var textarea = document.getElementById("textArea").value;

            if (textarea.endsWith(" ")) {
                textarea = textarea.slice(0, -1);
            }

            var motAAjouter = document.getElementById("motAAjouter").value.trim();

            const motsTextArea = textarea.split(' ');

            motsTextArea.forEach(mot => {
                enonce.push(mot)
                arrayOfWords.push(mot);
            });

            const motsInput = motAAjouter.split(' ');

            motsInput.forEach(mot => {
                enonce.push(mot)
                arrayOfWords.push("inputUserExercice")
            });

            newSentence = html + textarea + " <span class='spanBT'>" + motAAjouter + "</span> "
            console.log(newSentence)
            document.getElementById("phrase").innerHTML = newSentence
            setHTML(newSentence)

            let enonceFinal = enonce.filter(mot => mot !== "");
            let arrayOfWordsFinal = arrayOfWords.filter(mot => mot !== "");

            setArrayEnonce(prevArray => [...prevArray, ...enonceFinal]);
            setArrayFinal(prevArray => [...prevArray, ...arrayOfWordsFinal]);
            console.log()
            
            document.getElementById('textArea').value = ""
            document.getElementById('motAAjouter').value = ""

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

        console.log(document.getElementById('phrase').innerHTML === "")

        if (document.getElementById('descriptionTAT').value === "") {
            Swal.fire({
                icon: 'warning',
                title: 'Erreur',
                text: 'Veuillez choisir une description valide',
                confirmButtonText: 'OK',
            });
        } else {
            if (document.getElementById('phrase').innerHTML === "") {
                Swal.fire({
                    icon: 'warning',
                    title: 'Erreur',
                    text: 'Votre texte à trou est vide',
                    confirmButtonText: 'OK',
                });
            } else {
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
        }
    }

    function changeValueText(event) {
    }


    return (
        <div id="texteATrou">
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
                    <p>Créer votre texte à trous en séléctionnant le titre, la descritpion de votre exercice.</p>
                    <br />
                    <p>Ecrivez le début de votre phrase dans "Ecrivez votre phrase ici". Vous pouvez ajouter votre mot manquant dans "Mot à ajouter". Cliquer ensuite sur <span className='divSpanButton'>"Ajouter ce mot".</span></p>
                    <br />
                    <p>Votre phrase apparait à "Résultat de la phrase". Elle est composé de vos mots manquants en rouge.</p>
                    <br />
                    <p>Vous pouvez compléter votre phrase avec via le formulaire afin de compléter d'avantage votre exercice.</p>
                    <br />
                    <p>Valider votre texte à trou en cliquant sur <span className='divSpanButton'>"Valider cette phrase".</span></p>
                    <br />
                    <p>Féliciation!</p>
                </div>
            </Popup>
            <div className='divInputsTAT'>
                <textarea className="textareaTAT" id="descriptionTAT" rows={5} cols={52} placeholder="Description de l'exercice"></textarea>
                <div>
                    <input className='phraseTATBottom' id="textArea" onChange={changeValueText} placeholder='Ecrivez votre phrase ici'></input>
                    <input className='wordTATBottom' id="motAAjouter" placeholder='Mot à ajouter ici'></input><button className="boutonbottomTAT" onClick={addWords}>Ajouter le mot</button>
                    <br />
                    <p className='resultTATPhrase'>Résultat de la phrase :</p><p id="phrase"></p>
                </div>
                <div>
                    <button className="boutonbottomTAT" onClick={validateSentence}>Valider mon texte à trou</button>
                </div>
            </div>

        </div>
    );
};

export default TexteATrou;