import {React, useState} from 'react';
import './abaque.css'

const Abaque = () => {

    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const [word, setWord] = useState("")
    

    function correctWidth(number) {
        if (/^[0-9]+$/.test(number)) {
            setWidth(number)
        } else {
            alert("Veuillez entrer un nombre entier")
        }
    }

    function correctHeight(number) {
        if (/^[0-9]+$/.test(number)) {
            setHeight(number)
        } else {
            alert("Veuillez entrer un nombre entier")
        }
    }

    function ok() {
        let texte = ""
        for(let i =0; i < height; i ++) {
            
            for(let j = 0; j < width; j++) {
                texte += " 1x "
                console.log("Une fois")
            }
            texte += "\n"
        }
        console.log(texte)
    }

    function ok() {
        let texte = String("<div id='abaque'><table><tbody>");
        let titre = document.getElementById('titreAbaque').value;
        texte += '<h1>' + titre + '</h1>'
        for(let i =0; i <height; i ++) {
            for(let j = 0; j <width; j++) {
                console.log("largeur")
                console.log("longueur")
                texte += "<input placeholder='valeur ici' id=" + "H" + (i+1) + "l" + (j+1) + "></input>"
            }
            texte += "<br></br>"
        }
        texte += "</div>"
        document.getElementById("abaque").innerHTML = texte;
    }


    function saveAbacus() {

    }


    return (
        <div>
            <h2>Abaque</h2>
            Titre de l'abaque: <input placeholder='Indiquer le titre ici' id="titreAbaque"></input>
            <br></br>
            Hauteur de l'abaque <input id="hauteur" onChange={(e) => correctHeight(e.target.value)}></input>
            <br></br>
            largeur de l'abaque <input id="largeur" onChange={(e) => correctWidth(e.target.value)}></input>
            <br></br>
            <button onClick={ok}>ok</button>
            <br></br>
            <p>Votre abaque :</p><p id="abaque"></p>
            <br></br>
            <button onClick={saveAbacus}>Sauvez mon abaque</button>
        </div>
    );
};

export default Abaque;