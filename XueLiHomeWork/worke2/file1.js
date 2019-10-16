const fs = require('fs');
const path = require('path');
var argv = process.argv[2];
if (argv == undefined) {
	console.log("参数错误");
} else {
	switch (argv) {
		case 'list':
			var list = [];
			fs.readdir(__dirname, (err, files) => {
				if (err) {
					console.log(err);
				} else {
					files.forEach((item) => {
						var file = {};
						var filePath = path.join(__dirname, item);
						var fileStat = fs.statSync(filePath);
						file.fileName = item;
						file.fileSize = fileStat.size;
						list.push(file);
					})
					console.log(list);
				}
			})
			break;
		case 'mkdir':
			var folder = process.argv[3];
			if (folder == undefined) {
				console.log("参数错误");
			} else {
				var folderPath = path.join(__dirname, folder);
				fs.mkdir(folderPath, (err) => {
					if (err) {
						console.log(err);
					} else {
						console.log("创建成功");
					}
				})
			}
			break;
			default:
				console.log("参数错误");
	}
}