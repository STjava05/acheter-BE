const express = require('express');
const router = express.Router();
const Producteur = require('../models/producteur');



router.post('/producteur/create', async (req, res) => {
    const producteur = new Producteur({
        avatarUrl: req.body.avatarUrl,
       nome : req.body.nome,
         cognome : req.body.cognome,
            paese : req.body.paese,
            numeriDiEttari : req.body.numeriDiEttari,
            orticolturaSpecializato : req.body.orticolturaSpecializato,
    });
    try {
        const savedProducteur = await producteur.save();
        res.json(savedProducteur);
        console.log(savedProducteur);
    } catch (error) {
        res.json({ message: error });
    }
});

   

router.get('/producteur', async (req, res) => {
     const{page=1,pageSize=4}=req.query;
    try {
        const producteur = await Producteur.find().sort({ createdAt: 'desc' })

        .limit(pageSize)
        .skip((page-1)*pageSize)
        const totalProducteur = await Producteur.count();
        res.status(200).send({
            statusCode: 200,
            totalProducteur: totalProducteur,
            currentPage:+page,
            pageSize: +pageSize,
            producteur: producteur
            
        });
    } catch (error) {
        res.json({ message: error });
    }
});

router.get('/producteur/byId/:id', async (req, res) => {
    try {
        const producteur = await Producteur.findById(req.params.id);
        res.json(producteur);
    } catch (error) {
        res.json({ message: error });
    }
});

router.delete('/producteur/deleteOne/:id', async (req, res) => {
    try {
        const removedProducteur = await Producteur.remove({ _id: req.params.id });
        res.json(removedProducteur);
    } catch (error) {
        res.json({ message: error });
    }
});

router.put('/producteur/edit/:id', async (req, res) => {
    try {
        const updatedProducteur = await Producteur.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    avatarUrl : req.body.avatarUrl,
                    nome : req.body.nome,
                    cognome : req.body.cognome,
                    paese : req.body.paese,
                    numeriDiEttari : req.body.numeriDiEttari,
                    orticolturaSpecializato : req.body.orticolturaSpecializato,
                }
            }
        );
            
        res.json(updatedProducteur);
    } catch (error) {
        res.json({ message: error });
    }
});

module.exports = router;


