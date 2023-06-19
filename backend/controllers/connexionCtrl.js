const { Client } = require('pg');

exports.connection = (req, res, next) => {

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
            console.log("Utilisateur pas trouvé")
            res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
        } else {
            console.log(result.rows[0])
            let passwordDb = result.rows[0].password
            if(password == passwordDb) {
                console.log('connecté')
                res.status(200).json({msg: "connecté", role:result.rows[0].role})
            } else {
                console.log('Password incorrect')
                res.status(400).json({msg: "Pas connecté"})
            }
        }
        }}
    )
}