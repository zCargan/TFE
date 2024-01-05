import React, { useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import Cookies from 'js-cookie';
import Popup from 'reactjs-popup';
import { FaUserAlt } from 'react-icons/fa';
const MDN = () => {

    let exo = {}
    const [popupOpen, setPopupOpen] = useState(false);
    const [username, setUsername] = useState("")
    const dispatch =  useDispatch();
    const exerciceRedux = useSelector(state =>(state))

    function handleUserIconHover() {
        setPopupOpen(true);
    }

    function handleUserIconLeave() {
        setPopupOpen(false);
    }

    function showSqueleton() {
        var number = document.getElementById('nombre').value;
        if (/^[0-9]+$/.test(number)) {
            let texte = "<div class='triangle-container'>";
            //texte += '<div class="triangle-down"></div>'; // Conteneur pour le triangle
            texte += '<h1>' + document.getElementById('nomMDN').value + '</h1>'; // Titre à l'intérieur du conteneur du triangle
            texte += "<div id='mdnContent'>";
            for (let i = 0; i < number; i++) {
                texte += '<input id="' + i + '" class="inputMDN"></input><input id="' + i + '" class="inputMDN"></input>';
                texte += "<br></br>";
            }
            texte += "</div></div>"; // Fin du conteneur
            document.getElementById("mdn").innerHTML = texte;
        }
    }
    
    function saveSquelette() {
        exo.nom = document.getElementById("nomMDN").value;
        exo.anneeScolaire = document.getElementById("selectSchoolYear").value;
        exo.description = document.getElementById("descriptionExercice").value;
        exo.type = "MDN";
        exo.cols = Number(document.getElementById('nombre').value);
        
        let arrayEnonce = []

        let input = document.getElementsByClassName('inputMDN')
        console.log(input)

        for(let i = 0; i < input.length; i++) {
            arrayEnonce.push(input[i].value)
        } 
        
        exo.reponseInitiale = arrayEnonce


    }

    function final() {
        let arrayFinal = []

        let input = document.getElementsByClassName('inputMDN')

        for(let i = 0; i < input.length; i++) {
            arrayFinal.push(input[i].value)
        } 
        
        exo.reponseFinal = arrayFinal

        const config = {
            headers: {
                'Authorization': `Bearer ${Cookies.get('JWT')}`
            }
        }

        axios.post("http://localhost:4000/exercice/registerMDN", {exo}, config)
    }


return (
    <div id="MDN_div">
        <Popup
            trigger={
                <div onMouseEnter={handleUserIconHover} onMouseLeave={handleUserIconLeave}>
                <img
                    src='mdn.png'
                    alt='Image pour popup'
                    style={{ width: '150px', height: '150px' }} // Les styles doivent être dans un objet JavaScript
                />
                </div>
            }
            position="bottom center"
            open={popupOpen}
            on="hover"
            closeOnDocumentClick
        >
            <div id="popupMDN">
                <input id="nomMDN" placeholder='Nom de la maison des nombres'></input>
                <br />
                <br />
                <div>
                    <select id="selectSchoolYear">
                        <option value="1">1ère année primaire</option>
                        <option value="2">2ème année primaire</option>
                        <option value="3">3ème année primaire</option>
                        <option value="4">4ème année primaire</option>
                        <option value="5">5ème année primaire</option>
                        <option value="6">6ème année primaire</option>
                    </select>
                </div>
                <br />
                <br />
                <textarea rows={5} cols={52} id="descriptionExercice" placeholder="Description de l'exercice"></textarea>
                <br />
                <br />
                <input id="nombre" placeholder='Nombre de lignes pour votre maison des nombres'></input>
                <br></br>
                <button onClick={showSqueleton}>Voir mon squelette</button>
                <button onClick={saveSquelette}>Valider le squelette</button>
                <button onClick={final}>Valider les réponses</button>
                <p id="mdn"></p>
            </div>
        </Popup>
    </div>
);

};

export default MDN;