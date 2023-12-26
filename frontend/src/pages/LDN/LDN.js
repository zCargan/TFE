import React from 'react';
import axios from 'axios'
import Cookies from 'js-cookie';
import Navbar from '../../components/navbar/Navbar';

import './LDN.css'

const LDN = () => {


    let exercice = {}
    var texte = ""
    let exo = {};

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

    function test123() {
        console.log(document.getElementById("length").value)
    }

    function saveSqueleton() {
        var radios = document.getElementsByName('anneeScolaire');
        var valeur;
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                valeur = radios[i].value;
            }
        }

        let reponsesEnoncees = []
        exo.nom = document.getElementById("name").value;
        exo.anneeScolaire = valeur;
        exo.description = document.getElementById("description").value;
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

        console.log(exo)

        exercice.baseExercice = exo

    }


    function testSaveAll() {

        /*

        Cette fonction sauve l'exercice dans rédux avec les valeurs finales des inputs 

        */


        let reponsesFinales = []

        let inputClass = document.getElementsByClassName("inputUser");

        for (let i = 0; i < inputClass.length; i++) {
            reponsesFinales.push(inputClass[i].value)
        }

        exo.reponseFinale = reponsesFinales

        console.log(exo)

        const config = {
            headers: {
                'Authorization': `Bearer ${Cookies.get('JWT')}`
            }
        }


        axios.post("http://backendContainer:4000/exercice/registerLDN", { exo }, config).then((res) => {

            let data = {
                idExo: res.data.data._id,
                type: "LDN"
            }

            axios.post(`http://backendContainer:4000/exercice/addExoToUser`, data, config)
                .then((res) => {
                    console.log(res)
                })
                .catch((error) => {
                    console.log(error)
                })
        })
            .catch((error) => {
                console.log(error)
            })


    }

    function hidden() {
        var div = document.getElementById("administratif");
        if (div.style.display === "none") {
            div.style.display = "block"; // Vous pouvez également utiliser "inline", "inline-block", etc.
        } else {
            div.style.display = "none";
        }
    }


    function createLine() {
        texte = ""
        texte += "<div class='divLDNCreator'>"
        texte += String("<h4>" + document.getElementById("name").value + "</h4>")
        texte += String("<p>" + document.getElementById("descriptionLDN").value + "</p>")
        texte += String("<div id='ligneDuTemps'><table><tbody>")
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
    }




    return (
        <div>
            <Navbar />
            <h2 className='MenuLDNTitle'>Menu de création de la maison des nombres</h2>
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
                <input className="inputAbaque" placeholder="Titre de l'abaque" id="name"></input>
                <textarea placeholder="Description de l'exercice" id="descriptionLDN"></textarea>
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
                <h2 className='ldnResultatCreator'>Votre ligne des nombres</h2>
                <p id="showResult"></p>
            </div>
            <div>
                <img id='creatifImg' src='creatif2.png'></img>
            </div>
        </div>
    );
};

export default LDN;