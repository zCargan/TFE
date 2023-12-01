import React from 'react';
import { useFormik } from 'formik';

const FormulaireDeRetour = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      notification: false,
      message: '',
    },
    onSubmit: values => {
      // Vous pouvez envoyer les données du formulaire à votre serveur ici
      console.log('Formulaire soumis :', values);
      // Ajoutez le code pour envoyer les données par e-mail ici
    },
  });

  return (
    <div>
        
    </div>
  );
};

export default FormulaireDeRetour;
