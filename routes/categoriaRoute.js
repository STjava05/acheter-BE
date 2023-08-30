const express = require('express');
const router = express.Router();
const categoria = require('../models/categoria');



router.post('/categoria', async (req, res) => {
    const categoria = new categoria({
        codiceCategoria: req.body.codiceCategoria,
        nomeCategoria: req.body.nomeCategoria,
        descrizioneCategoria: req.body.descrizioneCategoria
    });
    try {
        const savedCategoria = await categoria.save();
        res.json(savedCategoria);
    } catch (error) {
        res.json({ message: error });
    }
});

router.get('/categoria', async (req, res) => {
    try {
        const categoria = await categoria.find();
        res.json(categoria);
    } catch (error) {
        res.json({ message: error });
    }
});

router.get('/categoria/:id', async (req, res) => {
    try {
        const categoria = await categoria.findById(req.params.id);
        res.json(categoria);
    } catch (error) {
        res.json({ message: error });
    }
});

router.delete('/categoria/:id', async (req, res) => {
    try {
        const removedCategoria = await categoria.remove({ _id: req.params.id });
        res.json(removedCategoria);
    } catch (error) {
        res.json({ message: error });
    }
});

router.put('/categoria/:id', async (req, res) => {
    try {
        const updatedCategoria = await categoria.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    codiceCategoria: req.body.codiceCategoria,
                    nomeCategoria: req.body.nomeCategoria,
                    descrizioneCategoria: req.body.descrizioneCategoria
                }
            }
        );
        res.json(updatedCategoria);
    } catch (error) {
        res.json({ message: error });
    }
});

module.exports = router;


