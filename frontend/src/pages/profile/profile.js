import React, { useEffect, useState, useRef } from 'react';
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

    const getMBCalledRef = useRef(false);

    const [id, setId] = useState("");
    const [nom, setNom] = useState("");
    const [role, setRole] = useState("");
    const [rolesData, setRolesData] = useState({});
    const [selectedRoles, setSelectedRoles] = useState({});
    const [exercices, setExercices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageUser, setCurrentPageUser] = useState(1);
    const exercicesPerPage = 4;
    const itemsPerPageRoles = 5;


    const sortedRolesEntries = Object.entries(rolesData).sort(([a], [b]) => b.localeCompare(a)); // Tri par ordre décroissant
    const indexOfLastRole = currentPageUser * itemsPerPageRoles;
    const indexOfFirstRole = indexOfLastRole - itemsPerPageRoles;
    const currentRolesPage = sortedRolesEntries.slice(indexOfFirstRole, indexOfLastRole);

    const totalPagesRoles = Math.ceil(sortedRolesEntries.length / itemsPerPageRoles);


    const navigate = useNavigate();

    const config = {
        headers: {
            'Authorization': `Bearer ${Cookies.get('JWT')}`
        }
    };

    useEffect(() => {

        axios
            .post("http://51.77.150.97:4000/connection/infoUser", {}, config)
            .then(response => {
                console.log(response.data)
                setNom(response.data.nom)
                if (response.data.role === "eleve") {
                    setRole("éleve")
                } else {
                    setRole(response.data.role)
                }
                if (response.data.role === "admin") {
                    getUsersInformations();
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
                .get('http://51.77.150.97:4000/user/getAllExercicesFromProfesseur', config)
                .then((res) => {
                    console.log(res.data);
                    setExercices(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [role]);

    useEffect(() => {
        console.log(role)
        console.log(role === "admin")
        if (role === "admin") {
            getUsersInformations();
        }
    }, []);



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
            .get("http://51.77.150.97:4000/user/getAllInformationsUsers", {}, config)
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
                    .put('http://51.77.150.97:4000/user/updateUserInformations', dictionnaireUser)
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
        axios.delete(`http://51.77.150.97:4000/exercice/deleteExo?type=${typeExo}&id=${idExo}`)
            .then((res) => {
                if (res.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Exercice supprimé avec succès',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        window.location.reload();
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Une erreur est survenue lors de la suppression de l\'exercice',
                        confirmButtonText: 'OK'
                    });
                }
            })
    }

    const reversedExercices = [...exercices].reverse();

    const indexOfLastExercice = currentPage * exercicesPerPage;
    const indexOfFirstExercice = indexOfLastExercice - exercicesPerPage;
    const currentExercices = reversedExercices.slice(indexOfFirstExercice, indexOfLastExercice);




    return (
        <div id="divProfile">
            <div>
                <Navbar></Navbar>
            </div>
            <div>
                {role === "éleve" ? (
                    <div>
                        <br />
                        <br />
                        <h3 className='welcomeUsername'>Bienvenue sur votre profil, <span className='roleUser'>{nom}</span></h3>
                        <div id="compteConnecte">
                            <p className='pConnectionE'>Vous êtes connecté à un compte <span className='roleUser'>{role}</span></p>
                        </div>
                        <div className='divButton2'>
                            <div>
                                <button className="buttonProfile" onClick={(e) => history()}>Voir mon historique d'exercices</button>
                            </div>
                            <div>
                                <button className="buttonProfile" onClick={(e) => navigate('/reset-password')}>Changer mon mot de passe</button>
                            </div>
                            <div>
                                <button className="buttonProfile" onClick={goToRequest}>Effectuer une requête</button>
                            </div>
                            <div>
                                <img className='eleveImg' src='b11.webp'></img>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        {role === "professeur" ? (
                            <div>
                                <br />
                                <h3 className='welcomeUsername'>Bienvenue sur votre profil, <span className='roleUser'>{nom}</span></h3>
                                <div id="compteConnecte">
                                    <p className='pConnection'>Vous êtes connecté à un compte <span className='roleUser'>{role}</span></p>
                                </div>
                                <div id="divExos">
                                    <h3 className='h3exoslist'>Listes de vos exercices</h3>
                                    {currentExercices.map((element) => (
                                        element && (
                                            <div key={element._id} className='divExoDelete'>
                                                <p>Nom : <span className='nameElement'>{element.nom}</span></p>
                                                <button className='buttonDeleteExo' onClick={(e) => deleteExos(element._id, element.type)}>Supprimer cet exercice</button>
                                            </div>
                                        )
                                    ))}
                                    <div>
                                        {currentPage > 1 && (
                                            <button className="buttonProfile" onClick={() => setCurrentPage(currentPage - 1)}>Précédent</button>
                                        )}
                                        {currentPage < Math.ceil(reversedExercices.length / exercicesPerPage) && (
                                            <button className="buttonProfile" onClick={() => setCurrentPage(currentPage + 1)}>Suivant</button>
                                        )}
                                    </div>
                                </div>
                                <div className='textProfile'>

                                </div>
                                <div className='divButton'>
                                    <div>
                                        <button className="buttonProfile" onClick={(e) => history()}>Voir mon historique d'exercices</button>
                                    </div>
                                    <div>
                                        <button className="buttonProfile" onClick={(e) => navigate('/reset-password')}>Changer mon mot de passe</button>
                                    </div>
                                    <div>
                                        <button className="buttonProfile" onClick={goToRequest}>Effectuer une requête</button>
                                    </div>
                                    <div>
                                        <img className='profImg' src='prof.png'></img>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <br />
                                <h3 className='welcomeUsername'>Bienvenue sur votre profil, <span className='roleUser'>{nom}</span></h3>
                                <div id="compteConnecteAdmin">
                                    <p>Vous êtes connecté à un compte <span className='roleUser'>{role}</span></p>
                                </div>
                                <div className="container">
                                    <h3 className='h3exoslistUser'>Gérer ici vos utilisateurs</h3>
                                    {currentRolesPage.map(([nom, role]) => (
                                        <div key={nom} className="divUserInformation">
                                            <p className='userNameRole'>{nom} :  </p>
                                            <select className='selectUserRole' value={selectedRoles[nom]} onChange={(event) => handleRoleChange(nom, event)} id={nom}>
                                                <option value="professeur">Professeur</option>
                                                <option value="eleve">Élève</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                            <button className="changeRoleButton" onClick={() => changeRoleUser(nom)}>Confirmer</button>
                                        </div>
                                    ))}
                                    <br />
                                    <div>
                                        <button className="buttonProfile" onClick={() => setCurrentPageUser(1)}>Première page</button>
                                        {currentPageUser > 1 && (
                                            <button className="buttonProfile" onClick={() => setCurrentPageUser(currentPageUser - 1)}>Précédent</button>
                                        )}
                                        {currentPageUser < totalPagesRoles && (
                                            <button className="buttonProfile" onClick={() => setCurrentPageUser(currentPageUser + 1)}>Suivant</button>
                                        )}
                                        <button className="buttonProfile" onClick={() => setCurrentPageUser(totalPagesRoles)}>Dernière page</button>
                                    </div>
                                </div>
                                <div id="SearchBarAdmin">
                                    <SearchBarAdmin />
                                </div>
                                <div>
                                    <button id="resetPasswordAdmin" className="buttonProfile" onClick={(e) => navigate('/reset-password')}>Changer mon mot de passe</button>
                                </div>

                                <div>
                                    <img className='adminImg' src='geek-removebg.png'></img>
                                </div>
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