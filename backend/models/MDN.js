const mongoose = require('mongoose');

const MDNSchema = mongoose.Schema({
    nom: { type: String, required: true },
    anneeScolaire: { type: String, required: true},
    description: { type: String, required: true},
    type: { type: String, required: true},
    cols: { type: Number, required: true},
    reponseInitiale: { type:Array, required: true },
    reponseFinale: { type: Array, required: true }
});

module.exports = mongoose.model('MDN', MDNSchema);
