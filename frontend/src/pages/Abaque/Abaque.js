import React, { useState } from 'react';
import './Abaque.css'
import axios from 'axios'
import Cookies from 'js-cookie';
import Navbar from '../../components/navbar/Navbar';

import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import Popup from 'reactjs-popup';
import InfoIcon from '@mui/icons-material/Info';

const Abaque = () => {

    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const [word, setWord] = useState("")
    const [popupOpen, setPopupOpen] = useState(false);

    const navigate = useNavigate();

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
        let description = document.getElementById('descriptionExercice').value;
        texte += "<br />"
        texte += '<div class="abaqueInputDivCreation">'
        texte += '<h1>Titre : ' + titre + '</h1>'
        texte += '<h2>Description : ' + description + '</h2>'
        texte += '<br />'
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                console.log("largeur")
                console.log("longueur")
                texte += "<input class='inputAbaqueCreation' " + "></input>"
            }
            texte += "<br></br>"
        }
        texte += "</div>"
        texte += "</div>"
        console.log(texte)
        document.getElementById("abaqueCreation").innerHTML = texte;
    }


    function saveAbaque() {
        dictionnaire.nom = document.getElementById('titreAbaque').value;
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

        var radios = document.getElementsByName('anneeScolaire');
        var valeur;
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                valeur = radios[i].value;
            }
        }

        if (valeur === undefined) {
            Swal.fire({
                icon: 'warning',
                title: 'Erreur',
                text: 'Veuillez choisir une année scolaire valide',
                confirmButtonText: 'OK',
            });
        } else {
            dictionnaire.anneeScolaire = valeur;

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

            const data = {
                exercice: dictionnaire
            }
            console.log(data)

            axios.post("http://localhost:4000/exercice/registerAbaque", { data }, config)
                .then((res) => {

                    if (res.status == 201) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Abaque créé!',
                            showConfirmButton: false,
                            timer: 1500
                        }).then((result) => {
                            if (result.dismiss === Swal.DismissReason.timer) {
                                navigate('/');
                            }
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Une erreur s\'est produite durant la création de l\'abaque',
                            text: 'Veuillez réessayer plus tard.',
                        });
                    }


                    let data = {
                        idExo: res.data.data._id,
                        type: "abaque"
                    }

                    axios.post(`http://localhost:4000/exercice/addExoToUser`, data, config)
                        .then((res) => {
                            console.log(res)
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                })
                .catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erreur!',
                        text: 'Une erreur s\'est produite.',
                    });
                })
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
                    texte += "<input class='inputAbaquePart'" + " value='" + reponseInitiale[k] + "'></input>"
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
            let resultatAttendu = res.data[0].reponseFinale
            let resultatInitial = res.data[0].reponseInitiale;
            let resultatRecu = []
            let idExercice = res.data[0]._id;
            let a = document.getElementsByClassName("inputAbaquePart")
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
            <Navbar />
            <div id="divCreationAbaque">
                <h2 className='MenuAbaqueTitle'>Menu de création de l'abaque</h2>
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
                        <p>Afin de réaliser l'exercice, vous devez en premier lieu séléctionner une année ciblée</p>
                        <p>Ensuite, créer votre abaque en séléctionnant le titre, la descritpion, le nombre de colonnes et de lignes de votre abaque.</p>
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
                <div className='anneeScolaireAbaque'>
                    <p className='legendAnneeScolaireAbaque'>Choisissez l'année scolaire ciblée:</p>
                    <div className="AnneeScolaireChoiceAbaque">
                        <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="1" />1er
                        <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="2" />2ème
                        <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="3" />3ème
                        <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="4" />4ème
                        <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="5" />5ème
                        <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="6" />6ème
                    </div>
                </div>
                <br />
                <div className='divInputs'>
                    <div className='divAbaqueCreationTitle'>
                        <input className="inputAbaque" placeholder="Titre de l'abaque" id="titreAbaque"></input>
                    </div>
                    <div className='divAbaqueCreationTextarea'>
                        <textarea placeholder="Description de l'exercice" id="descriptionExercice"></textarea>
                    </div>
                    <div className='hauteurlargeur'>
                        <div className='hauteurInputdiv'>
                            <input className="inputAbaque" id="hauteur" onChange={(e) => correctHeight(e.target.value)} placeholder="Hauteur de l'abaque"></input>
                        </div>
                        <div className='largeurInputdiv'>
                            <input className="inputAbaque" id="largeur" onChange={(e) => correctWidth(e.target.value)} placeholder="Largeur de l'abaque"></input>
                        </div>
                    </div>
                </div>
                <br />
                <div className='divButtons'>
                    <div>
                        <button className="boutonOfCreation" onClick={showExercice}>Créer mon abaque</button>
                    </div>
                    <div>
                        <button className="boutonOfSaveSquelet" onClick={saveAbaque}>Sauvez le squelette</button>
                    </div>
                    <div>
                        <button className="boutonOfSaveExo" onClick={saveAnswer}>Sauvez les réponses</button>
                    </div>
                </div>
                <div>
                    <img id='creatifImg' src='creatif2.png'></img>
                </div>
            </div>
            <h2 className='abaqueH2'>Votre abaque apparaitra ici:</h2>
            <p id="abaqueCreation"></p>
        </div>
    );
};

export default Abaque;