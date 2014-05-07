// Karma configuration

module.exports = function (config) {
  config.set({
    basePath: '',
    files: [
      'mock/socket-io.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-socket-io/socket.js',
      'ioSocket.js',
      '*.spec.js'
    ],

    preprocessors: {
      'ioSocket.js': ['coverage']
    },

    reporters: ['progress', 'coverage'],

    port: 9876,
    colors: true,

    logLevel: config.LOG_INFO,

    browsers: ['Chrome'],
    frameworks: ['jasmine'],

    captureTimeout: 60000,

    autoWatch: true,
    singleRun: false
  });
};
