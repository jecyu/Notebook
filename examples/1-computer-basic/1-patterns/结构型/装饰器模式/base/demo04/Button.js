// 装饰器函数，它的第一个参数是目标类
function classDecorator(target) {
  target.hasDecorator = true;
  return target;
}

function funcDecorator(target, name, descriptor) {
  let originalMethod = descriptor.value;
  descriptor.value = function() {
    console.log("我是 Func 的装饰器逻辑");
    return originalMethod.apply(this, arguments);
  };
}

// 将装饰器“安装”到 Button 类上
@classDecorator
class Button {
  // button 类的相关逻辑
  @funcDecorator
  onClick() {
    console.log("我是 Func 的原有逻辑");
  }
}

// 验证装饰器是否生效
console.log("Button 是否被修饰了：", Button.hasDecorator);

const button = new Button();
button.onClick();
