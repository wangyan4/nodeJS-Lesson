const http = require('http');
const fs = require('fs');
const path = require('path');
var argv = process.argv[2];
if (argv == undefined) {
    argv = 'fileReader3.js';
}
http.createServer((req,res)=>{
    var filePath = path.join(__dirname,'/'+argv);
    if(fs.existsSync(filePath)){
        var streamReader = fs.createReadStream(filePath);
        res.writeHead(200,{"Content-type":"text/plain;charset=utf-8"});
        streamReader.pipe(res);
    }else{
        console.log("文件不存在或非文件!");
    }
}).listen(8081,()=>{
    console.log('服务器已启动.....');
})
