var net = require('net');
var a = process.stdin;
a.setEncoding('utf-8');
var b = process.stdout;

var hydrogen = '<!DOCTYPE html>' +
'<html lang="en">' +
'<head>' +
'<meta charset="UTF-8">' +
'<title>The Elements - Hydrogen</title>' +
'<link rel="stylesheet" href="/css/styles.css">' +
'</head>' +
'<body>' +
'<h1>Hydrogen</h1>' +
'<h2>H</h2>' +
'<h3>Atomic number 1</h3>' +
'<p>Hydrogen is a chemical element with chemical symbol H and atomic number 1. With an atomic weight of 1.00794 u, hydrogen is the lightest element on the periodic table. Its monatomic form (H) is the most abundant chemical substance in the universe, constituting roughly 75% of all baryonic mass. Non-remnant stars are mainly composed of hydrogen in its plasma state. The most common isotope of hydrogen, termed protium (name rarely used, symbol 1H), has a single proton and zero neutrons.</p>' +
'<p><a href="/">back</a></p>' +
'</body>' +
'</html>';

var indexPage = '<!DOCTYPE html>\n' +
  '<html lang="en">\n' +
  '<head>\n' +
  '<meta charset="UTF-8">\n' +
  '<title>The Elements</title>\n' +
  '<link rel="stylesheet" href="/css/styles.css">\n' +
  '</head>\n' +
  '<body>\n' +
  '<h1>The Elements</h1>\n' +
  '<h2>These are all the known elements.</h2>\n' +
  '<h3>These are 2</h3>\n' +
  '<ol>\n' +
  '<li>\n' +
  '<a href="/hydrogen.html">Hydrogen</a>\n' +
  '</li>\n'+
  '<li>\n'+
  '<a href="/helium.html">Helium</a>\n' +
  '</li>\n' +
  '</ol>\n' +
  '</body>\n' +
  '</html>\n';
var httpCode = 200;
var kong = 'OK';


var server = net.createServer(function(socket){
  socket.on('data', function(chunk){
    var lines = chunk.toString().split('\n');
    var header;
    if(lines.length > 0){
      header = lines[0];
    }
    var headerLines = header.split(' ');
    var methodName = headerLines[0];
    var locationName = headerLines[1];
    var versionName = headerLines[2];
    var date = new Date();
    var responseHeader = versionName + ' ' + httpCode + ' ' + kong + '\n' +
    'Date: ' + date.toUTCString() + '\n' +
    'Server: nginx/1.4.6 (Ubuntu)\n';
    if(methodName === 'GET'){
      socket.write(responseHeader + '\n' +  indexPage);
      socket.end();
    }


  });
});

server.listen(8080, function(){
  var finalPort = server.address().port;
  console.log('listening on port \n', finalPort);
});

server.on('error', function(err){
  this.listen(8080, function(){
    var finalPort =  server.address().port;
    console.log('listening on port \n', finalPort);
  });
});