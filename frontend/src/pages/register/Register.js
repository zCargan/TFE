import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/exerciceSlice';
import Navbar from '../../components/navbar/Navbar';
import './register.css'
import { useNavigate, Redirect, useHistory } from 'react-router-dom';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import Popup from 'reactjs-popup';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

import PersonIcon from '@mui/icons-material/Person';

export function notXSSInjection(string) {
    return !(string.includes("<"))
}

export function checkEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export function allComplete(string1, string2, string3, string4, string5, string6) {
    return !((string1 === "") || (string2 === "") || (string3 === "") || (string4 === "") || (string5 === "") || string6 === "")
}

export function sameString(string1, string2) {
    return (string1 === string2)
}

export function HasValidLength(string) {
    return (string.length >= 12)
}

export function HasLowerCaseLetter(string) {
    return (/[a-z]/.test(string))
}

export function HasUpperCaseLetter(string) {
    return (/[A-Z]/.test(string))
}

export function HasSpecialCharacter(string) {
    return (/[!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?]/.test(string))
}

export function HasNumber(string) {
    return (/[0-9]/.test(string))
}

const Connexion = () => {


    const navigate = useNavigate();

    const [surname, setSurname] = useState("");
    const [name, setName] = useState("");
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [samePassword, setSamePassword] = useState("");
    const passwordHasValidLength = HasValidLength(password);
    const passwordHasLowercaseLetter = HasLowerCaseLetter(password);
    const passwordHasUppercaseLetter = HasUpperCaseLetter(password);
    const passwordHasSpecialCharacter = HasSpecialCharacter(password);
    const passwordHasNumber = HasNumber(password);
    const [popupOpen, setPopupOpen] = useState(false);

    function handleUserIconHover() {
        setPopupOpen(true);
    }

    function handleUserIconLeave() {
        setPopupOpen(false);
    }

    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.exercices.exercice)


    function registerAccount() {
        if (checkEmail(email)) {
            if (sameString(password, samePassword)) {
                const data_to_send = {
                    "surname": surname,
                    "name": name,
                    "pseudo": pseudo,
                    "email": email,
                    "password": password
                }
                axios.post("http://localhost:4000/register", data_to_send)
                    .then(response => {
                        if (response.status === 201) {
                            Swal.fire({
                                title: 'Compte créé',
                                text: 'Votre compte a été créé avec succès!',
                                icon: 'success',
                            }).then(() => {
                                navigate('/home');
                            });
                        } else {
                            Swal.fire({
                                title: 'Erreur',
                                text: 'Une erreur est survenue lors de la création du compte.',
                                icon: 'error',
                            });
                        }
                    })
                    .catch(error => {
                        console.error('Erreur lors de la création du compte', error);
                        Swal.fire({
                            title: 'Erreur',
                            text: 'Une erreur s\'est produite lors de la création du compte.',
                            icon: 'error',
                        });
                    });
            } else {
                Swal.fire({
                    title: 'Erreur',
                    text: 'Vos deux mots de passe ne correspondent pas.',
                    icon: 'error',
                });
            }
        } else {
            Swal.fire({
                title: 'Erreur',
                text: 'Veuillez entrer une adresse email valide.',
                icon: 'error',
            });
        }
    }


    function test() {
        console.log(tasks)
    }

    return (
        <div id="registerdiv">
            <div>
                <div id="h1div">
                    <h1 className='h1r'>Bienvenue sur la page de création de compte</h1>
                </div>
                <br />
                <div>
                    <h3 className='h3r'>Nous avons besoin des données suivantes afin d'enregister votre compte</h3>
                </div>
                <br />
                <div>
                    <p className='pR'>Elles ne seront en aucun cas utilisée, elles sont uniquement nécessaire pour un bon fonctionnement de l'application</p>
                </div>
                <br />
                <div id="formInputR">
                    <input className="inputRegister" placeholder='Prénom' type='text' id="surname" onChange={(e) => setSurname(e.target.value)}></input>
                    <br />
                    <input className="inputRegister" placeholder='adresse email' type='text' id="emai" onChange={(e) => setEmail(e.target.value)}></input>
                    <br />
                    <input className="inputRegister" type="password" placeholder='Mot de passe' onChange={(e) => setPassword(e.target.value)} />
                    <br />
                    <input className="inputRegister" placeholder='Confirmer le mot de passe' type="password" id="passwordConfirm" onChange={(e) => setSamePassword(e.target.value)}></input>
                </div>
                <br />
                <div id='text_zone3'>
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
                <button className="buttonRegister" onClick={(e) => registerAccount()}>M'enregister !</button>
            </div>
        </div>
    );
};

export default Connexion;