const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config({ path: "config.env" });
const globalError = require("./middlewares/errorMiddlewares.js");
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
app.use(globalError);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`App Running on port ${PORT}`);
});

//Handling Rejections outside express
process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error('Shutting Down.....');
    process.exit(1);
  });
});
