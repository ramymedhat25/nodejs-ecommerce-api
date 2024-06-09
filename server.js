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
// express app
const app = express();
// Middlewares
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}
// 1- Create Schema
const categorySchema = new mongoose.Schema({
  name: String,
});

// 2- Create Model
const categoryModel = mongoose.model("Category", categorySchema);

//Routes
app.post("/", (req, res) => {
  const name = req.body.name;
  console.log(req.body);

  const newCategory = new categoryModel({ name });
  newCategory
    .save()
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.json(err);
    });
});
app.get("/", (req, res) => {
  res.send("Our API V3");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App Running on port ${PORT}`);
});
