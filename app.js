var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var db = require('./logic/data/mongo_api');
var c = require('./logic/constants');
// var index = require('./routes/index');
// var users = require('./routes/users');
var scanner = require('./routes/scanner_router');
var app = express();



// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/dist')));




// app.use('/', index);
// app.use('/users', users);
tomer = true;
app.use('/scanner',scanner.router);
app.use('/cookie',(req,res,next)=>{
    if(!tomer){

        var cookie = req.cookies._id;
        if(cookie == undefined){
            var month = 1000 * 60 * 60 * 24 * 30;
            var len = 10;
            var the_id = require('crypto-random-string')(len);
            res.cookie('_id', the_id,{ maxAge: month, httpOnly: true });
            db.addAnalytic(the_id,(err,res)=>{
                next();
            });
        }else{
            let medium = 0.1;
            let expert = 0.5;
            db.updateAnalytic(cookie,(err,result)=>{
                db.getAnalytic(cookie,(docs)=>{
                    let visits = docs[0].visits;
                    db.getAllVisitors((totalVisits)=>{
                        let relative = parseInt(visits) / parseInt(totalVisits);
                        if(relative < medium){ // beginner
                            db.getAllArticles(c.BEGINNER,(err,articles_doc)=>{
                                res.json(articles_doc);
                            });
                        }else if(relative >= medium && relative <= expert){ // medium
                            db.getAllArticles(c.MEDIUM,(err,articles_doc)=>{
                                res.json(articles_doc);
                            });
                        }else{ // expert
                            db.getAllArticles(c.EXPERT,(err,articles_doc)=>{
                                res.json(articles_doc);
                            });
                        }
                    });
                })
            });
        }
        //next();
    }else{

    }
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
