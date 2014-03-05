var utils = require('./utils');
var proto = require('./proto');

exports = module.exports = createHandler;
exports.middleware = {};
exports.utils = utils;

function createHandler() {
  function handler(req, res, next) { handler.handle(req, res, next); }
  utils.merge(handler, proto);
  handler.route = {};
  handler.stack = [];
  return handler;
}
