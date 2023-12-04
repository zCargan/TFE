import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

import MBCreator from '../../components/Creator/MBCreator/MBCreator';
import MDNCreator from '../../components/Creator/MDNCreator/MDNCreator';
import TATCreator from '../../components/Creator/TATCreator/TATCreator';
import AbaqueCreator from '../../components/Creator/AbaqueCreator/AbaqueCreator'
import LDNCreator from '../../components/Creator/LDNCreator/LDNCreator';
import STTCreator from '../../components/Creator/STTCreator/STTCreator';
import TTICreator from '../../components/Creator/TTICreator/TTICreator';

const ShowExercice = () => {
    const [component, setComponent] = useState(null);
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const exo = params.get('parametre');
    const typeValue = params.get('type');
    const getMBCalledRef = useRef(false);
    const config = {
        headers: {
            'Authorization': `Bearer ${Cookies.get('JWT')}`
        }
    };

    useEffect(() => {
        if (!getMBCalledRef.current) {
            getExosById();
            getMBCalledRef.current = true;
        }
        console.log(exo)
    }, []);

    function getExosById() {
        switch (typeValue) {
            case 'MB':
                setComponent(<MBCreator exo={exo} />);
                break;
            case 'MDN':
                setComponent(<MDNCreator exo={exo} />);
                break;
            case 'abaque':
                setComponent(<AbaqueCreator exo={exo} />);
                break;
            case 'LDN':
                setComponent(<LDNCreator exo={exo} />);
                break;
            case 'STT':
                setComponent(<STTCreator exo={exo} />);
                break;
            case 'TAT':
                setComponent(<TATCreator exo={exo} />);
                break;
            case 'TTI':
                setComponent(<TTICreator exo={exo} />);
                break;
            default:
                setComponent(null);
                break;
        }
    }

    return (
        <div>
            <Navbar />
            {component}
        </div>
    );
};

export default ShowExercice;
