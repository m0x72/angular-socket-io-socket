angular-socket-io-socket [![Build Status](https://travis-ci.org/m0x72/angular-socket-io-socketi.png)](https://travis-ci.org/btford/angular-socket-io)
========================

Extending [btford's](https://github.com/btford) [angular-socket-io](https://github.com/btford/angular-socket-io) component by exposing socket.io's socket socket-object

## Install
1.  `bower install angular-socket-io-socket`
2.  Include `bower_components/angular-socket-io-socket/ioSocket.js` and `bower_components/angular-socket-io-socket/bower_components/angular-socket-io/socket.js`(or grab ford's angular-socket-io component directly from bower
)
3.  Include socket.io's `socket.io.js`
4.  Include `m0x72.ioSocket` moyour app

## Usage
Exposes a `ioSocketFactory` that can be instatiated just like the original `socketFactory` by:

```javascript
angular.module('myApp', ['m0x72.ioSocket', 'btford.socket-io'])
.factory('mySocket', function (ioSocketFactory) {
  return ioSocketFactory({
    ioSocket: io.connect('/some/path')  // optional
  });
});
```

## Extensions
Refer to [angular-socket-io](https://github.com/btford/angular-socket-io) for the original API.

On top, angular-socket-io-socket gives you access to the socket object of the socket via `.socket`
```javascript
angular.module('myApp')
.controller('myCtrl', function ($scope, mySocket) {
  $scope.isConnected = mySocket.socket.connected
  $scope.reconnectFunction = mySocket.socket.connect
});

```
## Changelog

v 0.1.0
*  initial version  - provides:
  *  access to socket object via `yourFactory.socket`
  *  monkey patching `$emit`to cause `$digest` cycles on any incoming events (and keeping bindings to the socket object aware)

## Credits
Credits go to [Brian Ford](http://btford.com) ([btford](https://github.com/btford)) and his [angular-socket-io](https://github.com/btford/angular-socket-io) project

## License
MIT  - Party!

Copyright (c) 2014 [m0x72](http://github.com/m0x72)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
