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

            axios.post('http://localhost:4000/user/sendRequest', data, config)
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
                    <p>Votre demande a bien été reçue !</p>
                    <p>Nous ferons notre maximum pour vous répondre le plus vite possible.</p>
                    <img src="received-message-received.gif" />
                    <br />
                    <button onClick={(e) => navigate('/home')}>Page d'accueil</button>
                </div>
            ) : (
                <div>
                    <div id="introductionFDR">
                        <h1>Nous contacter</h1>
                        <h3>Besoin d'assist ou simplement envie de discuter ? Tu es au bon endroit !</h3>
                    </div>
                    <div>
                        <h2>Envoie un mail</h2>
                        <p>Email<span class="required" >*</span></p>
                        <input required id="emailInputFDR" />
                        <p>Motif<span class="required" >*</span></p>
                        <select id="motifRequest">
                            <option value="/">---</option>
                            <option value="bug">Informer d'un bug</option>
                            <option value="request">Faire une demande</option>
                            <option value="report">Signaler un utilisateur</option>
                        </select>
                        <p>Comment pouvons nous t'aider?<span class="required" >*</span></p>
                        <textarea id="detailReportTextarea" rows={7} cols={60} placeholder='Donne nous un maximum de détails sur la situations...'>
                        </textarea>
                    </div>
                    <button onClick={sendForm}>Envoyer ma demande!</button>
                </div>
            )}
        </div>
    );
};

export default FormulaireDeRetour;