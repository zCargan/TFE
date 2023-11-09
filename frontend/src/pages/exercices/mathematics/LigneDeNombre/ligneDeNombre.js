import React from 'react';
import './ligneDeNombre.css'
import axios from 'axios'
import Cookies from 'js-cookie';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from '../../../../features/exerciceSlice'
import { addExercice } from '../../../../features/exerciceSlice'


const LigneDeNombre = () => {

    const dispatch =  useDispatch();
    const exerciceRedux = useSelector(state =>(state))
    
    let exercice = {}
    var texte = ""
    let exo = {};
    const exerciceTest = useSelector((state) =>(state))

    function submit_squelette() {
        let allInput = document.querySelectorAll('.inputUser')
        allInput.forEach(element => {
            if(element.value !== "") {
                console.log(element.id)
                console.log(element.value)
            }
        });
        var div = document.getElementById("administratif");
        div.style.display = "none"
    }

    function test123() {
        console.log(document.getElementById("length").value)
        console.log(exerciceTest)
    }

    function saveSqueleton() {
        /*

        cette fonction a pour but de sauver le squelette de l'excerice

        */

        let reponsesEnoncees = []
        exo.nom = document.getElementById("name").value;
        exo.anneeScolaire = document.getElementById('selectSchoolYear').value;
        exo.description = document.getElementById("description").value;
        exo.type = 'LDN'
        let option = document.getElementById("direction").value;
        if(option === "gauche") {
            exo.direction = "G"
        } else {
            exo.direction = "D"
        }

        let inputClass = document.getElementsByClassName("inputUser");

        for(let i = 0; i < inputClass.length; i ++) {
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

        for(let i = 0; i < inputClass.length; i ++) {
            reponsesFinales.push(inputClass[i].value)     
        }

        exo.reponseFinale = reponsesFinales

        dispatch(
            addExercice(exo)
        )
        console.log(exo)

        const config = {
            headers: {
                'Authorization': `Bearer ${Cookies.get('JWT')}`
            }
        }


        axios.post("http://localhost:4000/exercice/registerLDN", {exo}, config)


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
        texte += String("<h4>" + document.getElementById("name").value + "</h4>")
        texte += String("<p>" + document.getElementById("description").value + "</p>")
        texte += String("<div id='ligneDuTemps'><table><tbody>")
        let length = document.getElementById('length').value;
        let option = document.getElementById("direction").value;
        
        if(option === "gauche") {
            texte += '◀'
            for(let i = 0; i < length; i ++) {
                texte += String("<input id='" + (i+1) + "' class='inputUser'></input>");
            }
            texte += String("</tbody></table></div>");
            console.log(texte)    
        } else {
            for(let i = 0; i < length; i ++) {
                texte += String("<input id='" + (i+1) + "' class='inputUser'></input>");
            }
            texte += '▶'
            texte += String("</tbody></table></div>");
        }   
        document.getElementById("result").innerHTML = texte
    }



    function testRedux() {
        console.log(exerciceRedux)
    }

    return (
        <Provider store={store}>
            <div>
                <h3>Ligne des nombres</h3>
                <button onClick={testRedux}>test redux</button>
                <div id="administratif">
                    <h4>Coin chippo</h4>
                    Entrez ici le nom de votre exercice <input id="name"></input>
                    <br></br>
                    <h5>Description de l'exercice :</h5>
                    <textarea rows="5" cols="40" id="description"></textarea>
                    <br></br>
                    <br></br>
                    Entrez ici la taille de votre ligne des nombres <input id="length"></input>
                    <br></br>
                    <br></br>
                    Direction de ma droite des nombres <select id="direction">
                        <option value="droite">▶</option>
                        <option value="gauche">◀</option>
                    </select>
                    <br></br>
                    <br></br>
                    <button onClick={createLine}>Créer ma ligne des nombres</button>
                    <br></br>
                    <br></br>
                </div>
                <div id="zonedetests">
                    <p>Résultat :</p><p id="result"></p>
                    <button id="button_squelette" onClick={saveSqueleton}>Valider le squelette</button>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div>

                    <p>Zone de tests</p>
                    <button onClick={testSaveAll}>Valider les réponses</button>
                </div>
                <div>
                    
                </div>
            </div>
        </Provider>
    );
};

export default LigneDeNombre;