/***
 *
 */
const Hapi = require('@hapi/hapi');
const appConfig = require('./config/appConfig')();
const HapiSwagger = require('hapi-swagger');
const Vision = require('@hapi/vision');
const Inert = require('@hapi/inert');
const server = new Hapi.Server(appConfig.server);

let routes = require('./config/routes')(server);
let mongo = require('./mongodb/mongo');
let tasks = require('./model/tasks');

const init = async () => {
  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: appConfig.swaggerOptions,
    }
  ]);

  await server.start();
  server.route(routes);
  mongo.connect(function (e, r) {
  //  tasks.importTasks();
    console.log('server running at: ' + server.info.uri);
  });
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init()
  .catch((err) => {

    console.error(err);
    process.exit(1);
  });

