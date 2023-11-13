import React, { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import './resultat.css'
import Cookies from 'js-cookie';

import STT from './STT/stt'
import TTI from './TTI/tti'
import LDN from './LDN/ldn'
import TAT from './TAT/tat'
import MDN from './MDN/MDN'
import MB from './MB/MB'
import Abaque from './Abaque/Abaque';

const Resultat = () => {

    const [selectedOption, setSelectedOption] = useState('');
    const [colonne, setColonne] = useState(0);
    const [ligne, setLigne] = useState(0);
  

    const dispatch = useDispatch();

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div>
            <p>Résultat</p>
            <select value={selectedOption} onChange={handleSelectChange}>
                    <option selected>---</option>
                    <option value="STT">STT</option>
                    <option value="TTI">TTI</option>
                    <option value="LDN">LDN</option>
                    <option value="TAT">TAT</option>
                    <option value="MDN">MDN</option>
                    <option value="MB">MB</option>
                    <option value="Abaque">Abaque</option>
                </select>
                {selectedOption === 'STT' && 
                    <STT />
                }
                {selectedOption === 'TTI' && 
                    <TTI />
                }
                {selectedOption === 'LDN' && 
                    <LDN />
                }
                {selectedOption === 'TAT' && 
                    <TAT />
                }
                {selectedOption === 'MDN' && 
                    <MDN />
                }
                {selectedOption === 'MB' && 
                    <MB />
                }
                {selectedOption === 'Abaque' && 
                    <Abaque />
                }
        </div>
    );
};

export default Resultat;