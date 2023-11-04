import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; 
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';


const InfoExercice = () => {
    const location = useLocation(); 
    const { state } = location; 
    const { id } = state;
    const { type } = state;

    const [name, setName] = useState("/");
    const [annee, setAnnee] = useState("/");
    const [description, setDescription] = useState("/");
    const [reponsesInitiales, setReponsesInitiales] = useState("/")
    const [reponseAttendues, setReponsesAttendues] = useState("/")
    

    useEffect(() => {
        if(type === "MDN") {
            axios.get(`http://localhost:4000/exercice/MDN/${id}`)
            .then(response => {
                console.log(response.data)
                setName(response.data.nom); 
                setAnnee(response.data.anneeScolaire)
                setDescription(response.data.description)
            })
            .catch(error => {
                console.error('Erreur:', error);
            });
        } else if (type === "abaque") {
            axios.get(`http://localhost:4000/exercice/abaque/${id}`)
            .then(response => {
                console.log(response.data)
                setName(response.data.nom); 
                setAnnee(response.data.anneeScolaire)
                setDescription(response.data.description)
                setReponsesInitiales(response.data.reponseInitiale)
            })
            .catch(error => {
                console.error('Erreur:', error);
            });
        }
        
    }, [])


    return (
        <div>
            <Navbar></Navbar>
            <p>test info exercice : {id}</p>
            <p>Nom de l'exercice : {name}</p>
            <p>Année scolaire visée : {annee}</p>
            <p>Description : {description}</p>
            <p>Réponses énoncés : {reponsesInitiales}</p>
            <p>Réponses attendues : {reponseAttendues}</p>
        </div>
    );
};

export default InfoExercice;



