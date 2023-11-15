import React from 'react';
import './searchBar.css'

const searchBar = () => {
    return (
        <div>
            <ul>
                <li>
                    <select>
                        <option>1er</option>
                        <option>2ème</option>
                        <option>3ème</option>
                        <option>4ème</option>
                        <option>5ème</option>
                        <option>6ème</option>
                    </select>
                </li>
                <li>
                    <input placeholder='Rechercher un champs spécifique'></input>
                </li>
                <li>
                    <select>
                        <option>Abaque</option>
                        <option>Maison des nombres</option>
                        <option>Texte à trous</option>
                        <option>Sons vers texte</option>
                        <option>Ligne des nombres</option>
                        <option>Mot dans le bazard</option>
                        <option>Image vers texte</option>
                    </select>   
                </li>
            </ul>
        </div>
    );
};

export default searchBar;