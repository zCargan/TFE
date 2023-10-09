import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const Test = () => {

    const [data, setData] = useState("");
    const [infos, setInfos] = useState("informations")
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.user.user)

    function testenvoi () {
        const donnéesdetest = {
            "nom": data
        }
        axios.post("http://localhost:3001/exercice", donnéesdetest)
    }

    function testPQ () {
        console.log(tasks.loggedIn)
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

    function logout_window () {
        
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
                <button onClick={(e) => logout_window()}>Déconnection</button>
            </div>
            <div>
                {infos}
            </div>
        </div>
    );
};

export default Test;