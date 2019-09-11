var circle = require('./circleModule.js');
var r = process.argv[2];
if (r == undefined) {
    console.log('请在命令行输入半径');
} else {
    console.log(circle.circleFun(r).circumference);
    console.log(circle.circleFun(r).area);
}