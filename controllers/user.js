let config = require('../config/database'),
  jwt = require('jsonwebtoken');

const User = require("../models/user");

exports.getIndex = (req, res) => {
  res.render("register");
};

exports.register = (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.json({ success: false, msg: 'Please pass email and password.' });
  } else {
    let newUser = new User({
      email: req.body.email,
      password: req.body.password
    });
    // save the user
    newUser.save(function (err) {
      if (err) {
        return res.json({ success: false, msg: 'email already exists.' });
      }
      res.json({ success: true, msg: 'Successful created new user.', user: { id: newUser._id, email: newUser.email } });
    });
  }
};

exports.login = (req, res) => {
  User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          let token = jwt.sign({ id: user._id }, config.secret);
          // return the information including token as JSON
          res.json({ success: true, jwt: token });
        } else {
          res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
        }
      });
    }
  });

};
exports.getUser = (req, res) => {
  let token = getToken(req.headers);
  if (token) {
    User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        res.status(401).json({ message: "Error: User Not found" });
        return;
      }
      res.status(200).json({ user: { id: user._id ,email: user.email } });
    })
    .catch((err) => {
      res.status(400).json({ message: "Eror " + err });
    });
  } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
  
};



getToken = function (headers) {
  if (headers && headers.authorization) {
      let parted = headers.authorization.split(' ');
      if (parted.length === 2) {
          return parted[1];
      } else {
          return null;
      }
  } else {
      return null;
  }
};
