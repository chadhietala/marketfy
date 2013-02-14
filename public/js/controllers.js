'use strict';

/* Controllers */

function AppCtrl($scope, socket) {
  $scope.symbols = [];
  $scope.stocks = [];

  socket.on('send:name', function (data) {
    $scope.name = data.name;
  });

  socket.on('get:symbols', function(data){
    for (var i = 0; i < data.length; i++){
      $scope.symbols.push(data[i]);
      socket.emit('get:stock', {symbol: data[i].symbol});
    }
  });

  socket.on('send:stock', function(data){
    if ($scope.stocks.length === $scope.symbols.length){
      for(var i = 0; i < $scope.stocks.length; i++){
        if ($scope.stocks[i].symbol === data.symbol){
          $scope.stocks[i].price = data.price;
        }
      }
    } else {
      $scope.stocks.push(data);
    }
  });


}