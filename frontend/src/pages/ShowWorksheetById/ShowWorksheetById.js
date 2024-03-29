import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';

import './ShowWorksheetById.css'

import TATWSCreator from '../../components/Creator/TATWSCreator/TATWSCreator';
import TTIWSCreator from '../../components/Creator/TTIWSCreator/TTIWSCreator';
import AbaqueWSCreator from '../../components/Creator/AbaqueWSCreator/AbaqueWSCreator';
import LDNWSCreator from '../../components/Creator/LDNWSCreator/LDNWSCreator';
import MBWSCreator from '../../components/Creator/MBWSCreator/MBWSCreator';
import MDNWSCreator from '../../components/Creator/MDNWSCreator/MDNWSCreator';
import STTWSCreator from '../../components/Creator/STTWSCreator/STTWSCreator';

const ShowWorksheetById = () => {

    const [infos, setInfos] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [TAT, setTAT] = useState([]);
    const [TTI, setTTI] = useState([]);
    const [MB, setMB] = useState([]);
    const [Abaque, setAbaque] = useState([]);
    const [LDN, setLDN] = useState([]);
    const [STT, setSTT] = useState([]);
    const [MDN, setMDN] = useState([]);
    const [name, setName] = useState();
    const [anneeScolaire, setAnneeScolaire] = useState();
    const [descriptionWorksheet, setDescriptionWorksheet] = useState();

    const [score, setScore] = useState([]);


    const [component, setComponent] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const exo = params.get('parametre');
    const typeValue = params.get('type');
    const getMBCalledRef = useRef(false);


    useEffect(() => {
        if (!getMBCalledRef.current) {
            testPQ3();
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
        axios.get("https://www.laclassedemadameseverine.be:4000/exercice/getWorksheet", config)
            .then(res => {
                console.log(res.data[0])
                if (res.data.length > 0 && res.data[0].data.length > 0) {
                    setInfos(res.data[0].data);

                    res.data[0].data.forEach(item => {
                        switch (item.type) {
                            case "TAT":
                                setTAT(prevState => [...prevState, item]);
                                break;
                            case "TTI":
                                setTTI(prevState => [...prevState, item]);
                                break;
                            case "STT":
                                setSTT(prevState => [...prevState, item]);
                                break;
                            case "abaque":
                                setAbaque(prevState => [...prevState, item]);
                                break;
                            case "MDN":
                                setMDN(prevState => [...prevState, item]);
                                break;
                            case "LDN":
                                setLDN(prevState => [...prevState, item]);
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
                    setLoaded(true);
                }
            })
            .catch(err => {
                console.log(err);
                setLoaded(true); 
            });
    }

    function testPQ3() {
        console.log("on passe dans testPQ2")
        axios.get(`https://www.laclassedemadameseverine.be:4000/exercice/getWS/${exo}`, config)
            .then(res => {
                console.log(res.data)
                setName(res.data.nom)
                setDescriptionWorksheet(res.data.descriptionWorksheet)
                setAnneeScolaire(res.data.anneeScolaire)
                console.log(res.data.data)
                console.log(res.data.data)
                setInfos(res.data.data);

                res.data.data.forEach(item => {
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


                // res.data.data.forEach(item => {
                //     switch (item.type) {
                //         case "TAT":
                //             setTAT(prevState => [...prevState, item]);
                //             break;
                //         case "TTI":
                //             setTTI(prevState => [...prevState, item]);
                //             break;
                //         case "STT":
                //             setSTT(prevState => [...prevState, item]);
                //             break;
                //         case "abaque":
                //             setAbaque(prevState => [...prevState, item]);
                //             break;
                //         case "MDN":
                //             setMDN(prevState => [...prevState, item]);
                //             break;
                //         case "LDN":
                //             setLDN(prevState => [...prevState, item]);
                //             break;
                //         case "MB":
                //             setMB(prevState => [...prevState, item]);
                //             break;
                //         default:
                //             break;
                //     }
                // });


                setLoaded(true);

            })
            .catch(err => {
                console.log(err);
                setLoaded(true); // Set loaded à true même en cas d'erreur pour éviter de rester dans un état de chargement infini
            });
    }


    function testVraitest() {
        var somme = 0;
        for (var i = 0; i < score.length; i++) {
            console.log(score[i])
            somme += score[i];
        }
        var moyenne = somme / score.length;

        console.log(moyenne)

        const config = {
            headers: {
                'Authorization': `Bearer ${Cookies.get('JWT')}`
            }
        }

        const data = {
            type: "WS",
            score: Math.floor(moyenne),
            idExercice: exo
        }

        axios
            .post("https://www.laclassedemadameseverine.be:4000/exercice/registerAnswers", { data }, config)
            .then((res) => {

                console.log(res)

                Swal.fire({
                    title: "Note obtenue",
                    text: "Vous avez obtenu la note de : " + Math.floor(moyenne) + " %",
                    icon: "success",
                    confirmButtonText: "OK"
                }).then(() => {
                    navigate('/home');
                });
            })
            .catch((error) => {
                Swal.fire({
                    title: 'Erreur',
                    text: "Une erreur s'est produite lors de l'enregistrement de votre score",
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 1500
                });
            })
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


    function getWSById() {
        console.log("cliqué ici")
        axios
            .get(`https://www.laclassedemadameseverine.be:4000/exercice/getWS/${exo}`)
            .then((res) =>
                console.log(res.data)
            )
            .catch((error) => console.log(error))
    }

    return (
        <div>
            <Navbar />
            <div>
                <div className='infoWS'>
                    <div>
                        <h1 className='h1WS'>Titre de la feuille d'exercice : {name}</h1>
                    </div>
                    <div>
                        <h3 className='h3WS'>Description de la feuille d'exercice : {descriptionWorksheet}</h3>
                    </div>
                    <div>
                        <h3 className='h3WS'>
                            Année scolaire ciblée : {anneeScolaire}
                            {anneeScolaire === '1' ? 'er' : 'ème'}
                        </h3>
                    </div>
                </div>
                <br />
                {loaded && (
                    <div>
                        <TATWSCreator exo={TAT} onTATDataChange={handleTATScoreChange} />
                        <TTIWSCreator exo={TTI} onTTIDataChange={handleTTIScoreChange} />
                        <AbaqueWSCreator exo={Abaque} onAbaqueDataChange={handleAbaqueScoreChange} />
                        <LDNWSCreator exo={LDN} onTATDataChange={handleLDNScoreChange} />
                        <MBWSCreator exo={MB} onMBDataChange={handleMBScoreChange} />
                        <MDNWSCreator exo={MDN} onMDNDataChange={handleMDNScoreChange} />
                        <STTWSCreator exo={STT} onSTTDataChange={handleSTTScoreChange} />
                    </div>
                )}
                <div>
                    <button className='buttonGlobalCSS' id="testVraitest" onClick={testVraitest}>Corriger mon exercice</button>
                </div>
            </div>
        </div>
    );
};

export default ShowWorksheetById;