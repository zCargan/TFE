import React from 'react';
import axios from 'axios'
import Cookies from 'js-cookie';
import './test.css'

const test = () => {

    let reponsesAttendues = []

    const config = {
        headers: {
            'Authorization': `Bearer ${Cookies.get('JWT')}`,
            'Content-Type': 'application/json' // Utilisation de 'application/json' pour le Content-Type
        }
    };

    function getExoTTI() {
        axios
            .get('http://localhost:4000/exercice/getTTI', config)
            .then((res) => {
                console.log(res.data[0]._id)
                const img = res.data[0].reponses;
                let cles = Object.keys(img);
                const imageContainer = document.getElementById('zoneExos');
    
                imageContainer.style.display = 'flex';
                imageContainer.style.flexWrap = 'wrap'; // Permettre le retour à la ligne si nécessaire
                imageContainer.style.justifyContent = 'center'; // Centrez horizontalement
    
                for (let i = 0; i < cles.length; i++) {
                    axios
                        .get(`http://localhost:4000/photos/getImage/${cles[i]}`, config)
                        .then((res) => {
                            for (let j = 0; j < res.data.length; j++) {
                                reponsesAttendues.push(res.data[0].nom_d_origine)
                                const imageBinaryData = res.data[j].image_data.data;
                                const blob = new Blob([new Uint8Array(imageBinaryData)], { type: res.data[j].type_mime });
                                const objectURL = URL.createObjectURL(blob);
    
                                const imageInputContainer = document.createElement('div');
                                imageInputContainer.style.margin = '20px';
                                imageInputContainer.style.textAlign = 'center'; // Centrer le contenu
                                imageInputContainer.style.display = 'flex'; // Conteneur en colonne
                                imageInputContainer.style.flexDirection = 'column'; // Alignement en colonne
    
                                const imageElement = document.createElement('img');
                                imageElement.src = objectURL;
                                imageElement.style.width = '200px';
                                imageElement.style.height = '200px';
    
                                const inputElement = document.createElement('input');
                                inputElement.type = 'text';
                                inputElement.placeholder = 'Saisir un texte ici';
                                inputElement.style.width = '200px';
                                inputElement.style.marginTop = '10px'; // Ajouter un espace en haut de l'input
    
                                inputElement.value = ''; // Valeur par défaut
                                inputElement.classList.add('answerExo'); // Ajout de la classe 'answerExo'
    
                                imageInputContainer.appendChild(imageElement);
                                imageInputContainer.appendChild(inputElement);
                                imageContainer.appendChild(imageInputContainer);
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    
    
    function testList() {
        axios
            .get('http://localhost:4000/exercice/getTTI', config)
            .then((res) => {
                let inputs = document.getElementsByClassName('answerExo');
                let length = inputs.length
                let nbrExos = 0;
                let score = 0;
                for(let i = 0; i < length; i ++) {
                    if(inputs[i].value ===reponsesAttendues[i]) {
                        score += 1;
                    }
                    nbrExos += 1;
                }
                console.log(score/nbrExos)
        
                const config = {
                    headers: {
                        'Authorization': `Bearer ${Cookies.get('JWT')}`
                    }
                }
        
                const data = {
                    type: "TTI",
                    score: Math.floor((score/nbrExos) * 100),
                    idExercice: res.data[0]._id
                }
        
                axios.post("http://localhost:4000/exercice/registerAnswers", {data}, config)
            })
  
    }
        
    
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
    
    let reponse = []

    function getExoTAT() {
        const config = {
            headers: {
                'Authorization': `Bearer ${Cookies.get('JWT')}`
            }
        }

        axios
            .get('http://localhost:4000/exercice/getTAT', config)
            .then((res) => {
                
                let string = "";
                let length = res.data[0].reponseFinale.length;
                let reponseInitiale = res.data[0].reponseFinale;
                let reponseFinale = res.data[0].reponseInitiale;
                for(let i = 0; i < length; i++ ) {
                    if(reponseInitiale[i] !== "inputUserExercice") {
                        string += reponseInitiale[i]
                        string += " "  
                    } else {
                        string += " <input class='inputTATuser'></input> "
                        reponse.push(reponseFinale[i])
                    }
                }

                document.getElementById("zoneExoTAT").innerHTML = string
                console.log(reponse)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    function correctionTAT() {
        axios
        .get('http://localhost:4000/exercice/getTAT', config)
        .then((res) => {
            let arrayUserResponse = [];
            let inputUser = document.getElementsByClassName('inputTATuser')
            for(let i = 0; i < document.getElementsByClassName('inputTATuser').length; i ++) {
                arrayUserResponse.push(document.getElementsByClassName('inputTATuser')[i].value)
            }

            let score = 0;
            let nbrExos = 0;

            for(let i = 0; i < reponse.length; i ++) {
                if(arrayUserResponse[i] === reponse[i]) {
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
                idExercice: res.data[0]._id
            }
    
            axios.post("http://localhost:4000/exercice/registerAnswers", {data}, config)


        })
        .catch((error) => {
            console.log(error)
        })
    }
    

    return (
        <div>
            <br />
            <br />
            <br />
            <div id='zone_tti'>
                <p>Zone de test</p>
                <div>
                    <p>Zone chargement exercice</p>
                    <button onClick={getExoTTI}>Click ici pour un exo TTI</button>
                    <div id="zoneExos"></div>
                    <button onClick={testList}>Test liste</button>
                </div>
            </div>
            <div id='zone_ldn'>
                <button onClick={getExoLDN}>Click ici pour un exo LDN</button>
                <div id="zoneExoLDN"></div>
                <button onClick={validerReponses}>Valider mes réponses</button>
            </div>
            <div id="zone_tat">
                <button onClick={getExoTAT}>Click ici pour un exo TAT</button>
                <div id="zoneExoTAT"></div>
                <button onClick={correctionTAT}>Corriger mon exercice</button>
            </div>
            <br />
            <br />
            <br />
        </div>
    );
};

export default test;