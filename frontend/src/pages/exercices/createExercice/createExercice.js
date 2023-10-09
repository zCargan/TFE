import React, { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import Mathematics from '../mathematics/mathematics';
import French from '../french/french';
import English from '../english/english';
import Eveil from '../eveil/eveil';
import Neederlands from '../neederlands/neederlands';
import { useNavigate } from 'react-router-dom';
import { addExercice } from '../../../features/userSlice';
import { store } from '../../../features/userSlice'


const CreateExercice = () => {

    const [selectedOption, setSelectedOption] = useState('');
    const [colonne, setColonne] = useState(0);
    const [ligne, setLigne] = useState(0);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {

    });

    const exerciceRedux = useSelector(state => state)

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

    function valider() {
        console.log(exerciceRedux)
    }

    return (
        <div>
            <div>
                <h1>Création d'exercice</h1>
            </div>
            <div>
                <p>Niveau scolaire de l'exercice</p>
                <select>
                    <option>1ère année primaire</option>
                    <option>2ème année primaire</option>
                    <option>3ème année primaire</option>
                    <option>4ème année primaire</option>
                    <option>5ème année primaire</option>
                    <option>6ème année primaire</option>
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
            </div>
            <br></br>
            <div>
                <p>
                    test
                </p>
                <p>
                    Test2
                </p>
            </div>
            <div id="valideExercice">
                <button onClick={valider}>Valider les exercices</button>
            </div>
        </div>
    );
};

export default CreateExercice;