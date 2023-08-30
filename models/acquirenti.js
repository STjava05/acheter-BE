const mongoose = require('mongoose');
const AcquirentiSchema = mongoose.Schema({
    codiceAcquirente: {
        type: String,
        required: true,
        unique: true
    },
    denominazione: {
        type: String,
        required: true
    },
    partitaIva: {
        type: Number,
        required: true
    },
    codiceFiscale: {
        type: String,
        required: true
    },
    indirizzo: {
        type: String,
        required: true
    },
  
    cap: {
        type: Number,
        required: true
    },
    citta: {
        type: String,
        required: true
    },
    email : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true

    },
});
module.exports = mongoose.model('Acquirenti', AcquirentiSchema, 'acquirenti');
