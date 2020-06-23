const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");

const userRouter = require("./routes/api/user");
const authRouter = require("./routes/api/auth");
const edRouter = require("./routes/api/education");
const workRouter = require("./routes/api/work");
const practiceRouter = require("./routes/api/practice");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const db = config.get("mongoURI");

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }) // Adding new mongo url parser
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/profile", edRouter);
app.use("/api/profile", workRouter);
app.use("/api/practice", practiceRouter);

//serve static assets if in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("staymech-client/build"));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "staymech-client", "build", "index.html")
    );
  });
}

module.exports = app;
