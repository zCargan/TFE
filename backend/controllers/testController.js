const { Client } = require('pg');


exports.getInfoPQ = (req, res, next) => {
    console.log("on passe par icicicddddi")
    const client = new Client({
        host: 'db',
        port: 5432,
        database: 'test',
        user: 'loganAdmin',
        password: 'LoganTFE2023',
    });

    client.connect()

    client.query("SELECT * FROM public.utilisateurs", (error, result) => {
        if (error) {
            console.error('Erreur lors de la récupération des utilisateurs:', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
        } else {
            console.log(result.rows);
            res.json(result.rows)
        }
    }
    )
};


exports.sendData = (req, res, next) => {
    const client = new Client({
        host: 'db',
        port: 5432,
        database: 'test',
        user: 'loganAdmin',
        password: 'LoganTFE2023',
    });

    client.connect()
    const username = req.body.username
    const password = req.body.password
    const query = `INSERT INTO utilisateurs (nom, password) VALUES ('${username}', '${password}')`;
    console.log(query)
    client.query(query, (error, result) => {
        if (error) {
            console.error('Erreur lors de l\'ajout des données:', error);
        } else {
            console.log('Données ajoutées avec succès à la table utilisateurs');
        }
        client.end(); // Ferme la connexion après avoir exécuté la requête
    });
}

exports.testMongoDB = (req, res, next) => {
    console.log(req.body.data)
    const testSchema = new Test({
        nom: req.body.data
    })
    testSchema.save()

}