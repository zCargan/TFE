import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/userSlice';
import Navbar from '../../components/navbar/Navbar';


export function notXSSInjection(string) {
    return !(string.includes("<"))
}

export function checkEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export function allComplete(string1, string2, string3, string4, string5, string6) {
    return !((string1 === "") || (string2 === "") || (string3 === "") || (string4 === "") || (string5  === "") || string6 === "")
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



    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.user.user)


    function registerAccount () {
        if(allComplete(surname, name, pseudo, email, password, samePassword)) {
            if(checkEmail(email)) {
                if(sameString(password, samePassword)) {
                    const data_to_send = {
                        "surname": surname,
                        "name": name,
                        "pseudo": pseudo,
                        "email": email,
                        "password": password
                    }
                    axios.post("http://localhost:3001/register", data_to_send).then(response => {
                        if(response.status == 201) {
                            alert("compte bien créé !")
                        } else {
                            alert("Une erreur est survenue lors de la création du compte")
                        }
                    })
                } else {
                    alert("Vos deux mots de passe ne correspondent pas")
                }
            } else {
                alert('Veuillez entrer une adresse email valide')
            }
        } else {
            alert('Veuillez compléter tous les champs')
        }
    }


    function test () {
        console.log(tasks)
    }

    return (
        <div>
            <div>
                <Navbar></Navbar>
            </div>
            <div>
                <p>==========================================</p>
                <input placeholder='Prénom' type='text' id="surname" onChange={(e) => setSurname(e.target.value)}></input>
                <br></br>
                <input placeholder='Nom' type='text' id="name" onChange={(e) => setName(e.target.value)}></input>
                <br></br>
                <input placeholder='Pseudo' type="text" id="username" onChange={(e) => setPseudo(e.target.value)}></input>
                <br></br>
                <input placeholder='adresse email' type='text' id="emai" onChange={(e) => setEmail(e.target.value)}></input>
                <br></br>
                <div className='text_zone'>
                    <label style={{ color: passwordHasValidLength ? 'green' : 'red' }}>Mot de passe de 12 caractères </label>
                    <br />
                    <label style={{ color: passwordHasLowercaseLetter ? 'green' : 'red' }}>Min 1 caractère minuscule</label>
                    <br />
                    <label style={{ color: passwordHasUppercaseLetter ? 'green' : 'red' }}>Min 1 caractère majuscule</label>
                    <br />
                    <label style={{ color: passwordHasNumber ? 'green' : 'red' }}>Min 1 nombre</label>
                    <br />
                    <label style={{ color: passwordHasSpecialCharacter ? 'green' : 'red' }}>Min 1 caractère spécial</label>
                </div>
                <br></br>
                <input type="password" placeholder='Mot de passe' onChange={(e) => setPassword(e.target.value)} />
                <br></br>
                <input placeholder='Confirmer le mot de passe' type="password" id="passwordConfirm" onChange={(e) => setSamePassword(e.target.value)}></input>
                <br></br>
                <button onClick={(e) => registerAccount()}>Register</button>
                <button onClick={(e) => test()}></button>
            </div>
        </div>
    );
};

export default Connexion;