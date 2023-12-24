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
            <p className='descriptionWS'>Titre : {randomWS.nom}</p>
            <p className='descriptionWS'>Description : {randomWS.descriptionWorksheet}</p>
            <p className='descriptionWS'>Année Scolaire : {randomWS.anneeScolaire}</p>
            <p className='descriptionWS'>Nombre d'exercice :  {randomWS.data.length}</p>
            <ul>
                {randomWS.data.map((dataItem, dataIndex) => (
                    <li key={dataIndex}>
                        <p  className='descriptionWS'>Type : {dataItem.type}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ShowRandomWS;