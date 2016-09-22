var mongoose = require('mongoose');

module.exports = function() {
    var schema = mongoose.Schema({
        nome: {
            type: String,
            required: true
        },
        icon: {
            type: String, 
            required: true
        }

    });

    return mongoose.model('Tipo', schema);
};
