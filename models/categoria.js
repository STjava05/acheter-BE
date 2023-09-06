const mongoose = require('mongoose');
const CategoriaSchema = mongoose.Schema({
    codiceCategoria: {
        type: String,
        required: true,
        
    },
    descrizione: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },

});
module.exports = mongoose.model('Categoria', CategoriaSchema, 'categoria');