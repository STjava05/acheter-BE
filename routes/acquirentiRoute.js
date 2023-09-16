const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const AcquirentiModel = require("../models/acquirenti");

const acquirentiRouter = express.Router();

acquirentiRouter.get("/acquirenti", async (req, res) => {
  try {
    const acquirenti = await AcquirentiModel.find();

    if (!acquirenti) {
      return res.status(404).send({
        statusCode: 404,
        message: `nessun acquirente trovato nel DB`,
      });
    }
    res.status(200).send({
      statusCode: 200,
      acquirenti,
    });
  } catch (error) {
    console.error("Errore nella query al database:", error);
    res.status(500).send({
      statusCode: 500,
      message: "Internal Server Error",
      error: error.message, // Invia il messaggio di errore al client
    });
  }
});

acquirentiRouter.post("/acquirenti/create", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newAcquirente = new AcquirentiModel({
   
    denominazione: req.body.denominazione,
    email: req.body.email,
    password: hashedPassword,
    partitaIva: req.body.partitaIva,
    codiceFiscale: req.body.codiceFiscale,
    indirizzo: req.body.indirizzo,
    cap: req.body.cap,
    citta: req.body.citta,
  });
  try {
    const savedAcquirenti = await newAcquirente.save();

    res.status(200).send({
      statusCode: 200,
      message: "New acquirente successfully created and saved in DB",
      payload: savedAcquirenti,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal Server Error",
      error: error.message, // Invia il messaggio di errore al client
    });
  }
});

acquirentiRouter.get("/acquirenti/byId/:id", async (req, res) => {
  try {
    const acquirenti = await AcquirentiModel.findById(req.params.id);
    res.json(acquirenti);
  } catch (error) {
    res.json({ message: error });
  }
});

acquirentiRouter.delete("/acquirenti/deleteOne/:id", async (req, res) => {
  try {
    const removedAcquirenti = await AcquirentiModel.remove({ _id: req.params.id });
    res.json(removedAcquirenti);
  } catch (error) {
    res.json({ message: error });
  }
});

acquirentiRouter.put("/acquirenti/edit/:id", async (req, res) => {
  try {
    if (req.body.password) {
      // L'utente sta cercando di modificare la password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      // Aggiorna la password hashed nel corpo della richiesta
      req.body.password = hashedPassword;
    }

    const updatedAcquirenti = await AcquirentiModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          // Alcuni campi dell'acquirente
          denominazione: req.body.denominazione,
          email: req.body.email,
          partitaIva: req.body.partitaIva,
          codiceFiscale: req.body.codiceFiscale,
          indirizzo: req.body.indirizzo,
          cap: req.body.cap,
          citta: req.body.citta,
          // Password se è stata modificata, altrimenti rimane la stessa
          password: req.body.password || undefined,
        },
      }
    );
    res.json(updatedAcquirenti);
  } catch (error) {
    res.json({ message: error });
  }
});


module.exports = acquirentiRouter;
