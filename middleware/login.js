const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const User = require('../models/userModel');


module.exports.login = async (req, res, next) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            res.status(500).json({ message: err.message });
            return;
        }
        if (!user) {
            res.status(404).json({ message: 'Utente non trovato' });
            return;
        }
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            res.status(401).json({ message: 'Password non valida' });
            return;
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
            expiresIn: 86400 // 24 ore
        });
        res.status(200).json({
            id: user._id,
            email: user.email,
            accessToken: token
        });
    });
}


/*

Funzione login: Questa funzione é un gestore di route per l'endpoint di login.

Ricerca dell'utente: La funzione cerca un utente nel tuo database tramite l'indirizzo email fornito nella richiesta.

Gestione degli errori: Se si verifica un errore durante la ricerca dell'utente nel database, viene inviata una risposta con lo stato 500 e un oggetto JSON contenente un messaggio di errore. Se l'utente non viene trovato, viene inviata una risposta con lo stato 404 e un messaggio che indica che l'utente non è stato trovato.

Confronto della password: Se l'utente viene trovato nel database, viene effettuato un confronto tra la password fornita nella richiesta e la password memorizzata nel database utilizzando bcrypt.compareSync(). Se la password non è valida, viene inviata una risposta con lo stato 401 e un messaggio che indica che la password non è valida.

Generazione del token: Se la password è valida, viene generato un token JWT contenente l'ID dell'utente. Il token è firmato utilizzando una chiave segreta (process.env.JWT_SECRET) e ha un tempo di scadenza di 24 ore (86400 secondi).

Risposta: Se tutto va bene, viene inviata una risposta con lo stato 200 e un oggetto JSON che contiene l'ID dell'utente, il nome utente, l'indirizzo email, il ruolo dell'utente e l'access token.

*/