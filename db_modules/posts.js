/**
 * Created by Danny on 2015/9/28 16:47.
 */
var mongoose = require('mongoose');
var db = require("./db_connect.js");

//创建了一个schema结构。
var postSchema = new mongoose.Schema({
    postDate     :  {type : Date,default: Date.now},
    name      :  {type : String,default: '-'},
    title      :  {type : String,default: '-'},
    content      :  {type : String,default: '-'},
    author    : {type : String,default: '-'},
    IP          :{type : String,default: '-'}

});
//创建静态方法
postSchema.statics.titleFind = function(title, callback) {
    this.model('post').find({title: title}, callback);
};
//创建修改的静态方法
postSchema.statics.xiugai = function(conditions,update,options,callback){
    this.model("post").update(conditions, update, options, callback);
}
//创建了一个模型，就是学生模型，就是学生类。
//类是基于schema创建的。
var postModel = db.model('post', postSchema);
//向外暴露
module.exports = postModel;


//////////////////////////////////////////////////////////////////////////////
//////  以下来自mongoose 文档
//////////////////////////////////////////////////////////////////////////////

// var Comment = new Schema({
//   name: { type: String, default: 'hahaha' },
//   age: { type: Number, min: 18, index: true },
//   bio: { type: String, match: /[a-z]/ },
//   date: { type: Date, default: Date.now },
//   buff: Buffer
// });
 
// // a setter 
// Comment.path('name').set(function (v) {
//   return capitalize(v);
// });
 
// // middleware 
// Comment.pre('save', function (next) {
//   notify(this.get('email'));
//   next();
// });
