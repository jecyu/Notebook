var fs = require('fs');
var babel = require('@babel/core');
var moriscript = require('./moriscript');

// 从命令行参数中读取文件名
var fileName = process.argv[2];

// 读取文件代码
fs.readFile(fileName, function(err, data) {
    if (err) throw err;

    // 从 buffer 转换为 string
    var src = data.toString();

    // 使用插件转换源码
    var out = babel.transformSync(src, {
        plugins: [moriscript]
    });
    
    // 打印生成的目标代码
    console.log(out.code);
});
