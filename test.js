//这部分是一个测试类:对应正常的引入方法为:  
const {DBC,Filter,value,column} =require( './dist/index.js')
//测试导入代码
var dbc = new DBC({
    database: 'MySQL',
    url: '127.0.0.1',
    username: 'root',
    password: '123456',
    databaseName: 'deliver_system',
    port: 3306 //为可选参数
});

dbc.Strategy.query([], 'comment')
    .then(function (result) { return console.log(result); })
    .catch(function (error) { return console.log(error); });
dbc.disConnect();

// 测试文件仍然直接使用index.js,自动指向一个dist内部的index而不是src中的ts文件
// ts文件全部锁定在src文件中进行编写，tsconfig中指定
// 用户实际调用的则是dist中的js文件，入口文件也调整为 ‘./dist/index.js’ 


// 另外关于node的编译语法幸亏今天看了点书
// 如果不存在node的情况，会执行一些默认的东西
// 在执行node的时候会自动寻找一下package，这里作出的修改就是type改成了module

// 大晚上的做一点小小的补充吧
// 首先不一定后缀要改成mjs，直接吧package。json里面的属性改掉就可以了
// 其次就是注意一下export default 导出的是一个值
// 而export允许到处多个数值，但是二者都能正常使用结构语法，问题不大的

// 

//获取当前node的全局位置的方法为npm config get prefix
//然后就可以将全局下载的内容设置为全局变量

