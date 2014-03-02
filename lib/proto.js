var app = module.exports = {};
var debug = require('debug')('wechat:handler');

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
      if (err) {
        debug('error:' + err);
        // TODO: render an error message
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
};
