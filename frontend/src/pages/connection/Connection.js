import React from 'react';
import axios from 'axios';
import './connection.css'

const Connection = () => {

    function connection() {
        const pseudo = document.getElementById('pseudo').value;
        const password = document.getElementById('password').value;
        const data_to_send = {
            "pseudo": pseudo,
            "password": password 
        }
        axios.post('http://localhost:3001/connection', data_to_send)
            .then(response => {
                if(response.data.msg === "connecté") {
                    alert("Vous êtes bien connecté")
                }
            })
            .catch(response => {
                console.log(response.response.status)
                alert("Email ou mot de passe incorrect")
            })
    }

    return (
        <div>
            <div id="input_connection_div">
            <input placeholder='Pseudo' type="text" id="pseudo"></input><input placeholder='password' type="password" id="password"></input>
            </div>
            <div>
                <button>Change my password</button>
            </div>
            <button onClick={(e) => connection()}>Connection</button>
        </div>
    );
};

export default Connection;