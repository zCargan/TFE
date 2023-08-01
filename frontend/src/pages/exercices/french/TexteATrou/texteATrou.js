import React, { useState } from 'react';

const TexteATrou = () => {


    const [addedWords, setAddedWords] = useState([])
    const [phrases, setPhrases] = useState({})
    const [currentSentence, setCurrentSentence] = useState("Texte à trou")
    const [htmlSentence, setHTMLSentence] = useState("")

    function addWords() {

        var textarea = document.getElementById("textArea").value;
        var motAAjouter = document.getElementById("motAAjouter").value;
        let array = addedWords
        array.push(motAAjouter)
        setAddedWords(array)
        var phrase = textarea + motAAjouter;
        document.getElementById("textArea").value = phrase;
        setCurrentSentence(phrase)

        //setCurrentSentence(phraseHTML)

    }

    function validateSentence() {
        if(document.getElementById("textArea").value === "") {
            alert('Veuillez entrez une phrase valide!')
        } else {

            const nouveauDictionnaire = { ...phrases}
            nouveauDictionnaire[document.getElementById("textArea").value] = addedWords;
            setAddedWords([])
            setPhrases(nouveauDictionnaire)

            console.log(nouveauDictionnaire)

            document.getElementById("textArea").value = "";
            document.getElementById("motAAjouter").value = "";
            alert("Phrases ajouté avec succès à l'exercice!")

        }
    }

    function changeValueText(event) {
        let newSentence = document.getElementById("textArea").value
        setCurrentSentence(newSentence)
    }
    
    
    return (
        <div>
            <p id="phrase">"Test"</p>
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