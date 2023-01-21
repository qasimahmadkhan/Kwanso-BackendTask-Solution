const Task = require("../models/task");

exports.createTask = (req, res) => {
  let token = getToken(req.headers);
  if (token) {
      console.log(req.body);
      
      let newTask =new Task({
        name: req.body.name,
        user: req.user._id,
      });

      newTask.save(function(err) {
          if (err) {
              return res.json({success: false, msg: 'Save task failed.'});
          }
          res.json({success: true, msg: 'Successful created new task.',task: { id: newTask._id, email: newTask.email }});
      });
  } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
  
};

exports.listTasks = (req, res) => {
  let token = getToken(req.headers);
    if (token) {
      Task.find(function (err, tasks) {
            if (err) return next(err);
            res.json(tasks);
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
