let UUIDv4 = require("uuid/v4");

exports.generateMongoID = function() {
  return UUIDv4().split("-").join("");
};
