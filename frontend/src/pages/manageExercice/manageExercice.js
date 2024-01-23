import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';
import ShowRandomExos from '../../components/showRandomExos/showRandomExos';
import './manageExercice.css'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const ManageExercice = () => {
    const [exos, setExos] = useState([]);

    const [nonVide, setNonVide] = useState(true);

    const getMBCalledRef = useRef(false);
    const navigate = useNavigate();

    const location = useLocation();
    const { anneeScolaire, rechercheSpecifique, matiere } = location.state;

    const config = {
        headers: {
            'Authorization': `Bearer ${Cookies.get('JWT')}`,
            'Content-Type': 'application/json'
        }
    };

    useEffect(() => {
        if (!getMBCalledRef.current) {
            getExos();
            getMBCalledRef.current = true;
        }

    }, []);

    const typeImages = {
        MDN: 'mdn.png',
        abaque: 'abaque.png',
        TTI: 'tti.png',
        LDN: 'LDN.png',
        TAT: 'TAT.png',
        MB: 'MB.png',
        STT: 'stt.png'
    };



    function getExos() {
        let data = {
            anneeScolaire: anneeScolaire,
            rechercheSpecifique: rechercheSpecifique,
            matiere: matiere,
        };

        console.log(data)

        axios
            .post('https://www.laclassedemadameseverine.be:4000/exercice/getExosFromRequest', data)
            .then((res) => {
                console.log(res.data.data)
                if (Object.keys(res.data.data).length === 0) {
                    setNonVide(false)
                } else {
                    const cles = Object.keys(res.data.data);
                    const valeurs = Object.values(res.data.data);
                    console.log('Clés:', cles);
                    console.log('Valeurs:', valeurs);

                    for (let i = 0; i < valeurs.length; i++) {
                        const cleActuelle = cles[i];
                        const valeurActuelle = valeurs[i];

                        console.log(valeurActuelle)

                        switch (valeurActuelle) {
                            case 'MB':
                                axios
                                    .get(`https://www.laclassedemadameseverine.be:4000/exercice/getMB/${cleActuelle}`)
                                    .then((res) => {
                                        setExos(res.data)

                                    });
                                break;
                            case 'LDN':
                                axios
                                    .get(`https://www.laclassedemadameseverine.be:4000/exercice/getLDN/${cleActuelle}`)
                                    .then((res) => {
                                        setExos(res.data)

                                    });
                                break;
                            case 'MDN':
                                axios
                                    .get(`https://www.laclassedemadameseverine.be:4000/exercice/getMDN/${cleActuelle}`)
                                    .then((res) => {
                                        setExos(res.data)

                                    });
                                break;
                            case 'abaque':
                                axios
                                    .get(`https://www.laclassedemadameseverine.be:4000/exercice/getAbaque/${cleActuelle}`)
                                    .then((res) => {
                                        setExos(res.data)

                                    });
                                break;
                            case 'TAT':
                                axios
                                    .get(`https://www.laclassedemadameseverine.be:4000/exercice/getTAT/${cleActuelle}`)
                                    .then((res) => {
                                        setExos(res.data)

                                    });
                                break;
                            case 'STT':
                                axios
                                    .get(`https://www.laclassedemadameseverine.be:4000/exercice/getSTT/${cleActuelle}`)
                                    .then((res) => {
                                        setExos(res.data)

                                    });
                                break;
                            case 'TTI':
                                axios
                                    .get(`https://www.laclassedemadameseverine.be:4000/exercice/getTTI/${cleActuelle}`)
                                    .then((res) => {
                                        setExos(res.data)
                                    });
                                break;
                            default:
                                console.log('Valeur inattendue:', valeurActuelle);
                        }
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }

    function supprimerExos() {

        let data = {
            type: exos.type,
            id: exos._id
        }


        axios.delete(`https://www.laclassedemadameseverine.be:4000/exercice/deleteExoById`, { data }, config)
            .then((res) => {
                console.log(res.status)
                if (res.status === 200) {
                    Swal.fire({
                        title: 'Suppression réussie',
                        text: 'Supprimer avec succès',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1000
                    });
                    setTimeout(() => {
                        navigate('/profile');
                    }, 1000);
                }
            })
            .catch((error) => {
                console.log(error)
            })

        console.log(exos._id)
    }


    return (
        <div>
            <Navbar />
            {nonVide ? (
            <div>
                <div className="showRandomExosContainer">
                    <div className="imageAndTypeContainer">
                        <div className="imageContainer">
                            <img src={typeImages[exos.type]} alt="Type d'exercice" />
                        </div>
                        <div>
                            <h3>Type de l'exercice :</h3><p>{exos.type}</p>
                        </div>
                    </div>
                    <div className="infoContainer">
                        <div>
                            <p><span class='SRE'>Titre : </span>{exos.nom}</p>
                            <p><span class='SRE'>Description : </span>{exos.description}</p>
                            <p><span class='SRE'>Année scolaire visée : </span>{exos.anneeScolaire}</p>
                        </div>
                    </div>
                    <div>
                        <button className='buttonGlobalCSS' onClick={(e) => supprimerExos()}>Supprimer</button>
                    </div>
                </div>
            </div>
            ) : (
            <div>
                <h1 className='AucunElem'>Aucun élément trouvé!</h1>
                <button className='buttonGlobalCSS' onClick={(e) => navigate('/profile')}>Retourner sur mon profil</button>
            </div>    
            )}
        </div>
    );
};

export default ManageExercice;
