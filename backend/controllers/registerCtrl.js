const { Client } = require('pg');
const argon2 = require('argon2');


async function hashPassword(password) {
    try {
        const hash = await argon2.hash(password);
        return hash;
    } catch (error) {
        console.error('Erreur lors du hachage du mot de passe avec Argon2:', error);
        throw error;
    }
}

exports.registerData = (req, res, next) => {

const client = new Client({
    host: 'db',
    port: 5432,
    database: 'test',
    user: 'loganAdmin',
    password: 'LoganTFE2023',
});

    client.connect()

    const surname = req.body.surname
    const password = req.body.password
    const email = req.body.email

    console.log(password)

    hashPassword(password)
        .then((hashedPassword) => {
            console.log('Mot de passe haché avec succès:', hashedPassword);
            const query = `INSERT INTO utilisateurs (nom, password, email, role) VALUES ('${surname}', '${hashedPassword}', '${email}', 'eleve')`;

            client.query(query, (error, result) => {
                if (error) {
                    console.error('Erreur lors de l\'ajout des données:', error);
                } else {
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