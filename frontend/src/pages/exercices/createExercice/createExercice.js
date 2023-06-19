import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const createExercice = () => {

    return (
        <div>
            <div>
                <h1>Création d'exercice</h1>
            </div>
            <div>
                <p>Niveau scolaire de l'exercice</p>
                <select>
                    <option>1ère année primaire</option>
                    <option>2ème année primaire</option>
                    <option>3ème année primaire</option>
                    <option>4ème année primaire</option>
                    <option>5ème année primaire</option>
                    <option>6ème année primaire</option>
                </select>
            </div>
            <div>
                <p>Branche scolaire</p>
                <select>
                    <option>Mathématique</option>
                    <option>Français</option>
                    <option>Eveil</option>
                    <option>Anglais</option>
                    <option>Néérlandais</option>
                </select>
            </div>
            <div>
                <p>=============================================</p>
            </div>
            <div>
                <input type="text"></input>
            </div>
        </div>
    );
};

export default createExercice;