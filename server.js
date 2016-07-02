var net = require('net');
var a = process.stdin;
a.setEncoding('utf-8');
var b = process.stdout;
var fs = require('fs');
var pageData = null;
var filePath = '';
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
    if(locationName === '/'){
      filePath = './public/index.html';
    }
    else if(locationName === '/hydrogen.html'){
      filePath = './public/hydrogen.html';
    }
    else if(locationName === '/helium.html'){
      filePath = './public/helium.html';
    }
    else if(locationName === '/css/styles.css'){
      filePath = './public/css/stlyes.css';
    }
    else{
      filePath = './public/404.html';
      httpCode = 404;
      kong = 'Not Found';
    }
    var versionName = headerLines[2];
    var date = new Date();
    var responseHeader = versionName + ' ' + httpCode + ' ' + kong + '\n' +
    'Date: ' + date.toUTCString() + '\n' +
    'Server: nginx/1.4.6 (Ubuntu)\n';
    if(methodName === 'GET'){
       fs.readFile(filePath, 'utf8', function(err, data){
      if(err)
          throw err;
        socket.write(responseHeader + '\n' +  data);
        socket.end();
      });
    }
    else{
      socket.write(responseHeader +'\n');
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