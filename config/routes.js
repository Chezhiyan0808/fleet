let requiredirectory = require('require-directory');
let taskSchema = require('../schema/task');

module.exports = function (server) {
  let controller = requiredirectory(module, '../controller');
  let routeTable = [
    {
      method: 'GET',
      path: '/test',
      config: {
        tags: ['api'],
        handler: (request, h) => {
          return 'Hello, world!';
        }
      }
    },
    {
      method: 'POST',
      path: '/task/gettasks',
      config: {
        tags: ['api'],
        handler: controller.tasks.getTasks,
        validate: {
          payload: taskSchema.getTaskRequest
        }
      }
    },
    {
      method: 'POST',
      path: '/task/updatetask',
      config: {
        tags: ['api'],
        handler: controller.tasks.updateTask,
        validate: {
          payload: taskSchema.updateTaskRequest
        }
      }
    },
  ];

  return routeTable;
};
