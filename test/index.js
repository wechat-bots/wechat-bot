var chai = require('chai');
var expect = chai.expect;

var wechatHandler = require('..');

describe('wechat-handler', function() {
  var app = wechatHandler();
  it('should have properties', function() {
    expect(app.route).to.be.an('object');
    expect(app.stack).to.be.an('array');
  });
  it('should merge proto', function () {
    expect(app.handle).to.be.a('function');
    expect(app.use).to.be.a('function');
  });

  it('should call handlers', function () {
    var foo = {};
    var fn1 = function fn1(req, res, next) {
      expect(req).to.equal(foo);
      req.afterFn1 = true;
      next();
    };
    var fn2 = function fn2(req, res) {
      expect(req.afterFn1).to.be(true);
      done();
    };
    app.use(fn1)
      .use(fn2);

    app.handle(foo);
  });
});
