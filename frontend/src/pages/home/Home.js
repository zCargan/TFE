import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../../components/navbar/Navbar';
import SearchBar from '../../components/searchBar/searchBar';
import axios from 'axios';
import Cookies from 'js-cookie';

import ShowRandomExos from '../../components/showRandomExos/showRandomExos';

const Home = () => {
    const [randomExos, setRandomExos] = useState({});
    const [randomExosList, setRandomExosList] = useState([]);


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
            .get("http://localhost:4000/exercice/getTotalCounts")
            .then((res) => {
                data = res.data.moreInformations;
                const max = res.data.nbrExercices;
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
                .get('http://localhost:4000/exercice/getARandomExo', {
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
        <div>
            <Navbar />
            <SearchBar />
            <h3>Proposition d'exercices</h3>
            {randomExosList.map((randomExos, index) => (
                <ShowRandomExos key={index} randomExos={randomExos} />
            ))}
        </div>
    );

};

export default Home;
