const express = require('express');
const router = express.Router();
const Merce = require('../models/merce');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cripto = require('crypto');
const {auth} = require('../middleware/auth');


 cloudinary.config({
    cloud_name: 'det3ogegq',
    api_key:'173525867179237',
    api_secret:'R5E4ld6sYk-vHL66GbU-YFfpnt0'
});

const cloudStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'merce',
        format: async (req, file) => 'png', // supports promises as well
        public_id: (req, file) => file.filename, // <-- Corretta definizione
    },
});


const internalStorage =multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        const uniqueSuffix = `${new Date.now().toISOString()}-${crypto.randomUUID()}`;
        const fileExtension = file.originalname.split('.').pop();
        cb(null, `${file.filename}-${uniqueSuffix}.${fileExtension}`);

    }
});

const uploads = multer({ storage: internalStorage });
const cloudUploads = multer({ storage: cloudStorage });
router.post('/merce/cloudUploads', cloudUploads.single('url'), async (req, res) => {
    const url = req.protocol + '://' + req.get('host');
    try {
        const urlImg = url + '/uploads/' + req.file.filename;
        res.status(200).json({url: req.file.path});
    } catch (error) {
        res.json({ message: error });
    }
});

router.post('/merce/uploadImg', uploads.single('images'), async (req, res) => {
   
     const url = req.protocol + '://' + req.get('host');
    try {
         imageUrl = url + '/images/' + req.file.filename;
        
        res.status(200).json({url: req.file.path});
    } catch (error) {
        res.json({ message: error });
    }
});



router.post('/merce/create', async (req, res) => {
    const merce = new Merce({
        
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
        console.log(savedMerce);
    } catch (error) {
        res.json({ message: error });
    }
});

router.get('/merce', async (req, res) => {
    const{page=1,pageSize=4}=req.query;
    try {
         const totalMerce = await Merce.count();
        const merce = await Merce.find().sort({ createdAt: 'desc' })
        .limit(pageSize)
        .skip((page-1)*pageSize)
        .populate('nome')
       

        res.status(200).send({
            statusCode: 200,
            totalMerce: totalMerce,
            currentPage:+page,
            pageSize: +pageSize,
            merce: merce
        });

        
    } catch (error) {
        res.json({ message: error });
    }
});

router.get('/merce/byId/:id', async (req, res) => {
    try {
        const merce = await Merce.findById(req.params.id);
        res.json(merce);
    } catch (error) {
        res.json({ message: error });
    }
});

router.delete('/merce/deleteOne/:id', async (req, res) => {
    try {
        const removedMerce = await Merce.remove({ _id: req.params.id });
        res.json(removedMerce);
    } catch (error) {
        res.json({ message: error });
    }
});

router.put('/merce/edit/:id', async (req, res) => {
    try {
        const updatedMerce = await Merce.updateOne(
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
