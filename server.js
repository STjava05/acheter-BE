const express = require('express');

const mongoose = require('mongoose');
const cors = require('cors');


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
const app = express();
app.use(express.json());
app.use(cors());
//routes
app.use('/', login);
app.use('/', merceRouter);
app.use('/', ordineRouter);
app.use('/', categoriaRouter);
 app.use('/', acquirenteRouter);
 app.use('/', userRouter);

// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Errore interno del server');
// });


//listen to server
app.listen(process.env.PORT || 5052, () => {
    console.log(`Server is running on port: ${process.env.PORT || 5052}`);
  }
  );
  