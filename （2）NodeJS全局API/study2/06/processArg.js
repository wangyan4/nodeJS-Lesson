
var argv1 = process.argv[2];
var result;
if(argv1 == undefined || argv1 == '-h'){
    console.log("命令行参数需要是算术表达式");
}else{
    result = eval(argv1);
    console.log(argv1 +"=%d",result);
}