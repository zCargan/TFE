import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import Navbar from '../../components/navbar/Navbar';

const UploadSound = () => {
  const [audioFile, setAudioFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAudioFile(file);
  };

  const handleSubmit = async (event) => {

    let newNameValue = document.getElementById("newNameAudio").value;

    if (newNameValue === '') {
        alert("Veuillez saisir un nom.");
    } else {

        const config = {
            headers: {
                'Authorization': `Bearer ${Cookies.get('JWT')}`,
                'Content-Type': 'multipart/form-data'
            }
        };

        event.preventDefault();

        if (!audioFile) {
            console.log("Aucun fichier audio sélectionné.");
            return;
        }

        const formData = new FormData();
        formData.append('audio', audioFile);
        formData.append('name', newNameValue);

        try {
            const response = await axios.post('http://localhost:4000/sound/postSound', formData, config);

            console.log('Réponse du serveur :', response.data);

        } catch (error) {
            console.error('Erreur lors de l\'envoi du fichier audio :', error);
        }
    }
  };

  return (
    <div>
      <Navbar />
      <h1 className='h12fdr'>Uploader un fichier audio</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="audio/*" onChange={handleFileChange} />
        <input id="newNameAudio" placeholder='Ecrivez ici le nouveau nom de votre fichier'></input>
        <button type="submit">Uploader</button>
      </form>
    </div>
  );
};

export default UploadSound;
