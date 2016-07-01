var net = require('net');
var Stream = require('stream');
var WriteableStream = Stream.Writable;
var ReadableStream = Stream.Readable;
var socket = new net.Socket();
var location = process.argv[2];

if(location === undefined){
  console.log('Please enter url: node client.js <url>');
}
else{

}