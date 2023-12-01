const { Client } = require('pg');
const nodemailer = require('nodemailer');

exports.getAllInformationsUsers = (req, res, next) => {

    const token = req.header('Authorization');

    if (token) {
        const jwtToken = token.replace('Bearer ', ''); // Pour extraire le JWT sans le préfixe 'Bearer '
        const secretKey = "test"
        jwt.verify(jwtToken, secretKey, (err, decoded) => {
            if (err) {
                console.error('Erreur lors de la vérification du JWT :', err);
            } else {
                console.log(decoded)
            }
        })
    } else {
        console.log("Pas de token")
    }

    const query = 'SELECT * FROM utilisateurs;';
    const dictionnaireUser = {};
    const client = new Client({
        host: 'localhost',
        port: 5432,
        database: 'test',
        user: 'postgres',
        password: 'LoganTFE2023',
    });

    client.connect();

    client.query(query, (error, result) => {
        if (error) {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
        } else {
            if (result.rows.length === 0) {
                res.status(404).json({ error: 'Aucun utilisateur trouvé' });
            } else {
                result.rows.forEach(row => {
                    dictionnaireUser[row.nom] = row.role;
                    console.log(row);
                });
                res.status(200).json(dictionnaireUser);
            }
        }
    });
};

exports.updateUserInformations = (req, res, next) => {

    const [cle, valeur] = Object.entries(req.body)[0];

    const token = req.header('Authorization');

    if (token) {
        const jwtToken = token.replace('Bearer ', ''); // Pour extraire le JWT sans le préfixe 'Bearer '
        const secretKey = "test"
        jwt.verify(jwtToken, secretKey, (err, decoded) => {
            if (err) {
                console.log('Erreur lors de la vérification du JWT :', err);
            } else {
                console.log(decoded)
            }
        })
    } else {
        console.log("Pas de token")
    }


    const client = new Client({
        host: 'localhost',
        port: 5432,
        database: 'test',
        user: 'postgres',
        password: 'LoganTFE2023',
    });

    client.connect()
    const query = 'UPDATE utilisateurs SET role = $1 WHERE nom = $2';
    const values = [valeur, cle];
    console.log(query)
    client.query(query, values, (err, result) => {
        if (err) {
            console.log('Erreur lors de l\'ajout des données:', err);
        } else {
            console.log('Données mise à jour pour la table utilisateurs');
            res.status(201).json({ message: 'utilisateur modifié' })
        }
    });
}

exports.sendRequest = (req, res, next) => {
    console.log(req.body)

    let emailUser = req.body.email;
    let motifUser = req.body.motif;
    let detailsUser=  req.body.details

    const transporter = nodemailer.createTransport({
        service: 'gmail', // Le service à utiliser (ici, Gmail)
        auth: {
            user: 'lgc.carlier@gmail.com', // Votre adresse e-mail Gmail
            pass: 'qfcb hcah xpgg oxpt',   // Votre mot de passe Gmail
        },
    });
    
    let texte = "Détail de la requete : " +  detailsUser;

    texte += "\n"

    texte += "Email user : " + emailUser

    const mailOptions = {
        from: emailUser,
        to: "lgc.carlier@gmail.com",
        subject: motifUser,
        text: texte
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erreur lors de l\'envoi de l\'e-mail', error);
            return res.status(500).json({ message: 'Erreur lors de l\'envoi de la requete.' });
        }
        console.log('E-mail envoyé: ' + info.response);
        // Réponse réussie ici
        res.status(200).json({ message: 'Demande bien reçue! Merci!' });
    });
}