import {React, useState} from 'react';

import TexteATrou from './TexteATrou/texteATrou';

const French = () => {

    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const divStyle = {
        backgroundColor: 'red'
      };

    return (
        <div style={divStyle}>
            <p>Exercice de francais</p>
            <div>
                <p>Zone de test</p>
                <p>==========================</p>
            </div>
            <div>
                <p>Type d'exercice</p>
                <select value={selectedOption} onChange={handleSelectChange}>
                    <option value="TexteATrou">Texte à trou</option>
                    <option value="francais">Français</option>
                    <option value="eveil">Eveil</option>
                    <option value="anglais">Anglais</option>
                    <option value="neerlandais">Néérlandais</option>
                </select>
                {selectedOption === 'TexteATrou' && 
                    <TexteATrou />
                }
                
            </div>
        </div>
    );
};

export default French;