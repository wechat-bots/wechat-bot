var expect = require('chai').expect,
    wechatHandler = require('..');

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
});
