var utils = require('./utils');
var proto = require('./proto');

exports = module.exports = createBot;
exports.middleware = {};
exports.utils = utils;

function createBot() {
  function bot(req, res, next) { bot.handle(req, res, next); }
  utils.merge(bot, proto);
  bot.route = {};
  bot.stack = [];
  return bot;
}
