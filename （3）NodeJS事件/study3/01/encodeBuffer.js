var userName = process.argv[2];
var passWord = process.argv[3];
if(userName == undefined || passWord == undefined){
    console.log("请输入用户名、密码");
}else{
    console.log("username:%s\npassword:%s",userName,passWord);
    var loginStr = userName + ':' +passWord;
    var buf = Buffer.from(loginStr,"utf-8");
    console.log(buf.toString('base64'));
}
