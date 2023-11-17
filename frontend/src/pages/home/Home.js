import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../../components/navbar/Navbar';
import SearchBar from '../../components/searchBar/searchBar';
import axios from 'axios';
import Cookies from 'js-cookie';

import ShowRandomExos from '../../components/showRandomExos/showRandomExos';

const Home = () => {
    const [randomExos, setRandomExos] = useState({});
    const [arrayOfExos, setArrayOfExos] = useState([]);

    const getMBCalledRef = useRef(false);


    useEffect(() => {
        if (!getMBCalledRef.current) {
            getTotalCounts();
            getMBCalledRef.current = true;
        }
    }, []);

    useEffect(() => {
        console.log(randomExos)
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
                const max = res.data.nbrExercices;
                getARandomExos(max);
            })
            .catch((error) => {
                console.error("Error fetching total counts:", error);
            });
    }

    function giveRandomNumber(max) {
        return Math.floor(Math.random() * max) + 1;
    }

    function getARandomExos(max) {

        const currentRandomExos = { ...randomExos }

        const testRandomExos = {};
        let a = giveRandomNumber(max) - 1;

        const data = {
            abaques: 2,
            ldns: 1,
            mbs: 1,
            mdns: 1,
            stts: 1,
            tats: 1,
            ttis: 3,
        };

        const valeurs = Object.values(data);
        const cles = Object.keys(data);

        for (let i = 0; i < valeurs.length; i++) {
            a -= valeurs[i];
            if (a < 0) {
                const index = Math.abs(a);
                testRandomExos[cles[i]] = index;
                break;
            }
        }
        axios
        .get('http://localhost:4000/exercice/getARandomExo', {
            params: testRandomExos,
            headers: config.headers,
        })
        .then((res) => {
            setRandomExos({ ...currentRandomExos, ...res.data });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <div>
            <Navbar />
            <SearchBar />
            <ShowRandomExos randomExos={randomExos} />
        </div>
    );
};

export default Home;
