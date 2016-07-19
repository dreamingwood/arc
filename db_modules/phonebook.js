/**
 * Created by Danny on 2015/9/28 16:47.
 */
var mongoose = require('mongoose');
var db = require("./db_connect.js");

//创建了一个schema结构。
var phonebookSchema = new mongoose.Schema({
    num     :  {type : String,default: '-'},
    name      :  {type : String,default: '-'},
    tel      :  {type : String,default: '-'},
    mobile      :  {type : String,default: '-'},
    sex      :  {type : String,default: '-'},
    com_cap      :  {type : String,default: '-'},
    com      :  {type : String,default: '-'},
    dep      :  {type : String,default: '-'},
    adderss      :  {type : String,default: '-'},
    room      :  {type : String,default: '-'}

});
//创建静态方法
phonebookSchema.statics.nameFind = function(name, callback) {
    this.model('phonebook').find({name: name}, callback);
};
//创建修改的静态方法
phonebookSchema.statics.xiugai = function(conditions,update,options,callback){
    this.model("phonebook").update(conditions, update, options, callback);
}
//创建了一个模型，就是学生模型，就是学生类。
//类是基于schema创建的。
var phonebookModel = db.model('phonebook', phonebookSchema);
//向外暴露
module.exports = phonebookModel;


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
