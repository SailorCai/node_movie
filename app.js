var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var multipart = require('connect-multiparty');
var fs = require('fs');

var port = process.PORT || 3000;
var app = express();
var dbUrl = 'mongodb://127.0.0.1/imooc_movie';
mongoose.connect(dbUrl, {
	useMongoClient:true
});

//models loading
var models_path = __dirname + '/app/models';
var walk = function(path) {
  fs
    .readdirSync(path)
    .forEach(function(file){
      var newPath = path + '/' + file;
      var stat = fs.statSync(newPath);

      if(stat.isFile()){
        if(/(.*)\.(js|coffee)/.test(file)){
          require(newPath);
        };
      }else if(stat.isDirectory()){
        walk(newPath);
      };
    })
};

walk(models_path);

app.set('views', './app/views/pages');
app.set('view engine', 'jade');
//app.use(bodyParser());
app.locals.moment = require('moment');
app.use(bodyParser.urlencoded({extended: true}));
//app.use(bodyParser.json());
app.use(cookieParser());
//上传图片时可能需要使用的中间件
app.use(multipart());
app.use(session({
  resave: false,  
  saveUninitialized: true,
  secret: 'imooc',
  store: new mongoStore({
    url: dbUrl, 
    collection: 'sessions'
  })
}));

if('development' === app.get('evn')){  //如果当前evn是开发环境
	app.set('showStackError', true);	//把错误信息打印出来
	app.use(express.logger(':method :url :status'));	//logger中间件
	app.locals.pretty = true;	//后台输出格式化后的源码
	mongoose.set('debug', true);	//打开mongoose的debug开关
};

require('./config/routes')(app);

app.listen(port);

console.log('service run in localhost:' + port);


app.use(express.static(path.join(__dirname, 'public')));