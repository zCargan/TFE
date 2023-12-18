// ResetPasswordPage.js
import React, { useState } from 'react';
import axios from 'axios';

import './resetPassword.css'

const ResetPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [resetRequested, setResetRequested] = useState(false);

    const handleResetPassword = async () => {
        // Appel au backend pour demander la réinitialisation
        axios.post('http://localhost:4000/connection/reset-password', { email })
            .then((res) => {
                console.log(res.data)
                setResetRequested(true);
            })
            .catch((error) => {
                console.log(error)
            })
    };

    return (
        <div id="rpPage">
            {resetRequested ? (
                <div>
                    <p>Un e-mail de réinitialisation a été envoyé à votre adresse.</p>
                    <p>Veuillez vérifier votre boîte de réception pour les instructions.</p>
                </div>
            ) : (
                <div>
                    <h2>Réinitialiser le mot de passe</h2>
                    <label>Email : </label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <br />
                    <button onClick={handleResetPassword}>Réinitialiser le mot de passe</button>
                </div>
            )}
        </div>
    );
};

export default ResetPasswordPage;