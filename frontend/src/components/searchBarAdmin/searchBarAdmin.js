import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchBarAdmin = () => {

    const navigate = useNavigate();

    function sendRequest() {

        let anneeScolaire = document.getElementById('anneeScolaire').value;
        let rechercheSpecifique = document.getElementById('rechercheSpecifique').value;
        let matiere = document.getElementById('matiere').value;

        if ((anneeScolaire === '---') && (rechercheSpecifique === '---') && (matiere === '---')) {
            alert("Veuillez selectionner une matiere ou une année")
        } else {

            navigate('/manage_exerices', {
                state: {
                    anneeScolaire: anneeScolaire,
                    rechercheSpecifique: rechercheSpecifique,
                    matiere: matiere
                },
            });


        }

    }
    function test() {
        console.log(document.getElementById("anneeScolaire").value)
    }

    return (
        <div id="searchBarContainer">
            <ul>
                <li>
                    <select id='anneeScolaire'>
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
                    <input placeholder='Rechercher un champs spécifique' id="rechercheSpecifique"></input>
                </li>
                <li>
                    <select id="matiere">
                        <option selected>---</option>
                        <option value="abaque">Abaque</option>
                        <option value="MDN">Maison des nombres</option>
                        <option value="TAT">Texte à trous</option>
                        <option value="STT">Sons vers texte</option>
                        <option value="LDN">Ligne des nombres</option>
                        <option value="MB">Mot dans le bazard</option>
                        <option value="TTI">Image vers texte</option>
                    </select>
                </li>
                <li>
                    <button onClick={sendRequest}>Rechercher</button>
                </li>
            </ul>
        </div>
    );
};

export default SearchBarAdmin;