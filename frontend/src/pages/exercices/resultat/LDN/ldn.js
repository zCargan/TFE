import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../../components/navbar/Navbar';


import './ldn.css'

const LDN = () => {

    const [reponses, setReponses] = useState("");
    const [nom, setNom] = useState('');
    const [anneeScolaire, setAnneeScolaire] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [id, setId] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        getExoLDN()
    }, [])

    const config = {
        headers: {
            'Authorization': `Bearer ${Cookies.get('JWT')}`
        }
    }

    function getExoLDN() {
        axios
            .get('http://51.77.150.97:4000/exercice/getLDN', config)
            .then((res) => {
                let resultatAttendu =  res.data[0].reponseFinale
                setReponses(resultatAttendu)
                let length = res.data[0].reponseFinale.length;
                let enonceIndex = res.data[0].reponseInitiale;
                let direction = res.data[0].direction
                console.log(res.data[0])
                setId(res.data[0]._id);
                setNom(res.data[0].nom);
                setAnneeScolaire(res.data[0].anneeScolaire);
                setDescription(res.data[0].description);
                setType(res.data[0].type);
                console.log(enonceIndex)

                let texte = String("<div id='ligneDuTemps'><table><tbody>")
                
                if(direction === "G") {
                    texte += '◀'
                    for(let i = 0; i < length; i ++) {
                        console.log(i)
                        texte += String("<input id='" + (i+1) + "' class='inputUserAnswer' value='" + enonceIndex[i] + "'></input>");
                    }
                    texte += String("</tbody></table></div>");
                    console.log(texte)    
                } else {
                    for(let i = 0; i < length; i ++) {
                        texte += String("<input id='" + (i+1) + "' class='inputUserAnswer' value='" + enonceIndex[i] + "'></input>");
                    }
                    texte += '▶'
                    texte += String("</tbody></table></div>");
                    console.log(texte)
                }
                document.getElementById("zoneExoLDN").innerHTML = texte
            })
            .catch((error) => {
                console.log(error)
            })
    }


    function correction() {
        const config = {
            headers: {
                'Authorization': `Bearer ${Cookies.get('JWT')}`
            }
        }

        axios
            .get('http://51.77.150.97:4000/exercice/getLDN', config)
            .then((res) => {
                let reponseAttendue = res.data[0].reponseFinale;
                let enonceIndex = res.data[0].reponseInitiale;
                let reponsesRecues = [];
                let inputClassAnswer = document.getElementsByClassName("inputUserAnswer");
                console.log(inputClassAnswer)
                for(let i = 0; i < inputClassAnswer.length; i ++) {
                    reponsesRecues.push(inputClassAnswer[i].value)     
                }

                let nbrExos = 0;
                let score = 0;

                for(let i = 0; i < reponseAttendue.length; i ++) {
                    if(enonceIndex[i] === '') {
                        if(reponseAttendue[i] === reponsesRecues[i]) {
                            score += 1;
                        }
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
                    idExercice: res.data[0]._id
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
            .catch((error) => {
                console.log(error)
            })
    }

    function seeCorrection() {
        let inputUser = document.getElementsByClassName('inputUserAnswer')
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
        <div id='div_ldn'> 
            <h3>{nom}</h3>
            <p id="description">{description}</p>
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

export default LDN;