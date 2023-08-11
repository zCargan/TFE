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
        let image = document.getElementById("imgExercice").files[0];
        let name = document.getElementById("newName").value;



        /*

        //ancien code permettant d'envoyer un array d'objet

        let arrayProvisoire = arrayImages;
        let dictProvisoire = {};
        dictProvisoire["name"] = name;
        dictProvisoire["img"] = image;
        arrayProvisoire.push(dictProvisoire);
        setArrayImages(arrayProvisoire);
        let nbrImg = length
        nbrImg += 1;
        setLength(nbrImg)

        */

        //Nouveau code envoyant photo par photo au backend

        const formData = new FormData();
        formData.append('photo', image);
        formData.append('name', name);

        try {
        const response = axios.post('http://localhost:3001/photos', formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        });
        console.log('Image upload response:', response.data);
        } catch (error) {
            console.error('Error uploading image:', error);
        }

        /*
        const jpg = ".jpg"
        const png = ".png"
        const gif = ".gif"
        if((image.name).includes(jpg)) {
            let response = name + jpg;
        }
        if((image.name).includes(png)) {
            let response = name + png;
        }
        if((image.name).includes(gif)) {
            let response = name + gif;
        }
        */
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