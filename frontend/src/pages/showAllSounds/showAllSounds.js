import React, { useEffect, useState } from 'react';
import GetSounds from '../../components/getSoundsFromUserID/getSoundsFromUserID';
import './showAllSounds.css'

const ShowAllSounds = () => {


    return (
        <div>
            <GetSounds />
            <p>Test</p>
        </div>
    );
};

export default ShowAllSounds;