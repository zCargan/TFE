import React from 'react';
import axios from 'axios';


const getExos = () => {

    function get_all_exos() {
        axios.get("http://localhost:3001/exercice/get_exercices")
    }

    return (
        <div>
            <p>test components</p>
            <button onClick={get_all_exos}>Click ici</button>
        </div>
    );
};

export default getExos;