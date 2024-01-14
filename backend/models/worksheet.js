const mongoose = require('mongoose');

const worksheetSchema = mongoose.Schema({
    nom: { type: String, required: true },
    anneeScolaire: { type: String, required: true},
    descriptionWorksheet: { type: String, required: true},
    data: { type:Array, required: true},
    type :{ type: String, required: true }
});

module.exports = mongoose.model('Worksheet', worksheetSchema);
