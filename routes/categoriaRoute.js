const express = require('express');
const router = express.Router();
const Categoria = require('../models/categoria');



router.post('/categoria', async (req, res) => {
    const categoria = new Categoria({
        codiceCategoria: req.body.codiceCategoria,
        categoria: req.body.categoria,
        descrizione: req.body.descrizione
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
        const categoria = await Categoria.find();
        res.json(categoria);
    } catch (error) {
        res.json({ message: error });
    }
});

router.get('/categoria/:id', async (req, res) => {
    try {
        const categoria = await Categoria.findById(req.params.id);
        res.json(categoria);
    } catch (error) {
        res.json({ message: error });
    }
});

router.delete('/categoria/:id', async (req, res) => {
    try {
        const removedCategoria = await Categoria.remove({ _id: req.params.id });
        res.json(removedCategoria);
    } catch (error) {
        res.json({ message: error });
    }
});

router.put('/categoria/:id', async (req, res) => {
    try {
        const updatedCategoria = await Categoria.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    codiceCategoria: req.body.codiceCategoria,
                    categoria: req.body.categoria,
                    descrizione: req.body.descrizione
                }
            }
        );
        res.json(updatedCategoria);
    } catch (error) {
        res.json({ message: error });
    }
});

module.exports = router;


