
const http = require('http');

var server = http.createServer(function(req,res){
    res.end("hello world!");
});

server.listen(8080,function(){
    console.log('服务器已启动，可以通过127.0.0.1:8080访问');
});