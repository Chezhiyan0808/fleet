let joi = require('@hapi/joi');
let task = {};

task.getTaskRequest = joi.object({
  status: joi.string().valid('COMPLETE', 'IN_PROGRESS', 'NOT_STARTED').optional(),
  priority: joi.number().valid(1, 2, 3).optional(),
  submittedDate : joi.string().optional(),
  modifiedDate : joi.string().optional(),
  submittedBy : joi.string().optional(),
  description : joi.string().optional(),
  feature : joi.string().optional()
});

task.updateTaskRequest = joi.object({
  taskId: joi.string().required(),
  status: joi.string().valid('COMPLETE', 'IN_PROGRESS', 'NOT_STARTED').optional(),
  priority: joi.number().valid(1, 2, 3).optional(),
  description : joi.string().optional()
});

module.exports = task;