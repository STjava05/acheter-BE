const mongoose = require('mongoose');
const MerceSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true
       
    },
    descrizione: {
        type: String,
        required: true
        
    },
    url : {
        type: String,
        required: true

    },
    categoria: {
        type:  String,
        
        required: true
    },
    provenienza: {
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
