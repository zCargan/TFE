import React, { useState } from 'react';
import axios from 'axios'
import Cookies from 'js-cookie';
import Popup from 'reactjs-popup';
import Navbar from '../../components/navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './MDN.css'

const MDN = () => {
    let exo = {}
    let dictionnaire = {}
    const [nbrItem, setNbrItem] = useState("");
    const navigate = useNavigate();

    function verifyAvancement() {
        let dictionnaireFinal = {};
        dictionnaireFinal.name = document.getElementById("nomMDN").value;
        dictionnaireFinal.infoOriginale = dictionnaire;
        console.log(dictionnaireFinal)
        console.log(dictionnaireFinal.infoOriginale)
    }

    function showSqueleton() {
        var number = document.getElementById('nombre').value;
        if (/^[0-9]+$/.test(number)) {
            let texte = "<div class='triangle-container'>";
            texte += '<h1>' + document.getElementById('nomMDN').value + '</h1>';
            texte += "<h3>" + document.getElementById('descriptionMDN').value + "</h3>"
            texte += "<div id='mdnContent'>";
            for (let i = 0; i < number; i++) {
                texte += '<div className="divExoMDN">'
                texte += '<input id="' + i + '" class="inputMDN"></input><input id="' + i + '" class="inputMDN"></input>';
                texte += '</div>'
            }
            texte += "</div></div>";
            console.log(texte)
            document.getElementById("mdn").innerHTML = texte;
        }
    }



    function saveSquelette() {

        var radios = document.getElementsByName('anneeScolaire');
        var valeur;
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                valeur = radios[i].value;
            }
        }

        exo.nom = document.getElementById("nomMDN").value;
        exo.anneeScolaire = valeur;
        exo.description = document.getElementById("descriptionMDN").value;
        exo.type = "MDN";
        exo.cols = Number(document.getElementById('nombre').value);

        let arrayEnonce = []

        let input = document.getElementsByClassName('inputMDN')
        console.log(input)

        for (let i = 0; i < input.length; i++) {
            console.log(input[i].value)
            arrayEnonce.push(input[i].value)
        }

        exo.reponseInitiale = arrayEnonce


    }

    function final() {
        let arrayFinal = []

        let input = document.getElementsByClassName('inputMDN')

        for (let i = 0; i < input.length; i++) {
            arrayFinal.push(input[i].value)
        }

        console.log(arrayFinal)

        exo.reponseFinal = arrayFinal

        console.log(exo)

        const config = {
            headers: {
                'Authorization': `Bearer ${Cookies.get('JWT')}`
            }
        }

        axios
            .post("http://51.77.150.97:4000/exercice/registerMDN", { exo }, config)

            .then((res) => {

                if (res.status == 201) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Maison des nombres créé!',
                        showConfirmButton: false,
                        timer: 1500
                    }).then((result) => {
                        if (result.dismiss === Swal.DismissReason.timer) {
                            navigate('/');
                        }
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Une erreur s\'est produite durant la création de la maison des nombres',
                        text: 'Veuillez réessayer plus tard.',
                    });
                }

                let data = {
                    idExo: res.data.data._id,
                    type: "MDN"
                }

                axios.post(`http://51.77.150.97:4000/exercice/addExoToUser`, data, config)
                    .then((res) => {
                        console.log(res)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur!',
                    text: 'Une erreur s\'est produite.',
                });
            })
    }


    function get_exos_mdn() {
        axios.get('http://51.77.150.97:4000/exercice/get_mdn_exercice').then((res) => {
            let exo = res.data[0];
            let nom = exo.nom;
            let reponseInitiale = exo.reponseInitiale;
            let reponseFinale = exo.reponseFinale;
            const nombreDItems = Object.keys(reponseInitiale).length;
            setNbrItem(nombreDItems)
            const cles = Object.keys(reponseInitiale);

            let texte = "<div id='mdn_resulat'>"
            texte += '<h1>' + nom + '</h1>'
            for (let i = 0; i < nombreDItems; i++) {

                let clés = cles[i]
                texte += '<div class="divExoMDN">'
                texte += '<input id="' + (i + 1) + '" class="' + (i + 1) + '" value=' + reponseInitiale[clés][0] + '>' + '</input><input id="' + (i + 1) + '" class="' + (i + 1) + '" value="' + reponseInitiale[clés][1] + '"></input>'
                texte += '</div>'
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
        let reponseFinale = [];
        let reponseInitiale = [];
        const liste_resultante = [];
        const listeDifference = [];
        let score = 0;
        for (let j = 0; j < (nbrItem + 1); j++) {
            let ligne1 = document.getElementsByClassName(j);
            for (let i = 0; i < ligne1.length; i++) {
                reponseUser.push(ligne1[i].value)
            }
        }
        axios.get('http://51.77.150.97:4000/exercice/get_mdn_exercice').then((res) => {
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

            for (let k = 0; k < reponseUser.length; k++) {
                if (reponseInitiale[k] === "") {
                    reponseUserFiltred.push(reponseUser[k])
                }
            }


            const réponsesAttendues = liste_resultante.filter(element => !reponseUser.includes(element));
            console.log("Réponses attendues : ", listeDifference);
            console.log("Réponse filtrées : ", reponseUserFiltred)
            console.log("reponse initiale : ", reponseInitiale)


            let NumberAnswer = listeDifference.length;
            for (let i = 0; i < NumberAnswer; i++) {
                if (reponseUserFiltred[i] === listeDifference[i]) {
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
                score: Math.floor((score / NumberAnswer) * 100),
                idExercice: idExercice
            }

            axios.post("http://51.77.150.97:4000/exercice/registerAnswers", { data }, config)
        })

    }




    return (
        <div id="MDN_div">
            <Navbar />
            <div>
                <h2 className='MenuMDNTitle'>Menu de création de la maison des nombres</h2>
                <div className='anneeScolaireMDN'>
                    <p className='legendAnneeScolaireMDN'>Choisissez l'année scolaire ciblée:</p>
                    <div className="AnneeScolaireChoiceMDN">
                        <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="1" />1er
                        <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="2" />2ème
                        <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="3" />3ème
                        <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="4" />4ème
                        <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="5" />5ème
                        <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="6" />6ème
                    </div>
                </div>
            </div>
            <div className='divInputsMDN'>
                <input className="inputMDNBottom" id="nomMDN" placeholder='Nom de la maison des nombres'></input>
                <br />
                <textarea className="textareaMDN" id="descriptionMDN" rows={5} cols={52} placeholder="Description de l'exercice"></textarea>
                <input className="inputMDNBottom" id="nombre" placeholder='Nombre de ligne de votre maison des nombres'></input>
            </div>
            <div className='divButtonMDN'>
                <button className="boutonbottomMDN" onClick={showSqueleton}>Voir mon squelette</button><button className="boutonbottomMDN" onClick={saveSquelette}>Valider le squelette</button><button className="boutonbottomMDN" onClick={final}>Valider les réponses</button>
            </div>
            <div className='mdnZone'>
                <p id="mdn">Votre résultat apparaitra ici</p>
            </div>
            <div>
                <img id='creatifImg' src='creatif2.png'></img>
            </div>
            <br />
        </div>
    );
};

export default MDN;