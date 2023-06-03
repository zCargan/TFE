import React, { useState } from 'react';
import axios from 'axios';

const Test = () => {

    const [data, setData] = useState("");

    function testenvoi () {
        const donnéesdetest = {
            "nom": data
        }
        axios.post("http://localhost:3001/exercice", donnéesdetest)
    }

    return (
        <div>
            <div>
                <p>Div de test test</p>
                <input onChange={(e) => setData(e.target.value)}></input>
                <button onClick={(e) => testenvoi()}>Click ici</button>
            </div>
        </div>
    );
};

export default Test;