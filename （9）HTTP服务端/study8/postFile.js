const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
http.createServer((req, res) => {
    var urlObj = url.parse(req.url, true);
    var pathName = urlObj.pathname;
    switch (pathName) {
        case '/':
            var indexPath = path.join(__dirname, 'index.html');
            fs.readFile(indexPath, (err, data) => {
                if (err) {
                    console.log(err)
                } else {
                    res.writeHead(200, {
                        "content-type": "text/html"
                    });
                    res.end(data);
                }
            })
            break;
        case '/upload':
            var datastr = '';
            req.setEncoding('binary');
            req.on('data', (chunk) => {
                datastr += chunk;
            })
            req.on('end', () => {
                var data = datastr.split("\r\n");
                var fileData = data.slice(4, data.length - 2);
                fileData = fileData.join('\r\n');
                var buf = Buffer.from(fileData, 'binary');
                var fileName = data[1].split('"')[3];
                var filePath = path.join(__dirname, '/upload/', fileName);
                fs.writeFileSync(filePath, buf, {
                    "encoding": "binary"
                });
            })
            fs.readFile('./list.html',(err,data)=>{
                if(err){
                    console.log(err);
                }else{
                    res.writeHead(200,{"content-type":"text/html"});
                    res.end(data);
                }
            })
            break;
        case '/getlist':
            fs.readdir('./upload',(err,files)=>{
                if(err){
                    console.log(err);
                }else{
                    res.end(JSON.stringify(files));
                }
            })
            break;
        default:
                fs.readdir('./upload',(err,files)=>{
                    if(err){
                        console.log(err);
                    }else{
                        files.forEach((item)=>{
                            if(pathName.indexOf(item)>0){
                                fs.readFile('./upload/'+item,(err,data)=>{
                                    if(err){
                                        console.log(err);
                                    }else{
                                        res.writeHead(200,{"content-type":"image/"+item.split('.')[1]});
                                        res.end(data);
                                    }
                                })
                            }
                        })
                    }
                })
    }
}).listen(3000, () => {
    console.log('服务器已启动...');
})