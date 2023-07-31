import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Mathematics from '../mathematics/mathematics';
import French from '../french/french';
import English from '../english/english';
import Eveil from '../eveil/eveil';
import Neederlands from '../neederlands/neederlands';

const CreateExercice = () => {

    const [selectedOption, setSelectedOption] = useState('');
    const [colonne, setColonne] = useState(0);
    const [ligne, setLigne] = useState(0);

    useEffect(() => {

    });

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
            <div>
                <input type="text"></input>
            </div>

        </div>
    );
};

export default CreateExercice;