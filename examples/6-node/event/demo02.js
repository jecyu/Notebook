// const EventEmitter = process.EventEmitter;
const EventEmitter = require('events').EventEmitter;
const MyClass = function() {};
MyClass.prototype.__proto__ = EventEmitter.prototype;

const a = new MyClass();
a.on('someEvent', function() {
  console.log("someEvent Called");
})
a.emit('someEvent');