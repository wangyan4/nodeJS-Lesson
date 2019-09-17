const http = require('http');
const fs = require('fs');
const path = require('path');
let arr0 = ['请输入要创建的文件夹(测试数据 mkdir filedir)', '请输入要创建的文件(测试数据 touch file.txt)', '请输入要删除的文件(测试数据 delete file.txt)'];
let i = 0;

console.log(arr0[i++]);
process.stdin.on('data', (data) => {
    
    if (data.length != 2) {
        var arr = data.toString().split(' ');
        arr[1] = arr[1].slice(0, -2);
        switch (arr[0]) {
            case 'mkdir':
                var filePath = path.join(__dirname, '/' + arr[1]);
                fs.mkdir(filePath, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('文件夹创建成功!');
                        console.log(arr0[i++]);
                    }
                });
                break;
            case 'touch':
                var filePath = path.join(__dirname, '/filedir/' + arr[1]);
                fs.writeFile(filePath, 'hello node', (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('文件创建成功!');
                        console.log(arr0[i++]);
                    }
                })
                break;
            case 'delete':
                var filePath = path.join(__dirname, '/filedir/file.txt');
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('文件删除成功!');
                        console.log(arr0[i++]);
                    }
                })
                break;
            default:
                console.log("请输入要执行的操作:");
                console.log(arr0[i]);
        }
        
    } else {
        process.exit();
    }
})