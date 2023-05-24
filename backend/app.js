const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const csurf = require("csurf");
const debug = require("debug");

const cors = require("cors");

const { isProduction } = require("./config/keys.js");

require("./models/User");
require("./models/Favorite");
require("./models/Recipe");
require("./models/Review");
require("./config/passport");
const passport = require("passport");
const usersRouter = require("./routes/api/users");
const csrfRouter = require("./routes/api/csrf");
const favoritesRouter = require("./routes/api/favorites");
const reviewsRouter = require("./routes/api/reviews");
const aiRouterDavinci = require("./routes/api/generateDavinci");
const aiRouterTurbo = require("./routes/api/generateTurbo");
const recipesRouter = require("./routes/api/recipes");
const searchRouter = require("./routes/api/search");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

if (!isProduction) {
  app.use(cors());
}

app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true,
    },
  })
);

app.use("/api/users", usersRouter);
app.use("/api/csrf", csrfRouter);
app.use("/api/generateDavinci", aiRouterDavinci);
app.use("/api/generateTurbo", aiRouterTurbo);
app.use("/api/favorites", favoritesRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/recipes", recipesRouter);
app.use("/api/search", searchRouter);

if (isProduction) {
  const path = require("path");
  app.get("/", (req, res) => {
    res.cookie("CSRF-TOKEN", req.csrfToken());
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
  });

  app.use(express.static(path.resolve("../frontend/build")));

  app.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie("CSRF-TOKEN", req.csrfToken());
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
  });
}

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.statusCode = 404;
  next(err);
});

const serverErrorLogger = debug("backend:error");

app.use((err, req, res, next) => {
  serverErrorLogger(err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    statusCode,
    errors: err.errors,
  });
});



module.exports = app;
