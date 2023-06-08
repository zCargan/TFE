import React from 'react';
import axios from 'axios';
import { storeTest } from '../../redux'
import { Provider, useDispatch, useSelector } from 'react-redux';
import './connection.css'

const Connection = (props) => {

    const connected = useSelector(state => state.connected);
    const status = 'Non'

    const dispatch = useDispatch

    if(connected) {
        status = 'Oui'
    }
    
    console.log(connected)

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
                    dispatch({
                        type:"connected/changeConnected"
                    })
                }
            })
            .catch(response => {
                console.log(response)
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
                <div>

                </div>     
            </div>
    );
};

export default Connection;