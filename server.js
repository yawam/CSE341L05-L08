const express = require("express");
require("dotenv").config();
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");
//const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;
const tasksRoutes = require("./routes/tasks");

app.use(express.json());

console.log(uri);

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/tasks", tasksRoutes);

app.listen(process.env.PORT, () => {
  console.log(
    `Server listening on port ` + `http://localhost:${process.env.PORT}`
  );
});

module.exports = app;
