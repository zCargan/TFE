import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';

import ShowRandomWS from '../../components/showRandomWS/showRandomWS';
import SearchBarWS from '../../components/searchBarWS/searchBarWS';

import './showWorksheet.css'

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
            .get("http://backendContainer:4000/exercice/getTotalCountsWS")
            .then((res) => {
                const max = res.data.count;
                console.log(max)
                getARandomWorksheets(max, 1);
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
                .get('http://backendContainer:4000/exercice/getARandomWorksheets', {
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
                .get('http://backendContainer:4000/exercice/getARandomWorksheets', {
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
            <br />
            <SearchBarWS dataDeLenfant={fonctionDeRetour} />
            <div>
                <br />
                <h1 className='bigTitle'>Feuille d'exercices aléatoires</h1>
                <div className='divP'>
                    <p className='pPage'>Ici, vous retrouverez une feuille aléatoire d'exercice</p>
                    <p className='pPage'>Vous pouvez afiner vos recherches afin de trouver la feuille d'entrainement qu'il vous faut!</p>
                </div>
            </div>
            {randomWorksheets.map((worksheet, index) => (
                <ShowRandomWS randomWS={worksheet} />
            ))}
            <button className='buttonGlobalCSS' onClick={(e) => {window.location.reload();}}>Me donner un autre exercice aléatoire</button>
            <div>
                <img src="createWS.png" id="WSImg"></img>
            </div>
        </div>
    );
};

export default ShowWorksheet;
