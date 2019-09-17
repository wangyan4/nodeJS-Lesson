const fs = require('fs');
const path = require('path');
var str='';
var filePath = path.join(__dirname,"./from.txt");
var desPath =  path.join(__dirname,"./to.txt");
var readStream = fs.createReadStream(filePath);
var writeStream = fs.createWriteStream(desPath);

readStream.pipe(writeStream);
// readStream.on('data',chunk =>{
//     str+=chunk;
// });
// readStream.on('end',()=>{
//     str = str.toUpperCase();    
// });


