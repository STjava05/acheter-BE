const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
app.use(cors());
app.use(express.json());
require('dotenv/config');


//connect to mongoDB
mongoose.connect(process.env.MONGO_DB_URL);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to DB'));

//require delle routes
const merceRouter = require('./routes/merceRoute');
const ordineRouter = require('./routes/ordineRoute');
const categoriaRouter = require('./routes/categoriaRoute');
 const acquirenteRouter = require('./routes/acquirentiRoute');
    const userRouter = require('./routes/userRoute');
const {login} = require('./middleware/login');
const {auth} = require('./middleware/auth');
//routes
app.use('/', login);
app.use('/',auth, merceRouter);
app.use('/',auth, ordineRouter);
app.use('/',auth, categoriaRouter);
 app.use('/',auth, acquirenteRouter);
 app.use('/',auth, userRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Errore interno del server');
});


//listen to server
app.listen(process.env.PORT || 5050, () => {
    console.log(`Server is running on port: ${process.env.PORT || 5050}`);
  }
  );
  