const express = require('express');
const router = express.Router();
const ordine = require('../models/ordine');


router.post('/ordine', async (req, res) => {
    const ordine = new ordine({
        codiceOrdine: req.body.codiceOrdine,
        codiceAcquirenti: req.body.codiceAcquirenti,
        codiceProdotto: req.body.codiceProdotto,
        quantita: req.body.quantita,
        prezzoTotale: req.body.prezzoTotale,
        dataOrdine: req.body.dataOrdine
    });
    try {
        const savedOrdine = await ordine.save();
        res.json(savedOrdine);
    } catch (error) {
        res.json({ message: error });
    }
});

router.get('/ordine', async (req, res) => {
    try {
        const ordine = await ordine.find();
        res.json(ordine);
    } catch (error) {
        res.json({ message: error });
    }
});

router.get('/ordine/:id', async (req, res) => {
    try {
        const ordine = await ordine.findById(req.params.id);
        res.json(ordine);
    } catch (error) {
        res.json({ message: error });
    }
});

router.delete('/ordine/:id', async (req, res) => {
    try {
        const removedOrdine = await ordine.remove({ _id: req.params.id });
        res.json(removedOrdine);
    } catch (error) {
        res.json({ message: error });
    }
});

router.put('/ordine/:id', async (req, res) => {
    try {
        const updatedOrdine = await ordine.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    codiceOrdine: req.body.codiceOrdine,
                    codiceAcquirenti: req.body.codiceAcquirenti,
                    codiceProdotto: req.body.codiceProdotto,
                    quantita: req.body.quantita,
                    prezzoTotale: req.body.prezzoTotale,
                    dataOrdine: req.body.dataOrdine
                }
            }
        );
        res.json(updatedOrdine);
    } catch (error) {
        res.json({ message: error });
    }
});

module.exports = router;





