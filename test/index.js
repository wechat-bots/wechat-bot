var chai = require('chai');
var expect = chai.expect;

var wechatBot = require('..');

var lastReply;

function logLast(reply) {
  lastReply = reply;
}

describe('wechat-bot', function() {
  var bot;
  var request = {};
  var response = {
    reply: logLast
  };

  beforeEach(function () {
    bot = wechatBot();
  });

  it('should have properties', function() {
    expect(bot.route).to.be.an('object');
    expect(bot.stack).to.be.an('array');
  });
  it('should merge proto', function () {
    expect(bot.handle).to.be.a('function');
    expect(bot.use).to.be.a('function');
  });

  it('should call bots', function (done) {
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
    bot.use(fn1)
      .use(fn2);

    bot.handle(request, response);
  });

  it('should reply pardon', function (done) {
    response.reply = function (reply) {
      expect(reply).to.eql({type: 'text', content: 'pardon'});
      done();
    };
    bot.handle(request, response);
  });
});
