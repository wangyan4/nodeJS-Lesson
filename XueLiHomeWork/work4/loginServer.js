const http = require('http');
const url = require('url');
const fs = require('fs');
const qs = require('querystring');
http.createServer((req, res) => {
  var urlObj = url.parse(req.url, true);
  var pathname = urlObj.pathname;
  if (pathname === '/login' && req.method === 'GET') {
    showHome(res);
  }
  if (pathname === '/login' && req.method === 'POST') {
    showLogin(req,res);
  }
  
}).listen(8081, () => {
  console.log("server is listening 8081...");
});

function showLogin(req, res) {
  var cookie = req.headers.cookie;
  var result = '';
  req.on('data', (chunk) => {
    result += chunk;
  })
  req.on('end', () => {
    result = qs.parse(result);
    res.setHeader("Content-Type", "text/html;charset=utf-8");
    if (cookie === undefined) {
      if (result.username === 'zhangsan' && result.pwd === '123') {
        res.setHeader("Set-Cookie", `loginTimes=1`);
        res.end(`${result.username}这是您第次${1}登录`);
      }else{
        res.end(`<h3>用户名、密码错误</h3><br>
                <a href="/login">返回</a>
        `);
      }
    } else {
      cookie = cookie.split('=')[1];
      if (result.username === 'zhangsan' && result.pwd === '123') {
        res.setHeader("Set-Cookie", `loginTimes=${parseInt(cookie)+1}`);
        res.end(`${result.username}这是您第次${parseInt(cookie)+1}登录`);
      }else{
        res.end(`<h3>用户名、密码错误</h3><br>
                <a href="/login">返回</a>
        `);
      }
    }
  })
}
function showHome(res){
  fs.readFile('./login.html', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.end(data);
    }
  })
}