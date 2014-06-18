/*
 * angular-socket-io-socket v0.1.0
 * (c) 2014 m0x72 http://github.com/m0x72
 * License: MIT
 */

angular.module('m0x72.ioSocket', [
  'btford.socket-io'
]).
factory('ioSocketFactory', function (socketFactory, $timeout) {
  return function (opts) {
    opts.ioSocket = opts.ioSocket || io.connect();

    // monkey patch socket.io's $emit to initialte a $digest on any incoming (socket) events
    // Not guaranteed to work on socket.io version > 0.9.16
    (function (){
      var $emit = opts.ioSocket.$emit
      opts.ioSocket.$emit = function () {
        var _arguments = arguments
        $timeout(function (){
          $emit.apply(opts.ioSocket, _arguments);
        }, 0);
      }
    })();

    // initialize socketFactory
    var socket = socketFactory(opts);
    // expose socket's socket object
    socket.socket = opts.ioSocket.socket;

    return socket;
  };
});
