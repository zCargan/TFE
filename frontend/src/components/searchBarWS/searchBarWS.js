import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const SearchBarWS = ({ dataDeLenfant }) => {

    const navigate = useNavigate();

    function sendRequest() {

        let anneeScolaire = document.getElementById('anneeScolaire').value;
        let titreSpecifique = document.getElementById('titreSpecifiqueWS').value;
        let descriptionSpecifique = document.getElementById('descriptionSpecifiqueWS').value;

        if ((titreSpecifique === '') && (descriptionSpecifique === '')) {
            alert("Veuillez entrer un titre ou une description valide")
        } else {
            if (anneeScolaire === '---') {
                alert("Veuillez sélectionner une année scolaire valide")
            } else {
                let query = {
                    anneeScolaire: anneeScolaire,
                    titreSpecifique: titreSpecifique,
                    descriptionSpecifique: descriptionSpecifique
                }
                axios
                .get(`http://localhost:4000/exercice/getSpecificWS?anneeScolaire=${anneeScolaire}&titreSpecifique=${titreSpecifique}&descriptionSpecifique=${descriptionSpecifique}`)
                .then((response) => {
                    dataDeLenfant(response.data)
                })
            }

        }

    }
    function test() {
        console.log(document.getElementById("anneeScolaire").value)
    }

    return (
        <div id="searchBarWSContainer">
            <div id="test" className="navbarWS">
                <ul>
                    <li>
                        <select id='anneeScolaire' className="custom-select-searchBarWS">
                            <option selected>---</option>
                            <option value="1">1er</option>
                            <option value="2">2ème</option>
                            <option value="3">3ème</option>
                            <option value="4">4ème</option>
                            <option value="5">5ème</option>
                            <option value="6">6ème</option>
                        </select>
                    </li>
                    <li>
                        <input placeholder='Titre spécifique' id="titreSpecifiqueWS"></input>
                    </li>
                    <li>
                        <input placeholder='Description spécifique' id="descriptionSpecifiqueWS"></input>
                    </li>
                    <li>
                        <button onClick={sendRequest}>Voir les feuilles</button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SearchBarWS;