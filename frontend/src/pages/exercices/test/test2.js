import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Test2 = () => {
  const [sons, setSons] = useState([]);

  function getSon() {
    const config = {
      headers: {
        'Authorization': `Bearer ${Cookies.get('JWT')}`
      }
    };

    axios.post("http://localhost:4000/connection/infoUser", {}, config)
      .then(response => {
        let id = response.data.id
        axios.get(`http://localhost:4000/sound/getSound/${id}`, {}, config)
          .then((res) => {
            // Ajouter une étiquette à chaque son
            const sonsAvecLabels = res.data.resultat.map((son, index) => ({
              ...son,
              label: `Son ${index + 1}` // Étiquette du son
            }));
            setSons(anciensSons => [...anciensSons, ...sonsAvecLabels]);
          })
          .catch((error) => {
            console.log("Error fetching sounds:", error);
          })
      });
  }

    function setSound() {
        sons.forEach((son, index) => {
            console.log(`Son ${index + 1}: ${son.nom_d_origine}`);
        });
    }

  function checkAnswers() {
    let reponseUser = document.getElementsByClassName('reponseUserSound')
    for(let i = 0; i < reponseUser.length; i ++) {
        if(reponseUser[i].value === sons[i].nom_d_origine) {
            console.log("bonne réponse")
        } else {
            console.log("Mauvaise réponse")
        }
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div id="zone_sound">
            <button onClick={getSon}>Click ici pour un son</button>
            <div id="zoneExoSon" style={{ display: 'flex', flexDirection: 'row', gap: '10px', justifyContent: 'center' }}>
            {sons.map((son, index) => (
                <div key={index} style={{ marginRight: '10px' }}>
                    <p>{son.label}</p> {/* Utiliser la propriété label pour afficher le nom */}
                    <audio controls>
                        <source src={URL.createObjectURL(new Blob([new Uint8Array(son.son_data.data)], { type: 'audio/mpeg' }))} type="audio/mpeg" />
                        Votre navigateur ne supporte pas l'élément audio.
                    </audio>
                    <br />
                    <input class='reponseUserSound' placeholder='Vos réponses'></input>
                    <br />
                    <br />
                </div>
            ))}
            </div>
            <div>
                <button onClick={setSound}>setSound</button>
                <br />
                <button onClick={checkAnswers}>Vérifier mes réponses</button>
            </div>      
        </div>
    </div>
  );
};

export default Test2;
