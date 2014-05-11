/*
 * angular-socket-io-socket v0.1.0
 * (c) 2014 m0x72 http://github.com/m0x72
 * License: MIT
 */

'use strict';


describe('ioSocketFactory', function () {

  beforeEach(module('m0x72.ioSocket'));

  var socket,
      scope,
      $timeout,
      $browser,
      mockIoSocket,
      spy;

  beforeEach(inject(function (ioSocketFactory, _$browser_, $rootScope, _$timeout_) {
    $browser = _$browser_;
    $timeout = _$timeout_;
    scope = $rootScope.$new();
    spy = jasmine.createSpy('emitSpy');
    mockIoSocket = io.connect();
    socket = ioSocketFactory({
      ioSocket: mockIoSocket,
      scope: scope
    });
  }));


  describe('socket', function () {

    it('should increment (dummy) eventCounter property', function () {
      var evCounter = socket.socket.eventCounter;
      mockIoSocket.$emit('event');

      expect(socket.socket.eventCounter).toBe(evCounter);

      $timeout.flush();
      expect(socket.socket.eventCounter).toBe(++evCounter);
    })

    it('should run a digest and thus execute scope watcher', function () {
      scope.$watch(spy)
      mockIoSocket.$emit('event');

      expect(spy).not.toHaveBeenCalled();

      $timeout.flush();
      expect(spy).toHaveBeenCalled();
    })

    it('should run watchers on socket object', function () {

      scope.socket = socket.socket; // reference exposed socket on scope
      scope.$watch('socket.eventCounter', function (newVal, oldVal) {  // set watcher on some changing socket property
        if (newVal !== oldVal) spy()
      });
      scope.$digest();  // register watcher

      mockIoSocket.$emit('event');  // simulate incoming event, by calling socket.io's incoming event handler (of type EventEmitter)

      expect(spy).not.toHaveBeenCalled();

      $timeout.flush();
      expect(spy).toHaveBeenCalled();   // expect our listener to have been called (eventCounter is tested in case above)

    });

  });

});
