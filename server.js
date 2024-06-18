const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config({ path: "config.env" });

const dbConnection = require("./config/database");

const categoryRoute = require("./routes/categoryRoute");

//Connect with DB
dbConnection();

// express app
const app = express();

// Middlewares
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

//Mount Routes
app.use("/api/v1/categories", categoryRoute);

app.all("*", (req, res, next) => {
  const err = new Error(`Can't find this route: ${req.originalUrl}`);
  next(err.message);
});

//Global error handling Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ err });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App Running on port ${PORT}`);
});
