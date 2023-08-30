const express = require('express');
const router = express.Router();
const User = require('../models/userModel');



router.post('/user', async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.passwordUser, salt);

    const newUser = new User({
       email: req.body.email,
         tipologiaUtenza: req.body.tipologiaUtenza,
        passwordUser: hashedPassword,
    });
    try {
        const savedUser = await User.save();
        res.json(savedUser);
    } catch (error) {
        res.json({ message: error });
    }
});

router.get('/user', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.json({ message: error });
    }
});

router.get('/user/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        res.json({ message: error });
    }
});

router.delete('/user/:id', async (req, res) => {
    try {
        const removedUser = await User.remove({ _id: req.params.id });
        res.json(removedUser);
    } catch (error) {
        res.json({ message: error });
    }
});

router.put('/user/:id', async (req, res) => {
    try {
        const updatedUser = await User.updateOne(
            { _id: req.params.id },
            {
                $set: {
                   
                    email: req.body.email,
                    tipologiaUtenza: req.body.tipologiaUtenza,
                    passwordUser: req.body.passwordUser,
                }
            }
        );
        res.json(updatedUser);
    } catch (error) {
        res.json({ message: error });
    }
});

module.exports = router;
