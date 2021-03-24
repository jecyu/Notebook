/*
 * @Author: Jecyu
 * @Date: 2020-11-09 20:58:35
 * @LastEditors: Jecyu
 * @LastEditTime: 2020-11-09 22:00:49
 * @FilePath: /examples/1-patterns/行为型/观察者模式/scenario/eventbus&eventEmitter/EventEmitter.js
 * @Description:
 * import bus from “EventBus 的文件路径”
 * Vue.prototype.bus = bus
 * // 订阅事件
 * this.bus.$on('someEvent', func)
 * // 发布事件
 * this.bus.$emit('someEvent', params)
 */

class EventEmitter {
  constructor() {
    // handlers 是一个 map，用于存储事件与回调之间的对应关系
    this.handlers = {};
  }

  // on 方法用于安装事件监听器，它接受目标事件名和回调函数作为参数
  on(eventName, cb) {
    // 先检查一下目标事件名有没有对应的监听函数队列
    if (!this.handlers[eventName]) {
      // 如果没有，那么首先初始化一个监听函数队列
      this.handlers[eventName] = [];
    }

    // 把回调函数推入目标事件的监听函数队列里去
    this.handlers[eventName].push(cb);
  }

  // emit 方法用于触发目标事件，它接受事件名和监听参数入参作为参数
  emit(eventName, ...args) {
    // 检查目标事件是否有监听函数队列
    if (this.handlers[eventName]) {
      // 如果有，则逐个调用队列里的回调函数
      this.handlers[eventName].forEach((callback) => {
        callback(...args);
      });
    }
  }

  // 移除某个事件回调队列里的指定回调函数
  // 浏览器中的addEventListener用匿名函数也无法解除，避免使用匿名函数即可
  off(eventName, cb) {
    const callbacks = this.handlers[eventName];
    const index = callbacks.indexOf(cb);
    if (index !== -1) {
      callbacks.splice(index, 1);
    }
  }

  // 为事件注册单次监听器
  once(eventName, cb) {
    // 对回调函数进行包装，使其执行完毕自动被移除
    const wrapper = (...args) => {
      cb(...args);
      this.off(eventName, wrapper);
    };
    this.on(eventName, wrapper);
  }
}

module.exports = EventEmitter;
