const { Client } = require('pg');
const jwt = require("jsonwebtoken");
const { json } = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const argon2 = require('argon2');
const secretKeyCrypto = 'SecretKeyCrypto';

async function hashPassword(password) {
    try {
        const hash = await argon2.hash(password);
        return hash;
    } catch (error) {
        console.error('Erreur lors du hachage du mot de passe avec Argon2:', error);
        throw error;
    }
}

async function verifyPassword(hashedPassword, enteredPassword) {
    try {
        const isValid = await argon2.verify(hashedPassword, enteredPassword);
        return isValid;
    } catch (error) {
        console.error('Erreur lors de la vérification du mot de passe avec Argon2:', error);
        throw error;
    }
}

function encryptEmail(email) {
    const cipher = crypto.createCipher('aes-256-cbc', secretKeyCrypto);
    let encrypted = cipher.update(email, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

function decryptEmail(encryptedEmail) {
    const decipher = crypto.createDecipher('aes-256-cbc', secretKeyCrypto);
    let decrypted = decipher.update(encryptedEmail, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
}

exports.registerData = (req, res, next) => {

    const surname = req.body.surname
    const password = req.body.password
    const email = req.body.email
    const encryptedEmail = encryptEmail(email);

    console.log("Mot de passe venant du frontend : " + password)

    const client = new Client({
        host: 'db',
        port: 5432,
        database: 'test',
        user: 'loganAdmin',
        password: 'LoganTFE2023',
    });

    client.connect()

    const query1 = 'SELECT * FROM public.utilisateurs WHERE email = $1';
    const values = [encryptedEmail];

    client.query(query1, values, (error, result) => {
        if (error) {
            console.error('Erreur lors de la requête SQL:', error.message);
            return res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
        } else {
            if (result.rows.length !== 0) {
                console.log(console.log(result.rows));
                return res.status(200).json({ exist: true });
            } else {

                const query3 = 'SELECT * FROM public.utilisateurs WHERE nom = $1';
                const values = [surname];

                client.query(query3, values, (error, result) => {
                    if (error) {
                        console.log(error)
                    } else {
                        if (result.rows.length !== 0) {
                            return res.status(200).json({ user: true })
                        } else {
                            hashPassword(password)
                                .then((hashedPassword) => {
                                    console.log('Mot de passe haché avec succès:', hashedPassword);
                                    const encryptedEmail = encryptEmail(email);
                                    console.log('Email chiffré:', encryptedEmail);
                                    const query2 = `INSERT INTO utilisateurs (nom, password, email, role) VALUES ('${surname}', '${hashedPassword}', '${encryptedEmail}', 'eleve')`;

                                    client.query(query2, (error, result) => {
                                        if (error) {
                                            console.error('Erreur lors de l\'ajout des données:', error);
                                        } else {

                                            const transporter = nodemailer.createTransport({
                                                service: 'gmail',
                                                auth: {
                                                    user: 'laclassedemmeseverine@gmail.com',
                                                    pass: 'fwki zjik rnqk jrdt',
                                                },
                                            });

                                            let siteAcces = "http://51.77.150.97/"

                                            const mailOptions = {
                                                from: 'laclassedemmeseverine@gmail.com',
                                                to: email,
                                                subject: 'Confirmation de la création de votre compte',
                                                html: `
                                                <h1>
                                                Merci pour la création de votre compte
                                            </h1>
                                            <h3>
                                                Si vous n'êtes pas à l'origine de sa création, merci de nous contacter :
                                
                                                laclassedemmeseverine@gmail.com
                                            </h3>
                                            <a href="${siteAcces}" style="display:inline-block;padding:10px 20px;background-color:#4CAF50;color:#fff;text-decoration:none;border-radius:5px;">Accéder au site!</a>
                                                `,
                                            };


                                            transporter.sendMail(mailOptions, (error, info) => {
                                                if (error) {
                                                    console.error('Erreur lors de l\'envoi de l\'e-mail', error);
                                                    return res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'e-mail de réinitialisation.' });
                                                }
                                                console.log('E-mail envoyé: ' + info.response);
                                                res.status(200).json({ message: 'E-mail de réinitialisation envoyé avec succès.' });
                                            });

                                            console.log('Données ajoutées avec succès à la table utilisateurs');
                                            res.status(201).json({ message: 'utilisateur ajouté' })
                                        }
                                        client.end();
                                    });
                                })
                                .catch((error) => {
                                    console.error('Erreur lors de la génération du hachage:', error);
                                });
                        }
                    }
                });

            }
        }
    });
};



exports.connection = (req, res, next) => {
    const token = req.headers;
    const pseudo = req.body.pseudo;
    const password = req.body.password;

    console.log("Mot de passe venant du frontend : " + password)

    const query = `SELECT * FROM public.utilisateurs WHERE nom='${pseudo}'`;

    const client = new Client({
        host: 'db',
        port: 5432,
        database: 'test',
        user: 'loganAdmin',
        password: 'LoganTFE2023',
    });

    console.log(password)

    client.connect();

    client.query(query, async (error, result) => {
        if (error) {
            res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
        } else {
            if (result.rows.length === 0) {
                res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
            } else {
                const hashedPasswordFromDB = result.rows[0].password;

                try {
                    const isValid = await verifyPassword(hashedPasswordFromDB, password);

                    if (isValid) {
                        console.log(hashedPasswordFromDB)
                        const { id, nom, role } = result.rows[0];

                        const createTokenFromJson = (jsonData, options = {}) => {
                            try {
                                const secretKey = 'test';
                                const token = jwt.sign(jsonData, secretKey, options);
                                return token;
                            } catch (error) {
                                console.log('Error: ', error.message);
                            }
                        };

                        const jsonData = { id, nom, role };
                        const token = createTokenFromJson(jsonData);
                        res.json({ status: true, id, nom, role, token });
                    } else {
                        console.log('Password incorrect')
                        res.status(400).json({ msg: "Pas connecté" })
                    }
                } catch (error) {
                    console.error('Erreur lors de la vérification du mot de passe:', error);
                    res.status(500).json({ error: 'Erreur lors de la vérification du mot de passe' });
                }
            }
        }
    });
};

exports.checkToken = (req, res) => {
    const token = req.header('Authorization');
    if (token) {
        const jwtToken = token.replace('Bearer ', ''); // Pour extraire le JWT sans le préfixe 'Bearer '
        const secretKey = "test";
        jwt.verify(jwtToken, secretKey, (err, decoded) => {
            if (err) {
                console.error('Erreur lors de la vérification du JWT :', err);
            } else {
                if (decoded.role === "professeur") {
                    res.json({ role: "professeur", username: decoded.nom })
                } else if (decoded.role === "eleve") {
                    res.json({ role: "eleve", username: decoded.nom })
                } else if (decoded.role === "admin") {
                    res.json({ role: "admin", username: decoded.nom })
                }

            }
        });
    } else {
        console.log("Aucun token trouvé dans l'en-tête Authorization");
    }
}

exports.connectionInformations = (req, res) => {
    const token = req.header('Authorization');
    if (token) {
        const jwtToken = token.replace('Bearer ', ''); // Pour extraire le JWT sans le préfixe 'Bearer '
        const secretKey = "test";
        jwt.verify(jwtToken, secretKey, (err, decoded) => {
            if (err) {
                console.error('Erreur lors de la vérification du JWT :', err);
            } else {
                res.json({ id: decoded.id, nom: decoded.nom, role: decoded.role })
            }
        })
    }
}

exports.resetPassword = (req, res, next) => {


    const { email } = req.body;

    const encryptedEmail = encryptEmail(email);

    const client = new Client({
        host: 'db',
        port: 5432,
        database: 'test',
        user: 'loganAdmin',
        password: 'LoganTFE2023',
    });

    client.connect()

    const query1 = 'SELECT * FROM public.utilisateurs WHERE email = $1';
    const values = [encryptedEmail];

    client.query(query1, values, (error, result) => {
        if (error) {
            console.error('Erreur lors de la requête SQL:', error.message);
            return res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
        } else {
            if (result.rows.length !== 0) {
                const token = jwt.sign({ email }, 'testemail', { expiresIn: '1h' });


                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'laclassedemmeseverine@gmail.com',
                        pass: 'fwki zjik rnqk jrdt',
                    },
                });

                const resetLink = `http://51.77.150.97/reset-password2?token=${token}`;
                //const resetLink = `http://localhost:3000/reset-password2?token=${token}`;
                const mailOptions = {
                    from: 'laclassedemmeseverine@gmail.com',
                    to: email,
                    subject: 'Réinitialisation de mot de passe',
                    html: `
                      <p>Si vous n'êtes pas à l'origine de la demande, veuillez nous contacter : 
                      laclassedemmeseverine@gmail.com
                    </p>                      
                      <a href="${resetLink}" style="display:inline-block;padding:10px 20px;background-color:#4CAF50;color:#fff;text-decoration:none;border-radius:5px;">Réinitialiser mon mot de passe</a>
                    `,
                };


                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error('Erreur lors de l\'envoi de l\'e-mail', error);
                        return res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'e-mail de réinitialisation.' });
                    }
                    console.log('E-mail envoyé: ' + info.response);
                    res.status(200).json({ message: 'E-mail de réinitialisation envoyé avec succès.' });
                });
            } else {
                res.status(500).json({ message: "L'adresse email n'existe pas dans la base de données" });
            }
        }
    })
}

exports.newPassword2 = async (req, res, next) => {
    const { token } = req.body;
    const newPassword = req.body.hashedPassword;

    console.log(token)
    console.log(newPassword)
    const decodedToken = jwt.verify(token, 'testemail');

    const client = new Client({
        host: 'db',
        port: 5432,
        database: 'test',
        user: 'loganAdmin',
        password: 'LoganTFE2023',
    });

    client.connect();

    const email = decodedToken.email;

    console.log(email)

    const encryptedEmail = encryptEmail(email);

    const query1 = 'SELECT * FROM public.utilisateurs WHERE email = $1';
    const values = [encryptedEmail];

    client.query(query1, values, (error, result) => {
        if (error) {
            console.error('Erreur lors de la requête SQL:', error.message);
            return res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
        } else {
            // console.log(result.rows[0].nom) ==== Csargan
            hashPassword(newPassword)
            .then((hashedPassword) => {
                console.log('Mot de passe haché avec succès:', hashedPassword);

                const user = result.rows[0].nom;

                const updateQuery = 'UPDATE public.utilisateurs SET password = $1 WHERE nom = $2';
                const updateValues = [hashedPassword, user];

                client.query(updateQuery, updateValues, (error, result) => {
                    if (error) {
                        console.error('Erreur lors de la requête SQL:', error.message);
                        return res.status(500).json({ error: 'Erreur lors du changement de mot de passe' });
                    } else {
                        res.status(200).json({ message: 'Le mot de passe a été réinitialisé avec succès.' });
                    }
                })
            })
        }
    })
};

exports.existEmail = (req, res, next) => {

    let email = req.params.id;

    console.log(email)

    const client = new Client({
        host: 'db',
        port: 5432,
        database: 'test',
        user: 'loganAdmin',
        password: 'LoganTFE2023',
    });

    client.connect();

    const query = 'SELECT * FROM public.utilisateurs WHERE email = $1';
    const values = [email];

    client.query(query, values, (error, result) => {
        if (error) {
            console.error('Erreur lors de la requête SQL:', error.message);
            return res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
        } else {
            if (result.rows.length !== 0) {
                console.log("l'utilisateur existe bien");
                return res.status(200).json({ exist: true });
            }
        }
    });
};