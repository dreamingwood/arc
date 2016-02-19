var express = require('express');
var router = express.Router();
var async = require('async');
var sqlite3 = require('sqlite3').verbose();
var bodyParser = require('body-parser');


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




router.get('/', function(req, res, next) {
    var s = 'respond with a resource<BR>';
    s += 'Hello World!<BR>';
    s += req.address;
 // res.send('respond with a resource/n');
    res.render('../views/users/about',{testtable : 'users'});
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
