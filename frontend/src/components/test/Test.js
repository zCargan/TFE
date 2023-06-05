import React, { useState } from 'react';
import axios from 'axios';

const Test = () => {

    const [data, setData] = useState("");
    const [infos, setInfos] = useState("informations")

    function testenvoi () {
        const donnéesdetest = {
            "nom": data
        }
        axios.post("http://localhost:3001/exercice", donnéesdetest)
    }

    function testPQ () {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const data_to_send = {
            "username": username,
            "password": password 
        }
        console.log(data_to_send)
        axios.post("http://localhost:3001/test/sendData", data_to_send)
    }

    function testPQ2 () {
        console.log('ici')
        axios.post("http://localhost:3001/test")
        .then(res => {
            setInfos(res.data)
            console.log(res.data[0].nom)
        })
        .catch(err => console.log(err));
    }

    return (
        <div>
            <div>
                <p>Div de test test</p>
                <input onChange={(e) => setData(e.target.value)}></input>
                <button onClick={(e) => testenvoi()}>Click ici</button>
            </div>
            <div>
                <p>==========================================</p>
                <input placeholder='username' type="text" id="username"></input><input placeholder='password' type="password" id="password"></input>
                <br></br>
                <button onClick={(e) => testPQ()}>Post Data</button>
                <button onClick={(e) => testPQ2()}>Post Data hardcode</button>
            </div>
            <div>
                {infos}
            </div>
        </div>
    );
};

export default Test;