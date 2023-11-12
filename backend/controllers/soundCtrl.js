const jwt = require("jsonwebtoken");
const { Client } = require('pg');

exports.postSound = (req, res, next) => {
    const token = req.header('Authorization');
    if (token) {
        const jwtToken = token.replace('Bearer ', ''); // Pour extraire le JWT sans le préfixe 'Bearer '
        const secretKey = "test"
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
                    host: 'localhost',
                    port: 5432,
                    database: 'test',
                    user: 'postgres',
                    password: 'LoganTFE2023',
                });

                client.connect()
                .then(() => {

                    const insertQuery = {
                        text: 'INSERT INTO sons (utilisateur_id, son_data, type_mime, nom_d_origine) VALUES ($1, $2, $3, $4)',
                        values: [decoded.id, fileBuffer, file.mimetype, req.body.name],
                    };

                    const result = client.query(insertQuery);
                    console.log('Image insérée avec succès:', result);
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
        host: 'localhost',
        port: 5432,
        database: 'test',
        user: 'postgres',
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
                res.status(200).json({ resultat: result.rows[0] });
            }}
        )
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des sons:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des sons' });
    });
}
