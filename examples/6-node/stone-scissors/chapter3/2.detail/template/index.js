const fs = require("fs");
const vm = require("vm");

const templateCache = {};

const templateContext = vm.createContext({ // 创建上下文，传入上下文对象
  include: function(name, data) {
    const template = templateCache[name] || createTemplate(name);
    return template(data);
  },
});

function createTemplate(templatePath) {
  templateCache[templatePath] = vm.runInContext( // 在 templateContext 上下文中，执行一段脚本
    // 使用 with 语句注入 data 的属性到 with 内部中
    `
  (function (data) {
    with (data) { 
      return \`${fs.readFileSync(templatePath, "utf-8")}\` 
    }
  })`,
    templateContext
  );
  return templateCache[templatePath];
}

module.exports = createTemplate;
