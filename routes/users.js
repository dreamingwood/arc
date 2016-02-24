var express = require('express');
var router = express.Router();
var async = require('async');
var sqlite3 = require('sqlite3').verbose();
var bodyParser = require('body-parser');
var crypto = require('crypto');
var User = require('../lib/user.js');


var str = "";

var get_result = function(callback) {
    var db2 = new sqlite3.Database('./db/node.db', function () {
        db2.all("select smatlcode,SMATLNAME,XT from JH2015 where smatlcode like '91120009%'", function (err, res) {
            if (!err) {
                callback(res);
               // console.log(str);//@1 这里输出的是有值的str
            }else {
                console.log(err);
            }
        });
    });
}


router.post('/reg', function(req, res) {

    var name = req.body.name,
        password = req.body.password,
        password_re = req.body['password-repeat'];
    //检验用户两次输入的密码是否一致
    if (password_re != password) {
     // req.flash('error', '两次输入的密码不一致!'); 
      req.session.flash={ type:'danger', message:"两次输入的密码不一致!"};
      return res.redirect('./reg');//返回主册页
    }
    //生成密码的 md5 值
    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex');
    var newUser = new User({
        name: req.body.name,
        password: password,
        email: req.body.email
    });
    //检查用户名是否已经存在 
    User.get(newUser.name, function (err, user) {
      if (user) {
       // req.flash('error', '用户已存在!');
        req.session.flash={ type:'danger', message:"用户已存在!"};
        return res.redirect('/reg');//返回注册页
      }
      //如果不存在则新增用户
      newUser.save(function (err, user) {
        if (err) {
         // req.flash('error', err);
           req.session.flash={ type:'danger', message:"错误!"};
          return res.redirect('/reg');//注册失败返回主册页
        }
        req.session.user = user;//用户信息存入 session
        //req.flash('success', '注册成功!');
        req.session.flash={ type:'success', message:"注册成功!"};
        res.redirect('/');//注册成功后返回主页
      });
    });

});

 router.post('/login', function (req, res) {
    //生成密码的 md5 值
    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex');
    //检查用户是否存在
    User.get(req.body.name, function (err, user) {
      if (!user) {
          req.session.flash={ type:'error', intro:"用户不存在!",message:'zhendebucunzai'};
       // req.flash('error', '用户不存在!'); 
        return res.redirect('/users/login');//用户不存在则跳转到登录页
      }
      //检查密码是否一致
      if (user.password != password) {
        //req.flash('error', '密码错误!'); 
        req.session.flash={ type:'error', message:"密码错误!"};
        return res.redirect('/users//login');//密码错误则跳转到登录页
      }
      //用户名密码都匹配后，将用户信息存入 session
      req.session.user = user;
     // req.flash('success', '登陆成功!');
      req.session.flash={ type:'success', message:"登陆成功!"};
      res.redirect('/');//登陆成功后跳转到主页
    });
  });



  router.get('/logout', function (req, res) {
    req.session.user = null;
    //req.flash('success', '登出成功!');
    req.session.flash={ type:'success', message:"退出成功!"};
    res.redirect('./');//登出成功后跳转到主页
  });




router.get('/', function(req, res, next) {
    var s = 'respond with a resource<BR>';
    s += 'Hello World!<BR>';
    s += req.address;
 // res.send('respond with a resource/n');
    res.render('../views/users/about',{testtable : 'users'});
});


router.get('/login', function(req, res, next) {

    res.render('../views/users/login');
});

router.get('/reg', function(req, res, next) {

    res.render('../views/users/reg');
});


//  /user/about  路由
router.get('/about', function(req, res, next) {
    
      var s = '测试数据 <BR><table>';  
get_result(function(db_data){
    
 //       db_data =JSON.stringify(db_data);
    console.log(db_data);
      res.render('../views/users/about',{JIHUA : db_data});
   // s += JSON.stringify(data);
         //  res.render('../users/about',{testtable: s});
      for(var o in db_data){  

        //console.log(db_data[o].SMATLCODE);
       s+= db_data[o].SMATLCODE + ':' +db_data[o].SMATLNAME + '<BR>';
      } 
        
    s+='</table>';
    
 //   res.render('../views/users/about',{testtable : s});
    
      //  res.send(s);

    //res.render('index', { title: 'Express' ,user: JSON.stringify(data) });
})
    
    

});


router.get('/testjavascript', function(req, res){
    // we will learn about CSRF later...for now, we just
    // provide a dummy value
    res.render('../views/users/testjavascript',{ subbody: 'body' });
    console.log('testjavascript');
});




router.get('/newsletter', function(req, res){
    // we will learn about CSRF later...for now, we just
    // provide a dummy value
    res.render('../views/users/newsletter', { csrf: 'CSRF' });
    console.log('newsletter');
});
router.post('/process', function(req, res){
/* 
    if(req.xhr || req.accepts('json,html')==='json'){
        // if there were an error, we would send { error: 'error description' }
        res.send({ success: true });
        console.log('xhr');
        
    } else {
        // if there were an error, we would redirect to an error page
        res.redirect(303, '/');
        console.log('303');
    }
*/
    //console.log(req);
    console.log(req.query.form);
     
     
     console.log(req.body.name);
     res.redirect(303, '/');
});







module.exports = router;
