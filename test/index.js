var chai = require('chai');
var expect = chai.expect;

var wechatHandler = require('..');

describe('wechat-handler', function() {
  var handler = wechatHandler();
  it('should have properties', function() {
    expect(handler.route).to.be.an('object');
    expect(handler.stack).to.be.an('array');
  });
  it('should merge proto', function () {
    expect(handler.handle).to.be.a('function');
    expect(handler.use).to.be.a('function');
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
    handler.use(fn1)
      .use(fn2);

    handler.handle(foo);
  });

});
