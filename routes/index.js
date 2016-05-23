var express = require('express');
var router = express.Router();
var querystring = require("querystring");

var work=require('work');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: '李先发个人博客',message:'我的个人主页成功搭建了!' });
});

router.get('/edit', function(req, res, next) {
  console.log("at edit page");
  res.render('edit', { title: '李先发个人博客',message:'我的个人主页成功搭建了!' });
});
router.post('/edit',function(req,res,next)
{
	console.log("处理博客POST请求");
	req.setEncoding('utf-8');
	res.send(work.saveData(req));
});
router.get('/home2',function(req,res,next){
	console.log("at home2 page\n");
	res.render('home2',{title:'李先发个人博客',message:'测试home2的页面'});
});
router.get('/login',function(req,res,next){
	console.log('at login page\n');
	res.render('login',{title:'李先发个人博客',message:'测试home2的页面'});
});
router.post('/login',function(req,res,next){
	console.log(req.body);
	res.send('done!');
	work.accept(req);
});
module.exports = router;
