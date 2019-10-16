const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const qs = require('querystring');


http.createServer((req, res) => {
  var urlObj = url.parse(req.url, true);
  var urlpath = urlObj.pathname;
  var filepath = '';
  var filecontent = '';
  var chapterList;

  if (urlpath === '/getDetail') {
    filepath = path.join(__dirname, 'content.json');
    filecontent = fs.readFileSync(filepath);
    chapterList = JSON.parse(filecontent.toString());
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.end(JSON.stringify(chapterList));
  }
}).listen(8084, 'localhost', () => {
  console.log("服务器已启动...");
});