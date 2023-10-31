const mongoose = require('mongoose');


const exercicesSchema = mongoose.Schema({
    type: { type:String, require: true},
    titre: {type:String, require: true},
    description: {type:String, require: true},
    direction: {type:String, require: true},
    initial_index: {type: mongoose.Schema.Types.Mixed, require: true},
    initial_value: {type: mongoose.Schema.Types.Mixed, require: true},
    final_index: {type: mongoose.Schema.Types.Mixed, require: true},
    final_value: {type: mongoose.Schema.Types.Mixed, require: true}
})

module.exports = mongoose.model('Exercice', exercicesSchema);