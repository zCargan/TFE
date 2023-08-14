import React from 'react';
import './ligneDeNombre.css'
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from '../../../../features/exerciceSlice';



const LigneDeNombre = () => {

    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.exercice)

    function submit() {
        let allInput = document.querySelectorAll('.inputUser')
        allInput.forEach(element => {
            if(element.value != "") {
                console.log(element.id)
                console.log(element.value)
            }
        });
    }

    function test123() {
        console.log(tasks)
    }


    function createLine() {
        let length = document.getElementById('length').value;
        let option = document.getElementById("direction").value;
        var texte = String("<div id='ligneDuTemps'><table><tbody>")
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
        document.getElementById("result").innerHTML = texte
    }


    return (
        <Provider store={store}>
            <div>
                <h3>Ligne des nombres</h3>
                Entrez ici la taille de votre ligne des nombres <input id="length"></input>
                <br></br>
                Direction de ma droite des nombres <select id="direction">
                    <option value="droite">▶</option>
                    <option value="gauche">◀</option>
                </select>
                <br></br>
                <button onClick={createLine}>Créer ma ligne des nombres</button>
                <p>Résultat :</p><p id="result"></p>
                <button onClick={submit}>Valider ma ligne</button>
                <button onClick={test123}>Test</button>
            </div>
        </Provider>
    );
};

export default LigneDeNombre;