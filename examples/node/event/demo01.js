const EventEmitter = require('events').EventEmitter;
const a = new EventEmitter();

a.on('event', function() {
  console.log('event called');
})

a.emit('event');