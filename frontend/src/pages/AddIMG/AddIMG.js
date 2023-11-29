import {React, useState} from 'react';
import axios from 'axios';
import { json } from 'react-router-dom';
import UploadPhoto from '../../components/UploadPhoto/uploadPhoto';
import GetPhotos from '../../components/getPhotos/getPhotos'
import Navbar from '../../components/navbar/Navbar';

const AddIMG = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [arrayImages, setArrayImages] = useState([])
    const [length, setLength] = useState(0)
    const [images, setImages] = useState("")

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
            const response = await axios.post('http://localhost:4000/photos', formData, {
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
        axios.post('http://localhost:4000/photos', formData)
    }


    function hexToBase64(hex) {
        const bytes = [];
        for (let i = 0; i < hex.length; i += 2) {
            bytes.push(parseInt(hex.substr(i, 2), 16));
        }
        return btoa(String.fromCharCode(...bytes));
    }

    function getImg() {
      axios.get('http://localhost:4000/photos/getImg')
          .then(res => {
              const images = res.data.fileData[0].data; 
              console.log(images); 
              const base64ImageData = images.map(byte => String.fromCharCode(byte)).join('');

              // Construire l'URL de données avec le type de contenu (par exemple, "image/png" pour une image PNG)
              const dataUrl = `data:image/png;base64,${base64ImageData}`;

              // Créer une balise <img> avec l'attribut "src" défini sur l'URL de données
              const imgHtml = `<img src="${dataUrl}" alt="Image">`;

              // Ajouter le code HTML de l'image à un élément existant (par exemple, un élément avec l'id "imageContainer")
              document.getElementById('imagesContainer').innerHTML = imgHtml;
            

          })
          .catch(error => {
              console.error('Erreur lors de la récupération des images:', error);

          });
  }

    return (
        <div id="addImg">
            <Navbar />
          <br></br>
          <br></br>
          <UploadPhoto></UploadPhoto>
        </div>
    );
};

export default AddIMG;