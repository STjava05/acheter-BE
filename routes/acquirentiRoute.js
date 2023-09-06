

const express = require('express');
const router = express.Router();
const Acquirenti = require('../models/acquirenti');


router.post('/acquirenti', async (req, res) => {
    const acquirenti = new Acquirenti({
        codiceAcquirente: req.body.codiceAcquirente,
        denominazione: req.body.denominazione,
        partitaIva: req.body.partitaIva,
        codiceFiscale: req.body.codiceFiscale,
        indirizzo: req.body.indirizzo,
        cap: req.body.cap,
        citta: req.body.citta,
        
    });
    try {
        const savedAcquirenti = await acquirenti.save();
        res.json(savedAcquirenti);
    } catch (error) {
        res.json({ message: error });
    }
});

router.get('/acquirenti', async (req, res) => {


    try {
        const acquirenti = await Acquirenti.find();
        if(!acquirenti) throw Error('Nessun acquirente trovato');
        res.status(200).send({
            statusCode: 200,
            acquirenti: acquirenti
        })
    } catch (error) {
        res.json({ message: error });
    }
});

router.get('/acquirenti/:id', async (req, res) => {
    try {
        const acquirenti = await Acquirenti.findById(req.params.id);
        res.json(acquirenti);
    } catch (error) {
        res.json({ message: error });
    }
});

router.delete('/acquirenti/:id', async (req, res) => {
    try {
        const removedAcquirenti = await Acquirenti.remove({ _id: req.params.id });
        res.json(removedAcquirenti);
    } catch (error) {
        res.json({ message: error });
    }
});

router.put('/acquirenti/:id', async (req, res) => {
    try {
        const updatedAcquirenti = await Acquirenti.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    codiceAcquirente: req.body.codiceAcquirente,
                    denominazione: req.body.denominazione,
                    partitaIva: req.body.partitaIva,
                    codiceFiscale: req.body.codiceFiscale,
                    indirizzo: req.body.indirizzo,
                    cap: req.body.cap,
                    citta: req.body.citta,
                   
                }
            }
        );
        res.json(updatedAcquirenti);
    } catch (error) {
        res.json({ message: error });
    }
});

module.exports = router;

