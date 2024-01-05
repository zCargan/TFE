const jwt = require("jsonwebtoken");
const { Client } = require('pg');

exports.postSound = (req, res, next) => {
    const token = req.header('Authorization');
    if (token) {
        const jwtToken = token.replace('Bearer ', ''); // Pour extraire le JWT sans le préfixe 'Bearer '
        const secretKey = "test";
        jwt.verify(jwtToken, secretKey, (err, decoded) => {
            if (err) {
                console.error('Erreur lors de la vérification du JWT :', err);
            } else {

                console.log(decoded.id)
                const file = req.file;

                console.log(req.body.name)

                if (!file) {
                    return res.status(400).json({ error: 'Aucun fichier audio trouvé dans la requête.' });
                }

                console.log('Fichier audio reçu :', file);

                const fileBuffer = file.buffer;

                const client = new Client({
                    host: 'db',
                    port: 5432,
                    database: 'test',
                    user: 'loganAdmin',
                    password: 'LoganTFE2023',
                });

                client.connect()
                    .then(() => {

                        const insertQuery = {
                            text: 'INSERT INTO sons (utilisateur_id, son_data, type_mime, nom_d_origine) VALUES ($1, $2, $3, $4)',
                            values: [decoded.id, fileBuffer, file.mimetype, req.body.name],
                        };

                        const result = client.query(insertQuery);
                        res.status(200).json({ result: result});
                    })
                    .catch(err => {
                        console.error('Erreur lors de la connexion à la base de données :', err);
                        res.status(500).json({ error: 'Erreur de connexion à la base de données' });
                    });
            }
        })
    } else {
        console.log("pas de token ici")
    }
};

exports.getSound = (req, res, next) => {

    let idUser = req.params.id;

    console.log(idUser)

    
    const client = new Client({
        host: 'db',
        port: 5432,
        database: 'test',
        user: 'loganAdmin',
        password: 'LoganTFE2023',
    });

    client
        .connect()
        .then(() => {

            const query = `SELECT * FROM sons WHERE utilisateur_id='${idUser}'`


            client.query(query, (error, result) => {
                if (error) {
                    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
                } else {
                    res.status(200).json({ resultat: result.rows });
                }
            }
            )
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des sons:', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des sons' });
        });
}


exports.getSoundById = (req, res, next) => {

    let idSound = req.params.id;

    console.log(idSound)

    const client = new Client({
        host: 'db',
        port: 5432,
        database: 'test',
        user: 'loganAdmin',
        password: 'LoganTFE2023',
    });

    client
        .connect()
        .then(() => {

            const query = `SELECT * FROM sons WHERE id='${idSound}'`


            client.query(query, (error, result) => {
                if (error) {
                    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
                } else {
                    res.status(200).json({ resultat: result.rows });
                }
            }
            )
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des sons:', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des sons' });
        });

}


exports.updateSonName = (req, res, next) => {

    const sonsId = req.params.id
    const newName = req.body.newNameValue;

    console.log(sonsId, newName)

    const token = req.header('Authorization');
    if (token) {
        const jwtToken = token.replace('Bearer ', ''); // Pour extraire le JWT sans le préfixe 'Bearer '
        const secretKey = "test";
        jwt.verify(jwtToken, secretKey, (err, decoded) => {
            if (err) {
                console.error('Erreur lors de la vérification du JWT :', err);
            } else {

                const client = new Client({
                    host: 'db',
                    port: 5432,
                    database: 'test',
                    user: 'loganAdmin',
                    password: 'LoganTFE2023',
                });

                const query = {
                    text: 'UPDATE sons SET nom_d_origine = $1 WHERE id = $2',
                    values: [newName, sonsId],
                };

                client.connect();

                client.query(query, (error, result) => {
                    if (error) {
                        res.status(500).json({ error: "Le renommage a échoué en raison d'une erreur inattendue." });
                    } else {
                        res.status(200).json({ message: "Le renommage a réussi." });
                    }
                });
            }
        })
    }
}

exports.deleteSound = (req, res, next) => {
    const sonId = req.params.id

    const client = new Client({
        host: 'db',
        port: 5432,
        database: 'test',
        user: 'loganAdmin',
        password: 'LoganTFE2023',
    });

    client.connect((err) => {
        if (err) {
            console.error('Erreur de connexion à la base de données :', err);
            res.status(500).send('Erreur de connexion à la base de données');
        } else {
            console.log('Connexion à la base de données établie avec succès');
            client.query('DELETE FROM sons WHERE id = $1', [sonId], (err, result) => {
                if (err) {
                    console.error("Erreur lors de la suppression du son:", err);
                    res.status(500).send('Erreur lors de la suppression du son');
                } else {
                    res.status(200).json({ message: "Suppression réussie" });
                }
                client.end(); 
            });
        }
    });

}