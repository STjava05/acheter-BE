const mongoose = require('mongoose');
const CategoriaSchema = mongoose.Schema({
    codiceCategoria: {
        type: String,
        required: true,
        unique: true
    },
    descrizione: {
        type: String,
        required: true
    },

});
module.exports = mongoose.model('Categoria', CategoriaSchema, 'categoria');