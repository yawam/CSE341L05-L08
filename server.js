const express = require("express");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");
const session = require("express-session");
const passport = require("./auth");
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;
const tasksRoutes = require("./routes/tasks");
const app = express();

app.use(express.json());

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send('<a href="/auth/google">Login with Google</a>');
});

app.get(
  "auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/tasks");
  }
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/tasks", (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect(tasksRoutes);
  } ///should I send task routes?
});

app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

app.listen(process.env.PORT, () => {
  console.log(
    `Server listening on port ` + `http://localhost:${process.env.PORT}`
  );
});

module.exports = app;
