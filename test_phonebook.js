var phonebook = require("./db_modules/phonebook.js");
var pinyin = require("./test_phonebook2.js")

//实例化了一个学生类
var xiaoming = new phonebook({"name":"小李","age":12,"sex":"男"});
//保存这个学生类
xiaoming.save(function(){
   console.log("存储成功");
});
console.log("启动");
//用类来创建一个对象（工厂）
// tel.create({"name":"小明","tel":"22758","sex":"男"},function(error){
//    console.log("保存成功");
// })
//
phonebook.nameFind("小明",function(err,result){
    console.log(result);
    console.log((pinyin.pinyin("小明")).toLocaleLowerCase());
});

// tel.xiugai({"name":"小明"},{$set : {"age":30}},{},function(){
//     console.log("改年龄成功");
// });