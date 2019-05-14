let tasksModel = require('../model/tasks');
let Strings = require('../config/strings');

let internal = {};

internal.getTasks = function (req, reply) {
  let payload = req.payload;

  let tasks = new tasksModel();

  let promise =   new Promise((resolve, reject) => {
    tasks.getTasks(payload, function (e, r) {
      if (e){
        resolve (Strings.ERRORS.GENERAL);
      }
      resolve({statusCode:200, message: "SUCCESS", data: r});
    });
  });

  return promise;
};

internal.updateTask = function (req, reply) {
  let payload = req.payload;

  let tasks = new tasksModel();

  let promise =   new Promise((resolve, reject) => {
    tasks.updateTask(payload, function (e, r) {
      if (e){
        resolve (Strings.ERRORS.GENERAL);
      }
      resolve({statusCode:200, message: "SUCCESS"});
    });
  });

  return promise;
};


module.exports = internal;