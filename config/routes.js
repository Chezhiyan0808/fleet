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
      path: '/task/fibonacci-series',
      config: {
        tags: ['api'],
        handler: controller.tasks.getFibanocciSeries,
        validate: {
          payload: taskSchema.getFibanocciSeries
        }
      }
    }
  ];

  return routeTable;
};
