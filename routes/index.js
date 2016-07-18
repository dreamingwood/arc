var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
      // res.render('index', { title: 'Express' ,user: 'WOOD'});
   res.render('home',{whois:"whois",whoare:"whoareyou"});
});

router.get('/about', function(req, res, next) {
      // res.render('index', { title: 'Express' ,user: 'WOOD'});
   res.render('about',{
       pageTestScript: '/qa/tests-about.js'
   });
});

router.get('/thank-you', function(req, res){
	res.render('thank-you');
});











module.exports = router;
