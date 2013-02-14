/*
 * Serve content over a socket
 */

var stub = {
  'AAPL': {
    symbol: 'AAPL',
    price: 457.45,
    change: 1.32,
    company: 'Apple'
  },
  'F': {
    symbol: 'F',
    price: 20.45,
    change: 1.32,
    company: 'Ford'
  },
  'GOOG': {
    symbol: 'GOOG',
    price: 757.45,
    change: 1.32,
    company: 'Google'
  },
}

module.exports = function (socket) {
  socket.emit('send:name', {
    name: 'Stocks'
  });

  socket.on('get:stock', function(data){
    var symbol = data.symbol,
        stock = stub[symbol];

    socket.emit('send:stock', stock)
  })

  socket.emit('get:symbols', [
    {symbol: 'AAPL'},
    {symbol: 'F'},
    {symbol: 'GOOG'}
  ])

  socket.emit('send:time', {
    time: (new Date()).toString()
  });

  setInterval(function(){
    var d = new Date(),
        n = d.getTime() * Math.random();

    if (Math.floor(n % 10) % 2 > 0){
      ++stub['GOOG'].price
      ++stub['AAPL'].price
      ++stub['F'].price
    } else {
      --stub['GOOG'].price
      --stub['AAPL'].price
      --stub['F'].price
    }

    socket.emit('send:stock', stub['GOOG'])
    socket.emit('send:stock', stub['AAPL'])
    socket.emit('send:stock', stub['F'])
  }, 2000)
  

};
