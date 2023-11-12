const mongoose = require('mongoose');

const MBSchema = mongoose.Schema({
    nom: { type: String, required: true },
    anneeScolaire: { type: String, required: true},
    description: { type: String, required: true},
    type: { type: String, required: true},
    reponses: { type: mongoose.Schema.Types.Mixed, required: true }
});

module.exports = mongoose.model('MB', MBSchema);





