import React, { useEffect, useState } from 'react';
import { useNavigate, Redirect  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import './Navbar.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
const Navbar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.user.user)


    function CheckPermissions() {
        console.log(Cookies.get('JWT'))
        if(Cookies.get('JWT') === undefined) {
            Swal.fire({
                title: 'Accès refusé!',
                text: "Vous n'êtes pas connecté",
                icon: 'error',
                confirmButtonText: 'Je me connecte'
            });
        } else {
            const config = {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('JWT')}`
                }
            };
            axios.post("http://localhost:4000/connection/test", {}, config)
                .then(response => {
                    console.log(response)
                    // console.log('Réponse du serveur :', response.data); ==> Réponse du serveur : {role: 'professeur'}
                    if(response.data.role !== "professeur") {
                        Swal.fire({
                            title: 'Accès refusé!',
                            text: 'Vous devez être un professeur pour avoir accès à cette ressource',
                            icon: 'error',
                            confirmButtonText: 'Je comprends'
                        });
                    } else {
                        navigate('/create_exercice');
                    }
                })
                .catch(error => {
                console.error('Erreur de requête :', error);
                });
        }
        
        
    }

    function CheckConnection() {
        //console.log(document.getElementById('connectionLogo').innerHTML)
        if(Cookies.get('JWT') === undefined) {
            navigate('/connection')
        } else {
            navigate('/profile')
        }
    }
    
    return (
        <div id="mainDiv">
            <nav>
                <div>
                    <ul>
                        <li>
                            <a onClick={(e) => navigate('/')}>Home</a>
                        </li>
                        <li>
                            <a onClick={(e) => navigate('/register')}>Création de compte</a>
                        </li>
                        <li>
                            <a onClick={(e) => CheckPermissions()}>Créer un exercice</a>
                        </li>
                        <li>
                            <a onClick={(e) => CheckConnection()}>Connection</a>
                        </li>

                    </ul>
                </div>
            </nav>  
        </div>
    );
};

export default Navbar;