const http = require('http');
const https = require('https');
const fs = require('fs');
const url = require('url');
const cheerio = require('cheerio');
const qs = require('querystring');
http.createServer((req, res) => {
    var urlObj = url.parse(req.url, true);
    var pathName = urlObj.pathname;
    if (pathName === '/') {
        readIndex(res);
    } else if (pathName === '/search') {
        inventHtml(res);
    }
}).listen(8081, () => {
    console.log('服务器已启动...');
})

function readIndex(res) {
    fs.readFile('./index.html', (err, data) => {
        res.writeHead(200, {
            "content-type": "text/html;chatset=utf-8;"
        });
        res.end(data);
    })
}

function inventHtml(ret) {
    var APIURL = "https://maoyan.com/films";
    var movieList = [];
    APIURL = encodeURI(APIURL);
    https.get(APIURL, (res) => {
        var result = '';
        res.on('data', (chunk) => {
            result += chunk;
        })
        res.on('end', () => {
            const $ = cheerio.load(result);

            $(".movie-item-title a").each(function () {
                var movie = {};
                movie.movieId = $(this).attr("data-val").slice(9, -1);
                movie.movieName = $(this).text();
                if (isNaN($(this).parent().next().text())) {
                    movie.movieOrange = '暂无评分';
                } else {
                    movie.movieOrange = $(this).parent().next().children().text();
                }
                movieList.push(movie);
            })
            console.log(movieList);
            ret.end(JSON.stringify(movieList));
        });
        
    })
}