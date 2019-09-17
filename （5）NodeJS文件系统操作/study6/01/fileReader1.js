const http = require('http');
const fs = require('fs');
const path = require('path');
var argv = process.argv[2];
if (argv == undefined) {
    argv = 'fileReader1.js';
}
http.createServer((req, res) => {
    var filePath = path.join(__dirname, '/' + argv);
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.writeHead(200, {
                "Content-type": "text/plain:charset=utf-8"
            })
            res.end(data.toString());
        }
    })

}).listen(8081, () => {
    console.log("服务器已启动........");
})