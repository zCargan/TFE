import React from 'react';
import axios from 'axios';
import { Provider, useDispatch } from 'react-redux';
import './connection.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Cookies from 'js-cookie';

const Connection = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        Cookies.set('JWT', response.data.token , { expires: 7 }); // 'expires' dénote la durée de validité en jours
        /*
        if (response.status === 200) {
          console.log(response.data)
          console.log('Vous êtes bien connecté');
          dispatch(
            
            login({
              pseudo: pseudo,
              password: password,
              role: role,
              loggedIn: true,
            })
            
          );
          navigate('/');
        }
        */
      })
      .catch((response) => {
        console.log(response);
        alert('Email ou mot de passe incorrect');
      });
  }


  function deconnect() {
    Cookies.remove('JWT')
  }

  return (
    <div>
        <div>
          <Navbar />
        </div>
        <div id="input_connection_div">
          <input placeholder="Pseudo" type="text" id="pseudo" />
          <input placeholder="password" type="password" id="password" />
        </div>
        <div>
          <button>Change my password</button>
        </div>
        <button onClick={(e) => connection()}>Connection</button>
        <button onClick={(e) => deconnect()}>Deconnection</button>
    </div>
  );
};

export default Connection;