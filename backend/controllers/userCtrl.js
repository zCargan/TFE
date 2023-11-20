const { Client } = require('pg');

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