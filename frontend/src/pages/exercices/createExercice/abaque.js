import React, { useState } from 'react';
import './abaque.css'
import axios from 'axios'
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import Popup from 'reactjs-popup';

const Abaque = ({ onAbaqueData }) => {

    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const [word, setWord] = useState("")
    const [popupOpen, setPopupOpen] = useState(false);

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
        texte += "<p>" + document.getElementById('descriptionExercice').value + "</p>"
        for (let i = 0; i < height; i++) {
            texte += "<div class='ligneAbaqueWS'>"
            for (let j = 0; j < width; j++) {
                console.log("largeur")
                console.log("longueur")
                texte += "<input placeholder='' class='inputAbaqueCreation' " + "></input>"
            }
            texte += "</div>"
        }
        texte += "</div>"
        console.log(texte)
        document.getElementById("abaque").innerHTML = texte;
    }


    function saveAbaque() {
        dictionnaire.description = document.getElementById("descriptionExercice").value;
        dictionnaire.type = "abaque";
        dictionnaire.hauteur = Number(height);
        dictionnaire.longueur = Number(width);
        let array1 = []
        let a = document.getElementsByClassName("inputAbaqueCreation")
        for (let i = 0; i < a.length; i++) {
            array1.push(a[i].value)
        }
        dictionnaire.reponseInitiale = array1;
        console.log(dictionnaire)

    }

    function saveAnswer() {
        let array1 = []
        let a = document.getElementsByClassName("inputAbaqueCreation")
        for (let i = 0; i < a.length; i++) {
            array1.push(a[i].value)
        }
        dictionnaire.reponseFinale = array1;
        console.log(dictionnaire)

        const config = {
            headers: {
                'Authorization': `Bearer ${Cookies.get('JWT')}`
            }
        }
        onAbaqueData(dictionnaire);
    }

    function recupereExo() {
        axios.get("http://51.77.150.97:4000/exercice/getAbaque").then((res) => {
            console.log(res.data[0])
            let reponseInitiale = res.data[0].reponseInitiale;
            let hauteur = res.data[0].hauteur;
            let description = res.data[0].description;
            let longueur = res.data[0].longueur;
            let titre = res.data[0].nom;
            let texte = String("<div id='abaqueFromDB'><table><tbody>");
            texte += '<h1>' + titre + '</h1>'
            let k = 0;
            for (let i = 0; i < hauteur; i++) {
                for (let j = 0; j < longueur; j++) {
                    console.log(k)
                    console.log(reponseInitiale)
                    console.log(reponseInitiale[k])
                    texte += "<input placeholder='valeur icii' className='inputAbaqueCreation'" + " value='" + reponseInitiale[k] + "'></input>"
                    k += 1;
                }
                //texte += "<br></br>"
            }
            texte += "</div>"

            document.getElementById("abaqueFromDB").innerHTML = texte;
        })
    }


    function correction() {
        axios.get("http://51.77.150.97:4000/exercice/getAbaque").then((res) => {
            let resultatAttendu = res.data[0].reponseFinale
            let resultatInitial = res.data[0].reponseInitiale;
            let resultatRecu = []
            let idExercice = res.data[0]._id;
            let a = document.getElementsByClassName("test")
            for (let i = 0; i < a.length; i++) {
                resultatRecu.push(a[i].value)
            }
            console.log(resultatAttendu, resultatRecu)
            let tailleArray = resultatInitial.length;
            let nbrAnswer = 0;
            let score = 0;
            for (let i = 0; i < tailleArray; i++) {
                if (resultatInitial[i] === "") {
                    nbrAnswer += 1;
                    if (resultatAttendu[i] !== resultatRecu[i]) {
                        console.log("une faute")
                    } else {
                        score += 1;
                    }
                }
            }

            let scoreFinal = (Math.floor((score / nbrAnswer) * 100))
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

            axios.post("http://51.77.150.97:4000/exercice/registerAnswers", { data }, config)



        })
    }





    return (
        <div>
            <div className='divAbaqueWS'>
                <textarea id="descriptionExercice" placeholder="Description de l'exercice" rows={7} cols={60}></textarea>
                <input className='caractAbaque' id="hauteur" onChange={(e) => { correctHeight(e.target.value) }} placeholder="Hauteur de l'abaque"></input>
                <input className='caractAbaque' id="largeur" onChange={(e) => { correctWidth(e.target.value) }} placeholder="Largeur de l'abaque"></input>
                <div className='divButtonAbaqueWS'>
                    <button onClick={showExercice}>Créer !</button>
                    <Popup
                        trigger={
                            <button onClick={saveAbaque}>Sauvez le squelette</button>}
                        position="left center"
                        open={popupOpen}
                        on="hover"
                        closeOnDocumentClick
                    >
                        <div>
                            <div id="fonctionnement">
                                <p>
                                    En cliquant sur ce bouton, vous valider le squelette de l'exercice
                                    <br />
                                    Le squelette est le corps de l'exercice avec toute les inconnues, mais sans les réponses
                                </p>
                            </div>
                        </div>
                    </Popup>
                    <Popup
                        trigger={
                            <button onClick={saveAnswer}>Sauvez les réponses</button>}
                        position="right center"
                        open={popupOpen}
                        on="hover"
                        closeOnDocumentClick
                    >
                        <div>
                            <div id="fonctionnement">
                                <p>
                                    Permet d'enregistrer l'exercice, avec les réponses introduites après avoir sauvé le squelette
                                    <br />
                                </p>
                            </div>
                        </div>
                    </Popup>
                </div>

            </div>
            <h2 className='abaqueH2'>Votre abaque :</h2>
            <div className='resultAbaqueWS'>
                <p id="abaque">Votre résultat apparaitra ici</p>
            </div>


        </div>
    );
};

export default Abaque;