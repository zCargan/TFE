import React, { useState } from 'react';
import './abaque.css'
import axios from 'axios'
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import Popup from 'reactjs-popup';
import InfoIcon from '@mui/icons-material/Info';

const Abaque = ({ onAbaqueData }) => {

    const [height, setHeight] = useState("");
    const [width, setWidth] = useState("");
    const [word, setWord] = useState("")
    const [popupOpen, setPopupOpen] = useState(false);


    let exoCreated = false;
    let squelettonSaved = false;

    let dictionnaire = {};


    function correctWidth(number) {
        if (/^[0-9]+$/.test(number)) {
            setWidth(number)
        } else {
            Swal.fire({
                title: 'Attention',
                text: 'Veuillez entrer un nombre entierrr',
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            });
            document.getElementById('largeur').value = ""
        }
    }

    function correctHeight(number) {
        if (/^[0-9]+$/.test(number)) {
            setHeight(number)
        } else {
            Swal.fire({
                title: 'Attention',
                text: 'Veuillez entrer un nombre entier',
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            });
            document.getElementById('hauteur').value = ""
        }
    }



    function showExercice() {
        if ((document.getElementById('descriptionExercice').value !== "") && (height !== "") && (width !== "")) {
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
            Swal.fire({
                icon: 'success',
                title: 'Exercice créé!',
                text: 'Vous pouvez ajouter les données de l\'énoncé de l\'execice',
                showConfirmButton: false,
                timer: 1500
            })
            exoCreated = true
        } else {
            Swal.fire({
                title: 'Erreur',
                text: 'Veuillez compléter tous les champs',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
        }
    }


    function saveAbaque() {
        if (exoCreated === false) {
            Swal.fire({
                title: 'Erreur',
                text: 'Veuillez d\'abord créer votre abaque',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        } else {
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
            Swal.fire({
                icon: 'success',
                title: 'Squelette de l\'abaque sauvegardé!',
                text: 'Vous pouvez maintenant introduire les réponses attendues',
                showConfirmButton: false,
                timer: 1800
            })
            squelettonSaved = true;
        }
    }

    function saveAnswer() {
        if (squelettonSaved === false) {
            Swal.fire({
                title: 'Erreur',
                text: 'Veuillez d\'abord sauver votre squelette',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        } else {
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
        axios.get("http://localhost:4000/exercice/getAbaque").then((res) => {
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

            axios.post("http://localhost:4000/exercice/registerAnswers", { data }, config)



        })
    }





    return (
        <div>
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
                    <p>Créer votre abaque en séléctionnant la descritpion, le nombre de colonnes et de lignes de votre abaque.</p>
                    <br />
                    <p>Appuyer sur le bouton <span className='divSpanButton'>"Créer mon abaque"</span> afin d'obtenir le squelette de l'exercice</p>
                    <br />
                    <p>Entrez les données connues de votre exercice sans entrer les réponses. Une fois fini, cliquer sur <span className='divSpanButton'>"Valider le squelette"</span></p>
                    <br />
                    <p>Pour finir, entrez les réponses attendues de l'exercices et cliquer sur <span className='divSpanButton'>"Valider les réponses"</span> pour sauver votre exercice</p>
                    <p>Si tout les champs sont bien remplis et si aucune erreur n'est survenue, votre exercice est bien créer!</p>
                    <br />
                    <p>Féliciation!</p>
                </div>
            </Popup>
            <div className='divAbaqueWS'>

                <textarea id="descriptionExercice" placeholder="Description de l'exercice" rows={7} cols={60}></textarea>
                <input className='caractAbaque' id="hauteur" onChange={(e) => { correctHeight(e.target.value) }} placeholder="Hauteur de l'abaque"></input>
                <input className='caractAbaque' id="largeur" onChange={(e) => { correctWidth(e.target.value) }} placeholder="Largeur de l'abaque"></input>
                <div className='divButtonAbaqueWS'>
                    <button onClick={showExercice} className='abaqueButtonWS'>Créer mon abaque</button>
                    <Popup
                        trigger={
                            <button onClick={saveAbaque} className='abaqueButtonWS'>Valider le squelette</button>}
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
                            <button onClick={saveAnswer} className='abaqueButtonWS'>Valider les réponses</button>}
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