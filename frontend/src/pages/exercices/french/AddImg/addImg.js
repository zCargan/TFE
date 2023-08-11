import {React, useState} from 'react';
import axios from 'axios';
import './addImg.css'
import { json } from 'react-router-dom';

const TextLinkImage = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [arrayImages, setArrayImages] = useState([])
    const [length, setLength] = useState(0)

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file)); 
    };

    function valideImg() {
        console.log('on passe par ici')
        let image = document.getElementById("imgExercice").files[0];
        let name = document.getElementById("newName").value;
      
        const formData = new FormData();
        formData.append('photo', image);
        formData.append('name', name);
      
        const file = formData.get('photo');

        if (file) {
        console.log('File name:', file.name);
        console.log('File size:', file.size, 'bytes');
        console.log('File type:', file.type);
        } else {
        console.log('No file found in FormData.');
        }

        // Utilisation d'une fonction asynchrone pour gérer la requête
        const sendImage = async () => {
          try {
            const response = await axios.post('http://localhost:3001/photos', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            console.log('Image upload response:', response.data);
          } catch (error) {
            console.error('Error uploading image:', error);
          }
        };
      
        // Appel de la fonction asynchrone pour envoyer l'image
        sendImage();
      }

    function valideArray() {
        console.log(arrayImages)
        const formData = new FormData();
        formData.append('file', arrayImages);
        for (const [key, value] of formData) {
            const jsonString = JSON.stringify(value);
            console.log(jsonString)
            console.log(`Clé: ${key}, Valeur: ${jsonString}`);
          }
          
        axios.post('http://localhost:3001/photos', formData)
    }

    return (
        <div id="addImg">
            <br></br>
            <input id="imgExercice" name="image" type="file" onChange={handleImageChange} />
            <br></br>
            Votre image à ajouté:
            <br></br>
             {previewUrl && <img src={previewUrl} alt="Aperçu de l'image" style={{ maxWidth: '200px' }} />}
            <br></br>
            <input placeholder='Nom de votre image' id="newName"></input>
            <button onClick={valideImg}>Valider l'image</button>
            <br></br>
            Votre nombre d'image importée(s): {length}
            <br></br>
            <button onClick={valideArray}>Valider mon ensemble d'image</button>
            
        </div>
    );
};

export default TextLinkImage;