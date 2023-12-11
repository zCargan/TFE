import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import './showRandomWS.css'

const ShowRandomWS = (props) => {

    const navigate = useNavigate();
    const { randomWS } = props;

    useEffect(() => {
        console.log(props)
    })

    function getInfosFromWS() {
        let idExo = randomWS._id;
        navigate(`/show_worksheet_by_id?parametre=${idExo}`);
    }

    return (
        <div className='divShowRandomWS' onClick={getInfosFromWS}>
            <p><span class='SRE'>Titre : </span>{randomWS.nom}</p>
            <p>Description : {randomWS.descriptionWorksheet}</p>
            <p>Année Scolaire : {randomWS.anneeScolaire}</p>
            <p>Nombre d'exercice :  {randomWS.data.length}</p>
            <ul>
                {randomWS.data.map((dataItem, dataIndex) => (
                    <li key={dataIndex}>
                        <p>Type : {dataItem.type}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ShowRandomWS;