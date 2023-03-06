const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });

const app = express();

app.use(cors());
app.use(express.json());
app.use(require("./routes/flashcards"));

// get database access object
const dba = require("./db/conn");

const port = process.env.PORT || 5000;
app.listen(port, async () => {
  // perform a database connection when server starts
  const db = await dba.connectToMongoDb();
  app.locals.db = db;
  console.log(`Server is running on port: ${port}`);
});
