const { Client } = require('pg');


exports.registerData = (req, res, next) => {

    console.log(req.body)

    const client = new Client({
        host: 'localhost',
        port: 5432,
        database: 'test',
        user: 'postgres',
        password: 'LoganTFE2023',
    });

    client.connect()
    const pseudo = req.body.pseudo
    const password = req.body.password
    const query = `INSERT INTO utilisateurs (nom, password, role) VALUES ('${pseudo}', '${password}', 'professeur')`;
    console.log(query)
    client.query(query, (error, result) => {
        if (error) {
            console.error('Erreur lors de l\'ajout des données:', error);
        } else {
            console.log('Données ajoutées avec succès à la table utilisateurs');
            res.status(201).json({ message: 'utilisateur ajouté' })
        }
        client.end(); // Ferme la connexion après avoir exécuté la requête
    });
}