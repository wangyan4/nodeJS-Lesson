const events = require('events');
var EventEmitter = events.EventEmitter;


function Dog(dogName, enery) {
    EventEmitter.call(this);
    this.dogName = dogName;
    this.enery = enery;
    var timer = setInterval(function () {
        this.emit('bark');
        if (this.enery == -1) {
            clearInterval(timer);
        }
    }.bind(this), 1000);
}
Dog.prototype.__proto__ = EventEmitter.prototype;

exports.Dog = Dog;