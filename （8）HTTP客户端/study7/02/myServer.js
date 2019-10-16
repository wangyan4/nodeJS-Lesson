const http = require('http');
const qs = require('querystring');
const fs = require('fs');
http.createServer((req, res) => {
    var datastr = '';
    req.on('data', (chunk) => {
        datastr += chunk;
    })
    req.on('end', () => {
        
        fs.readFile('./data.json', (err, data) => {
            var bool = false;
            var list = JSON.parse(data.toString());
            var data = qs.parse(datastr);
            for (var i = 0; i < list.length; ++i) {
                if(data.username == list[i].username && data.password == list[i].password){
                    console.log('登录成功');
                    bool = true;
                }
            }
            if(!bool){
                console.log("用户名、密码不正确");
            }
        })
    })
}).listen(8081, () => {
    console.log("服务器已启动...");
})