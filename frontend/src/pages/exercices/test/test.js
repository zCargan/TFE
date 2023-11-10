import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './test.css';
import MDN from '../../../components/mathematics/MDN';

const Test = () => {

    let reponsesAttendues = [];
    const [nbrItem, setNbrItem] = useState("");

    const config = {
        headers: {
            'Authorization': `Bearer ${Cookies.get('JWT')}`,
            'Content-Type': 'application/json' // Utilisation de 'application/json' pour le Content-Type
        }
    };

    function seeCorrection() {
        axios.get('http://localhost:4000/exercice/get_mdn_exercice').then((res)=> {
            let exo = res.data[0];
            let nom = exo.nom;
            let reponseInitiale = exo.reponseInitiale;
            let reponseFinale = exo.reponseFinale;
            const nombreDItems = Object.keys(reponseInitiale).length;
            setNbrItem(nombreDItems)
            const cles = Object.keys(reponseInitiale);

            console.log("nombre d'items")
            console.log(nombreDItems)

            console.log("clés ")
            console.log(cles)
            
            console.log("reponse initiale ")
            console.log(reponseInitiale)
            


            let texte = "<div id='mdn_resulat'>"
            texte += '<h1>' + nom + '</h1>'
            for(let i = 0; i <nombreDItems; i ++) {
                //let clés = reponseInitiale.cles[nombreDItems-1]
                let clés = cles[i]
                console.log(clés)
                
                console.log(reponseInitiale[clés][0])
                
                texte += '<input id="' + (i+1) + '" class="' +  (i+1)+ '" value=' + reponseFinale[clés][0] + '>' + '</input><input id="' + (i+1) + '" class="' +  (i+1) + '" value="' + reponseFinale[clés][1] + '"></input>'
                texte += "<br></br>"

            }
            texte += "</div>"
            document.getElementById("zoneExoMDN").innerHTML = texte
            alert("voici la correction des exercices :")
        })
    }

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


    function getMDN() {
        axios.get('http://localhost:4000/exercice/getMDN').then((res)=> {
            let length = res.data[0].cols
            let reponseInitiale = res.data[0].reponseInitiale
            let nom = res.data[0].nom
            let texte = "<div id='mdn_resulat'>"
            texte += '<h1>' + nom + '</h1>'
            let score = 0;
            for(let i = 0; i <length; i ++) {
                console.log(reponseInitiale[score], reponseInitiale[score+1])
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
        let reponseUserFiltred = [];
        let reponseFinale= [];
        let reponseInitiale = [];
        const liste_resultante = [];
        const listeDifference = [];
        let score = 0;
        for(let j = 0; j < (nbrItem+1); j++) {
            let ligne1 = document.getElementsByClassName(j);
            for(let i = 0; i < ligne1.length; i ++) {
                reponseUser.push(ligne1[i].value)
            }
        }
        axios.get('http://localhost:4000/exercice/get_mdn_exercice').then((res)=> {
            let dicFinale = res.data[0].reponseFinale;
            let dicInitiale = res.data[0].reponseInitiale;
            let idExercice = res.data[0]._id;

            for (const cle in dicFinale) {
                if (dicFinale.hasOwnProperty(cle)) {
                    liste_resultante.push(...dicFinale[cle]);
                    reponseFinale.push(...dicFinale[cle]);
                    }
            }

            for (const cle in dicInitiale) {
                if (dicInitiale.hasOwnProperty(cle)) {
                    reponseInitiale.push(...dicInitiale[cle]);
                    }
            }

            for (let i = 0; i < reponseFinale.length; i++) {
                if (!reponseInitiale.includes(reponseFinale[i])) {
                    listeDifference.push(reponseFinale[i]);
                }
            }

            console.log("Liste contenant les éléments différents : ", listeDifference);

            for(let k = 0; k < reponseUser.length; k ++) {
                if(reponseInitiale[k] === "") {
                    reponseUserFiltred.push(reponseUser[k])
                }
            }


            const réponsesAttendues = liste_resultante.filter(element => !reponseUser.includes(element));
            console.log("Réponses attendues : ", listeDifference);  
            console.log("Réponse filtrées : " , reponseUserFiltred)
            console.log("reponse initiale : ", reponseInitiale)

        
            let NumberAnswer = listeDifference.length;
            for(let i = 0; i < NumberAnswer; i++) {
                if(reponseUserFiltred[i] === listeDifference[i]) {
                    score += 1;
                }
            }
            //alert("Vous avez obtenu la note de " + Math.floor((score/NumberAnswer) * 100) + "%.")
            const config = {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('JWT')}`
                }
            }

            const data = {
                type: "MDN",
                score: Math.floor((score/NumberAnswer) * 100),
                idExercice: idExercice
            }

            axios.post("http://localhost:4000/exercice/registerAnswers", {data}, config)
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
            <div id="zone_abaque">
                <button onClick={getMDN}>Click ici pour un exo MDN</button>
                <div id="zoneExoMDN"></div>
                <button id="valideReponse" onClick={valideReponses}>Valider mes réponses</button>
                <button onClick={seeCorrection}>Voir la correction</button>
                <MDN></MDN>
            </div>
            <br />
            <br />
            <br />
        </div>
    );
};

export default Test;