import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';
import ShowRandomExos from '../../components/showRandomExos/showRandomExos';
import './getExercicesBySearchBar.css';
import Swal from 'sweetalert2';

const GetExercicesBySearchBar = () => {
    const [MB, setMB] = useState([]);
    const [LDN, setLDN] = useState([]);
    const [MDN, setMDN] = useState([]);
    const [abaque, setAbaque] = useState([]);
    const [TAT, setTAT] = useState([]);
    const [STT, setSTT] = useState([]);
    const [TTI, setTTI] = useState([]);

    const getMBCalledRef = useRef(false);

    const navigate = useNavigate();

    const location = useLocation();
    const { anneeScolaire, rechercheSpecifique, matiere } = location.state;

    useEffect(() => {
        if (!getMBCalledRef.current) {
            getExos();
            getMBCalledRef.current = true;
        }

    }, []);

    function getExos() {
        let data = {
            anneeScolaire: anneeScolaire,
            rechercheSpecifique: rechercheSpecifique,
            matiere: matiere,
        };



        axios
            .post('http://localhost:4000/exercice/getExosFromRequest', data)
            .then((res) => {
                console.log(res.data)
                const cles = Object.keys(res.data.data);
                const valeurs = Object.values(res.data.data);
                console.log('Clés:', cles);
                if ((valeurs.length) === 0) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erreur',
                        text: 'Aucun exercice trouvé',
                        confirmButtonText: 'OK',
                      }).then((result) => {
                        if (result.isConfirmed) {
                            navigate('/home')
                        }
                      });
                } else {
                    for (let i = 0; i < valeurs.length; i++) {
                        const cleActuelle = cles[i];
                        const valeurActuelle = valeurs[i];

                        console.log(valeurActuelle)

                        switch (valeurActuelle) {
                            case 'MB':
                                axios
                                    .get(`http://localhost:4000/exercice/getMB/${cleActuelle}`)
                                    .then((res) => {
                                        if (!MB.some((item) => item.id === res.data.id)) {
                                            setMB((prevMB) => [...prevMB, res.data]);
                                        }
                                    });
                                break;
                            case 'LDN':
                                axios
                                    .get(`http://localhost:4000/exercice/getLDN/${cleActuelle}`)
                                    .then((res) => {
                                        if (!LDN.some((item) => item.id === res.data.id)) {
                                            setLDN((prevLDN) => [...prevLDN, res.data]);
                                        }
                                    });
                                break;
                            case 'MDN':
                                axios
                                    .get(`http://localhost:4000/exercice/getMDN/${cleActuelle}`)
                                    .then((res) => {
                                        if (!MDN.some((item) => item.id === res.data.id)) {
                                            setMDN((prevMDN) => [...prevMDN, res.data]);
                                        }
                                    });
                                break;
                            case 'abaque':
                                axios
                                    .get(`http://localhost:4000/exercice/getAbaque/${cleActuelle}`)
                                    .then((res) => {
                                        if (!abaque.some((item) => item.id === res.data.id)) {
                                            setAbaque((prevAbaque) => [...prevAbaque, res.data]);
                                        }
                                    });
                                break;
                            case 'TAT':
                                axios
                                    .get(`http://localhost:4000/exercice/getTAT/${cleActuelle}`)
                                    .then((res) => {
                                        if (!TAT.some((item) => item.id === res.data.id)) {
                                            setTAT((prevTAT) => [...prevTAT, res.data]);
                                        }
                                    });
                                break;
                            case 'STT':
                                console.log("on est la")
                                axios
                                    .get(`http://localhost:4000/exercice/getSTTexo/${cleActuelle}`)
                                    .then((res) => {
                                        if (!STT.some((item) => item.id === res.data.id)) {
                                            setSTT((prevSTT) => [...prevSTT, res.data]);
                                        }
                                    });
                                break;
                            case 'TTI':
                                axios
                                    .get(`http://localhost:4000/exercice/getTTI/${cleActuelle}`)
                                    .then((res) => {
                                        if (!TTI.some((item) => item.id === res.data.id)) {
                                            setTTI((prevTTI) => [...prevTTI, res.data]);
                                        }
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


    return (
        <div>
            <Navbar />
            {abaque.map((randomExos, index) => (
                <ShowRandomExos key={index} randomExos={randomExos} />
            ))}
            {MDN.map((randomExos, index) => (
                <ShowRandomExos key={index} randomExos={randomExos} />
            ))}
            {TAT.map((randomExos, index) => (
                <ShowRandomExos key={index} randomExos={randomExos} />
            ))}
            {LDN.map((randomExos, index) => (
                <ShowRandomExos key={index} randomExos={randomExos} />
            ))}
            {STT.map((randomExos, index) => (
                <ShowRandomExos key={index} randomExos={randomExos} />
            ))}
            {TTI.map((randomExos, index) => (
                <ShowRandomExos key={index} randomExos={randomExos} />
            ))}
            {MB.map((randomExos, index) => (
                <ShowRandomExos key={index} randomExos={randomExos} />
            ))}
        </div>
    );
};

export default GetExercicesBySearchBar;
