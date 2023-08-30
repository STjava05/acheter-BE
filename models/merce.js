const mongoose = require('mongoose');
const MerceSchema = mongoose.Schema({
    codiceProdotto: {
        type: String,
        required: true,
        unique: true
    },
    descrizione: {
        type: String,
        required: true
    },
    url : {
        type: String,
        required: true

    },
    codiceCategoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    provezienza: {
        type: String,
        required: true
    },
    prezzo: {
        type: Number,
        required: true
    },
    quantitaDisponibile: {
        type: Number,
        required: true
    },


}); 
module.exports = mongoose.model('Merce', MerceSchema, 'merce');