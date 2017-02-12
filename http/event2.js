const EventEmitter = require('events');

// class MyEmitter extends EventEmitter {}

const myEmitter = new EventEmitter();

myEmitter.once('event', () => {
  console.log('1an event occurred!');
});

myEmitter.emit("event");
myEmitter.emit("event");