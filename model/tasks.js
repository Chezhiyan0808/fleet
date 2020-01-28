let utils = require('../utils/misc')
let Task = module.exports = function Task(options) {};

Task.prototype.getFibanocciSeries = function (payload, cb) {
  let series = utils.generateFibanocciSeries(payload.length, payload.prime_only);
  return cb(null, series)
};