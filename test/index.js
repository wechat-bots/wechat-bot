var expect = require('chai').expect,
    wechatHandler = require('..');

describe('wechat-handler', function() {
  it('should say hello', function(done) {
    expect(wechatHandler()).to.equal('Hello, world');
    done();
  });
});
