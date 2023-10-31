import React, { useEffect, useState } from 'react';
import { useNavigate, Redirect  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';


const Navbar = () => {
    const [username, setUsername] = useState("Not connected");
    const [role, setRole] = useState("/")

    const navigate = useNavigate();
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
        //console.log(Cookies.get('JWT'))
        
        const config = {
            headers: {
                'Authorization': `Bearer ${Cookies.get('JWT')}`
            }
        };
        console.log("on passe ici")
        axios.post("http://localhost:4000/connection/test", {}, config)
            .then(response => {
                console.log("et ici aussi")
                // Traiter la réponse du serveur
                console.log('Réponse du serveur :', response.data);
                if(response.data.role !== "professeur") {
                    alert("Vous devez avoir un compte professeur pour avoir accès à cette ressource") 
                } else {
                    //navigate('/create_exercice');
                    console.log("tout va bien ici")
                }
            })
            .catch(error => {
                // Gérer les erreurs de la requête
            console.error('Erreur de requête :', error);
            });
        
    }

    
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