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

        if(document.getElementById("textArea").value === "") {
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
            description: document.getElementById("description").value,
            type: "TAT",
            reponseInitiale: arrayEnonce,
            reponseFinale: arrayFinal
        }

        axios.post("http://localhost:4000/exercice/registerTAT", {data}, config)
        .then((res) => {

            let data = {
                idExo: res.data.data._id,
                type: "TAT"
            }

            axios.post(`http://localhost:4000/exercice/addExoToUser`, data, config)
            .then((res) => {
                console.log(res)
            })
            .catch((error) => {
                console.log(error)
            })
        })
        .catch((error) => {})
    }

    function changeValueText(event) {
    }
    
    
    return (
        <div id="texteATrou">
            <Navbar />
            <div>
                <br />
                <fieldset>
                    <legend>Choisissez l'année scolaire ciblée:</legend>
                    <input type="radio" name="anneeScolaire" value="1" />1er
                    <input type="radio" name="anneeScolaire" value="2" />2ème
                    <input type="radio" name="anneeScolaire" value="3" />3ème
                    <input type="radio" name="anneeScolaire" value="4" />4ème
                    <input type="radio" name="anneeScolaire" value="5" />5ème
                    <input type="radio" name="anneeScolaire" value="6" />6ème
                </fieldset>
            </div>
            <br />
            <input placeholder='Titre de votre exercice' id="name"></input>
            <br />
            <br />
            <textarea placeholder='Description de votre exercice' id="description"></textarea>
            <br />
            <p>Résultat de la phrase :</p><p id="phrase"></p>
            <textarea id="textArea" onChange={changeValueText} placeholder='Ecrivez votre phrase ici'></textarea>
            <br></br>
            <input id="motAAjouter" placeholder='Mot à ajouter'></input><button onClick={addWords}>Ajouter ce mot</button>
            <br></br>
            <br></br>
            <button onClick={validateSentence}>Valider cette phrase</button>
            <button onClick={testState}>test state</button>
        </div>
    );
};

export default TAT;