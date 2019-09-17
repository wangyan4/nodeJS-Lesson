const http = require('http');
const fs = require('fs');
const path = require('path');
var argv = process.argv[2];
if(argv == undefined){
    console.log('请输入参数');
}else{
    var filePath0 = path.join(__dirname,'/'+argv);
    if(fs.statSync(filePath0).isDirectory()){
        deleteFolder(filePath0);
    }else{
        fs.unlinkSync(filePath0);
    }
    
}
function deleteFolder(path){
    if(fs.existsSync(path)){
        fs.readdirSync(path).forEach((file)=>{
            var filePath = path +'/'+file;
            if(fs.statSync(filePath).isDirectory()){
                deleteFolder(filePath);
            }else{
                fs.unlinkSync(filePath);
            }
        })
    }
    fs.rmdirSync(path);
}