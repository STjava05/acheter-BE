const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
   
    email: {
        type: String,
        required: true,
        unique: true
    },
    tipologiaUtenza: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    
});
module.exports = mongoose.model('User', UserSchema, 'users');