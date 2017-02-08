const EventEmitter = require('events');

// class MyEmitter extends EventEmitter {}

const myEmitter = new EventEmitter();
// the value can be set to Infinity (or 0) to indicate an unlimited number of listeners
//对单个事件的限制数量
myEmitter.setMaxListeners(0);
myEmitter.on('event', () => {
  console.log('1an event occurred!');
});
myEmitter.on('event', () => {
  console.log('2an event occurred!');
});
myEmitter.on('event', () => {
  console.log('3an event occurred!');
});
myEmitter.on('event', () => {
  console.log('4an event occurred!');
});
myEmitter.on('event', () => {
  console.log('5an event occurred!');
});
myEmitter.on('event', () => {
  console.log('6an event occurred!');
});
myEmitter.on('event', () => {
  console.log('7an event occurred!');
});
myEmitter.on('event', () => {
  console.log('8an event occurred!');
});
myEmitter.on('event', () => {
  console.log('9an event occurred!');
});
myEmitter.on('event', () => {
  console.log('10an event occurred!');
});
myEmitter.on('event', () => {
  console.log('11an event occurred!');
});

myEmitter.emit('event');