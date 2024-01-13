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
      console.log('Formulaire soumis :', values);
    },
  });

  return (
    <div>
        
    </div>
  );
};

export default FormulaireDeRetour;
