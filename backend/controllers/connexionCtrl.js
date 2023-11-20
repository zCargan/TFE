const { Client } = require('pg');
const jwt = require("jsonwebtoken");
const { json } = require('express');

exports.connection = (req, res, next) => {

    const token = req.headers;

    const pseudo = req.body.pseudo
    const password = req.body.password
    const test = "Mallo"

    const query = `SELECT * FROM public.utilisateurs WHERE nom='${pseudo}'`

    console.log(query)

    const client = new Client({
        host: 'localhost',
        port: 5432,
        database: 'test',
        user: 'postgres',
        password: 'LoganTFE2023',
    });

    client.connect()
    client.query(query, (error, result) => {
        if (error) {
            res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
        } else {
        if(result.rows.length == 0) {
            res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
        } else {
            let passwordDb = result.rows[0].password
            if(password == passwordDb) {
                console.log(result.rows[0])
                //result.rows[0] ==> { id: 1, nom: 'a', password: 'a', role: 'professeur' }
                let id = result.rows[0].id;
                let nom = result.rows[0].nom;
                let password = result.rows[0].password;
                let role = result.rows[0].role;

                const createTokenFromJson = (jsonData, options = {}) => {
                    try {
                        const secretKey = "test"
                        const token = jwt.sign(jsonData, secretKey, options)
                        return token
                    } catch(error) {
                        console.log('Error : ', error.message)
                    }
                }

                const jsonData = {id : id, nom: nom, password: password, role: role}
                const token = createTokenFromJson(jsonData);
                res.json({ status: true, id: id, nom: nom, role: role, token: token})
            } else {
                console.log('Password incorrect')
                res.status(400).json({msg: "Pas connecté"})
            }
        }
        }}
    )
}

exports.checkToken = (req, res) => {
    const token = req.header('Authorization');
    if (token) {
        const jwtToken = token.replace('Bearer ', ''); // Pour extraire le JWT sans le préfixe 'Bearer '
        const secretKey = "test"
        jwt.verify(jwtToken, secretKey, (err, decoded) => {
            if (err) {
                console.error('Erreur lors de la vérification du JWT :', err);
            } else {
                if(decoded.role === "professeur") {
                    res.json({role: "professeur", username: decoded.nom})
                } else if (decoded.role === "eleve") {
                    res.json({role: "eleve", username: decoded.nom})
                } else if (decoded.role === "admin") {
                    res.json({role: "admin", username: decoded.nom})
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
        const secretKey = "test"
        jwt.verify(jwtToken, secretKey, (err, decoded) => {
            if (err) {
                console.error('Erreur lors de la vérification du JWT :', err);
            } else {
                res.json({ id: decoded.id, nom: decoded.nom, role: decoded.role})
            }
        })
    }
}