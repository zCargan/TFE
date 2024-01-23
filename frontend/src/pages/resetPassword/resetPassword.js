// ResetPasswordPage.js
import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';
import { useNavigate, Redirect, useHistory } from 'react-router-dom';

import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

import './resetPassword.css'

const ResetPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [resetRequested, setResetRequested] = useState(false);

    const navigate = useNavigate();

    const handleResetPassword = async () => {
        if (!checkEmail(email)) {
            Swal.fire({
                title: 'Adresse e-mail non valide',
                text: 'Veuillez entrer une adresse e-mail valide.',
                icon: 'error',
            });
            return;
        }
        axios.post('https://www.laclassedemadameseverine.be:4000/connection/reset-password', { email })
            .then((res) => {
                console.log(res.data)
                setResetRequested(true);
            })
            .catch((error) => {
                if(error.message === "Request failed with status code 500") {
                    Swal.fire({
                        icon: 'warning',
                        title: "Aucun compte n'est lié à cette adresse email",
                        confirmButtonText: 'OK',
                        showCancelButton: false,
                        showCloseButton: false,
                        showConfirmButton: true,
                        showLoaderOnConfirm: false,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        allowEnterKey: false,
                      });
                }
                
            })
    };




    function checkEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    function deconnect() {
        Cookies.remove('JWT');
        Swal.fire({
            title: 'Déconnection réussie',
            text: 'Déconnecter avec succès',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
        });
        setTimeout(() => {
            window.location.reload();
        }, 1500);
        navigate('/')
    }

    return (
        <div id="rpPage">
            {resetRequested ? (
                <div>
                    <div id="divh2RP2">
                        <p className='pEmailRP'>Un email de réinitialisation a été envoyé à votre adresse email.</p>
                    </div>
                    <p className='pEmailRP2'>Veuillez vérifier votre boîte de réception pour les instructions.</p>
                    <div>
                        <button id="buttonDeconnect" onClick={(e) => { deconnect() }}>Me déconnecter</button>
                    </div>
                    <div>
                        <img className='imgSuccesMan' src='succesMan.webp'></img>
                    </div>
                </div>
            ) : (
                <div>
                    <div id="divh2RP">
                        <h2 className='h2rp'>Page pour réinitialiser son mot de passe</h2>
                    </div>
                    <div>
                        <p id="divpRP">Si votre adresse email existe, un email de récupération vous sera envoyé.</p>
                    </div>
                    <input
                        className="inputRE"
                        placeholder="Ecrire ici votre adresse email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br />
                    <div id="buttonRPDiv">
                    <button id="buttonRP" onClick={handleResetPassword}>Réinitialiser le mot de passe</button>
                    <br />
                    <button id="buttonHome" onClick={(e) => navigate('/')}>Retourner à la page d'accueil</button>
                    </div>
                    <div>
                        <img className='imgRP1' src='rp.png'></img>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResetPasswordPage;