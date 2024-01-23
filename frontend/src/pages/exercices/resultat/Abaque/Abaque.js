import React, { useEffect, useState } from 'react';
import './Abaque.css'
import axios from 'axios'
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Abaque = () => {

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
        recupereExo();
    }, [])

    let dictionnaire = {};

    function recupereExo() {
        axios.get("https://www.laclassedemadameseverine.be:4000/exercice/getAbaque").then((res) => {
            let resultatAttendu =  res.data[0].reponseFinale
            setReponses(resultatAttendu)
            let reponseInitiale = res.data[0].reponseInitiale;
            let hauteur = res.data[0].hauteur;
            let description = res.data[0].description;
            let longueur = res.data[0].longueur;
            let titre = res.data[0].nom;
            setId(res.data[0]._id);
            setNom(res.data[0].nom);
            setAnneeScolaire(res.data[0].anneeScolaire);
            setDescription(res.data[0].description);
            setType(res.data[0].type);
            let texte = String("<div id='abaqueFromDB'><table><tbody>");
            let k = 0;
            for(let i =0; i <hauteur; i ++) {
                for(let j = 0; j <longueur; j++) {  
                    console.log(k)
                    console.log(reponseInitiale)
                    console.log(reponseInitiale[k])
                    texte += "<input class='inputAbaquePart'" + " value='" + reponseInitiale[k] +"'></input>"
                    k += 1;
                }
                texte += "<br></br>"
            }
            texte += "</div>"

            document.getElementById("abaqueFromDB").innerHTML = texte;
        })
    }
 

    function correction() {
        axios.get("https://www.laclassedemadameseverine.be:4000/exercice/getAbaque").then((res) => {
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

            axios
            .post("https://www.laclassedemadameseverine.be:4000/exercice/registerAnswers", {data}, config)
            .then((res) => {
                setTimeout(() => {
                    navigate('/');
                  }, 2000);
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
        console.log(inputUser)
        console.log(reponses)
        for(let i = 0; i < inputUser.length; i ++) {
            inputUser[i].value = reponses[i]
        }
        Swal.fire({
            text: "Voici la correction de l'exercice",
            icon: 'success',
            showConfirmButton: false,
            timer: 1100
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
                <br />
                {/* <button onClick={seeCorrection}>Voir la correction</button> */}
            </div>
        </div>
    );
};

export default Abaque;