import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Provider, useDispatch } from 'react-redux';
import './connection.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import PasswordChanger from '../../components/passwordChanger/passwordChanger';

const Connection = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const textButtonPasswordForget = "Mot de passe oublié?";

  useEffect(() => {
    if (Cookies.get('JWT')) {
      navigate('/home')
    }
  }, []);


  function connection() {
    const pseudo = document.getElementById('pseudo').value;
    const password = document.getElementById('password').value;
    const data_to_send = {
      pseudo: pseudo,
      password: password,
    };
    axios
      .post('http://51.77.150.97:4000/connection', data_to_send)
      .then((response) => {
        console.log(response.data)
        let nom = response.data.nom;
        Cookies.set('JWT', response.data.token, { expires: 1 }); // 'expires' dénote la durée de validité en jours
        if (response.data.role === "eleve") {
          Swal.fire({
            title: 'Bonjour ' + nom + ' !',
            text: 'Vous êtes connecté !',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          });
          setTimeout(() => {
            navigate('/home');
          }, 2000);
        } else if (response.data.role === "professeur") {
          Swal.fire({
            title: 'Bonjour ' + nom + ' !',
            text: 'Vous êtes connecté à un compte professeur',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          });
          setTimeout(() => {
            navigate('/home');
          }, 2000);
        } else if (response.data.role === "admin") {
          Swal.fire({
            title: 'Bonjour ' + nom + ' !',
            text: 'Vous êtes connecté à un compte admin',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          });
          setTimeout(() => {
            navigate('/home');
          }, 2000);
        }
      })
      .catch((response) => {
        console.log(response);
        alert('Email ou mot de passe incorrect');
      });
  }

  function changePassword() {
    console.log("change password")
    navigate('/reset')
  }


  return (
    <div id="input_connection_div">
      <div>
        <Navbar />
      </div>
      <div>
        <h1 className='h1Connection'>Bienvenue sur la classe de madame Séverine!</h1>
        <br />
        <h2 >Afin d'utiliser le site, merci de vous connecter</h2>
        <input className="inputConnection" placeholder="Pseudo" type="text" id="pseudo" />
        <input className="inputConnection" placeholder="Mot de passe" type="password" id="password" />
        <br />
        
        <button id="connection_register" onClick={(e) => connection()}>Connection</button>
      </div>
      <h5>Où</h5>
      <div className="bottom-button">
        <button id="button_register" onClick={(e) => navigate('/register')}>Se créer un compte</button>
      </div>
      <div className="connection-button">
        <button id="button_register" onClick={(e) => navigate('/reset-password')}>Changer mon mot de passe</button>
      </div>
    </div>
  );
};

export default Connection;