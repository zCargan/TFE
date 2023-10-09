import React from 'react';
import './ligneDeNombre.css'
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from '../../../../features/exerciceSlice'
import { addExercice } from '../../../../features/userSlice'


const LigneDeNombre = () => {

    const dispatch =  useDispatch();
    const exerciceRedux = useSelector(state => console.log(state))
    
    let exercice = {}
    var texte = ""
    let dic_without_answers = {type: "LDN"}
    const exerciceTest = useSelector((state) => console.log(state))

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

    function test321() {
        /*

        cette fonction a pour but de sauver le squelette de l'excerice

        */

        let array_index = []
        let array_value = []
        dic_without_answers.titre = document.getElementById("name").value;
        dic_without_answers.description = document.getElementById("description").value;
        //console.log(document.getElementById('ligneDuTemps'))
        let option = document.getElementById("direction").value;
        if(option === "gauche") {
            dic_without_answers.direction = "G"
        } else {
            dic_without_answers.direction = "D"
        }
        for(let i = 0; i < document.getElementById('length').value; i ++) {
            if(document.getElementById(i+1).value !== "") {
                array_index.push(i)
                array_value.push(document.getElementById(i+1).value)
            }       
        }
        dic_without_answers.initial_index = array_index
        dic_without_answers.initial_value = array_value
        exercice.baseExercice = dic_without_answers
        console.log(dic_without_answers)
        console.log(exercice)
    }


    function testSaveAll() {

        /*

        Cette fonction sauve l'exercice dans rédux avec les valeurs finales des inputs 

        */


        let array_reponse_index = []
        let array_reponse = []
        for(let i = 0; i < document.getElementById('length').value; i ++) { 
            //console.log(i + " ==> " + document.getElementById(i+1).value) 
            array_reponse_index.push(i)
            if(document.getElementById(i+1).value === "") {
                array_reponse.push("")
            } else {
                array_reponse.push(document.getElementById(i+1).value)
            }
        }
        dic_without_answers.final_index = array_reponse
        dic_without_answers.final_value = array_reponse_index
        console.log(dic_without_answers)
        console.log(array_reponse, array_reponse_index)

        dispatch(
            addExercice(dic_without_answers)
        )

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
            console.log(texte)
        }

        console.log("ici " + texte)        
        document.getElementById("result").innerHTML = texte
    }





    return (
        <Provider store={store}>
            <div>
                <h3>Ligne des nombres</h3>
                <button onClick={hidden}>hidden</button>
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
                    <button id="button_squelette" onClick={test321}>Valider le squelette</button>
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