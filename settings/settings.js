
module.exports = { 
  cookieSecret: 'myblog', 
  db: 'blog', 
  host: 'localhost',
  port: 27017,
  url:'mongodb://localhost/blog'
};

//使用书中方式报异常，用url表述ok


/*
module.exports = { 
  cookieSecret: 'passstr', //cookie 加密用
  db: 'arcdb', 
  host: 'mongodb://arc:benwood@ds062898.mongolab.com:62898/arcdb',
  port: 62898
};
*/