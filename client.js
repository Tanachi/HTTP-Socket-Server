var net = require('net');
var url = require('url');

var Stream = require('stream');
var WriteableStream = Stream.Writable;
var ReadableStream = Stream.Readable;
var socket = new net.Socket();
var location = process.argv[2];

var a = process.stdin;
var b = process.stdout;
if(location === undefined){
  console.log('please enter host and url node client.js <host>');
}
else{
  socket.connect({port:8080, host:location}, function(){
    console.log('connection established');
    var date = new Date();
     socket.write('GET /hellium HTTP/1.1\n' +
     'Host:' + location +'\n' +
     'User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36\n' +
     'Date:' + date.toUTCString() + '\n\n');
  });
}


socket.on('data', function(chunk){
  console.log('data retrieved');
  var headSplit = chunk.toString().split('\b');
  console.log(chunk.toString());
});

socket.on('close', function(){
  socket.end();
  process.exit();
});
