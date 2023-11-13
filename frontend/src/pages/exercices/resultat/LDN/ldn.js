import React, { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import './ldn.css'

const LDN = () => {


    useEffect(() => {
        getExoLDN()
    }, [])

    function getExoLDN() {

        const config = {
            headers: {
                'Authorization': `Bearer ${Cookies.get('JWT')}`
            }
        }

        axios
            .get('http://localhost:4000/exercice/getLDN', config)
            .then((res) => {
                console.log(res.data[0].reponseFinale.length)
                let length = res.data[0].reponseFinale.length;
                let enonceIndex = res.data[0].reponseInitiale;
                let direction = res.data[0].direction
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


    function validerReponses() {
        const config = {
            headers: {
                'Authorization': `Bearer ${Cookies.get('JWT')}`
            }
        }

        axios
            .get('http://localhost:4000/exercice/getLDN', config)
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

                axios.post("http://localhost:4000/exercice/registerAnswers", {data}, config)

                console.log(score/nbrExos)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div>
            <br />
            <div id='zone_ldn'>
                <br />
                <div id="zoneExoLDN"></div>
                <button onClick={validerReponses}>Valider mes réponses</button>
            </div>
        </div>
    );
};

export default LDN;