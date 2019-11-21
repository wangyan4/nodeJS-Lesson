var express = require('express');
var router = express.Router();
var {users,chapterList} = require('./data.json');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/zxy',(req,res,next)=>{
  var bool = false;
  for(var  i = 0;i<users.length;++i){
    if(req.body.username === users[i].username &&
    req.body.passwd === users[i].password){
      bool=true;
      res.end('true');
    }
  }
  if(!bool){
    res.end('false');
  }  
});
router.get('/content',(req,res,next)=>{
    res.render('list');  
});
router.get('/detail',(req,res,next)=>{
  res.end(JSON.stringify(chapterList));
})
module.exports = router;
