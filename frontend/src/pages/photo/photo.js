import React, { useState, useEffect } from 'react';
import './photo.css';
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';
import Cookies from 'js-cookie';

const Photo = () => {
    const [imageURL, setImageURL] = useState('');
    const [imageBuffer, setImageBuffer] = useState('');
    const [imageBufferList, setImageBufferList] = useState([]);

    
    useEffect(() => {});

    function getPhotos() {
        axios.get('http://localhost:4000/photos/testNewRoute')
            .then((res) => {
                const buffers = res.data.map(item => {
                    const buffer = item.image_data.data;
                    return `data:image/png;base64,${buffer}`;
                });
                setImageBufferList(buffers); // Mettre à jour l'état avec le tableau d'URLs
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des images :', error);
            });
    }

    /**
     * Cette fonction permet d'afficher une préview de l'image que l'on vient d'upload
     */
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageURL(reader.result);
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    };


    /**
     * Cette fonction est une fonction test permettant d'essayer de rename le nom d'un fichier img
     */
    function rename() {
        const fileInput = document.getElementById("newIMG");
        const newFileName = document.getElementById("newName").value;

        const config = {
            headers: {
              'Authorization': `Bearer ${Cookies.get('JWT')}`,
              'Content-Type': 'multipart/form-data'
            }
        };


        if (fileInput && fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const formData = new FormData();
            formData.append('file', file);
            formData.append('name', newFileName)
            
            console.log(formData)

            axios.post('http://localhost:4000/photos/register/img', formData, config)
                .then(response => {
                    console.log("hihi")
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                });

        } else {
            console.log("Aucun fichier sélectionné");
        }
    }

    

    function getPhotos() {
        // Sélectionnez l'élément où vous affichez l'image
        const existingImage = document.getElementById('imageContainer');
    
        if (existingImage) {
            existingImage.remove(); // Supprimez l'image précédente s'il existe
        }
    
        axios.get('http://localhost:4000/photos/testNewRoute')
            .then((res) => {
                console.log(res.data)
                const imageBinaryData = res.data[0].image_data.data;
                const blob = new Blob([new Uint8Array(imageBinaryData)], { type: 'image/jpg' });
    
                // Convertir le Blob en URL d'objet
                const objectURL = URL.createObjectURL(blob);
    
                // Créer un élément image
                const imageElement = document.createElement('img');
                imageElement.src = objectURL;
                imageElement.id = 'imageContainer'; // Définir un identifiant pour l'image
    
                // Ajouter l'image à un conteneur dans votre interface ou directement au body
                document.body.appendChild(imageElement); // Vous pouvez modifier cette ligne pour l'ajouter à un autre conteneur de votre choix
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des images :', error);
            });
    }
    



    return (
        <div>
            <Navbar />
            <p>Test photo</p>
            {imageURL && (
                <div>
                <h2>Image prévisualisée :</h2>
                <img src={imageURL} alt="Aperçu de l'image" style={{ maxWidth: '300px' }} />
                </div>
            )}
            <input type="file" id="newIMG" onChange={handleFileChange} />
            <br></br>
            <br></br>
            <br></br>
            <div>
                <input placeholder='Renommer votre photo' id="newName"></input><button onClick={rename}>Confirmer</button>
            </div>
            <div>
                <button onClick={getPhotos}>Récupérer mes photos</button>
                {imageBufferList.map((image, index) => (
                    <img key={index} src={image} alt={`Image ${index}`} />
                ))}

            </div>

        </div>
    );
};

export default Photo;
