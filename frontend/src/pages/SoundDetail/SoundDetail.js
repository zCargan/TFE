import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
const SoundDetail = () => {
    const { state } = useLocation();
    const { son } = state;

    const navigate = useNavigate();

    function seeDetails() {
        console.log(son);
    }

    function renameSound() {
        console.log("rename sound")
        let newName = document.getElementById('newName').value;

        const config = {
            headers: {
                'Authorization': `Bearer ${Cookies.get('JWT')}`,
                'Content-Type': 'application/json' // Utilisation de 'application/json' pour le Content-Type
            }
        };

        const data = {
            newNameValue: newName
        };

        axios.post(`http://localhost:4000/sound/changeName/${son.id}`, data, config).then((res) => {
            Swal.fire({
                icon: 'success',
                title: 'Mise à jour réussie',
                showCancelButton: false,
                confirmButtonText: 'OK',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/showAllSound')
                }
            });

        })
    }


    function deleteSound () {


        const config = {
            headers: {
                'Authorization': `Bearer ${Cookies.get('JWT')}`,
                'Content-Type': 'application/json' // Utilisation de 'application/json' pour le Content-Type
            }
        };

        axios.delete(`http://localhost:4000/sound/deleteSound/${son.id}`, {}, config).then((res) => {
            Swal.fire({
                icon: "success",
                title: "Son supprimée avec succès",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/showAllSound')
        }).catch((error) => {
            console.log(error)
        })
    }

    function downloadSound() {
        const son_data = son.son_data

        const blob = new Blob([son_data.data], { type: 'audio/mpeg' });

        const blobUrl = URL.createObjectURL(blob);

        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = `${son.nom_d_origine}.mp3`; // Nom du fichier à télécharger

        document.body.appendChild(downloadLink);

        downloadLink.click();

        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(blobUrl);
    }

    return (
        <div>
            <Navbar />
            <p>{son.nom_d_origine}</p>
            <br />
            <audio controls>
                <source src={URL.createObjectURL(new Blob([new Uint8Array(son.son_data.data)], { type: 'audio/mpeg' }))} type="audio/mpeg" />
                Votre navigateur ne supporte pas l'élément audio.
            </audio>
            <br />
            <input placeholder='Nouveau nom de votre son' id="newName"></input><button onClick={renameSound}>Renommer</button>
            <button onClick={downloadSound}>Download</button>
            <button onClick={deleteSound}>Supprimer</button>
        </div>
    );
};

export default SoundDetail;