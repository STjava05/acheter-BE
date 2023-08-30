const mongoose = require('mongoose');
const OrdineSchema = mongoose.Schema({
    codiceOrdine: {
        type: String,
        required: true,
        unique: true
    },
    codiceAcquirenti: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Acquirenti',
        required: true
    },
    codiceProdotto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Merce',
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