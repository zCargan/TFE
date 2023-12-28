import React, { useEffect, useState, useRef } from 'react';
import axios, { all } from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import './STTWSCreator.css'

const STTWSCreator = ({ exo, onSTTDataChange }) => {
  const [sons, setSons] = useState([]);
  const [allResponses, setAllResponses] = useState([]);
  const [nom, setNom] = useState('');
  const [anneeScolaire, setAnneeScolaire] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [id, setId] = useState('');
  const navigate = useNavigate();
  const [reponses, setReponses] = useState("");

  const getMBCalledRef = useRef(false);


  const promessesReponses = [];
  const nouvellesReponses = [];

  useEffect(() => {
    if (!getMBCalledRef.current) {
      getSTT();
      getMBCalledRef.current = true;

      // Attacher l'événement de clic ici après le premier rendu
      const testVraitestElement = document.getElementById("testVraitest");
      if (testVraitestElement) {
        testVraitestElement.addEventListener("click", buttonClicked);
      }
    }
  }, []);


  function getSTT() {
    if (exo.length !== 0) {
      const config = {
        headers: {
          'Authorization': `Bearer ${Cookies.get('JWT')}`,
          'Content-Type': 'application/json'
        }
      };

      console.log(exo.reponses)


      const cles = Object.keys(exo.reponses);




      for (let i = 0; i < cles.length; i++) {

        console.log(exo.reponses[cles[i]])

        nouvellesReponses.push(exo.reponses[cles[i]])

        const promesseReponse = axios.get(`http://51.77.150.97:4000/exercice/getSTT/${cles[i]}`, config)
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

      setReponses(nouvellesReponses)
    }
  }



  const buttonClicked = () => {
    if (exo.length !== 0) {
      let inputUser = document.getElementsByClassName('inputUserSTT')
      let reponseUser = []
      for (let i = 0; i < inputUser.length; i++) {
        reponseUser.push(inputUser[i].value)
      }

      let score = 0;
      let nbrExos = 0;


      for (let j = 0; j < reponseUser.length; j++) {
        console.log(nouvellesReponses[j])
        console.log(reponseUser[j])
        if (nouvellesReponses[j] === reponseUser[j]) {
          score += 1;
        }
        nbrExos += 1;
      }
      console.log(score)
      console.log(nbrExos)
      onSTTDataChange((score / nbrExos) * 100);
    }
  }



  return (
    <div>
      {exo.length !== 0 ? (
        <div className='divShowWorksheet' id="STTWSCreator">
          <p id="description">{exo.description}</p>
          <br />
          <div id="zoneExoSon" style={{ display: 'flex', flexDirection: 'row', gap: '10px', justifyContent: 'center' }}>
            {sons.map((son, index) => (
              <div key={index} style={{ marginRight: '10px' }}>
                <p>Son {index + 1}</p>
                {son.son_data.data ? (
                  <audio controls>
                    <source
                      src={URL.createObjectURL(new Blob([new Uint8Array(son.son_data.data)], { type: 'audio/mpeg' }))}
                      type="audio/mpeg"
                    />
                    Votre navigateur ne supporte pas l'élément audio.
                  </audio>
                ) : <div><p>Aucun fichier trouvé</p></div>}
                <br />
                <br />
                <input placeholder='Votre réponse' id={son.name} class="inputUserSTT"></input>
                <br />
                <br />
              </div>
            ))}
          </div>
          <br />
        </div>
      ) : (
        <div>
        </div>
      )}
    </div>
  );


};

export default STTWSCreator;