import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import './getPhotos.css';

const GetPhotos = ({ onImageClick }) => {
    const navigate = useNavigate();
    const [photos, setPhotos] = useState([]);

    const removeAllImages = () => {
        const imagesToRemove = document.querySelectorAll('#imageContainer');
        imagesToRemove.forEach(image => {
            image.remove();
        });
    };

    const getPhotos = () => {
        removeAllImages();

        const config = {
            headers: {
                'Authorization': `Bearer ${Cookies.get('JWT')}`
            }
        };

        axios.get('http://51.77.150.97:4000/photos/testNewRoute', config)
            .then((res) => {
                setPhotos(res.data);
            })
            .catch((error) => {
                console.error('Error fetching images:', error);
            });
    };

    useEffect(() => {
        if (photos.length === 0) {
            return;
        }

        const imageContainer = document.getElementById('photoUserGP');

        if (imageContainer) {
            imageContainer.innerHTML = '';
            imageContainer.style.display = 'flex';
            imageContainer.style.flexWrap = 'wrap';
            imageContainer.style.justifyContent = 'center';

            photos.forEach((photo, i) => {
                const imageBinaryData = photo.image_data.data;
                const blob = new Blob([new Uint8Array(imageBinaryData)], { type: photo.type_mime });

                const objectURL = URL.createObjectURL(blob);

                const container = document.createElement('div');
                container.style.margin = '10px';

                const imageElement = document.createElement('img');
                imageElement.src = objectURL;
                imageElement.style.width = '200px';
                imageElement.style.height = '200px';

                imageElement.addEventListener('click', () => {
                    let name = photo.nom_d_origine;
                    onImageClick(photo.id, name);
                });

                const nameElement = document.createElement('div');
                nameElement.textContent = photo.nom_d_origine;
                nameElement.style.textAlign = 'center';

                container.appendChild(imageElement);
                container.appendChild(nameElement);

                imageContainer.appendChild(container);
            });

            document.getElementById('buttonImg').style.display = 'none';
        }
    }, [photos]);

    return (
        <div>
            <div>
                {photos.length > 0 && <div id="photoUserGP"></div>}
            </div>
            <button className="buttonGPC" onClick={getPhotos} id="buttonImg">Récupérer mes photos</button>
        </div>
    );
};

export default GetPhotos;
