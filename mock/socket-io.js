var io = {
  connect: createMockSocketObject
};

function createMockSocketObject () {

  var socket = {
    socket: {  //socket object mock
      eventCounter: 0,
    },
    on: function (ev, fn) {
      (this._listeners[ev] = this._listeners[ev] || []).push(fn);
    },
    once: function (ev, fn) {
      (this._listeners[ev] = this._listeners[ev] || []).push(fn);
      fn._once = true;
    },
    emit: function (ev, data) {
      if (this._listeners[ev]) {
        this._listeners[ev].forEach(function (listener) {
          if (listener._once) {
            this.removeListener(ev, listener);
          }
          listener(data);
        }.bind(this));
      }
      this.socket.eventCounter++;
    },
    _listeners: {},
    removeListener: function (ev, fn) {
      if (fn) {
        var index = this._listeners[ev].indexOf(fn);
        if (index > -1) {
          this._listeners[ev].splice(index, 1);
        }
      } else {
        delete this._listeners[ev];
      }
    },
    removeAllListeners: function (ev) {
      if (ev) {
        delete this._listeners[ev];
      } else {
        this._listeners = {};
      }
    },
    disconnect: function () {},
    $emit: function (ev, data) {  // mocks incoming events
      this.emit(ev, data);
    }
  };

  return socket;
}
