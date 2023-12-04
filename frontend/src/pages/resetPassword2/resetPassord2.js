// ResetPassword2.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';

const ResetPassword2 = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    const handleResetPassword = async () => {
        try {
            // Validez que les mots de passe correspondent
            if (password !== confirmPassword) {
                setErrorMessage('Les mots de passe ne correspondent pas.');
                return;
            }

            // Récupérez le token de réinitialisation à partir de l'URL
            const token = new URLSearchParams(location.search).get('token');

            // Envoyez la demande de réinitialisation de mot de passe
            const response = await axios.post('http://localhost:4000/connection/newPassword', { token, password });

            // Affichez un message de succès
            setSuccessMessage('Le mot de passe a été réinitialisé avec succès.');

            // Ajoutez ici une logique de redirection si nécessaire
        } catch (error) {
            console.error('Erreur lors de la réinitialisation du mot de passe', error);

            // Gérez les erreurs et affichez un message d'erreur approprié
            setErrorMessage('Une erreur s\'est produite lors de la réinitialisation du mot de passe.');
        }
    };

    return (
        <div>
            <Navbar />
            <h2>Réinitialiser le Mot de Passe</h2>
            <label>Nouveau Mot de Passe : </label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <br />
            <br />
            <label>Confirmer le Mot de Passe : </label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <br />
            <br />
            <button onClick={handleResetPassword}>Réinitialiser le Mot de Passe</button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
    );
};

export default ResetPassword2;
