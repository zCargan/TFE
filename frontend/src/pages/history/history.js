import React, { useEffect, useState } from 'react';
import './history.css';
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const History = () => {
    const [exos, setExos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const config = {
            headers: {
                'Authorization': `Bearer ${Cookies.get('JWT')}`
            }
        };

        axios.post("http://localhost:4000/connection/infoUser", {}, config)
            .then(response => {
                const data = {
                    id: response.data.id
                };

                axios.post("http://localhost:4000/exercice/getExosFromUser", { data })
                    .then((res) => {
                        console.log(res.data)
                        setExos(res.data);
                    })
                    .catch(error => {
                        console.error("Erreur lors de la récupération des exercices : ", error);
                    });
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des informations de l'utilisateur : ", error);
            });
    }, []);

    return (
        <div className="page-container">
            <Navbar />
            <div className="exercice-list">
                {exos.map((exercice, index) => (
                    <div key={index} className="exercice-item">
                        <div className="exercice-details">
                            <h3>Exercice</h3>
                            <p>Pourcentage de l'exo: {exercice.pourcentage}%</p>
                            <p>Date de réalisation: {exercice.temps}</p>
                        </div>
                        <button onClick={() => navigate(`/exercice/${exercice.id}`)}>Voir Détails</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default History;
