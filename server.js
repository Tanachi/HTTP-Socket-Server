var net = require('net');
var a = process.stdin;
a.setEncoding('utf-8');
var b = process.stdout;

var hydrogen = '<!DOCTYPE html>\n' +
'<html lang="en">\n' +
'<head>\n' +
'<meta charset="UTF-8">\n' +
'<title>The Elements - Hydrogen</title>\n' +
'<link rel="stylesheet" href="/css/styles.css">\n' +
'</head>\n' +
'<body>\n' +
'<h1>Hydrogen</h1>\n' +
'<h2>H</h2>\n' +
'<h3>Atomic number 1</h3>\n' +
'<p>Hydrogen is a chemical element with chemical symbol H and atomic number 1. With an atomic weight of 1.00794 u, hydrogen is the lightest element on the periodic table. Its monatomic form (H) is the most abundant chemical substance in the universe, constituting roughly 75% of all baryonic mass. Non-remnant stars are mainly composed of hydrogen in its plasma state. The most common isotope of hydrogen, termed protium (name rarely used, symbol 1H), has a single proton and zero neutrons.</p>\n' +
'<p><a href="/">back</a></p>\n' +
'</body>\n' +
'</html>\n';

var hellium = '<!DOCTYPE html>\n' +
'<html lang="en">\n' +
'<head>\n' +
'<meta charset="UTF-8">\n' +
'<title>The Elements - Helium</title>\n' +
'<link rel="stylesheet" href="/css/styles.css">\n' +
'</head>\n' +
'<body>\n' +
  '<h1>Helium</h1>\n' +
  '<h2>H</h2>\n' +
  '<h3>Atomic number 2</h3>\n' +
  '<p>Helium is a chemical element with symbol He and atomic number 2. It is a colorless, odorless, tasteless, non-toxic, inert, monatomic gas that heads the noble gas group in the periodic table. Its boiling and melting points are the lowest among all the elements and it exists only as a gas except in extremely cold conditions.</p>\n' +
  '<p><a href="/">back</a></p>\n' +
'</body>\n' +
'</html>\n';

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



var errorPage = '<!DOCTYPE html>\n' +
'<html lang="en">\n' +
'<head>\n' +
'<meta charset="UTF-8">\n' +
'<title>Element not found!</title>\n' +
'<link rel="stylesheet" href="/css/styles.css">\n' +
'</head>\n' +
'<body>\n' +
'<h1>404</h1>\n' +
'<h2>Element not found!</h2>\n' +
'<p>' +
'<a href="/">back</a>\n' +
'</p>\n' +
'</body>\n' +
'</html>\n';
var httpCode = 200;
var kong = 'OK';


var server = net.createServer(function(socket){
  socket.on('data', function(chunk){
    var webPage;
    var lines = chunk.toString().split('\n');
    var header;
    if(lines.length > 0){
      header = lines[0];
    }
    var headerLines = header.split(' ');
    var methodName = headerLines[0];
    var locationName = headerLines[1];
    if(locationName === '/')
      webPage = indexPage;
    else if(locationName === '/hydrogen')
      webPage = hydrogen;
    else if(locationName === '/hellium')
      webPage = hellium;
    else{
      webPage = errorPage;
      httpCode = 404;
      kong = 'Not Found';
    }
    var versionName = headerLines[2];
    var date = new Date();
    var responseHeader = versionName + ' ' + httpCode + ' ' + kong + '\n' +
    'Date: ' + date.toUTCString() + '\n' +
    'Server: nginx/1.4.6 (Ubuntu)\n';
    if(methodName === 'GET'){
      socket.write(responseHeader + '\n' +  webPage);
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