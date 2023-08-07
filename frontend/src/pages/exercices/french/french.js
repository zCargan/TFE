import {React, useState} from 'react';

import BlankText from './BlankText/blankText';
import TextLinkImage from './TextLinkImage/textLinkImage';


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
                    <option value="TexteATrou">Texte à trou</option>
                    <option value="TextLinkImage">Texte avec images</option>
                </select>
                {selectedOption === 'TexteATrou' && 
                    <BlankText />
                }
                {selectedOption === 'TextLinkImage' &&
                    <TextLinkImage />
                }
            </div>
        </div>
    );
};

export default French;