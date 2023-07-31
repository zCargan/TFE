import React from 'react';

const texteATrou = () => {

    function ajouterMot() {
        var textarea = document.getElementById("myTextarea");
        var motAAjouter = "Nouveau mot ";
      
        // Check if the textarea element was found
        if (textarea) {
          // Récupérer le contenu actuel du textarea
          var contenuActuel = textarea.value;
      
          // Ajouter le nouveau mot au contenu actuel
          var nouveauContenu = contenuActuel + motAAjouter;
      
          // Mettre à jour le contenu du textarea avec le nouveau contenu
          textarea.value = nouveauContenu;
        }
    }
    
    
    return (
        <div>
            <p>Texte à trou</p>
            <textarea rows="5" cols="50" id="textArea"></textarea>
            <p>Ajouter un mot?</p>
            <input id="motAAjouter"></input><button onClick={ajouterMot}>Ajouter ce mot</button>
            <p>testtest</p>
        </div>
    );
};

export default texteATrou;