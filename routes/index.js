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
	work.saveData(req,res);
});


router.get('/list',function(req,res,next)
{
	console.log("请服务器列出博客列表");
	work.getArticleList(res,6);
		
	//res.render('list',{article:article});//传入一个对象,这个对象一个键,一个值,这个键是可以直接在jade模板里面访问的
});

router.get('/list/:id',function(req,res,next)
{
	console.log("匹配一篇博客");
	work.getOneArticle(req,res);
		
	//res.render('list',{article:article});//传入一个对象,这个对象一个键,一个值,这个键是可以直接在jade模板里面访问的
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
