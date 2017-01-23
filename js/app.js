var app = angular.module('mockupGenerator', []);

app.controller('mainCtrl', function ($scope) {

  var images = require('images');
  var webshot = require('webshot');
  var username = require('username');

  $scope.loading = false;
  $scope.useDevices = true;
  $scope.addShadow = false;
  $scope.url = '';
  $scope.devices = [
  {'name': 'Apple Macbook', 'mobile':false, 'x2': true, 'dimensionX':2304, 'dimensionY': 1440, 'x':380, 'y':128, 'size':3064, 'path':'apple-macbook.png'},
  {'name': 'Apple Macbook Air 11"', 'mobile':false, 'x2': false, 'dimensionX':1366, 'dimensionY': 768, 'x':299, 'y':103, 'size':1962, 'path':'apple-macbook-air-11.png'},
  {'name': 'Apple Macbook Pro 15"', 'mobile':false, 'x2': true, 'dimensionX':2880, 'dimensionY': 1800, 'x':452, 'y':180, 'size':3780, 'path':'apple-macbook-pro-15.png'},
  {'name': 'Apple Watch 2', 'mobile':true, 'x2': false, 'dimensionX': 312, 'dimensionY': 390, 'x':98, 'y':278, 'size':507, 'path':'apple-watch-2.png'},
  {'name': 'Apple iMac', 'mobile':false, 'x2': true, 'dimensionX':2561, 'dimensionY': 1440, 'x':115, 'y':156, 'size':2790, 'path':'apple-imac.png'},
  {'name': 'Apple iPad Pro', 'mobile':true, 'x2': true, 'dimensionX':(2048 / 2), 'dimensionY': (2732 / 2), 'x':100, 'y':175, 'size':1224, 'path':'apple-ipad-pro.png'},
  {'name': 'Apple iPhone 7', 'mobile':true, 'x2': true, 'dimensionX':750, 'dimensionY': 1334, 'x':121, 'y':301, 'size':991, 'path':'apple-iphone-7.png'},
  {'name': 'Google Pixel', 'mobile':true, 'x2': true, 'dimensionX':1080, 'dimensionY': 1920, 'x':200, 'y':500, 'size':1480, 'path':'google-pixel.png'},
  ];


  $scope.downloadScreenshot = function() {
    $scope.loading = true;

    username().then(username => {

      var fileName = $scope.url.replace(/.*?:\/\//g, "");
      var device = $scope.screenSelect;
      var deviceName = device.name;
      var dimensionX = device.dimensionX;
      var dimensionY = device.dimensionY;
      var x = device.x;
      var y = device.y;
      var size = device.size;
      var path = device.path;
      var css = '';
      var userAgent = '';
      var shadow = 'no-shadow/';

      if (device.mobile == true) {
        userAgent = 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_2 like Mac OS X; en-us)'
        + ' AppleWebKit/531.21.20 (KHTML, like Gecko) Mobile/7B298g';
      }
      if (device.x2) {
        css = 'body {-webkit-transform: scale(2);  -webkit-transform-origin: 0 0; width:50%;}';
      }
      if ($scope.useShadow == true) {
        shadow = 'shadow/';
      }


      var options = {
        screenSize: {
          width: dimensionX,
          height: dimensionY
        },
        shotSize: {
          width: dimensionX,
          height: dimensionY
        },
        customCSS: css,
        userAgent: userAgent,
        defaultWhiteBackground: true,
        quality: 100,
        streamType: 'png'
      }


      if ($scope.useDevices == true) {
        webshot($scope.url, __dirname+'/img/screenshots/'+deviceName+'.png', options, function(err) {
          images(__dirname+'/img/devices/'+shadow+path).size(size).draw(images(__dirname+'/img/screenshots/'+deviceName+'.png'), x, y).save('/Users/'+username+'/Desktop/'+fileName+' - '+deviceName+'.png', { quality : 100 });

          $scope.loading = false;
          $scope.$apply();
        });
      } else {
        webshot($scope.url, '/Users/'+username+'/Desktop/'+fileName+' - '+deviceName+'.png', options, function(err) {
          $scope.loading = false;
          $scope.$apply();
        });
      }

    });
  }


});

