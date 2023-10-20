const mongoose = require('mongoose');


const testSchema = mongoose.Schema({
    nom: { type:String, require: true}
})

module.exports = mongoose.model('Test', testSchema);