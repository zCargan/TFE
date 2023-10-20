const mongoose = require('mongoose');


const exercicesSchema = mongoose.Schema({
    type: { type:String, require: true},
    titre: {type:String, require: true},
    description: {type:String, require: true},
    direction: {type:String, require: true},
    initial_index: {type:Array, require: true},
    initial_value: {type:Array, require: true},
    final_index: {type:Array, require: true},
    final_value: {type:Array, require: true}
})

module.exports = mongoose.model('Exercice', exercicesSchema);