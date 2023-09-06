const mongoose = require("mongoose");

const AcquirentiSchema = new mongoose.Schema(
  {
    codiceAcquirente: {
      type: String,
      required: true,
    },
    denominazione: {
      type: String,
      required: true,
    },
    partitaIva: {
      type: Number,
      required: true,
    },
    codiceFiscale: {
      type: String,
      required: true,
    },
    indirizzo: {
      type: String,
      required: true,
    },
    cap: {
      type: Number,
      required: true,
    },
    citta: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, strict: true }
);
module.exports = mongoose.model("Acquirenti", AcquirentiSchema, "acquirenti");
