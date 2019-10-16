const http = require('http');
const qs = require('querystring');
var username = process.argv[2];
var password = process.argv[3];

if(username == undefined || password == undefined){
    console.log("请输入用户名、密码");
}else{
    var opt = {
        host:'localhost',
        port:8081,
        path:'/',
        method:'POST'
    }
    var obj = {};
    obj.username = username;
    obj.password = password;
    var req = http.request(opt,()=>{

    })
    req.end(qs.stringify(obj));
}