const express = require("express");
const mongoose = require("mongoose");

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
  const newAcquirente = new AcquirentiModel({
    codiceAcquirente: req.body.codiceAcquirente,
    denominazione: req.body.denominazione,
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

acquirentiRouter.get("/acquirenti/:id", async (req, res) => {
  try {
    const acquirenti = await AcquirentiModel.findById(req.params.id);
    res.json(acquirenti);
  } catch (error) {
    res.json({ message: error });
  }
});

acquirentiRouter.delete("/acquirenti/:id", async (req, res) => {
  try {
    const removedAcquirenti = await AcquirentiModel.remove({ _id: req.params.id });
    res.json(removedAcquirenti);
  } catch (error) {
    res.json({ message: error });
  }
});

acquirentiRouter.put("/acquirenti/:id", async (req, res) => {
  try {
    const updatedAcquirenti = await AcquirentiModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          codiceAcquirente: req.body.codiceAcquirente,
          denominazione: req.body.denominazione,
          partitaIva: req.body.partitaIva,
          codiceFiscale: req.body.codiceFiscale,
          indirizzo: req.body.indirizzo,
          cap: req.body.cap,
          citta: req.body.citta,
        },
      }
    );
    res.json(updatedAcquirenti);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = acquirentiRouter;
