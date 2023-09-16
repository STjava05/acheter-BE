const mongoose = require('mongoose');
const ProducteurSchema = mongoose.Schema({

    avatarUrl: {
        type: String,
        required: true,

    },
    nome: {
        type: String,
        required: true
    },
    cognome: {
        type: String,
        required: true

    },
    paese: {
        type: String,
        required: true
    },
    numeriDiEttari: {
        type: Number,
        required: true
    },
    orticolturaSpecializato : {
        type: String,
        required: true
    },

});
module.exports = mongoose.model('Producteur', ProducteurSchema, 'producteur');