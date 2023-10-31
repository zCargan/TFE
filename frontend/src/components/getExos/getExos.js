import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const getExos = () => {

    function getCookieValue(name) {
        const cookieArr = document.cookie.split(';').map(cookie => cookie.trim());
        for (let i = 0; i < cookieArr.length; i++) {
          const cookiePair = cookieArr[i].split('=');
          if (cookiePair[0] === name) {
            return cookiePair[1];
          }
        }
        return null; // Retourne null si le cookie n'est pas trouvé
      }



    function get_all_exos() {
        //console.log('Valeur du cookie :', Cookies.get('JWT'));

        //const jwtValue = getCookieValue('JWT');
        
        const config = {
            headers: {
                'Authorization': `Bearer ${getCookieValue('JWT')}`
            }
        };

        axios.post("http://localhost:4000/connection/test", {}, config)
        .then(response => {
          // Traiter la réponse du serveur
          console.log('Réponse du serveur :', response.data);
        })
        .catch(error => {
          // Gérer les erreurs de la requête
          console.error('Erreur de requête :', error);
        });

    }

    return (
        <div>
            <p>test components</p>
            <button onClick={get_all_exos}>Click ici</button>
        </div>
    );
};

export default getExos;