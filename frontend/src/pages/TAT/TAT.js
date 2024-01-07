import React, { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import './TAT.css'
import axios from 'axios'
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import Popup from 'reactjs-popup';
import InfoIcon from '@mui/icons-material/Info';

const TAT = () => {

    const [html, setHTML] = useState("")
    const [arrayEnonce, setArrayEnonce] = useState([])
    const [arrayFinal, setArrayFinal] = useState([])
    const [popupOpen, setPopupOpen] = useState(false);

    const navigate = useNavigate();

    function addWords() {

        let enonce = []
        let arrayOfWords = []


        if (document.getElementById("textArea").value === "") {
            Swal.fire({
                icon: 'warning',
                title: 'Erreur',
                text: 'Veuillez entrer une phrase valide',
                confirmButtonText: 'OK',
            });
        } else {

            var textarea = document.getElementById("textArea").value;

            if (textarea.endsWith(" ")) {
                textarea = textarea.slice(0, -1);
            }

            var motAAjouter = document.getElementById("motAAjouter").value.trim();

            const motsTextArea = textarea.split(' ');

            motsTextArea.forEach(mot => {
                enonce.push(mot)
                arrayOfWords.push(mot);
            });

            const motsInput = motAAjouter.split(' ');

            var textareaSansEspaces = textarea.replace(/\s/g, "");
            var motAAjouterSansEspaces = motAAjouter.replace(/\s/g, "");

            console.log(textareaSansEspaces)
            console.log(motAAjouterSansEspaces)

            let motsInputClean = motsInput.filter(mot => mot.trim() !== "");


            motsInputClean.forEach(mot => {
                enonce.push(mot);
                arrayOfWords.push("inputUserExercice")
            });

            let newSentence = html + textarea + " <span class='spanBT'>" + motAAjouter + "</span> "
            console.log(newSentence)
            document.getElementById("phrase").innerHTML = newSentence
            setHTML(newSentence)

            let enonceFinal = enonce.filter(mot => mot !== "");
            let arrayOfWordsFinal = arrayOfWords.filter(mot => mot !== "");

            setArrayEnonce(prevArray => [...prevArray, ...enonceFinal]);
            setArrayFinal(prevArray => [...prevArray, ...arrayOfWordsFinal]);
            console.log()


            console.log(arrayEnonce, arrayFinal)
        }
        document.getElementById("textArea").value = "";
        document.getElementById("motAAjouter").value = "";
    }

    function testState() {
        console.log(arrayEnonce, arrayFinal)
    }

    function validateSentence() {

        var radios = document.getElementsByName('anneeScolaire');
        var valeur;
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                valeur = radios[i].value;
            }
        }

        if (valeur === undefined) {
            Swal.fire({
                icon: 'warning',
                title: 'Erreur',
                text: 'Veuillez choisir une année scolaire valide',
                confirmButtonText: 'OK',
            });
        } else {

            const config = {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('JWT')}`
                }
            }

            const data = {
                nom: document.getElementById("name").value,
                anneeScolaire: valeur,
                description: document.getElementById("descriptionTAT").value,
                type: "TAT",
                reponseInitiale: arrayEnonce,
                reponseFinale: arrayFinal
            }

            axios.post("http://51.77.150.97:4000/exercice/registerTAT", { data }, config)
                .then((res) => {

                    if (res.status == 201) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Texte à trous créé!',
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
                            title: 'Une erreur s\'est produite durant la création du texte à trou',
                            text: 'Veuillez réessayer plus tard.',
                        });
                    }

                    let data = {
                        idExo: res.data.data._id,
                        type: "TAT"
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
    }

    function changeValueText(event) {
    }


    return (
        <div id="texteATrou">
            <Navbar />
            <div>
                <h2 className='MenuTATTitle'>Menu de création du texte à trous</h2>
                <Popup
                    trigger={
                        <span className='important2'><InfoIcon className='infoLogo' /></span>
                    }
                    open={popupOpen}
                    position="bottom center"
                    on="hover"
                >
                    <div className='explicationExo'>
                        <h1>Explication de la réalisation de l'exercice</h1>
                        <br />
                        <p>Afin de réaliser l'exercice, vous devez en premier lieu séléctionner une année ciblée.</p>
                        <p>Ensuite, créer votre texte à trous en séléctionnant la descritpion de votre exercice.</p>
                        <br />
                        <p>Ecrivez le début de votre phrase dans "Ecrivez votre phrase ici". Vous pouvez ajouter votre mot manquant dans "Mot à ajouter". Cliquer ensuite sur <span className='divSpanButton'>"Ajouter ce mot".</span></p>
                        <br />
                        <p>Votre phrase apparait à "Résultat de la phrase". Elle est composé de vos mots manquants en rouge.</p>
                        <br />
                        <p>Vous pouvez compléter votre phrase avec via le formulaire afin de compléter d'avantage votre exercice.</p>
                        <br />
                        <p>Valider votre texte à trou en cliquant sur <span className='divSpanButton'>"Valider cette phrase".</span></p>
                        <br />
                        <p>Féliciation!</p>
                    </div>
                </Popup>
                <div className='anneeScolaireTAT'>
                    <p className='legendAnneeScolaireTAT'>Choisissez l'année scolaire ciblée:</p>
                    <div className="AnneeScolaireChoiceTAT">
                        <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="1" />1er
                        <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="2" />2ème
                        <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="3" />3ème
                        <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="4" />4ème
                        <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="5" />5ème
                        <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="6" />6ème
                    </div>
                </div>
            </div>
            <div className='divInputsTAT'>
                <input className="inputTATBottom" placeholder='Nom du texte à trou' id="name"></input>
                <textarea className="textareaTAT" id="descriptionTAT" rows={5} cols={52} placeholder="Description de l'exercice"></textarea>
                <div>
                    <input className='phraseTATBottom' id="textArea" onChange={changeValueText} placeholder='Ecrivez votre phrase ici'></input>
                    <input className='wordTATBottom' id="motAAjouter" placeholder='Mot à ajouter'></input><button className="boutonbottomTAT" onClick={addWords}>Ajouter ce mot</button>
                    <br />
                    <p className='resultTATPhrase'>Résultat de la phrase :</p><p id="phrase"></p>
                </div>
                <div>
                    <button className="boutonbottomTAT" onClick={validateSentence}>Valider cette phrase</button>
                </div>
            </div>
            <div>
                <img id='creatifImg' src='creatif2.png'></img>
            </div>
        </div>
    );
};

export default TAT;