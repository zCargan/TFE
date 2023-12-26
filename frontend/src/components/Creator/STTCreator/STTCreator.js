import React, { useEffect, useState } from 'react';
import axios, { all } from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import './STTCreator.css'

const STTCreator = ({ exo }) => {
  const [sons, setSons] = useState([]);
  const [allResponses, setAllResponses] = useState([]);
  const [nom, setNom] = useState('');
  const [anneeScolaire, setAnneeScolaire] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [id, setId] = useState('');
  const navigate = useNavigate();
  const [reponses, setReponses] = useState("");

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
      .get(`http://backendContainer:4000/exercice/getSTTexo/${exo}`, config)
      .then((res) => {
        setId(res.data._id);
        setNom(res.data.nom);
        setAnneeScolaire(res.data.anneeScolaire);
        setDescription(res.data.description);
        setType(res.data.type);
        let reponses = res.data.reponses;

        setReponses(Object.values(reponses))

        const cles = Object.keys(reponses);

        const promessesReponses = [];
        const nouvellesReponses = [];

        for (let i = 0; i < cles.length; i++) {

          nouvellesReponses.push(reponses[cles[i]]);

          setAllResponses([...nouvellesReponses]);

          const promesseReponse = axios.get(`http://backendContainer:4000/exercice/getSTT/${cles[i]}`, config)
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
    for (let i = 0; i < inputUser.length; i++) {
      reponseUser.push(inputUser[i].value)
    }

    let score = 0;
    let nbrExos = 0;

    console.log(allResponses)

    for (let j = 0; j < reponseUser.length; j++) {
      if (allResponses[j] === reponseUser[j]) {
        score += 1;
      }
      nbrExos += 1;
    }


    const data = {
      type: "STT",
      score: Math.floor((score / nbrExos) * 100),
      idExercice: id
    }

    Swal.fire({
      title: 'Résultat',
      text: 'Vous avez obtenu la note de : ' + (score / nbrExos) * 100 + "%",
      icon: 'success',
      showConfirmButton: false,
      timer: 2000
    });

    axios
      .post("http://backendContainer:4000/exercice/registerAnswers", { data }, config)
      .then((res) => {
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      })
      .catch((error) => {
        Swal.fire({
          title: 'Erreur',
          text: "Une erreur s'est produite lors de l'enregistrement de votre score",
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        });
      })
  }



  function seeCorrection() {
    let inputUser = document.getElementsByClassName('inputUserSTT')
    for (let i = 0; i < inputUser.length; i++) {
      inputUser[i].value = reponses[i]
    }
    Swal.fire({
      text: "Voici la correction de l'exercice",
      icon: 'success',
      showConfirmButton: false,
      timer: 1100
    });
    document.getElementById('buttonCorrection').style.display = 'none';
  }


  return (
    <div id="div_stt">
      <h3>{nom}</h3>
      <p id="description">{description}</p>
      <br />
      <div id="zoneExoSon" style={{ display: 'flex', flexDirection: 'row', gap: '10px', justifyContent: 'center' }}>
        {sons.map((son, index) => (
          <div key={index} style={{ marginRight: '10px' }}>
            <p>Son {index + 1}</p>
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
        <button onClick={ValiderMesReponses} id="buttonCorrection">Valider mes réponses</button>
        <br />
        <button onClick={seeCorrection}>Voir la correction</button>
      </div>
    </div>
  );
};

export default STTCreator;