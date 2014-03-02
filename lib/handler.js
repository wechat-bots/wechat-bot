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

var fs = require('fs');
var path = require('path');
var basename = path.basename;

fs.readdirSync(__dirname + '/middleware').forEach(function loadFile(filename) {
  if (!/\.js$/.test(filename)) return;
  var name = basename(filename, '.js');
  function load() {
    return require('./middleware/' + name);
  }
  exports.middleware.__defineGetter__(name, load);
  exports.__defineGetter__(name, load);
});
