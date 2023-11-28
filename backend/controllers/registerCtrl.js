const { Client } = require('pg');


exports.registerData = (req, res, next) => {

    const client = new Client({
        host: 'localhost',
        port: 5432,
        database: 'test',
        user: 'postgres',
        password: 'LoganTFE2023',
    });

    client.connect()

    const surname = req.body.surname
    const password = req.body.password
    const email = req.body.email

    console.log(email)

    const query = `INSERT INTO utilisateurs (nom, password, email, role) VALUES ('${surname}', '${password}', '${email}', 'eleve')`;

    client.query(query, (error, result) => {
        if (error) {
            console.error('Erreur lors de l\'ajout des données:', error);
        } else {
            console.log('Données ajoutées avec succès à la table utilisateurs');
            res.status(201).json({ message: 'utilisateur ajouté' })
        }
        client.end();
    });
}