var express = require('express');
var router = express.Router();
var async = require('async');
var sqlite3 = require('sqlite3').verbose();
var bodyParser = require('body-parser');
var crypto = require('crypto');
var User = require('../lib/user.js');
var formidable = require('formidable');
var posts = require('../db_modules/posts.js')




router.get('/', function(req, res, next) {

    res.render('../views/posts/index');//,{testtable : 'users'});
});

router.post('/', function(req, res) {
        console.log(req.body.content);

    posts.create({"title":req.body.title,"content":req.body.content,author:req.session.user.name,IP:req.headers.host},function(error){

        console.log(error);
})


    res.redirect('/posts/');


});


module.exports = router;
