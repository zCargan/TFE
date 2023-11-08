import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './photoDetail.css';
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';



const PhotoDetail = () => {

    const navigate = useNavigate();

    const location = useLocation();
    const idPhoto = location.state.id;

    const [id, setId] = useState(null);
    const [type, setType] = useState(null);
    const [name, setName] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:4000/photos/getDetail/${idPhoto}`)
            .then((res) => {
                setId(res.data[0].id);
                setType(res.data[0].type_mime);
                setName(res.data[0].nom_d_origine);

                const imageBinaryData = res.data[0].image_data.data;
                const blob = new Blob([new Uint8Array(imageBinaryData)], { type: res.data[0].type_mime });

                const objectURL = URL.createObjectURL(blob);
                setImageSrc(objectURL);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [idPhoto]);

    const downloadImage = () => {
        const link = document.createElement('a');
        link.href = imageSrc;
        link.download = name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    function renameImg() {
        let newName = document.getElementById('newName').value;
    
        const config = {
            headers: {
                'Authorization': `Bearer ${Cookies.get('JWT')}`,
                'Content-Type': 'application/json' // Utilisation de 'application/json' pour le Content-Type
            }
        };
    
        const data = {
            newNameValue: newName
        };
    
        axios.post(`http://localhost:4000/photos/changeName/${id}`, data, config).then((res) => {
            console.log(res)
        })
        .catch((error) => {
            console.log(error)
            Swal.fire({
                icon: "success",
                title: "Nom changé avec succès",
                showConfirmButton: false,
                timer: 1500
            });
        })
        navigate('/photo')


    }
    

    function deleteImg () {


        const config = {
            headers: {
                'Authorization': `Bearer ${Cookies.get('JWT')}`,
                'Content-Type': 'application/json' // Utilisation de 'application/json' pour le Content-Type
            }
        };

        axios.delete(`http://localhost:4000/photos/deleteImage/${id}`, {}, config).then((res) => {
            Swal.fire({
                icon: "success",
                title: "Image supprimée avec succès",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/photo')
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div>
            <Navbar />
            <h3>Détail de la photo</h3>
            <p>Id de la photo : {id}</p>
            <p>Type de la photo : {type}</p>
            <p>Nom de la photo : {name}</p>
            <div>
                {imageSrc && (
                    <div>
                        <img src={imageSrc} alt="Détail de la photo" style={{ width: '200px', height: '200px' }} />
                        <br></br>
                        <input placeholder='Renommer la photo' id="newName"></input><button onClick={renameImg}>Renommer</button>
                        <br></br>
                        <button onClick={downloadImage}>Télécharger</button><button onClick={deleteImg}>Supprimer la photo</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PhotoDetail;
