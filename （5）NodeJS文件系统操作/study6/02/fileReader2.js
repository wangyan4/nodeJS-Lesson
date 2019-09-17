const http = require('http');
const fs = require('fs');
const path = require('path');
var argv = process.argv[2];
if (argv == undefined) {
    argv = 'fileReader2.js';
}

http.createServer((req, res) => {
    var filePath = path.join(__dirname, '/' + argv);
    fs.open(filePath,'r', (err, fd) => {
        if (err) {
            console.log(err);
        }
        var len = fs.statSync(filePath).size;
        var buf = Buffer.alloc(len);
        fs.read(fd, buf, 0, len, 0, (err, byte, buffer) => {
            res.writeHead(200,{"Content-type":"text/plain;charset=utf-8"})
            // var str = buffer.toString('utf-8');
            res.write(buffer.toString());
            // res.write(str);
            // console.log(buffer.toString());
        });
        fs.close(fd, (err) => {
            if (err) {
                console.log(err);
            }
            res.end();
        });
    });

    //res.end((new Buffer(100)).toString());
}).listen(8081, () => {
    console.log("服务器已启动........");
})