import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Navbar from '../navbar/Navbar';

import './updateSounds.css'

const UpdateSounds = ({ onSoundSelect }) => {
    const [sons, setSons] = useState([]);

    const navigate = useNavigate();

    const getMBCalledRef = useRef(false);

    useEffect(() => {
        if (!getMBCalledRef.current) {
            getSon();
            getMBCalledRef.current = true;
        }
    }, []);


    function getSon() {
        const config = {
            headers: {
                'Authorization': `Bearer ${Cookies.get('JWT')}`
            }
        };

        axios.post("http://backendContainer:4000/connection/infoUser", {}, config)
            .then(response => {
                let id = response.data.id
                axios.get(`http://backendContainer:4000/sound/getSound/${id}`, {}, config)
                    .then((res) => {
                        // Ajouter une étiquette à chaque son
                        const sonsAvecLabels = res.data.resultat.map((son, index) => ({
                            ...son,
                            label: `Son ${index + 1}` // Étiquette du son
                        }));
                        setSons(anciensSons => [...anciensSons, ...sonsAvecLabels]);
                        document.getElementById('buttonGetSound').style.display = 'none';
                    })
                    .catch((error) => {
                        console.log("Error fetching sounds:", error);
                    })
            });
    }

    function setSound() {
        sons.forEach((son, index) => {
            console.log(`Son ${index + 1}: ${son.nom_d_origine}`);
        });
    }

    function checkAnswers() {
        let reponseUser = document.getElementsByClassName('reponseUserSound')
        for (let i = 0; i < reponseUser.length; i++) {
            if (reponseUser[i].value === sons[i].nom_d_origine) {
                console.log("bonne réponse")
            } else {
                console.log("Mauvaise réponse")
            }
        }
    }

    function showSon() {
        console.log(sons)
    }

    function getDetails(id) {
        console.log(id)
        navigate('/sound_detail', {
            state: {
                son: id
            },
        });
    }

    return (
        <div>
            <Navbar />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div id="zone_sound">
                    <div className='h1us'>
                        <h1>Ici, vous pouvez intéragir avec vos sons</h1>
                    </div>
                    <div  className='pus'>
                        <p>Il vous suffit de cliquer sur le son voulu</p>
                    </div>
                    <div id="zoneExoSon" className='zoneSons' style={{ display: 'flex', flexDirection: 'row', gap: '10px', justifyContent: 'center' }} >
                        {sons.map((son, index) => (
                            <div key={index} style={{ marginRight: '10px' }} className='divSonUnique' onClick={(e) => { getDetails(son) }}>
                                <p>{son.nom_d_origine}</p>
                                <audio controls>
                                    <source src={URL.createObjectURL(new Blob([new Uint8Array(son.son_data.data)], { type: 'audio/mpeg' }))} type="audio/mpeg" />
                                    Votre navigateur ne supporte pas l'élément audio.
                                </audio>
                                <br />
                            </div>
                        ))}
                    </div>
                    <br />
                </div>
            </div>
        </div>

    );
};

export default UpdateSounds;
