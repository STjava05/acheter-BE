const mongoose = require('mongoose');
const OrdineSchema = mongoose.Schema({
    codiceOrdine: {
        type: String,
        required: true,
        
    },
    codiceAcquirenti: {
        type: Number,
        required: true
    },
    codiceProdotto: {
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