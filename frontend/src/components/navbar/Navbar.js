import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
    const [username, setUsername] = useState("Not connected");
    const [role, setRole] = useState("/")


    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.user.user)

    useEffect(() => {
        if(tasks) {
            console.log(tasks)
            setUsername("Welcome " + tasks.pseudo)
            setRole(tasks.role)
        }
      });

    function go_to_create_exercice() {
        if(role == "professeur") {
            navigate('/create_exercice')
        } else {
            alert("Vous n'êtes pas enregistrer comme professeur")
        }
    }

    const navigate = useNavigate();
    return (
        <div>
            <nav>
                <div>
                    <ul>
                        <li>
                            <a onClick={(e) => navigate('/')}>Home</a>
                        </li>
                        <li>
                            <a onClick={(e) => navigate('/connection')}>Connection</a>
                        </li>
                        <li>
                            <a onClick={(e) => navigate('/register')}>Création de compte</a>
                        </li>
                        <li>
                            <a onClick={(e) => go_to_create_exercice()}>Créer un exercice</a>
                        </li>
                    </ul>
                </div>
            </nav>  
        </div>
    );
};

export default Navbar;