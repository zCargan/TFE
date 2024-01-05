import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'

import './AbaqueCreator.css'

const AbaqueCreator = ({ exo }) => {
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const [word, setWord] = useState("")
    const [nom, setNom] = useState('');
    const [anneeScolaire, setAnneeScolaire] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [id, setId] = useState('');
    const [reponses, setReponses] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        console.log("ac")
        recupereExo();
    }, [])

    const config = {
        headers: {
            'Authorization': `Bearer ${Cookies.get('JWT')}`,
            'Content-Type': 'application/json' // Utilisation de 'application/json' pour le Content-Type
        }
    };

    let dictionnaire = {};

    function recupereExo() {
        axios
        .get(`http://51.77.150.97:4000/exercice/getAbaque/${exo}`, config)
        .then((res) => {
            console.log(res.data)
            let resultatAttendu =  res.data.reponseFinale
            console.log(resultatAttendu)
            setReponses(resultatAttendu)
            let reponseInitiale = res.data.reponseInitiale;
            let hauteur = res.data.hauteur;
            let description = res.data.description;
            let longueur = res.data.longueur;
            let titre = res.data.nom;
            setId(res.data._id);
            setNom(res.data.nom);
            setAnneeScolaire(res.data.anneeScolaire);
            setDescription(res.data.description);
            setType(res.data.type);
            let texte = String("<div id='abaqueFromDB'><table><tbody>");
            let k = 0;
            for(let i =0; i <hauteur; i ++) {
                for(let j = 0; j <longueur; j++) {  
                    texte += "<input class='inputUserResponse'" + " value='" + reponseInitiale[k] +"'></input>"
                    k += 1;
                }
                texte += "<br></br>"
            }
            texte += "</div>"

            document.getElementById("abaqueFromDB").innerHTML = texte;
        })
    }
 

    function correction() {
        axios.get(`http://51.77.150.97:4000/exercice/getAbaque/${exo}`).then((res) => {
            let resultatAttendu =  res.data.reponseFinale
            let resultatInitial = res.data.reponseInitiale;
            let resultatRecu = []
            let idExercice = res.data._id;
            let a = document.getElementsByClassName("inputUserResponse")
            for(let i = 0; i < a.length; i ++) {
                resultatRecu.push(a[i].value)
            }

            const resultatRecuOK = resultatRecu.map(str => str.trim());

            let tailleArray = resultatInitial.length;
            let nbrAnswer = 0;
            let score = 0;
            for(let i = 0; i < tailleArray; i ++) {
                if(resultatInitial[i] === "") {
                    nbrAnswer += 1;
                    console.log(resultatAttendu[i])
                    console.log(resultatRecuOK[i])
                    if(resultatAttendu[i] !== resultatRecuOK[i]) {
                        console.log("Mauvaise réponse")
                    } else {
                        console.log("Bonne réponse")
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
                idExercice: id
            }

            axios
            .post("http://51.77.150.97:4000/exercice/registerAnswers", {data}, config)
            .then((res) => {
                setTimeout(() => {
                    navigate('/home');
                  }, 1300);
            })
            .catch((error) => {
                Swal.fire({
                    title: 'Erreur',
                    text: "Une erreur s'est produite lors de l'enregistrement de votre score",
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 1500
                });
            })


        })
    }

    function seeCorrection() {
        let inputUser = document.getElementsByClassName('test')
        for(let i = 0; i < inputUser.length; i ++) {
            inputUser[i].value = reponses[i]
        }
        Swal.fire({
            text: "Voici la correction de l'exercice",
            icon: 'success',
            showConfirmButton: false,
            timer: 800
        });
        document.getElementById('buttonCorrection').style.display = 'none';
    }
    


    return (
        <div>
            <div id='div_abaque'>
                <h3>{nom}</h3>
                <p id="description">{description}</p>
                <br />
                <p id="abaqueFromDB"></p>
                <button onClick={correction} id="buttonCorrection">Corriger mon exercice !</button>
            </div>
        </div>
    );
};

export default AbaqueCreator;