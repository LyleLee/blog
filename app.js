var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//ueditor 
var ueditor = require("ueditor");

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));//__dirname是当前的运行目录E:\web\blog

/*
	添加ueditor处理说明.
*/

app.use("/ueditor/ueditor", ueditor(path.join(__dirname, 'public'), function(req, res, next) {

  // ueditor 客户发起上传图片请求

	if(req.query.action === 'uploadimage'){

		// 这里你可以获得上传图片的信息
		var foo = req.ueditor;
		console.log("图片名字:" +foo.filename); // exp.png
		console.log("图片编码:" +foo.encoding); // 7bit
		console.log("图片类型:" +foo.mimetype); // image/png

		// 下面填写你要把图片保存到的路径 （ 以 path.join(__dirname, 'public') 作为根路径）
		var img_url = '/images/ueditor/';
		res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
		
		}
		
	//  客户端发起图片列表请求
	else if (req.query.action === 'listimage'){
		var dir_url = '/images/ueditor/'; // 要展示给客户端的文件夹路径
		res.ue_list(dir_url) // 客户端会列出 dir_url 目录下的所有图片
		}
		// 客户端发起其它请求
	else {

		res.setHeader('Content-Type', 'application/json');
		// 这里填写 ueditor.config.json 这个文件的路径
		res.redirect('/ueditor/nodejs/config.json')
	}
}));

app.use('/', routes);//当访问根路径时,使用routes来进行处理
app.use('/users', users);//当访问/users时, 使用users来进行处理

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var server = app.listen(3000,function(){
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});

module.exports = app;
