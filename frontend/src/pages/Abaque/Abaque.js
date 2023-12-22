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
        let description = document.getElementById('descriptionExercice').value;
        texte += '<h1>Titre : ' + titre + '</h1>'
        texte += '<p>Description : ' + description + '</p>'
        texte += '<div class="abaqueInputDivCreation">'
        texte += '<br />'
        for (let i = 0; i <height; i++) {
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
        dictionnaire.type = "abaque";
        dictionnaire.hauteur = Number(height);
        dictionnaire.longueur = Number(width);
        let array1 = []
        let a = document.getElementsByClassName("test")
        for (let i = 0; i < a.length; i++) {
            array1.push(a[i].value)
        }
        dictionnaire.reponseInitiale = array1;
        console.log(dictionnaire)

    }

    function saveAnswer() {
        let array1 = []
        let a = document.getElementsByClassName("test")
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
                console.log(error)
            })
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
                    texte += "<input placeholder='valeur ici' class='test'" + " value='" + reponseInitiale[k] + "'></input>"
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
            <Navbar />
            <div id="divCreationAbaque">
                <h2 className='MenuAbaqueTitle'>Menu de création de l'abaque</h2>
                <div className='anneeScolaire'>
                    <p className='legendAnneeScolaire'>Choisissez l'année scolaire ciblée:</p>
                    <div className="AnneeScolaireChoice">
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
            <h2 className='abaqueH2'>Votre abaque :</h2><p id="abaque"></p>
        </div>
    );
};

export default Abaque;