import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import './TATCreator.css'

const TATCreator = ({ exo }) => {
    const [nom, setNom] = useState('');
    const [anneeScolaire, setAnneeScolaire] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [id, setId] = useState('');
    const [reponses, setReponses] = useState('');

    useEffect(() => {
        getExoTAT();
    }, [])

    const navigate = useNavigate();

    const config = {
        headers: {
          'Authorization': `Bearer ${Cookies.get('JWT')}`,
          'Content-Type': 'application/json'
        }
    };

    

    function getExoTAT() {

        axios
            .get(`https://www.laclassedemadameseverine.be:4000/exercice/getTAT/${exo}`, config)
            .then((res) => {
                let reponsesFromDB = []
                let string = "";
                let length = res.data.reponseFinale.length;
                let reponseInitiale = res.data.reponseFinale;
                let reponseFinale = res.data.reponseInitiale;
                setId(res.data._id);
                setNom(res.data.nom);
                setAnneeScolaire(res.data.anneeScolaire);
                setDescription(res.data.description);
                setType(res.data.type);
                for(let i = 0; i < length; i++ ) {
                    if(reponseInitiale[i] !== "inputUserExercice") {
                        string += reponseInitiale[i]
                        string += " "  
                    } else {
                        string += " <input class='inputTATuser'></input> "
                        reponsesFromDB.push(reponseFinale[i])
                    }
                }

                setReponses(reponsesFromDB)

                document.getElementById("zoneExoTAT").innerHTML = string
            })
            .catch((error) => {
                console.log(error)
            })
    }

    function correction() {
        axios
        .get('https://www.laclassedemadameseverine.be:4000/exercice/getTAT', config)
        .then((res) => {
            let arrayUserResponse = [];
            let inputUser = document.getElementsByClassName('inputTATuser')
            for(let i = 0; i < document.getElementsByClassName('inputTATuser').length; i ++) {
                arrayUserResponse.push(document.getElementsByClassName('inputTATuser')[i].value)
            }
            const arrayWithoutSpaces = arrayUserResponse.map(str => str.trim());

            let score = 0;
            let nbrExos = 0;

            for(let i = 0; i < reponses.length; i ++) {
                if(arrayWithoutSpaces[i] === reponses[i]) {
                    score += 1;
                }
                nbrExos += 1;
            }

            const config = {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('JWT')}`
                }
            }
    
            const data = {
                type: "TAT",
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
            .post("https://www.laclassedemadameseverine.be:4000/exercice/registerAnswers", {data}, config)
            .then((res) => {
                setTimeout(() => {
                    navigate('/home');
                }, 1000);
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
        .catch((error) => {
            console.log(error)
        })
    }


    function seeCorrection() {
        let inputUser = document.getElementsByClassName('inputTATuser')
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
        <div id="div_tat">
            <h3>{nom}</h3>
            <p id="description">{description}</p>
            <p className='anneeScolaireCreator'>Année scolaire visée : {anneeScolaire}</p>
            <br />
            <div id="zone_tat">
                <br />
                <div id="zoneExoTAT"></div>
                <button onClick={correction} id="buttonCorrection">Corriger mon exercice !</button>
                <br />
                {/* <button onClick={seeCorrection}>Voir la correction</button> */}
            </div>
        </div>
    );
};

export default TATCreator;