const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const PORT = 5052;

//require delle routes
const merceRouter = require("./routes/merceRoute");
const ordineRouter = require("./routes/ordineRoute");
const categoriaRouter = require("./routes/categoriaRoute");
const acquirenteRouter = require("./routes/acquirentiRoute");
const userRouter = require("./routes/userRoute");
const { login } = require("./middleware/login");
const { auth } = require("./middleware/auth");

const app = express();
app.use(express.json());

app.use(cors());

//routes
app.use("/", categoriaRouter);
app.use("/", ordineRouter);
app.use("/", merceRouter);
app.use("/", acquirenteRouter);
app.use("/", login);
app.use("/", userRouter);

//connect to mongoDB
mongoose.connect(process.env.MONGO_DB_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to DB"));

//listen to server
app.listen(process.env.PORT || 5052, () => {
  console.log(`Server is running on port: ${process.env.PORT || PORT}`);
});
