import React from 'react';
import axios from 'axios';
import { Provider, useDispatch } from 'react-redux';
import './connection.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';


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
        let nom = response.data.nom;
        Cookies.set('JWT', response.data.token , { expires: 1 }); // 'expires' dénote la durée de validité en jours
        if(response.data.role === "eleve") {
          Swal.fire({
            title: 'Bonjour ' + nom + ' !',
            text: 'Vous êtes connecté !',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          });
          navigate('/home')
        } else if (response.data.role === "professeur") {
          Swal.fire({
            title: 'Bonjour ' + nom + ' !',
            text: 'Vous êtes connecté à un compte professeur',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
          navigate('/home')
        } 


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
    </div>
  );
};

export default Connection;