const express = require("express");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");
const session = require("express-session");
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const uri = process.env.MONGODB_URI;
const tasksRoutes = require("./routes/tasks");
const app = express();
const authRoutes = require("./routes/auth");
const passport = require("passport");
const { ensureAuth } = require("./middleware/auth");

// body parser middleware
app.use(express.json());

// MongoDB connection
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// session middleware
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  })
);

// passport config and middleware
require("./passport")(passport);

app.use(passport.initialize());
app.use(passport.session());

// routes
app.get("/", (req, res) => {
  res.send('<a href="/auth/google">Login with Google</a>');
});

// app.get(
// "auth/google",
// passport.authenticate("google", { scope: ["profile", "email"] })
// );

// app.get(
// "/auth/google/callback",
// passport.authenticate("google", { failureRedirect: "/" }),
// (req, res) => {
// res.redirect("/api-docs");
// }
// );

app.use("/auth", authRoutes);
app.use("/api-docs", ensureAuth, swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/tasks", tasksRoutes);

app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

app.listen(process.env.PORT, () => {
  console.log(
    `Server listening on port` + `http://localhost:${process.env.PORT}`
  );
});

module.exports = app;
