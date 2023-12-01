import {React, useState} from 'react';

import BlankText from '../createExercice/blankText.js';
import AddImg from './AddImg/addImg.js';
import TextToImg from '../createExercice/textToImg.js';
import MB from '../createExercice/motBazard.js'
import AddSound from './addSound/addSound.js';
import SoundToText from './SoundToText/SoundToText.js';

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
            <br />
            <div>
                <select value={selectedOption} onChange={handleSelectChange} >
                    <option selected>---</option>
                    <option value="BlankText">Texte à trou</option>
                    <option value="TextToImg">Image avec texte</option>
                    <option value="AddImg">Ajouter des photos</option>
                    <option value="MotBazard">Mot bazard</option>
                    <option value="AddSound">Ajouter un son</option>
                    <option value="SoundToText">Exercice lié aux sons</option>
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
                {selectedOption === 'MotBazard' &&
                    <MB />
                }
                {selectedOption === 'AddSound' &&
                    <AddSound />
                }
                {selectedOption === 'SoundToText' &&
                    <SoundToText />
                }
            </div>
        </div>
    );
};

export default French;