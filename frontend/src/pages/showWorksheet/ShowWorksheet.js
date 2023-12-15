import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';

import ShowRandomWS from '../../components/showRandomWS/showRandomWS';
import SearchBarWS from '../../components/searchBarWS/searchBarWS';

const ShowWorksheet = () => {
    const [randomWorksheets, setRandomWorksheets] = useState([]);
    const getMBCalledRef = useRef(false);

    useEffect(() => {
        if (!getMBCalledRef.current) {
            getTotalCounts();
            getMBCalledRef.current = true;
        }
    }, []);

    const getTotalCounts = () => {
        axios
            .get("http://localhost:4000/exercice/getTotalCountsWS")
            .then((res) => {
                const max = res.data.count;
                console.log(max)
                getARandomWorksheets(max, 5); // Générer 5 worksheets aléatoires
            })
            .catch((error) => {
                console.error("Error fetching total counts:", error);
            });
    };

    const giveRandomNumber = (max) => {
        return Math.floor(Math.random() * max);
    };

    const getARandomWorksheets = (max, count) => {
        const selectedWorksheets = [];

        console.log(count)

        if (max < 6) {
            for (let i = 0; i < count; i++) {
                const randomIndex = giveRandomNumber(max);
                console.log(randomIndex)
                selectedWorksheets.push(randomIndex);
            }

            axios
                .get('http://localhost:4000/exercice/getARandomWorksheets', {
                    params: { selectedWorksheets },
                })
                .then((res) => {
                    console.log(res.data)
                    setRandomWorksheets(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            for (let i = 0; i < count; i++) {
                let randomIndex;
                do {
                    randomIndex = giveRandomNumber(max);
                } while (selectedWorksheets.includes(randomIndex));
                selectedWorksheets.push(randomIndex);
            }

            axios
                .get('http://localhost:4000/exercice/getARandomWorksheets', {
                    params: { selectedWorksheets },
                })
                .then((res) => {
                    setRandomWorksheets(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };


    const fonctionDeRetour = (data) => {
        console.log(data);
        setRandomWorksheets(data);
      };

    return (
        <div>
            <Navbar />
            <SearchBarWS dataDeLenfant={fonctionDeRetour}/>
            {randomWorksheets.map((worksheet, index) => (
                <ShowRandomWS randomWS={worksheet} />
            ))}
        </div>
    );
};

export default ShowWorksheet;
