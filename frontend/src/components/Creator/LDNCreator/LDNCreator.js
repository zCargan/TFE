import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './LDNCreator.css'

const LDNCreator = ({ exo }) => {
    const [reponses, setReponses] = useState("");
    const [nom, setNom] = useState('');
    const [anneeScolaire, setAnneeScolaire] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [id, setId] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        console.log(exo)
        getExoLDN()
    }, [])

    const config = {
        headers: {
            'Authorization': `Bearer ${Cookies.get('JWT')}`
        }
    }

    function getExoLDN() {
        axios
            .get(`http://51.77.150.97:4000/exercice/getLDN/${exo}`, config)
            .then((res) => {
                console.log(res.data)
                let resultatAttendu =  res.data.reponseFinale
                setReponses(resultatAttendu)
                let length = res.data.reponseFinale.length;
                let enonceIndex = res.data.reponseInitiale;
                let direction = res.data.direction
                setId(res.data._id);
                setNom(res.data.nom);
                setAnneeScolaire(res.data.anneeScolaire);
                setDescription(res.data.description);
                setType(res.data.type);

                let texte = String("<div id='ligneDuTemps'><table><tbody>")
                
                if(direction === "G") {
                    texte += '◀'
                    for(let i = 0; i < length; i ++) {
                        texte += String("<input id='" + (i+1) + "' class='inputUserAnswer' value='" + enonceIndex[i] + "'></input>");
                    }
                    texte += String("</tbody></table></div>");
                } else {
                    for(let i = 0; i < length; i ++) {
                        texte += String("<input id='" + (i+1) + "' class='inputUserAnswer' value='" + enonceIndex[i] + "'></input>");
                    }
                    texte += '▶'
                    texte += String("</tbody></table></div>");
                }
                document.getElementById("zoneExoLDN").innerHTML = texte
            })
            .catch((error) => {
            })
    }


    function correction() {
        const config = {
            headers: {
                'Authorization': `Bearer ${Cookies.get('JWT')}`
            }
        }

        axios
            .get(`http://51.77.150.97:4000/exercice/getLDN/${exo}`, config)
            .then((res) => {
                console.log(res.data)
                let reponseAttendue = res.data.reponseFinale;
                let enonceIndex = res.data.reponseInitiale;
                let reponsesRecues = [];
                let inputClassAnswer = document.getElementsByClassName("inputUserAnswer");
                for(let i = 0; i < inputClassAnswer.length; i ++) {
                    reponsesRecues.push(inputClassAnswer[i].value)     
                }

                const reponsesRecuesOK = reponsesRecues.map(str => str.trim());

                console.log(reponseAttendue)

                let nbrExos = 0;
                let score = 0;

                for(let i = 0; i < reponseAttendue.length; i ++) {
                    if(enonceIndex[i] === '') {
                        if(reponseAttendue[i] === reponsesRecuesOK[i]) {
                            console.log("bonne réponse")
                            score += 1;
                        }
                        console.log("mauvaise réponse")
                        nbrExos +=1;
                    }
                }

                const config = {
                    headers: {
                        'Authorization': `Bearer ${Cookies.get('JWT')}`
                    }
                }
        
                const data = {
                    type: "LDN",
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
                .post("http://51.77.150.97:4000/exercice/registerAnswers", {data}, config)
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
            })
    }

    function seeCorrection() {
        let inputUser = document.getElementsByClassName('inputUserAnswer')
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
        <div id='div_ldn'> 
            <h3>{nom}</h3>
            <p id="description">{description}</p>
            <p className='anneeScolaireCreator'>Année scolaire visée : {anneeScolaire}</p>
            <br />    
            <br />
            <div id='zone_ldn'>
                <br />
                <div id="zoneExoLDN"></div>
                <button onClick={correction} id="buttonCorrection">Corriger mon exercice !</button>
                <br />
                <button onClick={seeCorrection}>Voir la correction</button>
            </div>
        </div>
    );
};

export default LDNCreator;