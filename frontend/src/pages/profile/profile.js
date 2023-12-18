import React, { useEffect, useState } from 'react';
import './profile.css'
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import SearchBarAdmin from '../../components/searchBarAdmin/searchBarAdmin';
import SearchBar from '../../components/searchBarAdmin/searchBarAdmin';
import PasswordChanger from '../../components/passwordChanger/passwordChanger';

const Profile = () => {

    const [id, setId] = useState("");
    const [nom, setNom] = useState("");
    const [role, setRole] = useState("");
    const [rolesData, setRolesData] = useState({});
    const [selectedRoles, setSelectedRoles] = useState({});
    const [exercices, setExercices] = useState([]);

    const navigate = useNavigate();

    const config = {
        headers: {
            'Authorization': `Bearer ${Cookies.get('JWT')}`
        }
    };

    useEffect(() => {

        axios
            .post("http://localhost:4000/connection/infoUser", {}, config)
            .then(response => {
                console.log(response.data)
                setNom(response.data.nom)
                if (response.data.role === "eleve") {
                    setRole("éleve")
                } else {
                    setRole(response.data.role)
                }
            })
    }, [])

    useEffect(() => {
        if (role === "professeur") {
            const config = {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('JWT')}`
                }
            };

            axios
                .get('http://localhost:4000/user/getAllExercicesFromProfesseur', config)
                .then((res) => {
                    console.log(res.data);
                    setExercices(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [role]);

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

    function getUsersInformations() {
        const config = {
            headers: {
                'Authorization': `Bearer ${Cookies.get('JWT')}`
            }
        };

        axios
            .get("http://localhost:4000/user/getAllInformationsUsers", {}, config)
            .then((res) => {
                setRolesData(res.data);
                const initialSelectedRoles = {};
                Object.keys(res.data).forEach((nom) => {
                    initialSelectedRoles[nom] = res.data[nom];
                });
                setSelectedRoles(initialSelectedRoles);

            })
            .catch((error) => {
                console.log(error)
            })
    }


    const handleRoleChange = (nom, event) => {
        const newSelectedRoles = { ...selectedRoles, [nom]: event.target.value };
        setSelectedRoles(newSelectedRoles);
    };

    function changeRoleUser(nom) {
        Swal.fire({
            title: 'Êtes-vous sûr?',
            text: 'Cela modifiera le rôle de l\'utilisateur. Voulez-vous continuer?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Confirmer',
            cancelButtonText: 'Annuler',
        }).then((result) => {
            if (result.isConfirmed) {
                let dictionnaireUser = {};
                dictionnaireUser[nom] = document.getElementById(nom).value;

                axios
                    .put('http://localhost:4000/user/updateUserInformations', dictionnaireUser)
                    .then((res) => {
                        Swal.fire('Mise à jour réussie!', '', 'success');
                    })
                    .catch((error) => {
                        Swal.fire('Erreur lors de la mise à jour!', '', 'error');
                    });
            }
        });
    }


    function goToRequest() {
        navigate('/request')
    }

    function deleteExos(idExo, typeExo) {
        console.log(idExo, typeExo)
        axios.delete(`http://localhost:4000/exercice/deleteExo?type=${typeExo}&id=${idExo}`)
    }



    return (
        <div>
            <div>
                <Navbar></Navbar>
            </div>
            <div>
                {role === "eleve" ? (
                    <div>
                        <br />
                        <h3>Bienvenue sur votre profil, {nom}</h3>
                        <p>Vous êtes connecté à un compte {role}</p>
                        <button onClick={(e) => history()}>Voir mon historique d'exercices</button>
                        <br />
                        <br />
                        <PasswordChanger text={"Changer mon mot de passe"} />
                        <br />
                        <br />
                        <button onClick={goToRequest}>Effectuer une requête</button>
                    </div>
                ) : (
                    <div>
                        {role === "professeur" ? (
                            <div>
                                <br />
                                <h3>Bienvenue sur votre profil, {nom}</h3>
                                <p>Vous êtes connecté à un compte {role}</p>
                                <button onClick={(e) => history()}>Voir mon historique d'exercices</button>
                                <br />
                                <br />
                                <div>
                                    {exercices && exercices.length > 0 && (
                                        <div>
                                            {exercices.map((element) => (
                                                element && (
                                                    <div key={element._id} className='divExoDelete'>
                                                        <p>Nom : {element.nom}</p>
                                                        <button onClick={(e) => deleteExos(element._id, element.type)}>Supprimer cet exercice</button>
                                                    </div>
                                                )
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <br />
                                <br />
                                <PasswordChanger text={"Changer mon mot de passe"} />
                                <br />
                                <br />
                                <button onClick={goToRequest}>Effectuer une requête</button>
                            </div>
                        ) : (
                            <div>
                                <br />
                                <h3>Bienvenue sur votre profil, {nom}</h3>
                                <p>Vous êtes connecté à un compte {role}</p>
                                <br />
                                <p>Ici, vous pourrez gérer toute la gestion des utilisateurs</p>
                                <button onClick={getUsersInformations}>Manager les utilisateurs</button>
                                <div id='managementUsers' />
                                <br />
                                <div className="container">
                                    {Object.entries(rolesData).map(([nom, role]) => (
                                        <div key={nom} className="divUserInformation">
                                            <p>{nom} : </p>
                                            <select value={selectedRoles[nom]} onChange={(event) => handleRoleChange(nom, event)} id={nom}>
                                                <option value="professeur">Professeur</option>
                                                <option value="eleve">Élève</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                            <button onClick={() => changeRoleUser(nom)}>Confirmer</button>
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <p>Gérer les exercices :
                                    </p>
                                    <SearchBarAdmin />
                                </div>
                                <br />
                                <PasswordChanger text={"Changer mon mot de passe"} />
                                <br />
                                <br />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;