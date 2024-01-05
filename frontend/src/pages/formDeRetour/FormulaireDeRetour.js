import React, { useState } from 'react';
import './FormulaireDeRetour.css'
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import axios from 'axios';

import Navbar from '../../components/navbar/Navbar';
import { Navigate, useNavigate } from 'react-router-dom';

function FormulaireDeRetour() {

    const [resetRequested, setResetRequested] = useState(false);


    const navigate = useNavigate();

    function sendForm() {
        const config = {
            headers: {
                'Authorization': `Bearer ${Cookies.get('JWT')}`
            }
        }


        let email = document.getElementById('emailInputFDR').value;
        let details = document.getElementById('detailReportTextarea').value

        if (document.getElementById('motifRequest').value === "/") {
            Swal.fire({
                title: 'Erreur',
                text: "Veuillez choisir un motif",
                icon: 'error',
                showConfirmButton: false,
                timer: 1000
            });
        } else {
            let motif = document.getElementById('motifRequest').value;

            const data = {
                email: email,
                motif: motif,
                details: details
            }

            axios.post('http://51.77.150.97:4000/user/sendRequest', data, config)
                .then((res) => {
                    console.log(res.data)
                    setResetRequested(true);
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }


    return (
        <div>
            <Navbar />
            {resetRequested ? (
                <div id="textReturnRequest">
                    <h1 className='h12fdr'>Votre demande a bien été reçue !</h1>
                    <h3 className='h3fdr'>Nous ferons notre maximum pour vous répondre le plus vite possible.</h3>
                    <img src="received-message-received.gif" />
                    <br />
                    <button id="buttonHome" onClick={(e) => navigate('/')}>Retourner à la page d'accueil</button>
                </div>
            ) : (
                <div>
                    <div id="introductionFDR">
                        <h1 className='h1fdr'>Nous contacter</h1>
                        <h3 className='h3fdr'>Besoin d'assist ou simplement envie de discuter ? Tu es au bon endroit !</h3>
                    </div>
                    <br />
                    <div>
                        <h3 className='h3fdr'>Envoie nous un email</h3>

                        <div className='formDeRetour'>
                            <p className='pfdr'>Email<span class="required" >*</span></p>
                            <input required id="emailInputFDR" placeholder='Préciser votre email ici' />
                            <p className='pfdr'>Motif<span class="required" >*</span></p>
                            <select id="motifRequest">
                                <option className='optionSelect' value="/">---</option>
                                <option className='optionSelect' value="bug">Informer d'un bug</option>
                                <option className='optionSelect' value="request">Faire une demande</option>
                                <option className='optionSelect' value="report">Signaler un utilisateur</option>
                            </select>
                            <p className='pfdr'>Comment pouvons nous t'aider?<span class="required" >*</span></p>
                            <textarea id="detailReportTextarea" placeholder='Donne nous un maximum de détails sur la situations...'>
                            </textarea>
                        </div>
                    </div>
                    <div>
                        <img className='assistanceImg' src='assistance.png'></img>
                    </div>
                    <br />
                    <button className='buttonfdr' onClick={sendForm}>Envoyer ma demande</button>
                </div>
            )}
        </div>

    );
};

export default FormulaireDeRetour;