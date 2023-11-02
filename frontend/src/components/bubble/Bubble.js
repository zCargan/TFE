import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie'; // Assurez-vous d'avoir installé js-cookie


const Bubble = ({ onClick }) => {
  const [isConnected, setIsConnected] = useState(!!Cookies.get('JWT'));


  // Mise à jour de l'état lorsque le cookie change
  useEffect(() => {
    const handleCookieChange = () => {
      setIsConnected(!!Cookies.get('JWT'));
    };

    // Écoute des changements de cookies
    window.addEventListener('onCookieChange', handleCookieChange);

    // Nettoyage de l'écouteur d'événement lors du démontage du composant
    return () => {
      window.removeEventListener('onCookieChange', handleCookieChange);
    };
  }, []);



  // Définition de la couleur en fonction de l'état de connexion
  const bubbleColor = isConnected ? 'green' : 'red';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        backgroundColor: bubbleColor, // Couleur de fond en fonction de la connexion
        color: 'white',
        textAlign: 'center',
        lineHeight: '80px',
        cursor: 'pointer',
        zIndex: 9999,
        fontSize: '16px',
      }}
      
    >
      {isConnected ? 'Connected' : 'Not Connected'}
    </div>
  );
};

export default Bubble;
