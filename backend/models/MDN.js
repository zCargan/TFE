const mongoose = require('mongoose');

const MDNSchema = mongoose.Schema({
    nom: { type: String, required: true },
    anneeScolaire: { type: String, required: true},
    description: { type: String, required: true},
    type: { type: String, required: true},
    reponseInitiale: { type: mongoose.Schema.Types.Mixed, required: true },
    reponseFinale: { type: mongoose.Schema.Types.Mixed, required: true }
});

module.exports = mongoose.model('MDN', MDNSchema);
