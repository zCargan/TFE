const { Client } = require('pg');

exports.testRoute = (req, res, next) => {
    console.log(req.file)
}