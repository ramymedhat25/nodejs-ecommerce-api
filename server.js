const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
dotenv.config({ path: "config.env" });

//connect DB
mongoose
  .connect(process.env.DB_URI)
  .then((conn) => {
    console.log(`Database Connected: ${conn.connection.host}`);
  })
  .catch((err) => {
    console.error(`Database Error: ${err}`);
    process.exit(1);
  });

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

app.get("/", (req, res) => {
  res.send("Our API V3");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App Running on port ${PORT}`);
});
