let Confidence = require('confidence');
let store = new Confidence.Store();

let doc = {
  "$filter": "env",
  "dev": {},
  "$default": {
    server: {
      "host": "localhost",
      "port": 3000,
      routes: {
        cors: true
      }
    },
    swaggerOptions: {
      info: {
        'title': 'Fleet API Documentation',
        'version': '1'
      },
      documentationPath: "/",
      basePath:"/"
    },
    defaultStorage: "FS",
    database: {
      mongodb: {
        url: "mongodb://localhost:27017",
        dbName: "admin",
        params: {
          maxIdleTimeMS:  60 * 1000,
          minPoolSize: 15,
          poolSize: 30,
          auto_reconnect : true,
          socketOptions: {
            keepAlive: 1, connectTimeoutMS: 60000
          }
        }
      }
    },
    baseServerUrl: "http://localhost:3000",
  }
};

store.load(doc);

module.exports = function (criteria) {
  let storeData = store.get('/', {"env": "default"});
  return storeData
};