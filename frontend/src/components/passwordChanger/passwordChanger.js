import React from 'react';
import { useNavigate } from 'react-router-dom';

const PasswordChanger = (props) => {

    const navigate = useNavigate();

    return (
        <div>
            <button onClick={(e) => navigate('/reset-password')}>{props.text}</button>
        </div>
    );
};

export default PasswordChanger;
