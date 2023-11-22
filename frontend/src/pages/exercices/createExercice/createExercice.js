import React, { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import Mathematics from '../mathematics/mathematics';
import French from '../french/french';
import English from '../english/english';
import Eveil from '../eveil/eveil';
import Neederlands from '../neederlands/neederlands';
import { useNavigate } from 'react-router-dom';
import { store } from '../../../features/exerciceSlice'
import axios from 'axios';
import Navbar from '../../../components/navbar/Navbar';
import Resultat from '../resultat/resultat';
import Cookies from 'js-cookie';

const CreateExercice = () => {


    const [selectedOption, setSelectedOption] = useState('');
    const [colonne, setColonne] = useState(0);
    const [ligne, setLigne] = useState(0);
  

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(Cookies.get('JWT')) {
            const config = {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('JWT')}`
                }
            };
    
            axios.post("http://localhost:4000/connection/checkToken", {}, config)
                .then(response => {
                    console.log(response.data.role)
                    if(response.data.role !== "professeur" || '') {
                        navigate('/')
                    }
                
                })
                .catch(error => {
                    console.log(error)
                });
        } else {
            navigate('/')
        }
        
    }, []);



    const exerciceRedux = useSelector(state => (state))

    const handleSelectChange = (event) => {
      setSelectedOption(event.target.value);
    };

    const RepeatVariable = () => {
        const elements = [];
        const numLignes = 5;
        for (var i = 0; i < ligne; i++) {
            for(var j = 0; i < colonne; j++) {
                elements.push(
                    <p>Element x</p>
                )
            }
        }
        return (
            <div>
              {elements}
            </div>
          );
        }

    /*
    function testRedux() {
        dispatch(
            ex({
              test: "test123"
            })
          );
    }
    */

    function valider1exo() {
        console.log(exerciceRedux.user[0])
        axios.post('http://localhost:4000/exercice/send_test_exercice', exerciceRedux.user)
    }

    function valider() {
        // exerciceRedux.user[0].text.reponseInitiale.ligne2[1] ==> e
        // exerciceRedux.user[1].text ==> 
        let nbrExercice = exerciceRedux.user.length
        console.log("exercice redux ")
        console.log(exerciceRedux)
        for(let i = 0; i < nbrExercice; i++) {
            axios.post('http://localhost:4000/exercice/send_test_exercice', exerciceRedux)
            /*
                .then(response => {
                console.log('Réponse du backend :', response.data);
                })
                .catch(error => {
                console.error('Erreur lors de la requête vers le backend :', error);
                });
            console.log(exerciceRedux.user[0])
            */
        }
    }

    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div>
                <h1>Création d'exercice</h1>
            </div>
            <div>
                <p>Niveau scolaire de l'exercice</p>
                <select id="selectSchoolYear">
                    <option value="1">1ère année primaire</option>
                    <option value="2">2ème année primaire</option>
                    <option value="3">3ème année primaire</option>
                    <option value="4">4ème année primaire</option>
                    <option value="5">5ème année primaire</option>
                    <option value="6">6ème année primaire</option>
                </select>
            </div>
            <div>
                <p>Branche scolaire</p>
                <select value={selectedOption} onChange={handleSelectChange}>
                    <option selected>---</option>
                    <option value="mathematique">Mathématique</option>
                    <option value="francais">Français</option>
                    <option value="eveil">Eveil</option>
                    <option value="anglais">Anglais</option>
                    <option value="neerlandais">Néérlandais</option>
                    <option value="resultat">Zone des résultats</option>
                </select>
                {selectedOption === 'mathematique' && 
                    <Mathematics />
                }
                {selectedOption === 'francais' && 
                    <French />
                }
                {selectedOption === 'eveil' && 
                    <Eveil />
                }
                {selectedOption === 'anglais' &&
                    <English />
                }
                {selectedOption === 'neerlandais' && 
                    <Neederlands/>
                }
                {selectedOption === 'resultat' && 
                    <Resultat />
                }
            </div>
            <br></br>
        </div>
    );
};

export default CreateExercice;