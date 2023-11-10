import React, { useEffect, useState } from 'react';
import './profile.css'
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

    const [id, setId] = useState("")
    const [nom, setNom] = useState("")
    const [role, setRole] = useState("")

    const navigate = useNavigate();

    useEffect(() => {
        const config = {
            headers: {
                'Authorization': `Bearer ${Cookies.get('JWT')}`
            }
        };
        axios.post("http://localhost:4000/connection/infoUser", {}, config)
            .then(response => {
                setNom(response.data.nom)
                if(response.data.role === "eleve") {
                    setRole("éleve")
                } else {
                    setRole(response.data.role)
                }
            })
    })


    function deconnect() {
        Cookies.remove('JWT');
        Swal.fire({
          title: 'Déconnection réussie',
          text: 'Déconnecter avec succès',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
        });
        
        navigate('/');
    }

    function history() {
        navigate('/history')
    }

    return (
        <div>
            <div>
                <Navbar></Navbar>
            </div>
            <div>
                <p>
                    Bienvenu sur votre profil, {nom}
                </p>
                <br>
                </br>
                <p>
                    Vous êtes connecté à un compte: {role}
                </p>
                <br></br>
                <button onClick={(e) => history()}>Voir mon historique d'exercices</button>
                <br></br>
                <button onClick={(e) => deconnect()}>Déconnection</button>
            </div>
        </div>
    );
};

export default Profile;