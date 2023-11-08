import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const GetPhotos = ({ onImageClick }) => {
    const navigate = useNavigate();

    const getMoreDetail = (id) => {
        navigate('/photo_detail', { state: { id } });
    };

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

        axios.get('http://localhost:4000/photos/testNewRoute', config)
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
                            let name = res.data[i].nom_d_origine
                            // Appel de la fonction de rappel avec l'ID de l'image
                            onImageClick(res.data[i].id, name);
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
                console.error('Error fetching images:', error);
            });
    };

    return (
        <div>
            <button onClick={getPhotos}>Récupérer mes photos</button>
            <div>
                <div id="photoUser"></div>
            </div>
        </div>
    );
};

export default GetPhotos;
