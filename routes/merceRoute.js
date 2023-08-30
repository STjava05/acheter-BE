const express = require('express');
const router = express.Router();
const merce = require('../models/merce');


router.post('/merce', async (req, res) => {
    const merce = new merce({
        codiceMerce: req.body.codiceMerce,
        nomeMerce: req.body.nomeMerce,
        descrizioneMerce: req.body.descrizioneMerce,
        prezzoMerce: req.body.prezzoMerce,
        quantitaMerce: req.body.quantitaMerce,
        codiceCategoria: req.body.codiceCategoria
    });
    try {
        const savedMerce = await merce.save();
        res.json(savedMerce);
    } catch (error) {
        res.json({ message: error });
    }
});

router.get('/merce', async (req, res) => {
    try {
        const merce = await merce.find();
        res.json(merce);
    } catch (error) {
        res.json({ message: error });
    }
});

router.get('/merce/:id', async (req, res) => {
    try {
        const merce = await merce.findById(req.params.id);
        res.json(merce);
    } catch (error) {
        res.json({ message: error });
    }
});

router.delete('/merce/:id', async (req, res) => {
    try {
        const removedMerce = await merce.remove({ _id: req.params.id });
        res.json(removedMerce);
    } catch (error) {
        res.json({ message: error });
    }
});

router.put('/merce/:id', async (req, res) => {
    try {
        const updatedMerce = await merce.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    codiceMerce: req.body.codiceMerce,
                    nomeMerce: req.body.nomeMerce,
                    descrizioneMerce: req.body.descrizioneMerce,
                    prezzoMerce: req.body.prezzoMerce,
                    quantitaMerce: req.body.quantitaMerce,
                    codiceCategoria: req.body.codiceCategoria
                }
            }
        );
        res.json(updatedMerce);
    } catch (error) {
        res.json({ message: error });
    }
});




module.exports = router;
