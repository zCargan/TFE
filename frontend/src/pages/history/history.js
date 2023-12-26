import React, { useEffect, useState } from 'react';
import './history.css';
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const ITEMS_PER_ROW = 4;
const ROWS = 3;
const PAGE_SIZE = ITEMS_PER_ROW * ROWS;

const History = () => {
    const [exos, setExos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const navigate = useNavigate();
    const typeImages = {
        MDN: 'mdn.png',
        abaque: 'abaque.png',
        TTI: 'tti.png',
        LDN: 'LDN.png',
        TAT: 'TAT.png',
        MB: 'MB.png',
        STT: 'stt.png',
        WS: 'feuilleExo.png'
    };



    useEffect(() => {
        const fetchExos = async () => {
            try {
                const config = {
                    headers: {
                        'Authorization': `Bearer ${Cookies.get('JWT')}`
                    }
                };

                const response = await axios.post("http://backendContainer:4000/connection/infoUser", {}, config);
                const data = { id: response.data.id };

                const exosResponse = await axios.post("http://backendContainer:4000/exercice/getExosFromUser", { data });


                const sortedExos = exosResponse.data.sort((a, b) => new Date(b.temps) - new Date(a.temps));

                const totalExos = sortedExos.length;
                setTotalPages(Math.ceil(totalExos / PAGE_SIZE));

                const slicedExos = sortedExos.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
                setExos(slicedExos);
            } catch (error) {
                console.error("Erreur lors de la récupération des données : ", error);
            }
        };

        fetchExos();
    }, [currentPage]);


    function seeDetails(id, type) {
        if(type === "WS") {
            navigate('/infoExerciceWS', { state: { id, type } })
        } else {
            navigate('/infoExercice', { state: { id, type } });

        }
    }

    function handlePageChange(page) {
        setCurrentPage(page);
    }

    function formatDate(dateString) {
        const dateObj = new Date(dateString);
        const options = { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
        return dateObj.toLocaleDateString('fr-FR', options);
    }


    function renderPaginationButtons() {
        const buttons = [];

        if (totalPages > 1) {
            buttons.push(
                <button key="first" className="buttonProfile" onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
                    Première page
                </button>
            );

            buttons.push(
                <button key="prev" className="buttonProfile" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Page précédente
                </button>
            );

            buttons.push(
                <button key="next" className="buttonProfile" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    Page suivante
                </button>
            );

            buttons.push(
                <button key="last" className="buttonProfile" onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
                    Dernière page
                </button>
            );
        }

        return buttons;
    }

    return (
        <div className="page-container" id="mainDivHistory">
            <Navbar />
            <div id="G2">
                <div className="exercice-list">
                    <div className="grid-container">
                        {exos.map((exercice, index) => (
                            <div key={index} className="exercice-item">
                                <div className="exercice-content">
                                    <div className="image-container">
                                        <img src={typeImages[exercice.type]} style={{ width: '70px', height: '70px' }} alt={exercice.type} />
                                    </div>
                                    <div className="exercice-details">
                                        <p>Type de l'exercice: {exercice.type === 'WS' ? 'Feuille d\'exercice' : exercice.type}</p>
                                        <p>Pourcentage de l'exo: {exercice.pourcentage}%</p>
                                        <p>Date de réalisation: {formatDate(exercice.temps)}</p>
                                        <button className="buttonProfileH" onClick={(e) => seeDetails(exercice.identifiant, exercice.type)}>Voir Détails</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="pagination">
                    {renderPaginationButtons()}
                </div>
            </div>

        </div>
    );
};

export default History;
