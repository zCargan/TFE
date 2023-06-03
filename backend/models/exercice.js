const mongoose = require('mongoose');


const exercicesSchema = mongoose.Schema({
    nom: { type:String, require: true}
})

module.exports = mongoose.model('Exercice', exercicesSchema);