const express = require('express');
const router = express.Router();
const merce = require('../models/merce');


router.post('/merce', async (req, res) => {
    const merce = new merce({
        
        nome: req.body.nome,
        descrizione: req.body.descrizione,
        prezzo: req.body.prezzo,
        quantitaDisponibile: req.body.quantitaDisponibile,
        provenienza: req.body.provenienza,
        categoria: req.body.categoria,
        url: req.body.url

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
                    nome: req.body.nome,
                    descrizione: req.body.descrizione,
                    prezzo: req.body.prezzo,
                    quantitaDisponibile: req.body.quantitaDisponibile,
                    categoria: req.body.categoria,
                    provenienza: req.body.provenienza,
                    url: req.body.url
                  
                }
            }
        );
        res.json(updatedMerce);
    } catch (error) {
        res.json({ message: error });
    }
});




module.exports = router;
