var express = require('express');
var router = express.Router();
var async = require('async');
var sqlite3 = require('sqlite3').verbose();
var bodyParser = require('body-parser');
var checklogin = require('../lib/checklogin.js')

var str = "";

//get_result 测试版函数，可以删除
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

//初始科室总结数据
var get_div_summary = function(callback,ny_id) {
    var db2 = new sqlite3.Database('./db/node.db', function () {
        
        //求父分类，如果父分类为空，则赋值为根节点


        
        db2.all("select CY_JE + GG_JE ZGS_HJ,* from Z_LUJU_GONGYING where NY_ID like ? ORDER BY NY_ID DESC ",ny_id, function (err, res) {
            //statistics  st   分类 fl   all 所有五级分类的汇总表
            if (!err) {
                callback(res);
               // console.log(str);//@1 这里输出的是有值的str
            }else {
                console.log(err);
            }
        });
    });
}



//初始化页面，在页面中钻取时，调用get_in_st2
var get_in_st = function(callback,req_fl,dwbh) {
    var db2 = new sqlite3.Database('./db/node.db', function () {
        
        //求父分类，如果父分类为空，则赋值为根节点
        var str_sfl = req_fl.substring(0, req_fl.length-1);
        if (!str_sfl) str_sfl = 'a';
        //单位列表中  全部的编号为%，需要转换
        if(dwbh=='%'||!dwbh) dwbh = '全局';
        
        db2.all("select * from a_st_fl_all where sfl = ? and dwbh = ? ",str_sfl,dwbh, function (err, res) {
            //statistics  st   分类 fl   all 所有五级分类的汇总表
            if (!err) {
                callback(res);
               // console.log(str);//@1 这里输出的是有值的str
            }else {
                console.log(err);
            }
        });
    });
}

//在页面中钻取时用，调用get_in_st2
var get_in_st_query = function(callback,req_sfl,dwbh) {
    
            //求子分类，如果下一类的父类为4位，则不再钻取
            if(req_sfl.length==5) 
            req_sfl = req_sfl.substring(0, req_sfl.length-1);
            //单位列表中  全部的编号为%，需要转换
            if(dwbh=='%'||!dwbh) dwbh = '全局';
  
    
    
    var db2 = new sqlite3.Database('./db/node.db', function () {
        db2.all("select * from a_st_fl_all where sfl = ? and dwbh = ? ",req_sfl,dwbh,function (err, res) {
            //statistics  st   分类 fl   all 所有五级分类的汇总表
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

    res.render('../views/statistics/in_st',{testtable : '统计首页'});
});






            //求子分类，如果下一类的父类为4位，则不再钻取
          //  if(req_sfl.length==5) 
          //  req_sfl = req_sfl.substring(0, req_sfl.length-1);




//收料物资明细查询
var get_in_wz_search = function(callback,req) {

    var db2 = new sqlite3.Database('./db/node.db', function () {
        db2.all("select * from ST_IN_STUFF_ZDALL_TOTAL  where SUNITECODE like ? and SMATLCODE like ? and NY like '15%' and (SMATLNAME like ? or SMATLTYPE like ? or SRLUUNITNAME like ? or TRAINTYPE like ?) limit 100",
        req.param('dwbh'),
        req.param('wzbh'),
        req.param('search_str'),
        req.param('search_str'),
        req.param('search_str'),
        req.param('search_str'),
        function (err, res) {

            if (!err) {
                callback(res);
               // console.log(str);//@1 这里输出的是有值的str
            }else {
                console.log(err);
            }
        });
    });
}






//  物资收料信息明细查询
router.get('/in_wz_search', function(req, res, next) {
  

     // res.render('../views/statistics/in_wz_search',{layout : null , WZ_DETAIL : db_data});

 // if(req.param('samatlecode')){
        get_in_wz_search(function(db_data){
            console.log(db_data);
            res.render('../views/statistics/in_wz_search',{layout : null , WZ_DETAIL : db_data});
        },
        req
        )
 // }
 // else{
 //           get_in_wz_search(function(db_data){
 //           console.log(db_data);
 //           res.render('../views/statistics/in_wz_search',{layout : null , WZ_DETAIL : db_data});
 //       },
 //       '9901%'
 //       )
      
  





});




//  按大类的收料统计--查询页面
router.get('/in_st_querypage', function(req, res, next) {
    
  //res.render('../views/statistics/in_st_querypage',{});
      get_dw_list(function(db_data){
    //console.log(db_data);
      res.render('../views/statistics/in_st_querypage',{DW_LIST:db_data});
    })

});
//  按大类的收料统计--查询子类
router.get('/in_st', function(req, res, next) {
  
  if(req.param('fl')){
        get_in_st(function(db_data){
        console.log(db_data);
        res.render('../views/statistics/in_st',{IN_ST : db_data});
        },req.param('fl'),req.param('dwbh'))
  }
  else{
        get_in_st(function(db_data){
        console.log(db_data);
        res.render('../views/statistics/in_st',{IN_ST : db_data});
        },'a',req.param('dwbh'))
      
  }
});



//  按大类的收料统计--查询父类类
router.get('/in_st2', function(req, res, next) {

  if(req.param('sfl')){
        get_in_st_query(function(db_data){
        console.log(db_data);
        res.render('../views/statistics/in_st',{IN_ST : db_data});
        },req.param('sfl'),req.param('dwbh'))
  }
  else{
              get_in_st_query(function(db_data){
        console.log(db_data);
        res.render('../views/statistics/in_st',{IN_ST : db_data});
        },'a',req.param('dwbh'))
      
  }
  
  
});

router.get('/div_summary', checklogin.checkLogin);
//供应科总结
router.get('/div_summary', function(req, res, next) {

//nothing toto
  if(req.param('ny_id')){
        get_div_summary(function(db_data){
        console.log(db_data);
        res.render('../views/statistics/div_summary',{DIV_SUMMARY : db_data});
        },req.param('ny_id'))
  }
  else{
              get_div_summary(function(db_data){
        console.log(db_data);
        res.render('../views/statistics/div_summary',{DIV_SUMMARY : db_data});
        },'%')
      
  }
  
  
});



//未开发，备用
router.get('/in_detail', function(req, res, next) {
  
    get_result(function(db_data){
   // console.log(db_data);
      res.render('../views/statistics/in_st',{JIHUA : db_data});
    })
});





//得到单位列表
var get_dw_list = function(callback,req_sfl) {

    var db2 = new sqlite3.Database('./db/node.db', function () {
        db2.all("SELECT * FROM DIC_DW order by bhid",
        function (err, res) {

            if (!err) {
                callback(res);
               // console.log(str);//@1 这里输出的是有值的str
            }else {
                console.log(err);
            }
        });
    });
}


router.get('/in_wz_search_querypage', function(req, res, next) {
  
    get_dw_list(function(db_data){
    //console.log(db_data);
      res.render('../views/statistics/in_wz_search_querypage',{DW_LIST:db_data});
    })
});






module.exports = router;
