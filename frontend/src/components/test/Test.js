import React, { useState } from 'react';
import axios from 'axios';
import IMG from '../IMGbackground/imgbackground'

const Test = () => {

    const [data, setData] = useState("");
    const [infos, setInfos] = useState("informations")


    function testenvoi () {
        console.log("on teste des trucs")
    }


    function testPQ2 () {
        console.log('ici')
        axios.post("http://localhost:4000/test")
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
            </div>
            <div>
                {infos}
            </div>
            <IMG />
        </div>
    );
};

export default Test;