var should = require('chai').should();

var wechat = require('wechat');
var connect = require('connect');
var request = require('supertest');
var utils = require('./utils');
var template = utils.template;
var tail = utils.tail;

var wechatBot = require('..');

describe('integration with wechat', function () {
  var bot = wechatBot();
  bot.use(function (req, res, next) {
    res.reply('hello');
  });
  var info = {
    sp: 'sp',
    user: 'user',
    type: 'text',
    text: 'test'
  };
  var app;

  beforeEach(function () {
    app = connect();
    app.use(connect.query());
  });

  it('should be used as wechat handler', function (done) {
    app.use('/wechat', wechat('some token', bot));
    request(app)
      .post('/wechat' + tail())
      .send(template(info))
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        var body = res.text.toString();
        body.should.include('hello');
        done();
      });
  });

  it('should create shortcut of wechat', function (done) {
    app.use('/wechat', bot.wechat('some token'));
    request(app)
      .post('/wechat' + tail())
      .send(template(info))
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        var body = res.text.toString();
        body.should.include('hello');
        done();
      });
  });
});
