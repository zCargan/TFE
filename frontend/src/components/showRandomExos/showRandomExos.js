import React, { useEffect, useState } from "react";
import './showRandomExos.css'
import { useNavigate } from 'react-router-dom'


const ShowRandomExos = (props) => {
    const { randomExos } = props;

    const [type, setType] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        if(randomExos.type === "MDN") {
            setType("Maison des nombres")
        } else if (randomExos.type === "abaque"){
            setType("Abaque")
        } else if (randomExos.type === "TTI"){
            setType("Image avec texte")
        } else if (randomExos.type === "LDN"){
            setType("Ligne avec inconnue")
        } else if (randomExos.type === "TAT"){
            setType("Textes avec mot manquants")
        } else if (randomExos.type === "MB"){
            setType("Images avec lettres en bazard")
        } else if (randomExos.type === "STT"){
            setType("Son avec mots manquants")
        }
    })

    const typeImages = {
        MDN: 'mdn.jpg',
        abaque: 'abaque.png',
        TTI: 'tti.png',
        LDN: 'LDN.jpg',
        TAT: 'TAT.png',
        MB: 'MB.jpg',
        STT: 'stt.png'
    };

    function test() {
        let idExo = randomExos._id;
        let type = randomExos.type;
        navigate(`/show_exercice?parametre=${idExo}&type=${type}`);
    }

    return (
        <div className="showRandomExosContainer" onClick={test}> 
            <div className="imageAndTypeContainer">
                <div className="imageContainer">
                    <img src={typeImages[randomExos.type]} alt="Type d'exercice" />
                </div>
                <div>
                    <h3>Type de l'exercice :</h3><p>{type}</p>
                </div>
            </div>
            <div className="infoContainer">
                <div>
                    <p><span class='SRE'>Titre : </span>{randomExos.nom}</p>
                    <p><span class='SRE'>Description : </span>{randomExos.description}</p>
                    <p><span class='SRE'>Année scolaire visée : </span>{randomExos.anneeScolaire}</p>
                </div>
            </div>
        </div>
    );
};

export default ShowRandomExos;
