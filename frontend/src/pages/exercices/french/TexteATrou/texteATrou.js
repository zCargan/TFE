import React, { useState } from 'react';
import './texteATrou.css';
const TexteATrou = () => {


    const [addedWords, setAddedWords] = useState([])
    const [phrases, setPhrases] = useState({}) 
    const [phrase, setPhrase] = useState("")
    //Contient l'ensemble des phrases écrites ainsi que les mots ajoutés par rapport à ces dernières.
    const [currentSentence, setCurrentSentence] = useState("Votre texte apparaitra ici")
    const [currentHtml, setCurrentHTML] = useState("")
    const [html, setHTML] = useState("")


    function addWords() {
        if(document.getElementById("textArea").value === "") {
            alert("Veuillez entrez une phrase valide")
        } else {

            var textarea = document.getElementById("textArea").value;
            var motAAjouter = document.getElementById("motAAjouter").value;


            //ajoute à la liste les mots nouvellements ajoutés
            let array = addedWords
            array.push(motAAjouter)
            setAddedWords(array)

            //définit la nouvelle phrase à l'aide du mot ajouté
            let oldPhrase = phrase
            let newSentence = oldPhrase + textarea + motAAjouter + " ";
            console.log(newSentence)
            setPhrase(newSentence)

            //change la valeur de textArea en la nouvelle phrase, actualisant le texte à trou
            document.getElementById("textArea").value = phrase;
            document.getElementById("textArea").value = ""

            //crée la string possédant une couleur pour le mot manquant ajouté 
            let ancien = html
            var spanHtml =  ancien + (textarea + '<span>' + motAAjouter + '</span> ')

            //change l'état de currentSentence en la nouvelle string
            setCurrentSentence(spanHtml);

            //change la valeur du texte en la nouvelle chaine de caractère possédant les couleurs + défint HTML comme étant égal à ce code 
            document.getElementById("phrase").innerHTML = spanHtml
            setHTML(spanHtml)
            console.log(spanHtml)
            // console.log("html " + html) => html Logan <span>aime</span>
    
            /*
            setNewHTML(a)
            console.log(newHtml)
            const tableauMots = a.split(newHtml);
            console.log(tableauMots)
            document.getElementById("phrase").innerHTML = newHtml
            */
        }
        

    }



    function validateSentence() {
            const nouveauDictionnaire = { ...phrases}
            nouveauDictionnaire["phrase"] = phrase;
            nouveauDictionnaire["html"] = html
            nouveauDictionnaire["mots"] = addedWords
            setAddedWords([])
            setPhrases(nouveauDictionnaire)
            console.log(nouveauDictionnaire)
            document.getElementById("textArea").value = "";
            document.getElementById("motAAjouter").value = "";
            alert("Phrases ajouté avec succès à l'exercice!")
    }

    function changeValueText(event) {
        let newSentence = document.getElementById("textArea").value
    }
    
    
    return (
        <div>
            <p id="phrase"></p>
            <textarea rows="5" cols="50" id="textArea" onChange={changeValueText}></textarea>
            <br></br>
            <button onClick={validateSentence}>Valider cette phrase</button>
            <p>Ajouter un mot?</p>
            <input id="motAAjouter"></input><button onClick={addWords}>Ajouter ce mot</button>
            <p>Liste des mots ajoutés : </p>
        </div>
    );
};

export default TexteATrou;