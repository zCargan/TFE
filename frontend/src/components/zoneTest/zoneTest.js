import React from 'react';
import Popup from 'reactjs-popup';

const zoneTest = () => {

    function functionZoneTest() {
      console.log("zone test")
    }

    return (
        <div>
            <button onClick={functionZoneTest}>Bouton Zone Test</button>
        </div>
    );
};

export default zoneTest;