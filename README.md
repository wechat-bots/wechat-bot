# wechat-handler

Connect like middleware layer for wechat.

[![build status](https://secure.travis-ci.org/rogerz/wechat-handler.png)](http://travis-ci.org/rogerz/wechat-handler)

## Installation

This module is installed via npm:

``` bash
$ npm install wechat-handler
```

## Example Usage

Use this with [connect](http://senchalabs.org/connect) and [wechat](https://github.com/node-webot/wechat)

``` javascript
var connect = require('connect');
var wechat = require('wechat');
var handler = require('wechat-handler');

var app = connect();
app.use(connect.query());
app.use('/wechat', wechat('some token', handler()));

handler.use(function (req, res, next) {
    req.reply('hello, ' + req.weixin.FromUserName);
});
```
