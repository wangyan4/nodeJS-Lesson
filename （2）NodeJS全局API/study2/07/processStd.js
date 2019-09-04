var list = ['Name', 'Email', 'QQ', 'Mobile'];
var obj = {};
var i = 1;

console.log("%s", list[0]);
process.stdin.on('data', function (data) {
    var str = data.toString();
    if (i == 4) {
        obj[list[i - 1]] = str;
        console.log(obj);
        process.exit();

    } else {
        obj[list[i - 1]] = str;
        console.log("%s", list[i++]);
    }

})