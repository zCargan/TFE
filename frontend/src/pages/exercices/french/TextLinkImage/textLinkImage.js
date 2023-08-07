import {React, useState} from 'react';

const TextLinkImage = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [arrayImages, setArrayImages] = useState([])

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file)); 
      console.log(e.target.files[0].name)
    };

    function valide() {
        let image = document.getElementById("imgExercice").files[0];
        let name = document.getElementById("newName").value;
        let arrayProvisoire = arrayImages;
        let length = arrayProvisoire.length;
        let arrayOfName = []
        if(length != 0) {
            for(let i = 0; i < length; i++) {
                arrayOfName.push[String(arrayProvisoire[i].name)]
            }    
        }


        let dictProvisoire = {};
        dictProvisoire["name"] = name;
        dictProvisoire["img"] = image;
        arrayProvisoire.push(dictProvisoire);
        setArrayImages(arrayProvisoire);

        console.log(arrayOfName)
        console.log(arrayImages)
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

    return (
        <div>
            <h4>Créer ici des exercices pour l'association d'images</h4>
            <input id="imgExercice" type="file" accept="image/*" onChange={handleImageChange}></input>
            <br></br>
            Votre image ajouté:
            <br></br>
             {previewUrl && <img src={previewUrl} alt="Aperçu de l'image" style={{ maxWidth: '200px' }} />}
            <br></br>
            <input placeholder='Nom de votre image' id="newName"></input>
            <br></br>
            <button onClick={valide}>Valider</button>
        </div>
    );
};

export default TextLinkImage;