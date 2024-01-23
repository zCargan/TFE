import React, { useState, useEffect } from 'react';
import './uploadPhoto.css';
import Navbar from '../navbar/Navbar';
import axios from 'axios';
import Cookies from 'js-cookie';
import Popup from 'reactjs-popup';
import { useNavigate, Redirect  } from 'react-router-dom';
import Swal from 'sweetalert2';

const Photo = () => {

    const navigate = useNavigate();

    const [imageURL, setImageURL] = useState('');
    const [imageBuffer, setImageBuffer] = useState('');
    const [imageBufferList, setImageBufferList] = useState([]);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        const handleBeforeUnload = (event) => {
          removeAllImages(); 
    
          event.preventDefault();
          event.returnValue = ''; 
        };
    
        window.addEventListener('beforeunload', handleBeforeUnload);
    
        return () => {
          window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);


    const toggleModal = () => {
        setModal(!modal)
    }

    function getPhotos() {
        axios.get('https://www.laclassedemadameseverine.be:4000/photos/testNewRoute')
            .then((res) => {
                const buffer = res.data[3].image_data.data;
                console.log('on passeici')
                const objectURL = `data:image/png;base64,${buffer}`;
                setImageBuffer(objectURL); 
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
        if(document.getElementById("newName").value == undefined) {
            Swal.fire({
                title: 'Attention',
                text: 'Veuillez saisir un nom',
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            });
        } else {
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
    
                axios.post('https://www.laclassedemadameseverine.be:4000/photos/register/img', formData, config)
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
        
    }


    function removeAllImages() {
        const imagesToRemove = document.querySelectorAll('#imageContainer');

        imagesToRemove.forEach(image => {
            image.remove(); // Supprime chaque élément avec la classe 'imageContainer'
        });
        
    }


    function getMoreDetail(id) {
        navigate('/photo_detail', {state: {id}})
    }   
    

    function getPhotos() {
        removeAllImages(); 
    
        const config = {
            headers: {
                'Authorization': `Bearer ${Cookies.get('JWT')}`
            }
        };
    
        console.log(config);
    
        axios.get('https://www.laclassedemadameseverine.be:4000/photos/testNewRoute', config)
            .then((res) => {
                const imageContainer = document.getElementById('photoUser');
    
                if (imageContainer) {
                    imageContainer.innerHTML = ''; 
                    imageContainer.style.display = 'flex'; 
                    imageContainer.style.flexWrap = 'wrap'; 
                    imageContainer.style.justifyContent = 'center'; 
    
                    for (let i = 0; i < res.data.length; i++) {
                        const imageBinaryData = res.data[i].image_data.data;
                        const blob = new Blob([new Uint8Array(imageBinaryData)], { type: res.data[i].type_mime });
       
                        const objectURL = URL.createObjectURL(blob);

                        const container = document.createElement('div');
                        container.style.margin = '10px'; 

                        const imageElement = document.createElement('img');
                        imageElement.src = objectURL;
                        imageElement.style.width = '200px';
                        imageElement.style.height = '200px';

                        imageElement.addEventListener('click', () => {
                            getMoreDetail(res.data[i].id)
                        });
    
                        const nameElement = document.createElement('div');
                        nameElement.textContent = res.data[i].nom_d_origine;
                        nameElement.style.textAlign = 'center';

                        container.appendChild(imageElement);
                        container.appendChild(nameElement);

                        imageContainer.appendChild(container);
                    }
                }
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des images :', error);
            });
    }
    
    
    
    
    



    return (
        <div>
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
                <input placeholder='Renommer votre photo' id="newName" required></input><button onClick={rename}>Confirmer</button>
            </div>
        </div>
    );
};

export default Photo;
