import React from 'react';
import './maisonDesNombres.css'

const MaisonDesNombres = () => {

    function checkValidity() {
        alert("changé!")
    }

    function ok() {
        /*
        let texte = "<div id='mdn'>"
        texte += '<h1>' + document.getElementById('nombre').value + '</h1>'
        document.getElementById("mdn").innerHTML = texte
        */

        var number = document.getElementById('nombre').value;
        if (/^[0-9]+$/.test(number)) {
            let texte = "<div id='mdn'>"
            texte += '<h1>' + document.getElementById('nomMDN').value + '</h1>'
            for(let i = 0; i <number; i ++) {
                texte += "<input id='input1ligne" + i + "'></input><input id='input2ligne" + i + "'></input>"
                texte += "<br></br>"
            }
            texte += "</div>"
            document.getElementById("mdn").innerHTML = texte
        } 

    }

    return (
        <div>
            Nom de la maison des nombres <input id="nomMDN"></input>
            <br></br>
            Nombre de ligne de votre maison des nombres <input id="nombre"></input>
            <br></br>
            <button onClick={ok}>ok</button>
            <p>Votre maison des nombres :</p><p id="mdn"></p>
            <button onClick={(e) => checkValidity()}>Valider ma maison des nombres</button>
        </div>
    );
};

export default MaisonDesNombres;