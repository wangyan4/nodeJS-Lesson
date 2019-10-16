const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const qs = require('querystring');

var imglist = ["images/1442457564979540.jpeg","images/1433940946459450-lp.jpg","images/1447641406565685-lp.jpg",
          "images/1442201163344838-lp.jpg","images/1-7.jpg",,"images/1433935839731755-lp.png"];

http.createServer((req, res) => {
  var urlObj = url.parse(req.url, true);
  var urlpath = urlObj.pathname;
  var filepath = '';
  var filecontent = '';
  // console.log(urlpath);
  //加载list页面
  if (urlpath === '/list') {
    filepath = path.join(__dirname, '/chapterList.html');
    filecontent = fs.readFileSync(filepath);
    res.writeHead(200, {
      "content-type": "text/html"
    });
    res.end(filecontent);
  }
  //加载css文件
  if (urlpath.indexOf('css') > 0) {
    var cssfile = urlpath.split('/');
    filepath = path.join(__dirname, '/css/', cssfile[2]);
    filecontent = fs.readFileSync(filepath);
    res.writeHead(200, {
      "content-type": "text/css"
    });
    res.end(filecontent);
  }
  //加载js文件
  if (urlpath.indexOf('js') > 0) {
    var jsfile = urlpath.split('/');
    filepath = path.join(__dirname, '/js/', jsfile[2]);
    filecontent = fs.readFileSync(filepath);
    res.writeHead(200, {
      "content-type": "application/x-javascript"
    });
    res.end(filecontent);
  }
  //加载image文件
  if (urlpath.indexOf('images') > 0) {
    var imgfile = urlpath.split('/');
    filepath = path.join(__dirname, '/images/', imgfile[2]);
    if (fs.statSync(filepath).isDirectory()) {
      filepath = path.join(__dirname, '/images/', imgfile[2], imgfile[3]);
    }
    filecontent = fs.readFileSync(filepath);
    if (imgfile[2].indexOf('jpg') > 0 || imgfile[2].indexOf('JPG') > 0 || imgfile[2].indexOf('jpeg') > 0 || imgfile[2].indexOf('JPEG') > 0) {
      res.writeHead(200, {
        "content-type": "image/jpeg"
      });
    }
    if (imgfile[2].indexOf('png') > 0 || imgfile[2].indexOf('PNG') > 0) {
      res.writeHead(200, {
        "content-type": "image/png"
      });
    }
    res.end(filecontent);
  }
  //将文章内容chapter页面渲染到页面
  if (urlpath === '/getDetail') {
    filepath = path.join(__dirname, 'chapter.html');
    filecontent = fs.readFileSync(filepath);
    res.setHeader("content-type", "text/html");
    res.end(filecontent);
  }
  //将文章内容渲染到chapter页面
  if (urlpath === '/getContent') {
    filepath = path.join(__dirname, 'content.json');
    filecontent = fs.readFileSync(filepath);
    chapterList = JSON.parse(filecontent.toString());
    res.end(JSON.stringify(chapterList));
  }
  //获取登录login页面
  if (urlpath === '/login') {
    filepath = path.join(__dirname, '/login.html');
    filecontent = fs.readFileSync(filepath);
    res.writeHead(200, {
      "content-type": "text/html"
    });
    res.end(filecontent);
  }
  //实现登录验证
  if (urlpath === '/loginreq') {
    var result = '';
    req.on('data', (chunk) => {
      result += chunk;
    })
    req.on('end', () => {
      var bool = false;
      result = qs.parse(result);
      filepath = path.join(__dirname, 'data.json');
      filecontent = fs.readFileSync(filepath);
      filecontent = JSON.parse(filecontent.toString());
      if (result.username == filecontent.username && result.password == filecontent.pwd) {
        res.end('true');
      } else {
        res.end("false");
      }
    })
  }
  //跳转文章列表页list
  if (urlpath == '/listmanager') {
    filepath = path.join(__dirname, 'list.html');
    filecontent = fs.readFileSync(filepath);
    res.writeHead(200, {
      "content-type": "text/html"
    });
    res.end(filecontent);
  }
  //将文章列表渲染到list页面
  if (urlpath == '/listcontent') {
    filepath = path.join(__dirname, 'content.json');
    filecontent = fs.readFileSync(filepath);
    filecontent = JSON.parse(filecontent);
    // filecontent.forEach((item, index) => {
    //   item["chapterId"] = index;
    // })
    filecontent = JSON.stringify(filecontent);
    res.end(filecontent);
  }
  //获取添加文章addChapter页面
  if (urlpath == '/addChapter') {
    filepath = path.join(__dirname, 'addChapter.html');
    filecontent = fs.readFileSync(filepath);
    res.writeHead(200, {
      "content-type": "text/html"
    });
    res.end(filecontent);
  }
  //添加文章列表 添加至列表文件content.json中
  if (urlpath == '/add') {
    filepath = path.join(__dirname, 'content.json');
    filecontent = fs.readFileSync(filepath);
    filecontent = JSON.parse(filecontent);
    var message = '';
    req.on('data', (chunk) => {
      message += chunk;
    })
    req.on('end', () => {
      message = qs.parse(message);
      var newobj = {
        "chapterId": 1,
        "chapterName": "",
        "imgPath": "",
        "chapterDes": "",
        "chapterContent": "",
        "publishTimer": "",
        "author": "admin",
        "views": ''
      }
      newobj["imgPath"] = imglist[parseInt(Math.random()*4)];
      newobj["chapterName"] = message.title;
      newobj["chapterContent"] = message.content;
      newobj["views"] = parseInt(Math.random() * 2000);
      newobj["publishTimer"] = new Date(Date.now()).toLocaleString().substring(0, 10);
      filecontent.push(newobj);
      filecontent.forEach((item, index) => {
        item["chapterId"] = index;
      })
      filecontent = JSON.stringify(filecontent);
      fs.writeFileSync(filepath, filecontent);
      res.end();
    })


  }
  //删除文章列表 从文件列表文件content.json中删除对应项
  if (urlpath == '/delete') {
    filepath = path.join(__dirname, 'content.json');
    filecontent = fs.readFileSync(filepath);
    filecontent = JSON.parse(filecontent);
    filecontent.forEach((item, index) => {
      var delId = parseInt(urlObj.query.delId - 1);
      if (item["chapterId"] == delId) {
        filecontent.splice(index, 1);
      }
    })
    filecontent.forEach((item, index) => {
      item["chapterId"] = index;
    })
    filecontent = JSON.stringify(filecontent);
    fs.writeFileSync(filepath, filecontent);
    res.writeHead(200, {
      "content-type": "text/html;charset=utf-8"
    })
    res.write(`<a href="http://localhost:8083/listmanager">返回</a><br>`);
    res.write('删除成功');
    res.end();
  }
}).listen(8083, 'localhost', () => {
  console.log("服务器已启动...");
})