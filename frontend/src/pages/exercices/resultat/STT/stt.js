import React, { useEffect, useState } from 'react';
import axios, { all } from 'axios';
import Cookies from 'js-cookie';
import './stt.css'

const STT = () => {
  const [sons, setSons] = useState([]);
  const [allResponses, setAllResponses] = useState([]);
  const [nom, setNom] = useState('');
  const [anneeScolaire, setAnneeScolaire] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    getSTT();
  }, [])
  
  function getSTT() {
    const config = {
      headers: {
        'Authorization': `Bearer ${Cookies.get('JWT')}`,
        'Content-Type': 'application/json'
      }
    };

    axios
      .get('http://localhost:4000/exercice/getSTT', {}, config)
      .then((res) => {
        setId(res.data[0]._id);
        setNom(res.data[0].nom);
        setAnneeScolaire(res.data[0].anneeScolaire);
        setDescription(res.data[0].description);
        setType(res.data[0].type);
        let reponses = res.data[0].reponses;
        const cles = Object.keys(reponses);

        const promessesReponses = [];
        const nouvellesReponses = [];

        for (let i = 0; i < cles.length; i++) {
          
          nouvellesReponses.push(reponses[cles[i]]);

          setAllResponses([...nouvellesReponses]);

          const promesseReponse = axios.get(`http://localhost:4000/exercice/getSTT/${cles[i]}`, config)
            .then((nestedRes) => {
              return nestedRes.data[0];
            })
            .catch((error) => {
              console.log(error);
              return null;
            });

          promessesReponses.push(promesseReponse);
        }

        Promise.all(promessesReponses)
          .then((nouvellesReponses) => {
            const reponsesFiltrees = nouvellesReponses.filter((reponse) => reponse !== null);

            setSons(reponsesFiltrees);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function ValiderMesReponses() {

    const config = {
      headers: {
        'Authorization': `Bearer ${Cookies.get('JWT')}`,
        'Content-Type': 'application/json'
      }
    };

    let inputUser = document.getElementsByClassName('inputUserSTT')
    let reponseUser = []
    for(let i = 0; i < inputUser.length; i ++) {
      reponseUser.push(inputUser[i].value)
    }

    let score = 0;
    let nbrExos = 0;

    for(let j = 0; j < reponseUser.length; j ++) {
      if(allResponses[j] === reponseUser[j]) {
        score += 1;
      }
      nbrExos += 1;
    }
    console.log(allResponses)
    console.log(score/nbrExos);

    const data = {
      type: "STT",
      score: Math.floor((score/nbrExos) * 100),
      idExercice: id
    }

    axios.post("http://localhost:4000/exercice/registerAnswers", {data}, config)
  }

  return (
    <div id="div_stt">
      <h3>{nom}</h3>
      <p id="description">{description}</p>
      <br />
      <div id="zoneExoSon" style={{ display: 'flex', flexDirection: 'row', gap: '10px', justifyContent: 'center' }}>
        {sons.map((son, index) => (
          <div key={index} style={{ marginRight: '10px' }}>
            <p>Son {index +1}</p>
            <audio controls>
              <source src={URL.createObjectURL(new Blob([new Uint8Array(son.son_data.data)], { type: 'audio/mpeg' }))} type="audio/mpeg" />
              Votre navigateur ne supporte pas l'élément audio.
            </audio>
            <br />
            <br />
            <input placeholder='Votre réponse' id={son.name} class="inputUserSTT"></input>
            <br />
            <br />
          </div>
        ))}
      </div>
      <br />
      <div>
        <button onClick={ValiderMesReponses}>Valider mes réponses</button>
      </div>
    </div>
  );
};

export default STT;
