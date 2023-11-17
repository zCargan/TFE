import React from 'react';

const ShowRandomExos = (props) => {
    const { randomExos } = props;

    function seeExos() {
        console.log(randomExos)
    }

    return (
        <div>
            <button onClick={seeExos}>Voir l'exos</button>
        </div>
    );
};

export default ShowRandomExos;