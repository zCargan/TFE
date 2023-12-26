import React, { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import './TAT.css'
import axios from 'axios'
import Cookies from 'js-cookie';


const TAT = () => {

    const [html, setHTML] = useState("")
    const [arrayEnonce, setArrayEnonce] = useState([])
    const [arrayFinal, setArrayFinal] = useState([])


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

            let newSentence = html + textarea + "<span class='spanBT'>" + motAAjouter + "</span> "
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

    function testState() {
        console.log(arrayEnonce, arrayFinal)
    }

    function validateSentence() {

        var radios = document.getElementsByName('anneeScolaire');
        var valeur;
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                valeur = radios[i].value;
            }
        }

        const config = {
            headers: {
                'Authorization': `Bearer ${Cookies.get('JWT')}`
            }
        }

        const data = {
            nom: document.getElementById("name").value,
            anneeScolaire: valeur,
            description: document.getElementById("descriptionTAT").value,
            type: "TAT",
            reponseInitiale: arrayEnonce,
            reponseFinale: arrayFinal
        }

        axios.post("http://backendContainer:4000/exercice/registerTAT", { data }, config)
            .then((res) => {

                let data = {
                    idExo: res.data.data._id,
                    type: "TAT"
                }

                axios.post(`http://backendContainer:4000/exercice/addExoToUser`, data, config)
                    .then((res) => {
                        console.log(res)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            })
            .catch((error) => { })
    }

    function changeValueText(event) {
    }


    return (
        <div id="texteATrou">
            <Navbar />
            <div>
                <h2 className='MenuTATTitle'>Menu de création de la maison des nombres</h2>
                <div className='anneeScolaireTAT'>
                    <p className='legendAnneeScolaireTAT'>Choisissez l'année scolaire ciblée:</p>
                    <div className="AnneeScolaireChoiceTAT">
                        <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="1" />1er
                        <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="2" />2ème
                        <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="3" />3ème
                        <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="4" />4ème
                        <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="5" />5ème
                        <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="6" />6ème
                    </div>
                </div>
            </div>
            <div className='divInputsTAT'>
                <input className="inputTATBottom" placeholder='Nom du texte à trou' id="name"></input>
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
            <div>
                <img id='creatifImg' src='creatif2.png'></img>
            </div>
        </div>
    );
};

export default TAT;