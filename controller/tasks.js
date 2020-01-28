let tasksModel = require('../model/tasks');
let Strings = require('../config/strings');

let internal = {};

internal.getFibanocciSeries = function (req, reply) {
  let payload = req.payload;

  let tasks = new tasksModel();

  let promise =   new Promise((resolve, reject) => {
    tasks.getFibanocciSeries(payload, function (e, r) {
      if (e){
        resolve (Strings.ERRORS.GENERAL);
      }
      resolve({statusCode:200, message: "SUCCESS", data: r});
    });
  });

  return promise;
};


module.exports = internal;