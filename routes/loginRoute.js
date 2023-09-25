


const express = require('express');
const login = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Acquirenti = require('../models/acquirenti');

login.post('/login', async (req, res) => {
    const user = await Acquirenti.findOne({ email: req.body.email });
    if (!user) {
        return res.status(404).send({
            statusCode: 404,
            message: `nessun utente trovato nel DB`,
        });
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send({
            statusCode: 400,
            message: `password non valida`,
        });
    }
    const token = jwt.sign({
        id: user._id,
        email: user.email,
        denominazione: user.denominazione,
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
    );

    res.status(200).json({
        statusCode: 200,
        message: `login effettuato con successo`,
        token,
    });
});

module.exports = login;

          

