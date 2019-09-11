
var base64Str = 'emhhbmdzYW46MTIzNDU2';
var buf1 = Buffer.from(base64Str,'base64');
console.log(buf1.toString('utf-8'));