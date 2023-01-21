// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');
// const cors = require('cors');
// const User = require('./models/user');
// const Task = require('./models/task');

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true });

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// // Register route
// app.post('/register', (req, res) => {
//   const user = new User({
//     email: req.body.email,
//     password: req.body.password
//   });
//   user.save()
//     .then(() => {
//       res.status(200).json({ user: { id: user._id, email: user.email } });
//     })
//     .catch((err) => {
//       res.status(400).json({ message: 'Error: ' + err });
//     });
// });

// // Login route
// app.post('/login', (req, res) => {
//   User.findOne({ email: req.body.email })
//     .then((user) => {
//       if (!user) {
//         res.status(401).json({ message: 'Error: User not found' });
//         return;
//       }
//       if (user.password !== req.body.password) {
//         res.status(401).json({ message: 'Error: Incorrect password' });
//         return;
//       }
//       const token = jwt.sign({ id: user._id }, 'secretkey');
//       res.status(200).json({ jwt: token });
//     })
//     .catch((err) => {
//       res.status(400).json({ message: 'Error: ' + err });
//     });
// });

// // Authentication middleware
// const auth = (req, res, next) => {
//   const token = req.headers.authorization;
//   if (!token) {
//     res.status(401).json({ message: 'Error: Unauthorized' });
//     return;
//   }
//   jwt.verify(token, 'secretkey', (err, decoded) => {
//     if (err) {
//       res.status(401).json({ message: 'Error: Unauthorized' });
//       return;
//     }
//     req.userId = decoded.id;
//     next();
//   });
// }

// // Get user route
// app.get('/user', auth, (req, res) => {
//   User.findById(req.userId)
//     .then((user) => {
//       if (!user) {
//         res.status(404).json({ message: 'Error: User not found' });
//         return;
//       }
//       res.status(200).json({ user: { id: user._id, email: user.email } });
//     })
//     .catch((err) => {
//       res.status(400).json({ message: 'Error: ' + err });
//     });
// });
