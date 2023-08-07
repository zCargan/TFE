import {React, useState} from 'react';

import BlankText from './BlankText/blankText';
import AddImg from './AddImg/addImg.js';
import TextToImg from './TextToImg/textToImg';

const French = () => {

    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const divStyle = {
        backgroundColor: 'lightblue'
      };

    return (
        <div style={divStyle}>
            <p>Exercice de francais</p>
            <div>
                <p>Type d'exercice</p>
                <select value={selectedOption} onChange={handleSelectChange} >
                    <option selected>---</option>
                    <option value="BlankText">Texte à trou</option>
                    <option value="TextToImg">Image avec texte</option>
                    <option value="AddImg">Ajouter des photos</option>
                </select>
                {selectedOption === 'BlankText' && 
                    <BlankText />
                }
                {selectedOption === 'AddImg' &&
                    <AddImg />
                }
                {selectedOption === 'TextToImg' &&
                    <TextToImg />
                }
            </div>
        </div>
    );
};

export default French;