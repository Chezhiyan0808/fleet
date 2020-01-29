let Confidence = require('confidence');
let store = new Confidence.Store();

let doc = {
  "$filter": "env",
  "dev": {},
  "$default": {
    server: {
      "host": "0.0.0.0",
      "port": 3000,
      routes: {
        cors: true
      }
    },
    swaggerOptions: {
      info: {
        'title': 'API Documentation',
        'version': '1'
      },
      documentationPath: "/",
      basePath:"/"
    },
    defaultStorage: "FS",
    baseServerUrl: "http://0.0.0.0:3000",
  }
};

store.load(doc);

module.exports = function (criteria) {
  let storeData = store.get('/', {"env": "default"});
  return storeData
};