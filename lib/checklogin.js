  exports.checkLogin = function(req, res, next) {
        if (!req.session.user) {
      //req.flash('error', '未登录!'); 
      req.session.flash={ type:'success', message:"未登录!"};
      res.redirect('/users/login');
    }
    else next();
  };
  
  
  exports.checkNotLogin = function(req, res, next) {
    if (req.session.user) {
     // req.flash('error', '已登录!'); 
      req.session.flash={ type:'success', message:"已登录!"};
      res.redirect('back');//返回之前的页面
    }
    next();
  };
