"use strict";
let MongoClient = require('mongodb').MongoClient;
let appConfig = require('../config/appConfig')();
let _ = require('lodash');

let plugin = {};

////////// Public Methods //////////

plugin.connect = function (callback) {

  MongoClient.connect(appConfig.database.mongodb.url, { useNewUrlParser: true }, function (err, database) {

    if (err) {
      return callback(err);
    }

    plugin.db = database.db(appConfig.database.mongodb.dbName);

    return callback(null, database);
  });
};


plugin.find = function (collection, query, fields, options, callback) {

  options = options || {};

  let cursor = plugin.db.collection(collection).find(query);

  if (!_.isEmpty(fields)) {
    cursor.project(fields);
  }

  if (!_.isEmpty(options.sort)) {
    cursor.sort(options.sort);
  }

  if (options.skip) {
    cursor.skip(options.skip);
  }

  if (options.limit) {
    cursor.limit(options.limit);
  }

  cursor.toArray(callback);
};


plugin.findOne = function (collection, query, fields, options, callback) {

  options = options || {};

  if (!_.isEmpty(fields)) {
    options.fields = fields;
  }

  plugin.db.collection(collection).findOne(query, options, callback);
};


plugin.count = function (collection, query, options, callback) {

  plugin.db.collection(collection).count(query, options, callback);
};


plugin.insertOne = function (collection, doc, callback) {

  plugin.db.collection(collection).insertOne(doc, function (err, response) {

    plugin.errorHandler(err, response, callback);
  });
};


plugin.updateOne = function (collection, query, updates, callback) {

  plugin.db.collection(collection).updateOne(query, updates, function (err, response) {

    plugin.errorHandler(err, response, callback);
  });
};


plugin.upsertOne = function (collection, query, updates, callback) {

  plugin.db.collection(collection).updateOne(query, updates, {upsert: true}, function (err, response) {

    plugin.errorHandler(err, response, callback);
  });
};


plugin.delete = function (collection, query, callback) {

  plugin.db.collection(collection).deleteMany(query, callback);
};


plugin.deleteOne = function (collection, query, callback) {

  plugin.db.collection(collection).deleteOne(query, callback);
};


plugin.aggregate = function (collection, aggregations, callback) {

  plugin.db.collection(collection).aggregate(aggregations).toArray(callback);
};

plugin.createIndex = function (collection, indexs, callback) {

  plugin.db.collection(collection).createIndex(indexs, callback);
};

plugin.errorHandler = function (err, response, callback) {

  if (err && err.code) {
    let code = err.code.toString();
    err.status = errorMapping[code] || code;
  }

  callback(err, response);
};

const errorMapping = {
  '11000': 'duplicate_key'
};

module.exports = plugin;