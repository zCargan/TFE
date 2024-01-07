import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import './searchBar.css'

const SearchBar = () => {

    const navigate = useNavigate();

    function sendRequest() {

        let anneeScolaire = document.getElementById('anneeScolaire').value;
        let rechercheSpecifique = document.getElementById('rechercheSpecifique').value;
        let matiere = document.getElementById('matiere').value;

        if ((anneeScolaire !== '---') && (rechercheSpecifique !== '') && (matiere !== '---')) {
            navigate('/exercices', {
                state: {
                    anneeScolaire: anneeScolaire,
                    rechercheSpecifique: rechercheSpecifique,
                    matiere: matiere
                },
            });
        } else {
            Swal.fire({
                title: 'Attention',
                text: 'Veuillez remplir tous les champs de recherche',
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            });
        }

    }
    function test() {
        console.log(document.getElementById("anneeScolaire").value)
    }

    return (
        <div id="searchBarContainer">
            <div id="test" className="navbar">
                <ul>
                    <li>
                        <input placeholder='Recherche spécifique' id="rechercheSpecifique"></input>
                    </li>
                    <li>
                        <select id='anneeScolaire' className="custom-select-searchBar">
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
                        <select id="matiere" className="custom-select-searchBar">
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
                    <li>
                        <button className="showWS" id="showWS" onClick={(e) => navigate('/showWorksheet')}>Voir les feuilles d'exerices disponibles</button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SearchBar;