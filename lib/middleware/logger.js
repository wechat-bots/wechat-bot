exports = module.exports = function logger(options) {
  if (typeof options === 'object') {
    options = options || {};
  } else if (options) {
    options = { format: options};
  } else {
    options = {};
  }

  var stream = options.stream || process.stdout;

  return function logger(req, res, next) {
    var info = req.weixin;
    stream.write(info.FromUserName + '\n');
  };
};
