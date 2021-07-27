console.log('Util unused')
export default class Util {
  hello() {
    return "hello";
  }

  bye() {
    return "bye";
  }
}


Array.prototype.hello = () => 'hello' // 模块副作用