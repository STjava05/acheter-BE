const express = require('express');
const router = express.Router();
const Ordine = require('../models/ordine');


router.post('/ordine', async (req, res) => {
    const ordine = new Ordine({
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
        const ordine = await Ordine.find();
        res.json(ordine);
    } catch (error) {
        res.json({ message: error });
    }
});

router.get('/ordine/:id', async (req, res) => {
    try {
        const ordine = await Ordine.findById(req.params.id);
        res.json(ordine);
    } catch (error) {
        res.json({ message: error });
    }
});

router.delete('/ordine/:id', async (req, res) => {
    try {
        const removedOrdine = await Ordine.remove({ _id: req.params.id });
        res.json(removedOrdine);
    } catch (error) {
        res.json({ message: error });
    }
});

router.put('/ordine/:id', async (req, res) => {
    try {
        const updatedOrdine = await Ordine.updateOne(
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





