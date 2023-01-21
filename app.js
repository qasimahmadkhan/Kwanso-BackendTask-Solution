const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
const config = require('./config/database');
const passport = require('passport');

require('./config/passport')(passport);

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const userRoute = require("./routes/user");
const taskRoute = require("./routes/task");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use('/api',userRoute);
app.use('/api',passport.authenticate('jwt', { session: false}),taskRoute);
// app.use(errorController.get404);


mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true }).then((result) => {
  app.listen(3000)
  console.log("connected");
})
  .catch((err) => {
    console.log(err);
  });
