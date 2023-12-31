const mongoose = require('mongoose');
const OrdineSchema = mongoose.Schema({
    numberOrdine: {
        type: String,
        required: true,
        
    },
    producteur: {
        type: Number,
        required: true
    },
    prodotto: {
        type: Number,
        required: true
    },
    quantita: {
        type: Number,
        required: true
    },
    prezzoTotale: {
        type: Number,
        required: true
    },
    dataOrdine: {
        type: Date,
        required: true
    },

});
module.exports = mongoose.model('Ordine', OrdineSchema, 'ordine');