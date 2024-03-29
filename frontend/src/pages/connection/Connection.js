import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Provider, useDispatch } from 'react-redux';
import './connection.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import PasswordChanger from '../../components/passwordChanger/passwordChanger';
import Popup from 'reactjs-popup';
import InfoIcon from '@mui/icons-material/Info';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import bcrypt from 'bcryptjs'


// FONCTIONS
import { sameString } from '../FonctionsUnitaires';
import { HasLowerCaseLetter } from '../FonctionsUnitaires';
import { HasValidLength } from '../FonctionsUnitaires';
import { HasUpperCaseLetter } from '../FonctionsUnitaires';
import { HasSpecialCharacter } from '../FonctionsUnitaires';
import { HasNumber } from '../FonctionsUnitaires';
import { checkEmail } from '../FonctionsUnitaires';

import { useConnection } from '../FonctionAPI';

const Connection = (props) => {


  const { connection } = useConnection();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showLoginForm, setShowLoginForm] = useState(true);
  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [samePassword, setSamePassword] = useState("");
  const passwordHasValidLength = HasValidLength(password);
  const passwordHasLowercaseLetter = HasLowerCaseLetter(password);
  const passwordHasUppercaseLetter = HasUpperCaseLetter(password);
  const passwordHasSpecialCharacter = HasSpecialCharacter(password);
  const passwordHasNumber = HasNumber(password);
  const [popupOpen, setPopupOpen] = useState(false);
  const [showPassword, setPasswordVisible] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);
  const [passwordVisible3, setPasswordVisible3] = useState(false);

  const textButtonPasswordForget = "Mot de passe oublié?";



  useEffect(() => {
    if (Cookies.get('JWT')) {
      navigate('/home')
    }
  }, []);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!showPassword);
  };

  const togglePasswordVisibility2 = () => {
    setPasswordVisible2(!passwordVisible2);
  };

  const togglePasswordVisibility3 = () => {
    setPasswordVisible3(!passwordVisible3);
  };

  function handleUserIconHover() {
    setPopupOpen(true);
  }

  function handleUserIconLeave() {
    setPopupOpen(false);
  }

  const handleToggleForm = () => {
    // document.getElementById('surname').value = "";
    console.log("test")
    setShowLoginForm(!showLoginForm);

  };
  function passwordOk(string1, string2) {
    if (passwordHasValidLength && passwordHasLowercaseLetter && passwordHasUppercaseLetter && passwordHasNumber && passwordHasSpecialCharacter) {
      return sameString(string1, string2);
    } else {
      return false;
    }
  }

  function changePassword() {
    console.log("change password")
    navigate('/reset')
  }


  function registerAccount() {
    if (surname === "") {
      document.getElementById('surname').value = "";
      Swal.fire({
        icon: 'warning',
        title: 'Attention',
        text: 'Veuillez entrer un nom d\'utilisateur',
        confirmButtonText: 'OK'
      });
    } else {
      if (!passwordOk(password, samePassword)) {
        Swal.fire({
          title: 'Erreur',
          text: 'Les mots de passe ne respecte pas tous les critères, ou ne sont pas les même.',
          icon: 'error',
        });
        return;
      } else {
        if (checkEmail(email)) {
          if (sameString(password, samePassword)) {
            const hashedPassword = bcrypt.hashSync(password, "$2a$10$sZk/IsTrgMV.iO0dRgU/xu");
            const data_to_send = {
              "surname": surname,
              "name": name,
              "pseudo": pseudo,
              "email": email,
              "password": hashedPassword
            }
            axios.post("https://www.laclassedemadameseverine.be:4000/connection/register", data_to_send)
              .then(response => {
                if (response.data.exist) {
                  Swal.fire({
                    icon: 'warning',
                    title: 'Adresse email déjà utilisée',
                    text: 'Cette adresse email est déjà associée à un utilisateur.',
                    showCancelButton: false,
                    confirmButtonText: 'OK'
                  })
                } else if (response.data.user) {
                  Swal.fire({
                    icon: 'warning',
                    title: "Ce nom d'utilisateur est déja pris",
                    confirmButtonText: 'OK',
                    showCancelButton: false,
                    showCloseButton: false,
                    showConfirmButton: true,
                    showLoaderOnConfirm: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    allowEnterKey: false,
                  });
                } else if (response.status === 201) {
                  Swal.fire({
                    title: 'Compte créé',
                    text: 'Votre compte a été créé avec succès! \n Un email de confirmation vous a été envoyé',
                    icon: 'success',
                  }).then(() => {
                    navigate('/home');
                  });
                } else {
                  Swal.fire({
                    title: 'Erreur',
                    text: 'Une erreur est survenue lors de la création du compte.',
                    icon: 'error',
                  });
                }
              })
              .catch(error => {
                console.error('Erreur lors de la création du compte', error);
                Swal.fire({
                  title: 'Erreur',
                  text: 'Une erreur s\'est produite lors de la création du compte.',
                  icon: 'error',
                });
              });
          } else {
            Swal.fire({
              title: 'Erreur',
              text: 'Vos deux mots de passe ne correspondent pas.',
              icon: 'error',
            });
          }

        } else {
          Swal.fire({
            title: 'Erreur',
            text: 'Veuillez entrer une adresse email valide.',
            icon: 'error',
          });
        }
      }
    }
    console.log(surname)

  }


  return (
    <div>
      <div id="input_connection_div">
        <div>
          <Navbar />
        </div>
        <div>
          <div className='divHConnection'>
            <h1 className='h1Connection'>Bienvenue sur la classe de madame Séverine!</h1>
            <br />
            <h2 className='h2Connection'>Afin d'utiliser le site, merci de vous connecter</h2>
          </div>
          <div className='divGlobalConnection'>
            <div className="card-header">
              <div id="forLogin" className={`buttonForm ${showLoginForm ? 'active' : ''}`} onClick={() => {
                setShowLoginForm(true); const surnameInput = document.getElementById('surname');
                if (surnameInput) {
                  surnameInput.value = "";
                }
              }}>
                Se connecter
              </div>
              <div id="forRegister" className={`buttonForm ${!showLoginForm ? 'active' : ''}`} onClick={() => {
                setShowLoginForm(false); const pseudoInput = document.getElementById('pseudo');
                if (pseudoInput) {
                  pseudoInput.value = "";
                }
              }}>
                S'inscrire                <Popup
                  trigger={
                    <span className='important'>*</span>
                  }
                  open={popupOpen}
                  on="hover"
                >
                  <div id='text_zone5'>
                    <p>Nous avons besoin des données suivantes afin d'enregister votre compte</p>
                    <p>Elles ne seront en aucun cas utilisée, elles sont uniquement nécessaire pour un bon fonctionnement de l'application</p>
                  </div>
                </Popup>
              </div>
            </div>
            {showLoginForm ? (
              <div>
                <br />
                <input type="text" className="inputForm" placeholder="Pseudonyme" id="pseudo" />
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="inputForm"
                    placeholder="Mot de passe"
                    id="password"
                  />
                  {showPassword ? (
                    <VisibilityOffIcon className='logoEye' onClick={togglePasswordVisibility} style={{ cursor: 'pointer', marginLeft: '-50px' }} />
                  ) : (
                    <VisibilityIcon className='logoEye' onClick={togglePasswordVisibility} style={{ cursor: 'pointer', marginLeft: '-50px' }} />
                  )}
                </div>
                <button className="formButton buttonDivConneciton" onClick={(e) => connection(document.getElementById('pseudo').value, document.getElementById('password').value)}>Connexion</button>

              </div>
            ) : (
              <div id="divInscription">
                <br />
                <input type="text" className="inputForm" placeholder="Pseudonyme" id="surname" onChange={(e) => setSurname(e.target.value)}></input>
                <br />
                <input className="inputForm" placeholder='Adresse email' type='text' id="emai" onChange={(e) => setEmail(e.target.value)}></input>
                <br />
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <input type={passwordVisible2 ? 'text' : 'password'} className="inputForm" placeholder='Mot de passe' onChange={(e) => setPassword(e.target.value)} />
                  {passwordVisible2 ? (
                    <VisibilityOffIcon className='logoEye' onClick={togglePasswordVisibility2} style={{ cursor: 'pointer', marginLeft: '-50px' }} />
                  ) : (
                    <VisibilityIcon className='logoEye' onClick={togglePasswordVisibility2} style={{ cursor: 'pointer', marginLeft: '-50px' }} />
                  )}
                </div>
                <br />
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <input type={passwordVisible3 ? 'text' : 'password'} className="inputForm" placeholder='Confirmer le mot de passe' id="passwordConfirm" onChange={(e) => setSamePassword(e.target.value)}></input>
                  {passwordVisible3 ? (
                    <VisibilityOffIcon className='logoEye' onClick={togglePasswordVisibility3} style={{ cursor: 'pointer', marginLeft: '-50px' }} />
                  ) : (
                    <VisibilityIcon className='logoEye' onClick={togglePasswordVisibility3} style={{ cursor: 'pointer', marginLeft: '-50px' }} />
                  )}
                </div>
                <Popup
                  trigger={
                    <span className='important2'><InfoIcon className='infoLogo' /></span>
                  }
                  open={popupOpen}
                  position="top center"
                  on="hover"
                >
                  <div id='text_zone4'>
                    <h4>Votre mot de passe doit contenir: </h4>
                    <label className='requiredRP' style={{ color: passwordHasValidLength ? '#A3E571' : 'rgb(256,124,92)' }}>Mot de passe de 12 caractères </label>
                    <br />
                    <label className='requiredRP' style={{ color: passwordHasLowercaseLetter ? '#A3E571' : 'rgb(256,124,92)' }}>Min 1 caractère minuscule</label>
                    <br />
                    <label className='requiredRP' style={{ color: passwordHasUppercaseLetter ? '#A3E571' : 'rgb(256,124,92)' }}>Min 1 caractère majuscule</label>
                    <br />
                    <label className='requiredRP' style={{ color: passwordHasNumber ? '#A3E571' : 'rgb(256,124,92)' }}>Min 1 nombre</label>
                    <br />
                    <label className='requiredRP' style={{ color: passwordHasSpecialCharacter ? '#A3E571' : 'rgb(256,124,92)' }}>Min 1 caractère spécial</label>
                  </div>
                </Popup>
                <button id="button_register" className='buttonDivConneciton' onClick={(e) => registerAccount()}>Se créer un compte</button>
              </div>
            )}
          </div>
          <br />
        </div>
        <div>
          <button className='newPassword' onClick={(e) => navigate('/reset-password')}>Changer mon mot de passe</button>
        </div>
      </div>
    </div>

  );
};

export default Connection;