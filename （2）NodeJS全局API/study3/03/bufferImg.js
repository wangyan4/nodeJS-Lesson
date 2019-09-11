
const http = require('http');
const path = require('path');
const fs = require('fs');

http.createServer(function(req,res){
    var imgPath = path.join(__dirname,"home.png");
    var imgs = fs.readFileSync(imgPath);
    var imgData = imgs.toString('base64');
    var imgSrc = "data:image/png;base64,"+imgData;
    var htmlData = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    </head>
    <body>
    <img src="images/home.png" alt="">
    <img src="`+imgSrc+`" alt="">
    </body>
    </html>
    `
    res.end(htmlData);
}).listen(8081,function(){
    console.log("服务器已启动。。。")
});