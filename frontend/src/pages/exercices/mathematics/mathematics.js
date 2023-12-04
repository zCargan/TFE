import {React, useState} from 'react';
import Abaque from '../createExercice/abaque';
import MaisonDesNombres from '../createExercice/maisonDesNombres';
import LigneDeNombre from '../createExercice/ligneDeNombre';
const Mathematics = () => {




    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };





    return (
        <div>
            <h1>
                Option mathématique
            </h1>
            <div>
                <select value={selectedOption} onChange={handleSelectChange} >
                    <option selected>---</option>
                    <option value="abaque">Abaque</option>
                    <option value="maisonDesNombres">Maison des nombres</option>
                    <option value="ligneDesNombres">Ligne des nombres</option>
                </select>
                {selectedOption === 'abaque' && 
                    <Abaque />
                }
                {selectedOption === "maisonDesNombres" && 
                    <MaisonDesNombres />
                }
                {selectedOption === "ligneDesNombres" && 
                    <LigneDeNombre />
                }
            </div>
        </div>
        
    );
};

export default Mathematics;