import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import IMG from '../IMGbackground/imgbackground';
import Cookies from 'js-cookie';

import TATWSCreator from '../Creator/TATWSCreator/TATWSCreator';
import TTIWSCreator from '../Creator/TTIWSCreator/TTIWSCreator';
import AbaqueWSCreator from '../Creator/AbaqueWSCreator/AbaqueWSCreator';
import LDNWSCreator from '../Creator/LDNWSCreator/LDNWSCreator';
import MBWSCreator from '../Creator/MBWSCreator/MBWSCreator';
import MDNWSCreator from '../Creator/MDNWSCreator/MDNWSCreator';
import STTWSCreator from '../Creator/STTWSCreator/STTWSCreator';

const Test = () => {
    const [infos, setInfos] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [TAT, setTAT] = useState([]);
    const [TTI, setTTI] = useState([]);
    const [MB, setMB] = useState([]);
    const [Abaque, setAbaque] = useState([]);
    const [LDN, setLDN] = useState([]);
    const [STT, setSTT] = useState([]);
    const [MDN, setMDN] = useState([]);

    const [score, setScore] = useState([]);

    const getMBCalledRef = useRef(false);

    useEffect(() => {
        if (!getMBCalledRef.current) {
            testPQ2();
            getMBCalledRef.current = true;
        }
    }, [score]);

    const config = {
        headers: {
            'Authorization': `Bearer ${Cookies.get('JWT')}`
        }
    };

    function testPQ2() {
        console.log("on passe dans testPQ2")
        axios.get("http://51.77.150.97:4000/exercice/getWorksheet", config)
            .then(res => {
                console.log(res)
                if (res.data.length > 0 && res.data[0].data.length > 0) {
                    setInfos(res.data[0].data);

                    res.data[0].data.forEach(item => {
                        switch (item.type) {
                            case "TAT":
                                setTAT(item);
                                break;
                            case "TTI":
                                setTTI(item);
                                break;
                            case "STT":
                                setSTT(item);
                                break;
                            case "abaque":
                                setAbaque(item);
                                break;
                            case "MDN":
                                setMDN(item);
                                break;
                            case "LDN":
                                setLDN(item);
                                break;
                            case "MB":
                                setMB(item);
                                break;
                            default:
                                break;
                        }
                    });

                    setLoaded(true);
                } else {
                    setLoaded(true); // Peut-être setLoaded(false) si vous ne voulez pas considérer cela comme chargé en cas d'absence de données.
                }
            })
            .catch(err => {
                console.log(err);
                setLoaded(true); // Set loaded à true même en cas d'erreur pour éviter de rester dans un état de chargement infini
            });
    }


    function testVraitest() {
        console.log(score)
    }





    const handleMBScoreChange = (newScore) => {
        setScore(prevScore => [...prevScore, newScore]);
    };

    const handleTATScoreChange = (newScore) => {
        setScore(prevScore => [...prevScore, newScore]);

    };

    const handleLDNScoreChange = (newScore) => {
        setScore(prevScore => [...prevScore, newScore]);
    };

    const handleTTIScoreChange = (newScore) => {
        setScore(prevScore => [...prevScore, newScore]);
    };

    const handleAbaqueScoreChange = (newScore) => {
        setScore(prevScore => [...prevScore, newScore]);
    };

    const handleMDNScoreChange = (newScore) => {
        setScore(prevScore => [...prevScore, newScore]);
    };

    const handleSTTScoreChange = (newScore) => {
        setScore(prevScore => [...prevScore, newScore]);
    };





    return (
        <div>
            {loaded && (
                <div>
                    <p>Test de chargements</p>
                    <TATWSCreator exo={TAT} onTATDataChange={handleTATScoreChange}/>
                    <TTIWSCreator exo={TTI} onTTIDataChange={handleTTIScoreChange}/>
                    <AbaqueWSCreator exo={Abaque} onAbaqueDataChange={handleAbaqueScoreChange}/>
                    <LDNWSCreator exo={LDN} onTATDataChange={handleLDNScoreChange} />
                    <MBWSCreator exo={MB} onMBDataChange={handleMBScoreChange}/>
                    <MDNWSCreator exo={MDN} onMDNDataChange={handleMDNScoreChange}/>
                    <STTWSCreator exo={STT} onSTTDataChange={handleSTTScoreChange}/>
                </div>
            )}
            <div>
                <button id="testVraitest" onClick={testVraitest}>test fonctionnalitée</button>
            </div>
        </div>
    );
};

export default Test;
