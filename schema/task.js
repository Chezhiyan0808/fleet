let joi = require('@hapi/joi');
let task = {};

task.getFibanocciSeries = joi.object({
  length: joi.number().required(),
  prime_only: joi.boolean().default(false)
});
module.exports = task;