const stream = require('stream');
const util = require('util');
let reader = new stream.Readable();

function MyReadable() {

}
MyReadable.prototype.__proto__ = reader;

function getEn() {
    var arr = [];
    for (var i = 97; i < 123; i++) {
        arr.push(String.fromCharCode(i));
    }
    return arr.join(',');
}
var str = getEn();
var myReadable = new MyReadable();
myReadable.push(str);
myReadable.push(null);
myReadable.pipe(process.stdout);

