import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import ZoneTest from '../../components/zoneTest/zoneTest';
import axios from 'axios'
import Cookies from 'js-cookie';
import Popup from 'reactjs-popup';

const Home = () => {

    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.exercices.exercice)
    const [nbrItem, setNbrItem] = useState("");

    useEffect(() => {
        get_exos_mdn()
    })

    function get_exos_mdn() {
        axios.get('http://localhost:4000/exercice/get_mdn_exercice').then((res)=> {
            let exo = res.data[0];
            let nom = exo.nom;
            let reponseInitiale = exo.reponseInitiale;
            let reponseFinale = exo.reponseFinale;
            const nombreDItems = Object.keys(reponseInitiale).length;
            setNbrItem(nombreDItems)
            const cles = Object.keys(reponseInitiale);

            /*
            console.log("nombre d'items")
            console.log(nombreDItems)

            console.log("clés ")
            console.log(cles)
            
            console.log("reponse initiale ")
            console.log(reponseInitiale)
            */


            let texte = "<div id='mdn_resulat'>"
            texte += '<h1>' + nom + '</h1>'
            for(let i = 0; i <nombreDItems; i ++) {
                //let clés = reponseInitiale.cles[nombreDItems-1]
                let clés = cles[i]
                
                /*
                console.log(clés)
                console.log(reponseInitiale[clés][0])
                */

                texte += '<input id="' + (i+1) + '" class="' +  (i+1)+ '" value=' + reponseInitiale[clés][0] + '>' + '</input><input id="' + (i+1) + '" class="' +  (i+1) + '" value="' + reponseInitiale[clés][1] + '"></input>'
                texte += "<br></br>"

            }
            texte += "</div>"
            document.getElementById("resultat").innerHTML = texte
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
            <div>
                <h1>Page d'accueil</h1>
            </div>
            <div>
                <Navbar />
            </div>
            <div>
                <ZoneTest></ZoneTest>
                <p id="resultat">Résultat</p>
                <button id="valideReponse" onClick={valideReponses}>Valider mes réponses</button>
            </div>
        </div>
    );
};

export default Home;