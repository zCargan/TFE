import React from 'react';
import axios from 'axios';
import { login } from '../../features/userSlice';
import { useDispatch } from 'react-redux';
import './connection.css';
import { useNavigate } from 'react-router-dom';

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
      .post('http://localhost:3001/connection', data_to_send)
      .then((response) => {
        if (response.data.msg === 'connecté') {
          alert('Vous êtes bien connecté');
          dispatch(
            login({
              pseudo: pseudo,
              password: password,
              loggedIn: true,
            })
          );
          navigate('/test');
        }
      })
      .catch((response) => {
        console.log(response);
        alert('Email ou mot de passe incorrect');
      });
  }

  return (
    <div>
      <div id="input_connection_div">
        <input placeholder="Pseudo" type="text" id="pseudo" />
        <input placeholder="password" type="password" id="password" />
      </div>
      <div>
        <button>Change my password</button>
      </div>
      <button onClick={(e) => connection()}>Connection</button>
      <div></div>
    </div>
  );
};

export default Connection;
