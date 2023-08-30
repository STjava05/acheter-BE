const jwt = require('jsonwebtoken');



exports.auth = (req, res, next) => {
    try {
        if(process.env.DEV == 'true'){
            next();
            return;

        }
        const token = req.headers.authorization.split(" ")[1]; // ottieni il token dalla richiesta
        const decodedToken = jwt.verify(token, process.env.JWT_KEY); // decodifica il token
        const userId = decodedToken.userId; // ottieni l'ID utente dal token
        if (req.body.userId && req.body.userId !== userId) { // se l'ID utente non corrisponde a quello del token
             throw 'User ID non valdo';
        } else {
            next(); // se l'ID utente corrisponde a quello del token, passa alla prossima funzione
        }
    } catch {
        res.status(401).json({
            error: new Error('Richiesta non valida!')
        });
    }
}


/*

Importazione: Assicurati di aver importato correttamente la dipendenza jsonwebtoken.

Funzione authenticate: Questa funzione é un middleware di autenticazione che controlla se l'utente è autorizzato ad accedere a determinate risorse.

Modalità di sviluppo: La funzione verifica se process.env.DEV_MODE è impostato su 'true'. Se è vero, la funzione chiama il middleware successivo e salta l'autenticazione. Questo può essere utile durante lo sviluppo per semplificare il processo di test.

Estrazione del token: La funzione cerca l'header x-access-token nella richiesta, che dovrebbe contenere il token JWT.

Token assente: Se il token non è presente, viene inviata una risposta con lo stato 403 (Non autorizzato) e un messaggio che indica che il token non è stato fornito.

Verifica del token: Se il token è presente, viene utilizzato il metodo jwt.verify per verificare la validità del token utilizzando la chiave segreta process.env.JWT_SECRET. Se la verifica fallisce, viene inviata una risposta con lo stato 401 (Non autorizzato) e un messaggio che indica che l'utente non è autorizzato.

Utente autorizzato: Se il token è valido, il payload decodificato viene estratto e l'ID dell'utente viene aggiunto all'oggetto req per essere utilizzato nelle successive operazioni. Successivamente, il middleware chiama next() per passare al middleware successivo.

Gestione degli errori: Se si verifica un errore durante il processo di autenticazione, viene inviata una risposta con lo stato 500 (Errore del server) e un messaggio di errore.



*/

