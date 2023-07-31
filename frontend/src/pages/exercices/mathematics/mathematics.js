import {React, useState} from 'react';

const Mathematics = () => {

    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const [word, setWord] = useState("")

    const RepeatVariable = () => {
        const elements = [];
        for(let i = 0; i < width; i ++) {
            for(var j = 0; i < height; j++) {
                elements.push(
                    <p>Element x</p>
                )
            }
        }
        return (
            <div>
              {width},{height}
            </div>
          );
        }


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



    return (
        <div>
            <h1>
                Option mathématique
            </h1>
            <div>
                <p>Zone de test</p>
                <p>==========================</p>
                <p>Hauteur du tableau</p>
                <input id="hauteur" onChange={(e) => correctHeight(e.target.value)}></input><button>ok</button>
                <p>largeur du tableau</p>
                <input id="largeur" onChange={(e) => correctWidth(e.target.value)}></input><button>ok</button>
                <br></br>
                <button onClick={RepeatVariable}> Test</button>

                <p>Valeur de la hauteur : {height}</p>
                <p>Valeur de la largeur : {width}</p>
                <div>
                    <RepeatVariable/>
                </div>
            </div>
        </div>
        
    );
};

export default Mathematics;