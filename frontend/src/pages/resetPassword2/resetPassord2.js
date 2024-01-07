import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from '../../components/navbar/Navbar';
import Cookies from 'js-cookie';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import bcrypt from 'bcryptjs'

import Popup from 'reactjs-popup';

import './resetPassword2.css';

const ResetPassword2 = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [popupOpen, setPopupOpen] = useState(false);
    const [passwordVisible2, setPasswordVisible2] = useState(false);
    const [passwordVisible3, setPasswordVisible3] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();


    const passwordHasValidLength = HasValidLength(password);
    const passwordHasLowercaseLetter = HasLowerCaseLetter(password);
    const passwordHasUppercaseLetter = HasUpperCaseLetter(password);
    const passwordHasSpecialCharacter = HasSpecialCharacter(password);
    const passwordHasNumber = HasNumber(password);


    const togglePasswordVisibility2 = () => {
        setPasswordVisible2(!passwordVisible2);
    };

    const togglePasswordVisibility3 = () => {
        setPasswordVisible3(!passwordVisible3);
    };

    function resetPassword() {
        if (passwordOk(password, confirmPassword)) {
            const token = new URLSearchParams(location.search).get('token');
            const hashedPassword = bcrypt.hashSync(password, "$2a$10$sZk/IsTrgMV.iO0dRgU/xu");
            console.log(token)
            console.log(hashedPassword)

            axios
                .post('http://51.77.150.97:4000/connection/newPassword', { token, hashedPassword })
                .then((res) => {
                    Swal.fire({
                        title: 'Succès',
                        text: 'Le mot de passe a été réinitialisé avec succès.',
                        icon: 'success',
                    }).then(() => {
                        if (Cookies.get('JWT')) {
                            Cookies.remove('JWT');
                        }
                        navigate('/')

                    })
                        .catch((error) => {
                            console.log(error)
                        })
                })
                .catch((error) => {
                    console.log(error)
                })
        } else {
            Swal.fire({
                title: 'Erreur',
                text: 'Les mots de passe ne respecte pas tous les critères, ou ne sont pas les même.',
                icon: 'error',
            });
        }
    };


    function handleUserIconHover() {
        setPopupOpen(true);
    }

    function handleUserIconLeave() {
        setPopupOpen(false);
    }

    function sameString(string1, string2) {
        return (string1 === string2)
    }

    function HasValidLength(string) {
        return (string.length >= 12)
    }

    function HasLowerCaseLetter(string) {
        return (/[a-z]/.test(string))
    }

    function HasUpperCaseLetter(string) {
        return (/[A-Z]/.test(string))
    }

    function HasSpecialCharacter(string) {
        return (/[!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?]/.test(string))
    }

    function HasNumber(string) {
        return (/[0-9]/.test(string))
    }



    function passwordOk(string1, string2) {
        if (passwordHasValidLength && passwordHasLowercaseLetter && passwordHasUppercaseLetter && passwordHasNumber && passwordHasSpecialCharacter) {
            return sameString(string1, string2);
        } else {
            return false;
        }
    }

    return (
        <div>
            <div id="divh2RP">
                <h2>Réinitialiser le Mot de Passe</h2>
            </div>
            <div className="psw2" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input type={passwordVisible2 ? 'text' : 'password'} className="inputForm" placeholder='Nouveau mot de passe' id="passwordConfirm" onChange={(e) => setPassword(e.target.value)}></input>
                {passwordVisible2 ? (
                    <VisibilityOffIcon className='logoEye' onClick={togglePasswordVisibility2} style={{ cursor: 'pointer', marginLeft: '-50px' }} />
                ) : (
                    <VisibilityIcon className='logoEye' onClick={togglePasswordVisibility2} style={{ cursor: 'pointer', marginLeft: '-50px' }} />
                )}
            </div>
            <br />
            <br />
            <div className="psw2" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input type={passwordVisible3 ? 'text' : 'password'} className="inputForm" placeholder='Confirmer le mot de passe' id="passwordConfirm" onChange={(e) => setConfirmPassword(e.target.value)}></input>
                {passwordVisible3 ? (
                    <VisibilityOffIcon className='logoEye' onClick={togglePasswordVisibility3} style={{ cursor: 'pointer', marginLeft: '-50px' }} />
                ) : (
                    <VisibilityIcon className='logoEye' onClick={togglePasswordVisibility3} style={{ cursor: 'pointer', marginLeft: '-50px' }} />
                )}
            </div>
            <br />
            <br />
            <div id='text_zone2'>
                <h4>Votre mot de passe doit contenir: </h4>
                <label className='requiredRP' style={{ color: passwordHasValidLength ? '#A3E571' : 'rgb(256,124,92)' }}>Mot de passe de 12 caractères </label>
                <br />
                <label className='requiredRP' style={{ color: passwordHasLowercaseLetter ? '#A3E571' : 'rgb(256,124,92)' }}>Min 1 caractère minuscule</label>
                <br />
                <label className='requiredRP' style={{ color: passwordHasUppercaseLetter ? '#A3E571' : 'rgb(256,124,92)' }}>Min 1 caractère majuscule</label>
                <br />
                <label className='requiredRP' style={{ color: passwordHasNumber ? '#A3E571' : 'rgb(256,124,92)' }}>Min 1 nombre</label>
                <br />
                <label className='requiredRP' style={{ color: passwordHasSpecialCharacter ? '#A3E571' : 'rgb(256,124,92)' }}>Min 1 caractère spécial</label>
            </div>
            <br />
            <button id="buttonRP2" onClick={resetPassword}>Réinitialiser le Mot de Passe</button>
            <div>
                <img className='imgRP2' src='rp.png' alt="Reset Password" />
            </div>
        </div>
    );
};

export default ResetPassword2;
