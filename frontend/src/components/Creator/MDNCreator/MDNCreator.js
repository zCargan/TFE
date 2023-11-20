import React, { useEffect, useState } from 'react';
import axios, { all } from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './MDNCreator.css'

const MDNCreator = ({ exo }) => {
    const [nbrItem, setNbrItem] = useState("");
    const [nom, setNom] = useState('');
    const [anneeScolaire, setAnneeScolaire] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [id, setId] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        getMDN()
    }, [])

    const config = {
        headers: {
          'Authorization': `Bearer ${Cookies.get('JWT')}`,
          'Content-Type': 'application/json'
        }
    };

    function getMDN() {
        axios
        .get(`http://localhost:4000/exercice/getMDN/${exo}`, config)
        .then((res)=> {
            let length = res.data.cols
            let reponseInitiale = res.data.reponseInitiale
            let nom = res.data.nom
            setId(res.data._id);
            setNom(res.data.nom);
            setAnneeScolaire(res.data.anneeScolaire);
            setDescription(res.data.description);
            setType(res.data.type);
            let texte = "<div id='mdn_resulat'>"
            let score = 0;
            for(let i = 0; i <length; i ++) {
                texte += '<input class="answerUser" value=' + reponseInitiale[score] + '>' + '</input><input class="answerUser" value="' + reponseInitiale[score+1] + '"></input>'
                texte += "<br></br>"
                score += 2;
            }
            
            texte += "</div>"
            document.getElementById("zoneExoMDN").innerHTML = texte
        })
    }


    function valideReponses() {
        /**
         * Cette fonction permet de vérifier la validé des reponses et d'afficher un pourcentage de réussite
         */
        let reponseUser = [];
        let index = [];

        for(let j = 0; j < (nbrItem+1); j++) {
            let ligne1 = document.getElementsByClassName("answerUser");
            for(let i = 0; i < ligne1.length; i ++) {
                reponseUser.push(ligne1[i].value)
            }
        }
        
        axios.get('http://localhost:4000/exercice/getMDN').then((res)=> {
            let dicFinal = res.data[0].reponseFinal;
            let dicInitiale = res.data[0].reponseInitiale;
            let idExercice = res.data[0]._id;


            for(let i = 0; i < dicInitiale.length; i ++) {
                if(dicFinal[i] !== dicInitiale[i]) {
                    index.push(i)
                }
            }

            let score = 0;
            let nbrExos = 0;

            for(let j = 0; j < index.length; j ++) {

                if(dicFinal[index[j]] === reponseUser[index[j]]) {
                    score += 1;
                }
                nbrExos += 1;
            }

            const data = {
                type: "MDN",
                score: Math.floor((score/nbrExos) * 100),
                idExercice: id
            }

            Swal.fire({
                title: 'Résultat',
                text: 'Vous avez obtenu la note de : ' + (score/nbrExos) * 100 + "%",
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
            });

            axios
            .post("http://localhost:4000/exercice/registerAnswers", {data}, config)
            .then((res) => {
                setTimeout(() => {
                    navigate('/home');
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
        axios.get('http://localhost:4000/exercice/getMDN').then((res)=> {

            let dicFinal = res.data[0].reponseFinal;
            let dicInitiale = res.data[0].reponseInitiale;
            let idExercice = res.data[0]._id;

            let inputUser = document.getElementsByClassName("answerUser");
            
            for(let i = 0; i < inputUser.length; i ++) {
                console.log(inputUser[i].value = dicFinal[i])
            }
        })
        Swal.fire({
            text: 'Voici la correction des exercices',
            icon: 'success',
            showConfirmButton: false,
            timer: 900
        });
        document.getElementById('valideReponse').style.display = 'none';
    }

    return (
        <div id="div_mdn">
            <h3>{nom}</h3>
            <p id="description">{description}</p>
            <br />
            <div id="zone_abaque">
                <div id="zoneExoMDN"></div>
                <button id="valideReponse" onClick={valideReponses}>Valider mes réponses</button>
                <br />
                <button onClick={seeCorrection}>Voir la correction</button>
            </div>
        </div>
    );
};

export default MDNCreator;