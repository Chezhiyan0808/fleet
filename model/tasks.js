
let ASYNC = require('async');
let _ = require('lodash');
let fs = require('fs');
let moment = require('moment');
let mongoClient = require('../mongodb/mongo');
let strings = require('../config/strings');
let miscUtils = require('../utils/misc');

let Task = module.exports = function Task(options) {};

Task.prototype.getTasks = function (payload, cb) {
   let query = {};
  if (payload.priority){
    query.priority = payload.priority;
  }
  if (payload.submittedDate) {
    query.modifiedDate = payload.submittedDate;
  }
  if (payload.status) {
    query.status = payload.status;
  }

  if (payload.modifiedDate) {
    query.modifiedDate = {"$gte": payload.modifiedDate}
  }

  if (payload.submittedBy) {
    query.submittedBy = {"$regex" : payload.submittedBy, "$options": "ix"}
  }

  let text = '';
  if (payload.feature) {
    text = payload.feature;
  }
  if (payload.description) {
    text = payload.description;
  }

  if(text.length > 0) {
    query["$text"] = {"$search": text}
  }

  mongoClient.find(strings.COLLECTIONS.TASKS, query, null, null, cb)
};

Task.prototype.updateTask = function (payload, cb) {

  let query = { _id: payload.taskId};
  delete payload.taskId;
  let update = {};
  let keys = Object.keys(payload);
  _.each(keys, function (key) {
    update[key] = payload[key];
  });
  update.modifiedDate =  moment.utc().format("YYYY-MM-DDTHH:mm:ss");

  mongoClient.updateOne(strings.COLLECTIONS.TASKS, query, {"$set": update }, cb)
};

Task.importTasks = function() {
  let tasksArray = JSON.parse(fs.readFileSync('./data/data.json', 'utf-8'));
  ASYNC.waterfall([
    function (callback) {
      mongoClient.createIndex('tasks',{"feature":"text", "submittedBy": "text", "description": "text"},callback);
    },
    function (result, callback) {
      ASYNC.forEachSeries(tasksArray, function (taskObj, inCB) {
        taskObj.submittedDate = moment.utc(taskObj.submittedDate.split("  ").join("")).format("YYYY-MM-DDTHH:mm:ss");
        taskObj.modifiedDate = moment.utc(taskObj.modifiedDate.split("  ").join("")).format("YYYY-MM-DDTHH:mm:ss");
        taskObj._id = miscUtils.generateMongoID();
        mongoClient.insertOne(strings.COLLECTIONS.TASKS, taskObj, inCB)
      },function (e, r) {
        console.log("e ",e)
        console.log("IMPORT DONE!!");
        return callback();

      });
    }
  ],function (e, r) {
    console.log("init complete")
  })



};