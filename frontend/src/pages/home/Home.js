import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../../components/navbar/Navbar';
import SearchBar from '../../components/searchBar/searchBar';
import Img from '../../components/IMGbackground/imgbackground'
import axios from 'axios';
import Cookies from 'js-cookie';
import { GrRefresh } from "react-icons/gr";
import { LuRefreshCcw } from "react-icons/lu";
import Logo from '../../components/LCDMS_logo/LCDMS_logo'
import InfoIcon from '@mui/icons-material/Info';
import Popup from 'reactjs-popup';


import './Home.css'

import ShowRandomExos from '../../components/showRandomExos/showRandomExos';

const Home = () => {
    const [randomExos, setRandomExos] = useState({});
    const [randomExosList, setRandomExosList] = useState([]);
    const [popupOpen, setPopupOpen] = useState(false);


    const getMBCalledRef = useRef(false);

    let data = {}

    useEffect(() => {
        if (!getMBCalledRef.current) {
            getTotalCounts();
            getMBCalledRef.current = true;
        }
    }, []);

    useEffect(() => {
    })


    const config = {
        headers: {
            'Authorization': `Bearer ${Cookies.get('JWT')}`
        }
    };


    function getTotalCounts() {
        axios
            .get("https://www.laclassedemadameseverine.be:4000/exercice/getTotalCounts")
            .then((res) => {
                data = res.data.moreInformations;
                const max = res.data.nbrExercices;
                console.log(data, max)
                getARandomExos(max, 5); // Générer 5 exercices aléatoires
            })
            .catch((error) => {
                console.error("Error fetching total counts:", error);
            });
    }


    function giveRandomNumber(max) {
        return Math.floor(Math.random() * max) + 1;
    }


    function getARandomExos(max, count) {
        const currentRandomExosList = [...randomExosList];
        const selectedExosSet = new Set();

        const getRandomExo = () => {
            const testRandomExos = {};
            let a = giveRandomNumber(max) - 1;

            const valeurs = Object.values(data);
            const cles = Object.keys(data);

            for (let j = 0; j < valeurs.length; j++) {
                a -= valeurs[j];
                if (a < 0) {
                    const index = Math.abs(a);
                    testRandomExos[cles[j]] = index;
                    break;
                }
            }
            return testRandomExos;
        };

        for (let i = 0; i < count; i++) {
            let testRandomExos = getRandomExo();

            // Vérifier si l'exercice est déjà présent dans la liste
            while (selectedExosSet.has(JSON.stringify(testRandomExos))) {
                testRandomExos = getRandomExo();
            }

            // Ajouter l'exercice à l'ensemble pour éviter les doublons
            selectedExosSet.add(JSON.stringify(testRandomExos));

            axios
                .get('https://www.laclassedemadameseverine.be:4000/exercice/getARandomExo', {
                    params: testRandomExos,
                    headers: config.headers,
                })
                .then((res) => {
                    currentRandomExosList.push(res.data);
                    setRandomExosList([...currentRandomExosList]);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }






    return (
        <div id="div_home">
            <Navbar />
            <SearchBar />
            <div id="refreshHome">
                <Popup
                    trigger={
                        <div id="infoSpan"><span className='important4'><InfoIcon className='infoLogo' /></span></div>
                    }
                    open={popupOpen}
                    position="bottom center"
                    on="hover"
                >
                    <div id='text_zone10'>
                        <h1>Attention</h1>
                        <p>Le site est réalisé pour une utilisation sur ordinateur.</p>
                        <p>Il se peut que toutes les pages ne soient pas adaptées à tous les appareils.</p>
                    </div>
                </Popup>
                <h2 id="propExos">Propositions d'exercices</h2><LuRefreshCcw className="iconRefresh" id="iconRefresh" onClick={(e) => { window.location.reload() }} />
            </div>
            {randomExosList.map((randomExos, index) => (
                <ShowRandomExos key={index} randomExos={randomExos} />
            ))}
            <Img />
            {/* <Logo /> */}

        </div>
    );

};

export default Home;
