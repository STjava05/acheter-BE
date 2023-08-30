// errorMiddleware.js

const errorMiddleware = (err, req, res, next) => {
    console.error(err); // Stampa l'errore nella console per la diagnostica
  
    // Gestione degli errori personalizzata a seconda del tipo di errore
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
  
    // Altre gestioni degli errori...
  
    // Se non è stato possibile gestire l'errore, invia una risposta generica di errore 500
    res.status(500).json({ message: 'Si è verificato un errore interno.' });
  };
  
  module.exports = errorMiddleware;
  