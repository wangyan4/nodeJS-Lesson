const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req,res)=>{
    var filePath = path.join(__dirname,'./data.txt');
     var streamReader = fs.createReadStream(filePath);
     res.writeHead(200,{"Content-type":"text/html;charset=utf-8"});
     streamReader.pipe(res);
}).listen(8081,()=>{
    console.log("服务器已启动....")
});