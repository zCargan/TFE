import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';
import Cookies from 'js-cookie';

import './infoExercice.css'

import TATWSCreator from '../../components/Creator/TATWSCreator/TATWSCreator';
import TTIWSCreator from '../../components/Creator/TTIWSCreator/TTIWSCreator';
import AbaqueWSCreator from '../../components/Creator/AbaqueWSCreator/AbaqueWSCreator';
import LDNWSCreator from '../../components/Creator/LDNWSCreator/LDNWSCreator';
import MBWSCreator from '../../components/Creator/MBWSCreator/MBWSCreator';
import MDNWSCreator from '../../components/Creator/MDNWSCreator/MDNWSCreator';
import STTWSCreator from '../../components/Creator/STTWSCreator/STTWSCreator';

import MBWSCreatorCorrection from '../../components/Creator/MBWSCreatorCorrection/MBWSCreatorCorrection';
import TATWSCreatorCorrection from '../../components/Creator/TATWSCreatorCorrection/TATWSCreatorCorrection';
import TTIWSCreatorCorrection from '../../components/Creator/TTIWSCreatorCorrection/TTIWSCreatorCorrection';
import AbaqueWSCreatorCorrection from '../../components/Creator/AbaqueWSCreatorCorrection/AbaqueWSCreatorCorrection';
import LDNWSCreatorCorrection from '../../components/Creator/LDNWSCreatorCorrection/LDNWSCreatorCorrection';
import MDNWSCreatorCorrection from '../../components/Creator/MDNWSCreatorCorrection/MDNWSCreatorCorrection';
import STTWSCreatorCorrection from '../../components/Creator/STTWSCreatorCorrection/STTWSCreatorCorrection';

const InfoExercice = () => {
    const location = useLocation();
    const { state } = location;
    const { id } = state;
    const { type } = state;

    const getMBCalledRef = useRef(false);
    const [score, setScore] = useState([]);
    const [sons, setSons] = useState([]);
    const [allResponses, setAllResponses] = useState([]);
    const [name, setName] = useState("/");
    const [annee, setAnnee] = useState("/");
    const [description, setDescription] = useState("/");
    const [reponsesInitiales, setReponsesInitiales] = useState("/")
    const [reponseAttendues, setReponsesAttendues] = useState("/")
    const [reponses, setReponses] = useState("/")
    const [arrayMotBonOrdre, setArrayMotBonOrdre] = useState([]);
    const [infos, setInfos] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [TAT, setTAT] = useState([]);
    const [TTI, setTTI] = useState([]);
    const [MB, setMB] = useState([]);
    const [Abaque, setAbaque] = useState([]);
    const [LDN, setLDN] = useState([]);
    const [STT, setSTT] = useState([]);
    const [MDN, setMDN] = useState([]);


    useEffect(() => {
        if (!getMBCalledRef.current) {
            showDetails();
            getMBCalledRef.current = true;
        }

    }, []);



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

    function showDetails() {
        const config = {
            headers: {
                'Authorization': `Bearer ${Cookies.get('JWT')}`
            }
        };
        const data = {
            idExo: id,
            typeExo: type
        }
        if (type === "TTI") {
            TTIdetails(config, data)
        } else if (type === "MB") {
            MBdetails(config, data)
        } else if (type === "LDN") {
            LDNdetails(config, data)
        } else if (type === "STT") {
            STTdetails(config, data)
        } else if (type === "abaque") {
            Abaquedetails(config, data)
        } else if (type === "TAT") {
            TATdetails(config, data)
        } else if (type === "MDN") {
            MDNdetails(config, data)
        } else if (type === "WS") {
            WSdetails(config, data)
        }

    }

    // ========================== Partie TTI ==========================

    function TTIdetails(config, data) {
        axios
            .get(`http://51.77.150.97:4000/exercice/getDetailsExos`, { params: data, headers: config.headers })
            .then((res) => {
                setName(res.data.exerciceInfos.nom)
                setAnnee(res.data.exerciceInfos.anneeScolaire)
                setDescription(res.data.exerciceInfos.description)

                setReponses(res.data.exerciceInfos.reponses)
                const valeurDesCles = Object.values(res.data.exerciceInfos.reponses);
                let cles = Object.keys(res.data.exerciceInfos.reponses);
                console.log(cles)
                for (let i = 0; i < cles.length; i++) {
                    axios
                        .get(`http://51.77.150.97:4000/photos/getImage/${cles[i]}`, config)
                        .then((res) => {
                            const imageContainer = document.getElementById('infoAvecCorrection');
                            imageContainer.style.display = 'flex';
                            imageContainer.style.flexWrap = 'wrap'; // Permettre le retour à la ligne si nécessaire
                            imageContainer.style.justifyContent = 'center'; // Centrez horizontalement
                            for (let j = 0; j < res.data.length; j++) {
                                const imageBinaryData = res.data[j].image_data.data;
                                const blob = new Blob([new Uint8Array(imageBinaryData)], { type: res.data[j].type_mime });
                                const objectURL = URL.createObjectURL(blob);

                                const imageInputContainer = document.createElement('div');
                                imageInputContainer.style.margin = '20px';
                                imageInputContainer.style.textAlign = 'center';
                                imageInputContainer.style.display = 'flex';
                                imageInputContainer.style.flexDirection = 'column';

                                const imageElement = document.createElement('img');
                                imageElement.src = objectURL;
                                imageElement.style.width = '200px';
                                imageElement.style.height = '200px';

                                const headingElement = document.createElement('h4');
                                headingElement.innerText = valeurDesCles[i];
                                headingElement.style.marginTop = '10px';

                                imageInputContainer.appendChild(imageElement);
                                imageInputContainer.appendChild(headingElement);
                                imageContainer.appendChild(imageInputContainer);
                            }



                            const imageContainer2 = document.getElementById('infoSansCorrection');
                            imageContainer2.style.display = 'flex';
                            imageContainer2.style.flexWrap = 'wrap'; // Permettre le retour à la ligne si nécessaire
                            imageContainer2.style.justifyContent = 'center'; // Centrez horizontalement
                            for (let j = 0; j < res.data.length; j++) {
                                const imageBinaryData = res.data[j].image_data.data;
                                const blob = new Blob([new Uint8Array(imageBinaryData)], { type: res.data[j].type_mime });
                                const objectURL = URL.createObjectURL(blob);

                                const imageInputContainer = document.createElement('div');
                                imageInputContainer.style.margin = '20px';
                                imageInputContainer.style.textAlign = 'center'; // Centrer le contenu
                                imageInputContainer.style.display = 'flex'; // Conteneur en colonne
                                imageInputContainer.style.flexDirection = 'column'; // Alignement en colonne

                                const imageElement = document.createElement('img');
                                imageElement.src = objectURL;
                                imageElement.style.width = '200px';
                                imageElement.style.height = '200px';

                                imageInputContainer.appendChild(imageElement);
                                imageContainer2.appendChild(imageInputContainer);
                            }

                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
            }
            )
            .catch((error) => {
                console.log(error);
            });
    }

    // ========================== Partie MB ==========================

    function MBdetails(config, data) {
        axios
            .get(`http://51.77.150.97:4000/exercice/getDetailsExos`, { params: data, headers: config.headers })
            .then((res) => {
                setName(res.data.exerciceInfos.nom)
                setAnnee(res.data.exerciceInfos.anneeScolaire)
                setDescription(res.data.exerciceInfos.description)

                setReponses(res.data.exerciceInfos.reponses)
                const valeurDesCles = Object.values(res.data.exerciceInfos.reponses);
                let cles = Object.keys(res.data.exerciceInfos.reponses);

                for (let i = 0; i < cles.length; i++) {
                    axios
                        .get(`http://51.77.150.97:4000/photos/getImage/${cles[i]}`, config)
                        .then((res) => {
                            console.log(valeurDesCles[i])
                            const imageContainer = document.getElementById('infoAvecCorrection');
                            imageContainer.style.display = 'flex';
                            imageContainer.style.flexWrap = 'wrap'; // Permettre le retour à la ligne si nécessaire
                            imageContainer.style.justifyContent = 'center'; // Centrez horizontalement
                            for (let j = 0; j < res.data.length; j++) {
                                const imageBinaryData = res.data[j].image_data.data;
                                const blob = new Blob([new Uint8Array(imageBinaryData)], { type: res.data[j].type_mime });
                                const objectURL = URL.createObjectURL(blob);

                                const imageInputContainer = document.createElement('div');
                                imageInputContainer.style.margin = '20px';
                                imageInputContainer.style.textAlign = 'center';
                                imageInputContainer.style.display = 'flex';
                                imageInputContainer.style.flexDirection = 'column';

                                const imageElement = document.createElement('img');
                                imageElement.src = objectURL;
                                imageElement.style.width = '200px';
                                imageElement.style.height = '200px';

                                const headingElement = document.createElement('h4');
                                const reponse = valeurDesCles[i].map(lettre => lettre.toUpperCase()).join('');
                                headingElement.innerText = reponse;
                                headingElement.style.marginTop = '10px';

                                imageInputContainer.appendChild(imageElement);
                                imageInputContainer.appendChild(headingElement);
                                imageContainer.appendChild(imageInputContainer);
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
                document.getElementById('infosSansCorrection').style.display = 'none';
            }
            )
            .catch((error) => {

            })
    }

    // ========================== Partie LDN ==========================

    function LDNdetails(config, data) {
        axios
            .get(`http://51.77.150.97:4000/exercice/getDetailsExos`, { params: data, headers: config.headers })
            .then((res) => {
                let resultatAttendu = res.data.exerciceInfos.reponseFinale
                setName(res.data.exerciceInfos.nom)
                setAnnee(res.data.exerciceInfos.anneeScolaire)
                setDescription(res.data.exerciceInfos.description)
                setReponses(resultatAttendu)

                console.log(resultatAttendu)

                let length = res.data.exerciceInfos.reponseFinale.length;
                let enonceIndex = res.data.exerciceInfos.reponseInitiale;
                let direction = res.data.exerciceInfos.direction

                console.log(direction)

                let texte = String("<div id='ligneDuTemps'><table><tbody>")

                if (direction === "G") {
                    texte += '◀'
                    for (let i = 0; i < length; i++) {
                        texte += String("<input id='" + (i + 1) + "' class='inputUserAnswer' value='" + enonceIndex[i] + "'></input>");
                    }
                    texte += String("</tbody></table></div>");
                } else {
                    for (let i = 0; i < length; i++) {
                        texte += String("<input id='" + (i + 1) + "' class='inputUserAnswer' value='" + enonceIndex[i] + "'></input>");
                    }
                    texte += '▶'
                    texte += String("</tbody></table></div>");
                }

                let texte2 = String("<div id='ligneDuTemps'><table><tbody>")

                if (direction === "G") {
                    texte2 += '◀'
                    for (let i = 0; i < length; i++) {
                        texte2 += String("<input id='" + (i + 1) + "' class='inputUserAnswer' value='" + resultatAttendu[i] + "'></input>");
                    }
                    texte2 += String("</tbody></table></div>");
                } else {
                    for (let i = 0; i < length; i++) {
                        texte2 += String("<input id='" + (i + 1) + "' class='inputUserAnswer' value='" + resultatAttendu[i] + "'></input>");
                    }
                    texte2 += '▶'
                    texte2 += String("</tbody></table></div>");
                }

                document.getElementById("infoSansCorrection").innerHTML = texte
                document.getElementById("infoAvecCorrection").innerHTML = texte2
            })
            .catch((error) => {
                console.log(error)
            })
    }

    // ========================== Partie STT ==========================

    function STTdetails(config, data) {
        axios
            .get(`http://51.77.150.97:4000/exercice/getDetailsExos`, { params: data, headers: config.headers })
            .then((res) => {
                console.log(res.data.exerciceInfos)
                setName(res.data.exerciceInfos.nom)
                setAnnee(res.data.exerciceInfos.anneeScolaire)
                setDescription(res.data.exerciceInfos.description)
                let reponses = res.data.exerciceInfos.reponses;

                setReponses(Object.values(reponses))

                const cles = Object.keys(reponses);

                const promessesReponses = [];
                const nouvellesReponses = [];

                for (let i = 0; i < cles.length; i++) {

                    nouvellesReponses.push(reponses[cles[i]]);

                    setAllResponses([...nouvellesReponses]);

                    const promesseReponse = axios.get(`http://51.77.150.97:4000/exercice/getSTT/${cles[i]}`, config)
                        .then((nestedRes) => {
                            return nestedRes.data[0];
                        })
                        .catch((error) => {
                            console.log(error);
                            return null;
                        });

                    promessesReponses.push(promesseReponse);
                }

                Promise.all(promessesReponses)
                    .then((nouvellesReponses) => {
                        const reponsesFiltrees = nouvellesReponses.filter((reponse) => reponse !== null);

                        setSons(reponsesFiltrees);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {

            })
        document.getElementById('infosSansCorrection').style.display = 'none';

    }

    // ========================== Partie Abaque ==========================

    function Abaquedetails(config, data) {
        axios
            .get(`http://51.77.150.97:4000/exercice/getDetailsExos`, { params: data, headers: config.headers })
            .then((res) => {

                let reponseInitiale = res.data.exerciceInfos.reponseInitiale;
                let reponseFinale = res.data.exerciceInfos.reponseFinale;
                let hauteur = res.data.exerciceInfos.hauteur;
                let longueur = res.data.exerciceInfos.longueur;

                console.log(res.data.exerciceInfos)
                setName(res.data.exerciceInfos.nom)
                setAnnee(res.data.exerciceInfos.anneeScolaire)
                setDescription(res.data.exerciceInfos.description)

                let texte = String("<div id='abaqueFromDB'><table><tbody>");
                let texte2 = String("<div><table><tbody>");
                let k = 0;
                for (let i = 0; i < hauteur; i++) {
                    for (let j = 0; j < longueur; j++) {
                        texte += "<input placeholder='valeur ici' class='test'" + " value='" + reponseInitiale[k] + "'></input>"
                        texte2 += "<input placeholder='valeur ici' class='test'" + " value='" + reponseFinale[k] + "'></input>"

                        k += 1;
                    }
                    texte += "<br></br>"
                    texte2 += "<br></br>"
                }
                texte += "</div>"
                texte2 += "</div>"



                document.getElementById("infoSansCorrection").innerHTML = texte;
                document.getElementById("infoAvecCorrection").innerHTML = texte2;
            })
            .catch((error) => { })
    }

    // ========================== Partie TAT ==========================

    function TATdetails(config, data) {
        axios
            .get(`http://51.77.150.97:4000/exercice/getDetailsExos`, { params: data, headers: config.headers })
            .then((res) => {
                let reponsesFromDB = []

                let string = "";
                let string2 = "";

                let length = res.data.exerciceInfos.reponseFinale.length;
                let reponseInitiale = res.data.exerciceInfos.reponseFinale;
                let reponseFinale = res.data.exerciceInfos.reponseInitiale;
                console.log(res.data.exerciceInfos)
                setName(res.data.exerciceInfos.nom)
                setAnnee(res.data.exerciceInfos.anneeScolaire)
                setDescription(res.data.exerciceInfos.description)
                for (let i = 0; i < length; i++) {
                    if (reponseInitiale[i] !== "inputUserExercice") {
                        string += reponseInitiale[i]
                        string += " "
                    } else {
                        string += " <input class='inputTATuser'></input> "
                        reponsesFromDB.push(reponseFinale[i])
                    }
                    string2 += reponseFinale[i]
                    string2 += " "
                }

                setReponses(reponsesFromDB)

                document.getElementById("infoSansCorrection").innerHTML = string
                document.getElementById("infoAvecCorrection").innerHTML = string2
            })
            .catch((error) => {
                console.log(error)
            })
    }

    // ========================== Partie MDN ==========================

    function MDNdetails(config, data) {
        axios
            .get(`http://51.77.150.97:4000/exercice/getDetailsExos`, { params: data, headers: config.headers })
            .then((res) => {

                let length = res.data.exerciceInfos.cols
                let reponseInitiale = res.data.exerciceInfos.reponseInitiale
                let reponseFinale = res.data.exerciceInfos.reponseFinal

                console.log(reponseFinale)
                setName(res.data.exerciceInfos.nom)
                setAnnee(res.data.exerciceInfos.anneeScolaire)
                setDescription(res.data.exerciceInfos.description)

                let texte = "<div id='mdn_resulat'>";
                let texte2 = "<div>";

                let score = 0;
                for (let i = 0; i < length; i++) {
                    texte += '<input class="answerUser" value=' + reponseInitiale[score] + '>' + '</input><input class="answerUser" value="' + reponseInitiale[score + 1] + '"></input>'
                    texte2 += '<input class="answerUser" value=' + reponseFinale[score] + '>' + '</input><input class="answerUser" value="' + reponseFinale[score + 1] + '"></input>'

                    texte += "<br></br>"
                    texte2 += "<br></br>"

                    score += 2;
                }

                texte += "</div>"
                texte2 += "</div>"

                document.getElementById("infoSansCorrection").innerHTML = texte
                document.getElementById("infoAvecCorrection").innerHTML = texte2

            })
            .catch((error) => {

            })
    }

    // ========================== Partie WS ==========================

    function WSdetails(config, data) {
        axios
            .get(`http://51.77.150.97:4000/exercice/getDetailsExos`, { params: data, headers: config.headers })
            .then((res) => {
                console.log(res.data.exerciceInfos.data)
                setName(res.data.exerciceInfos.nom)
                setAnnee(res.data.exerciceInfos.anneeScolaire)
                setDescription(res.data.exerciceInfos.descriptionWorksheet)
                res.data.exerciceInfos.data.forEach(item => {
                    console.log(item)
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
                })
                setLoaded(true);
            })
            .catch(err => {
                console.log(err);
                setLoaded(true); // Set loaded à true même en cas d'erreur pour éviter de rester dans un état de chargement infini
            });

    }

    function efezczczc() {
        setLoaded(!loaded);
        console.log(loaded)
    }

    return (
        <div>
            <Navbar></Navbar>
            <div className="exercise-details">
                <p><span className='pInfoExercice'>Nom de l'exercice</span>  : <span className='infoData'>{name}</span></p>
                <p><span className='pInfoExercice'>Année scolaire visée</span>  : <span className='infoData'>{annee}</span></p>
                <p><span className='pInfoExercice'>Description</span>  : <span className='infoData'>{description}</span></p>
            </div>
            <div className="zoneSC">
                <h3 id="infosSansCorrection" className='h3ie'>Exercice vierge</h3>
                <div>
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
                </div>
                <div id="infoSansCorrection"></div>
            </div>

            <div className="zoneAC">
                <h3 className='h3ie'>Exercice corrigé</h3>
                <div>
                    {loaded && (
                        <div>
                            <TATWSCreatorCorrection exo={TAT} onTATDataChange={handleTATScoreChange} />
                            <TTIWSCreatorCorrection exo={TTI} onTTIDataChange={handleTTIScoreChange} />
                            <AbaqueWSCreatorCorrection exo={Abaque} onAbaqueDataChange={handleAbaqueScoreChange} />
                            <LDNWSCreatorCorrection exo={LDN} onTATDataChange={handleLDNScoreChange} />
                            <MBWSCreatorCorrection exo={MB} onMBDataChange={handleMBScoreChange} />
                            <MDNWSCreatorCorrection exo={MDN} onMDNDataChange={handleMDNScoreChange} />
                            <STTWSCreatorCorrection exo={STT} onSTTDataChange={handleSTTScoreChange} />
                        </div>
                    )}
                </div>
                <div id="infoAvecCorrection"></div>
                {
                    sons.map((son, index) => (
                        <div key={index} style={{ marginRight: '10px' }}>
                            <p>Son numéro :{index + 1}</p>
                            <audio controls>
                                <source src={URL.createObjectURL(new Blob([new Uint8Array(son.son_data.data)], { type: 'audio/mpeg' }))} type="audio/mpeg" />
                                Votre navigateur ne supporte pas l'élément audio.
                            </audio>
                            <p className='son_nom_d_origine'>Réponse: {son.nom_d_origine}</p>
                            <br />
                            <br />
                        </div>
                    ))
                }
            </div>
        </div >
    );
};

export default InfoExercice;