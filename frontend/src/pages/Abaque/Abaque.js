import React, { useState } from 'react';
import './Abaque.css'
import axios from 'axios'
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import Navbar from '../../components/navbar/Navbar';

const Abaque = () => {

    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const [word, setWord] = useState("")
    
    let dictionnaire = {};


    function correctWidth(number) {
        if (/^[0-9]+$/.test(number)) {
            setWidth(number)
        } else {
            alert("Veuillez entrer un nombre entier")
        }
    }

    function correctHeight(number) {
        if (/^[0-9]+$/.test(number)) {
            setHeight(number)
        } else {
            alert("Veuillez entrer un nombre entier")
        }
    }



    function showExercice() {
        let texte = String("<div id='abaque'><table><tbody>");
        let titre = document.getElementById('titreAbaque').value;
        texte += '<h1>' + titre + '</h1>'
        for(let i =0; i <height; i ++) {
            for(let j = 0; j <width; j++) {
                console.log("largeur")
                console.log("longueur")
                texte += "<input placeholder='valeur ici' class='test' "+ "></input>"
            }
            texte += "<br></br>"
        }
        texte += "</div>"
        console.log(texte)
        document.getElementById("abaque").innerHTML = texte;
    }


    function saveAbaque() {

        var radios = document.getElementsByName('anneeScolaire');
        var valeur;
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                valeur = radios[i].value;
            }
        }

        dictionnaire.nom = document.getElementById('titreAbaque').value;
        dictionnaire.anneeScolaire = valeur;
        dictionnaire.description = document.getElementById("descriptionExercice").value;
        dictionnaire.type = "abaque" ;
        dictionnaire.hauteur = Number(height);
        dictionnaire.longueur = Number(width);
        let array1 = []
        let a = document.getElementsByClassName("test")
        for(let i = 0; i < a.length; i ++) {
            array1.push(a[i].value)
        }
        dictionnaire.reponseInitiale = array1;
        console.log(dictionnaire)

    }

    function saveAnswer() {
        let array1 = []
        let a = document.getElementsByClassName("test")
        for(let i = 0; i < a.length; i ++) {
            array1.push(a[i].value)
        }
        dictionnaire.reponseFinale = array1;
        console.log(dictionnaire)

        const config = {
            headers: {
                'Authorization': `Bearer ${Cookies.get('JWT')}`
            }
        }

        const data = {
            exercice: dictionnaire
        }
        console.log(data)

        axios.post("http://localhost:4000/exercice/registerAbaque", {data}, config)

    }

    function recupereExo() {
        axios.get("http://localhost:4000/exercice/getAbaque").then((res) => {
            console.log(res.data[0])
            let reponseInitiale = res.data[0].reponseInitiale;
            let hauteur = res.data[0].hauteur;
            let description = res.data[0].description;
            let longueur = res.data[0].longueur;
            let titre = res.data[0].nom;
            let texte = String("<div id='abaqueFromDB'><table><tbody>");
            texte += '<h1>' + titre + '</h1>'
            let k = 0;
            for(let i =0; i <hauteur; i ++) {
                for(let j = 0; j <longueur; j++) {  
                    console.log(k)
                    console.log(reponseInitiale)
                    console.log(reponseInitiale[k])
                    texte += "<input placeholder='valeur ici' class='test'" + " value='" + reponseInitiale[k] +"'></input>"
                    k += 1;
                }
                texte += "<br></br>"
            }
            texte += "</div>"

            document.getElementById("abaqueFromDB").innerHTML = texte;
        })
    }
 

    function correction() {
        axios.get("http://localhost:4000/exercice/getAbaque").then((res) => {
            let resultatAttendu =  res.data[0].reponseFinale
            let resultatInitial = res.data[0].reponseInitiale;
            let resultatRecu = []
            let idExercice = res.data[0]._id;
            let a = document.getElementsByClassName("test")
            for(let i = 0; i < a.length; i ++) {
                resultatRecu.push(a[i].value)
            }
            console.log(resultatAttendu, resultatRecu)
            let tailleArray = resultatInitial.length;
            let nbrAnswer = 0;
            let score = 0;
            for(let i = 0; i < tailleArray; i ++) {
                if(resultatInitial[i] === "") {
                    nbrAnswer += 1;
                    if(resultatAttendu[i] !== resultatRecu[i]) {
                        console.log("une faute")
                    } else {
                        score += 1;
                    }
                }
            }

            let scoreFinal = (Math.floor((score/nbrAnswer) *100))
            Swal.fire({
                title: 'Résultat',
                text: 'Vous avez obtenu la note de : ' + scoreFinal + "%",
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
            });

            const config = {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('JWT')}`
                }
            }

            const data = {
                type: "abaque",
                score: scoreFinal,
                idExercice: idExercice
            }

            axios.post("http://localhost:4000/exercice/registerAnswers", {data}, config)
            


        })
    }



    return (
        <div>
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
            <h2>Abaque</h2>
            Titre de l'abaque: <input placeholder='Indiquer le titre ici' id="titreAbaque"></input>
            <br></br>
            <p>Description de l'exercice :</p>
            <textarea id="descriptionExercice">

            </textarea>
            <br></br>
            Hauteur de l'abaque <input id="hauteur" onChange={(e) => correctHeight(e.target.value)}></input>
            <br></br>
            largeur de l'abaque <input id="largeur" onChange={(e) => correctWidth(e.target.value)}></input>
            <br></br>
            <button onClick={showExercice}>ok</button>
            <br></br>
            <p>Votre abaque :</p><p id="abaque"></p>
            <p>Info</p>
            <br></br>
            <button onClick={saveAbaque}>Sauvez le squelette</button>
            <button onClick={saveAnswer}>Sauvez les réponses</button>
            <br></br>
            <div style={{ backgroundColor: 'red' }}>
                <button onClick={recupereExo}>afficher exercice</button>
                <p>Votre abaque :</p><p id="abaqueFromDB"></p>
                <button onClick={correction}>Correction</button>
            </div>
        </div>
    );
};

export default Abaque;