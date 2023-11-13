import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import './tat.css'

const TAT = () => {

    useEffect(() => {
        getExoTAT();
    }, [])

    const config = {
        headers: {
          'Authorization': `Bearer ${Cookies.get('JWT')}`,
          'Content-Type': 'application/json'
        }
    };

    let reponse = []

    function getExoTAT() {

        axios
            .get('http://localhost:4000/exercice/getTAT', config)
            .then((res) => {
                
                let string = "";
                let length = res.data[0].reponseFinale.length;
                let reponseInitiale = res.data[0].reponseFinale;
                let reponseFinale = res.data[0].reponseInitiale;
                for(let i = 0; i < length; i++ ) {
                    if(reponseInitiale[i] !== "inputUserExercice") {
                        string += reponseInitiale[i]
                        string += " "  
                    } else {
                        string += " <input class='inputTATuser'></input> "
                        reponse.push(reponseFinale[i])
                    }
                }

                document.getElementById("zoneExoTAT").innerHTML = string
                console.log(reponse)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    function correctionTAT() {
        axios
        .get('http://localhost:4000/exercice/getTAT', config)
        .then((res) => {
            let arrayUserResponse = [];
            let inputUser = document.getElementsByClassName('inputTATuser')
            for(let i = 0; i < document.getElementsByClassName('inputTATuser').length; i ++) {
                arrayUserResponse.push(document.getElementsByClassName('inputTATuser')[i].value)
            }

            let score = 0;
            let nbrExos = 0;

            for(let i = 0; i < reponse.length; i ++) {
                if(arrayUserResponse[i] === reponse[i]) {
                    score += 1;
                }
                nbrExos += 1;
            }

            const config = {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('JWT')}`
                }
            }
    
            const data = {
                type: "TAT",
                score: Math.floor((score/nbrExos) * 100),
                idExercice: res.data[0]._id
            }
    
            axios.post("http://localhost:4000/exercice/registerAnswers", {data}, config)


        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <div>
            <div id="zone_tat">
                <br />
                <div id="zoneExoTAT"></div>
                <button onClick={correctionTAT}>Corriger mon exercice</button>
            </div>
        </div>
    );
};

export default TAT;