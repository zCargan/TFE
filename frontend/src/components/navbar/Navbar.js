import React, { useEffect, useState } from 'react';
import { useNavigate, Redirect  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import './Navbar.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { FaUserAlt } from 'react-icons/fa';
import Popup from 'reactjs-popup';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.exercices.exercice)
    const [popupOpen, setPopupOpen] = useState(false);
    const [username, setUsername] = useState("")
    const [role, setRole] = useState("")

    function handleUserIconHover() {
        setPopupOpen(true);
    }

    function handleUserIconLeave() {
        setPopupOpen(false);
    }

    useEffect(() => {
        const config = {
            headers: {
                'Authorization': `Bearer ${Cookies.get('JWT')}`
            }
        };
        axios.post("http://localhost:4000/connection/checkToken", {}, config)
            .then(response => {
                setUsername(response.data.username)
                if(response.data.role === "eleve") {
                    setRole("élève")
                } else {
                    setRole(response.data.role)
                }
                // console.log('Réponse du serveur :', response.data); ==> Réponse du serveur : {role: 'professeur'}
            })
            .catch(error => {
            console.error('Erreur de requête :', error);
            });
    })

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
            axios.post("http://localhost:4000/connection/checkToken", {}, config)
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

    function history() {
        navigate('/history')
    }

    function deconnect() {
        Cookies.remove('JWT');
        Swal.fire({
          title: 'Déconnection réussie',
          text: 'Déconnecter avec succès',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
        });
        setTimeout(() => {
            window.location.reload();
          }, 1500);
    }

    function connection() {
        const pseudo = document.getElementById('usernamePopup').value;
        const password = document.getElementById('passwordPopup').value;
        const data_to_send = {
          pseudo: pseudo,
          password: password,
        };
        console.log(data_to_send)
        axios
          .post('http://localhost:4000/connection', data_to_send)
          .then((response) => {
            console.log(response.data)
            Cookies.set('JWT', response.data.token , { expires: 1 }); // 'expires' dénote la durée de validité en jours
            Swal.fire({
                title: 'Bonjour '+ response.data.nom + '!',
                text: 'Vous êtes connecté !',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
              });
              navigate('/')
          })
          .catch((error) => {
            console.log(error)
          })
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
                            <Popup
                                trigger={
                                    <a
                                        onMouseEnter={handleUserIconHover}
                                        onMouseLeave={handleUserIconLeave}
                                    >
                                        <div>
                                            <FaUserAlt />
                                        </div>
                                    </a>
                                }
                                position="bottom center"
                                open={popupOpen}
                                on="hover"
                                closeOnDocumentClick
                            >
                                <div id="popupConnection">
                                    {username !== "" ? (
                                        <div>
                                            <br />
                                            <h3>Bienvenu sur votre profil</h3>
                                            <p>Bonjour {username} !</p>
                                            <p>Vous êtes connecté à un compte {role}</p>
                                            <button onClick={(e) => history()}>Voir mon historique d'exercices</button>
                                            <br />
                                            <button onClick={(e) => navigate('/profile')}>Accéder à mon profil</button>
                                            <br />
                                            <LogoutIcon onClick={(e) =>deconnect()}></LogoutIcon>
                                        </div>
                                    ) : (
                                        <div>
                                            <h3>Vous êtes non connecté</h3>
                                            <button onClick={(e) => navigate('/register')}>Se créer un compte</button>
                                            <h2>Ou se connecter :</h2>
                                            <input placeholder="Nom d'utilisateur" id="usernamePopup"></input>
                                            <br />
                                            <input placeholder='Mot de passe' type="password" id="passwordPopup"></input>
                                            <br></br>
                                            <button onClick={(e) => connection()}>Me connecter</button>
                                        </div>
                                    )}
                                </div>
                            </Popup>
                        </li>
                        
                    </ul>   
                </div>
            </nav>  
        </div>
    );
};

export default Navbar;