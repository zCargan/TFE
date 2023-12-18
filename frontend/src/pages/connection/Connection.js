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
    } else {
      console.log('Nous ne sommes pas connecté')
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
      .post('http://localhost:4000/connection', data_to_send)
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
    navigate('/reset-password')
  }


  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div id="input_connection_div">
        <br />
        <input className="inputConnection" placeholder="Pseudo" type="text" id="pseudo" />
        <input className="inputConnection" placeholder="password" type="password" id="password" />
        <br />
        <br />
        <button id="connection_register" onClick={(e) => connection()}>Connection</button>
        <br />
      </div>
      <h5>Ou</h5>
      <div className="bottom-button">
        <button id="button_register" onClick={(e) => navigate('/register')}>Se créer un compte</button>
      </div>
      <div className="connection-button">
      <PasswordChanger text={textButtonPasswordForget} />
      </div>
    </div>
  );
};

export default Connection;