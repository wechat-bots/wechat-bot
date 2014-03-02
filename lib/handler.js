var utils = require('./utils');

exports = module.exports = createHandler;

function createHandler() {
  function app(req, res, next) { app.handle(req, res, next); }
  utils.merge(app, proto);
  app.route = {};
  app.stack = [];
  return app;
}
