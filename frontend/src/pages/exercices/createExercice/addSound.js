import React, { useState } from 'react';
import axios from 'axios';
import './addSound.css';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

const AddSound = () => {
  const [audioFile, setAudioFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAudioFile(file);
  };

  const handleSubmit = async (event) => {

    let newNameValue = document.getElementById("newNameAudio").value;

    if (newNameValue === '') {
      Swal.fire({
        title: 'Attention',
        text: 'Veuillez saisir un nom',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
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
        const response = await axios.post('https://www.laclassedemadameseverine.be:4000/sound/postSound', formData, config);

        console.log('Réponse du serveur :', response.data);

      } catch (error) {
        console.error('Erreur lors de l\'envoi du fichier audio :', error);
      }
    }
  };

  return (
    <div>
      <h2>Ajouter un fichier audio</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="audio/*" onChange={handleFileChange} />
        <input id="newNameAudio" placeholder='Ecrivez ici le nouveau nom de votre fichier'></input>
        <button type="submit">Uploader</button>
      </form>
    </div>
  );
};

export default AddSound;
