import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Cookies from 'js-cookie';
import Navbar from '../../components/navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './LDN.css'

import Popup from 'reactjs-popup';
import InfoIcon from '@mui/icons-material/Info';
import { estUnNombre } from '../FonctionsUnitaires';

const LDN = () => {

    const [popupOpen, setPopupOpen] = useState(false);


    let exoCreated = false;
    let squelettonSaved = false;

    let exercice = {}
    var texte = ""
    let exo = {};
    const navigate = useNavigate();



    function createLine() {
        document.getElementById("showResult").innerHTML = "";
        texte = "";
        if ((document.getElementById("name").value !== "") && (document.getElementById("descriptionLDN").value !== "") && (document.getElementById("length").value !== "")) {
            let length = document.getElementById('length').value;
            if (estUnNombre(length)) {
                texte += "<div class='divLDNCreator'>"
                texte += String("<h4>" + document.getElementById("name").value + "</h4>")
                texte += String("<p>" + document.getElementById("descriptionLDN").value + "</p>")
                texte += String("<div id='ligneDuTemps'><table><tbody>")
                texte += String("<br />")
                let length = document.getElementById('length').value;
                let option = document.getElementById("direction").value;

                if (option === "gauche") {
                    texte += '◀'
                    for (let i = 0; i < length; i++) {
                        texte += String("<input id='" + (i + 1) + "' class='inputUser inputLDNCreator'></input>");
                    }
                    texte += String("</tbody></table></div>");
                    console.log(texte)
                } else {
                    for (let i = 0; i < length; i++) {
                        texte += String("<input id='" + (i + 1) + "' class='inputUser inputLDNCreator'></input>");
                    }
                    texte += '▶'
                    texte += String("</tbody></table></div>");
                }

                texte += "</div>"
                document.getElementById("showResult").innerHTML = texte
                Swal.fire({
                    icon: 'success',
                    title: 'Exercice créé!',
                    text: 'Vous pouvez ajouter les données de l\'énoncé de l\'execice',
                    showConfirmButton: false,
                    timer: 1500
                })
                exoCreated = true
            } else {
                Swal.fire({
                    title: 'Erreur',
                    text: 'Veuillez entrer un nombre valide',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
                document.getElementById('length').value = "";
            }
        } else {
            Swal.fire({
                title: 'Erreur',
                text: 'Veuillez compléter tous les champs',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
        }
    }

    function saveSqueleton() {
        if (exoCreated === false) {
            Swal.fire({
                title: 'Erreur',
                text: 'Veuillez d\'abord créer votre ligne des nombres',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        } else {
            let reponsesEnoncees = []
            exo.nom = document.getElementById("name").value;
            exo.description = document.getElementById("descriptionLDN").value;
            exo.type = 'LDN'
            let option = document.getElementById("direction").value;
            if (option === "gauche") {
                exo.direction = "G"
            } else {
                exo.direction = "D"
            }
            let inputClass = document.getElementsByClassName("inputUser");

            for (let i = 0; i < inputClass.length; i++) {
                reponsesEnoncees.push(inputClass[i].value)
            }
            exo.reponseInitiale = reponsesEnoncees
            exercice.baseExercice = exo
            Swal.fire({
                icon: 'success',
                title: 'Squelette de la ligne des nombres sauvergardé',
                showConfirmButton: false,
                timer: 1500
            })
            squelettonSaved = true;
        }
    }


    function testSaveAll() {

        /*

        Cette fonction sauve l'exercice dans rédux avec les valeurs finales des inputs 

        */

        if (squelettonSaved === false) {
            Swal.fire({
                title: 'Erreur',
                text: 'Veuillez d\'abord sauver votre squelette',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        } else {
            let reponsesFinales = []

            let inputClass = document.getElementsByClassName("inputUser");

            for (let i = 0; i < inputClass.length; i++) {
                reponsesFinales.push(inputClass[i].value)
            }

            exo.reponseFinale = reponsesFinales

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
                exo.anneeScolaire = valeur;
                const config = {
                    headers: {
                        'Authorization': `Bearer ${Cookies.get('JWT')}`
                    }
                }


                axios.post("https://www.laclassedemadameseverine.be:4000/exercice/registerLDN", { exo }, config).then((res) => {

                    if (res.status == 201) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Ligne des nombres créé!',
                            showConfirmButton: true,
                            confirmButtonText: 'OK'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                navigate('/');
                            }
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Une erreur s\'est produite durant la création de la ligne des nombres',
                            text: 'Veuillez réessayer plus tard.',
                        });
                    }

                    let data = {
                        idExo: res.data.data._id,
                        type: "LDN"
                    }

                    axios.post(`https://www.laclassedemadameseverine.be:4000/exercice/addExoToUser`, data, config)
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
                            text: 'Une erreur s\'est produite. Vérifier que l\'exercice est complet.',
                        });
                    })

            }
        }
    }

    function hidden() {
        var div = document.getElementById("administratif");
        if (div.style.display === "none") {
            div.style.display = "block";
        } else {
            div.style.display = "none";
        }
    }




    function submit_squelette() {
        let allInput = document.querySelectorAll('.inputUser')
        allInput.forEach(element => {
            if (element.value !== "") {
                console.log(element.id)
                console.log(element.value)
            }
        });
        var div = document.getElementById("administratif");
        div.style.display = "none"
    }


    return (
        <div>
            <Navbar />
            <h2 className='MenuLDNTitle'>Menu de création de la ligne des nombres</h2>
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
                    <p>Afin de réaliser l'exercice, vous devez, en premier lieu, sélectionner l'année scolaire ciblée.</p>
                    <p>Ensuite, créez votre ligne des nombres en sélectionnant le titre, la description, le nombre de cases ainsi que la direction de votre ligne des nombres.</p>
                    <br />
                    <p>Appuyez sur le bouton <span className='divSpanButton'>"Créer ma ligne des nombres"</span> afin d'obtenir le squelette de l'exercice.</p>
                    <br />
                    <p>Entrez les données connues de votre exercice sans entrer les réponses. Une fois fini, cliquez sur <span className='divSpanButton'>"Valider le squelette"</span>.</p>
                    <br />
                    <p>Pour finir, entrez les réponses attendues de l'exercice et cliquez sur <span className='divSpanButton'>"Valider les réponses"</span> pour sauver votre exercice.</p>
                    <p>Si tous les champs sont bien remplis et si aucune erreur n'est survenue, votre exercice est bien créé!</p>
                    <br />
                    <p>Félicitations!</p>
                </div>
            </Popup>
            <br />
            <div className='anneeScolaireLDN'>
                <p className='legendAnneeScolaireLDN'>Choisissez l'année scolaire ciblée:</p>
                <div className="AnneeScolaireChoiceLDN">
                    <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="1" />1er
                    <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="2" />2ème
                    <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="3" />3ème
                    <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="4" />4ème
                    <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="5" />5ème
                    <input className="inputAnneeScolaire" type="radio" name="anneeScolaire" value="6" />6ème
                </div>
            </div>
            <br />
            <div id="LDNdivcreation">
                <input className="inputAbaque" placeholder="Titre de la ligne des nombres" id="name"></input>
                <textarea placeholder="Description de l'exercice" id="descriptionLDN" className='inputLDN'></textarea>
                <input id="length" placeholder='Taille de la LDN' className='inputLDNCreation'></input>
                <div id="selectLDNcreation">
                    Direction de ma droite des nombres <select id="direction">
                        <option value="droite">▶</option>
                        <option value="gauche">◀</option>
                    </select>
                </div>
            </div>
            <br />
            <div className='divButtonsLDN'>
                <button className="boutonOfCreationLDN" onClick={createLine}>Créer ma ligne des nombres</button>
                <button className="boutonOfSaveSqueletLDN" id="button_squelette" onClick={saveSqueleton}>Valider le squelette</button>
                <button className="boutonOfSaveExoLDN" onClick={testSaveAll}>Valider les réponses</button>
            </div>
            <div>
                <h2 className='ldnResultatCreator'>Votre résultat apparaitra ici :</h2>
                <p id="showResult"></p>
            </div>
            <div>
                <img id='creatifImg' src='creatif2.png'></img>
            </div>
        </div>
    );
};

export default LDN;