const http = require('http');
const fs = require('fs');


var server = http.createServer(function(req,res){
    var htmlPath = __dirname + '\\views\\view.html';
    console.log(htmlPath);
    var htmlContent = fs.readFileSync(htmlPath);
    res.setHeader('Content-Type','text/html; charset=utf-8');
    res.end(htmlContent);
});


server.listen(8080,function(){
    console.log('服务器已启动，可以通过127.0.0.1:8080访问');
});