var debug = require('debug')('wechat:handler');

var app = module.exports = {};

var env = process.env.NODE_ENV || 'development';

app.use = function use(route, fn) {
  // default route to empty object
  if (typeof(route) !== 'object') {
    fn = route;
    route = {};
  }

  // wrap sub-apps
  if (typeof(fn.handle) === 'function') {
    var subApp = fn;
    fn.route = route;
    fn = function (req, res, next) {
      subApp.handle(req, res, next);
    };
  }

  debug('use %s %s', route.name || '{}', fn.name || 'anonymous');
  this.stack.push({route: route, handle: fn});

  return this;
};

app.handle = function (req, res, out) {
  var stack = this.stack;
  var index = 0;

  function next(err) {
    var layer;

    // next handler
    layer = stack[index++];

    // all done
    if (!layer) {
      // delegate to parent
      if (out) return out(err);

      // un-handled error
      if (err) {
        debug('oops');

        // basic error for production
        var msg = env === 'production' ? 'oops' : err.stack || err.toString();

        // log to stderr in a non-test env
        if (env !== 'test') console.error(err.stack || err.toString());

        res.reply({
          type: 'text',
          content: msg
        });
      } else {
        debug('no handler');
        res.reply({
          type: 'text',
          content: 'pardon'
        });
      }
      return;
    }

    try {
      debug('%s %s', layer.handle.name || 'anonymous', layer.route.name || '{}');
      var arity = layer.handle.length;
      if (err) {
        if (arity === 4) {
          layer.handle(err, req, res, next);
        } else {
          next(err);
        }
      } else if (arity < 4) {
        layer.handle(req, res, next);
      } else {
        next();
      }
    } catch (e) {
      next(e);
    }
  }

  next();
};
