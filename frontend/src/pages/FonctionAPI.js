import { useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router-dom';

//================================================================================================== FONCTIONS INTEGRATIONS ===================================================================================================

// Permet de se connecter à la base de données
export function useConnection() {

    const navigate = useNavigate();

    const connection = (pseudo, password) => {


        const hashedPassword = bcrypt.hashSync(password, "$2a$10$sZk/IsTrgMV.iO0dRgU/xu");

        const data_to_send = {
            pseudo: pseudo,
            password: hashedPassword,
        };

        axios
            .post('http://51.77.150.97:4000/connection', data_to_send)
            .then((response) => {

                console.log(response)

                let nom = response.data.nom;
                Cookies.set('JWT', response.data.token, { expires: 1 });

                if (response.data.role === "eleve") {
                    Swal.fire({
                        title: 'Bonjour ' + nom + ' !',
                        text: 'Vous êtes connecté !',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    setTimeout(() => {
                        navigate('/home');
                    }, 2000);
                } else if (response.data.role === "professeur") {
                    Swal.fire({
                        title: 'Bonjour ' + nom + ' !',
                        text: 'Vous êtes connecté à un compte professeur',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    setTimeout(() => {
                        navigate('/home');
                    }, 2000);
                } else if (response.data.role === "admin") {
                    Swal.fire({
                        title: 'Bonjour ' + nom + ' !',
                        text: 'Vous êtes connecté à un compte admin',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    setTimeout(() => {
                        navigate('/home');
                    }, 2000);
                }
            })
            .catch((response) => {
                console.log(response);
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: 'Email ou mot de passe incorrect',
                });
            });
    };
    return { connection };
}
