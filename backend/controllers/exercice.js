const Exercice = require('../models/exercice');


exports.postExercice = (req, res, next) => {
    console.log(req.body)
    const exercice = new Exercice({
        ...req.body
    })
    exercice.save()
} 