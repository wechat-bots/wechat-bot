var chai = require('chai');
var expect = chai.expect;

var wechatHandler = require('..');

var lastReply;

function logLast(reply) {
  lastReply = reply;
}

describe('wechat-handler', function() {
  var handler;
  var request = {};
  var response = {
    reply: logLast
  };

  beforeEach(function () {
    handler = wechatHandler();
  });

  it('should have properties', function() {
    expect(handler.route).to.be.an('object');
    expect(handler.stack).to.be.an('array');
  });
  it('should merge proto', function () {
    expect(handler.handle).to.be.a('function');
    expect(handler.use).to.be.a('function');
  });

  it('should call handlers', function (done) {
    var fn1 = function fn1(req, res, next) {
      expect(req).to.equal(request);
      req.afterFn1 = true;
      next();
    };
    /* jshint expr: true */
    var fn2 = function fn2(req, res) {
      expect(req.afterFn1).to.be.true;
      done();
    };
    handler.use(fn1)
      .use(fn2);

    handler.handle(request, response);
  });

  it('should reply pardon', function (done) {
    response.reply = function (reply) {
      expect(reply).to.eql({type: 'text', content: 'pardon'});
      done();
    };
    handler.handle(request, response);
  });
});
