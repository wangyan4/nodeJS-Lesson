const events = require('events');
const util = require('util');

const EventEmitter = events.EventEmitter;

function radio(name,fm){
    this.name = name;
    this.fm = fm;
    setTimeout(function(){
        console.log("lalalalala...");
        this.emit('stop');
    }.bind(this),2000)
}
radio.prototype.play = function(){  
    console.log("%s  %s  opened",this.name,this.fm);
}
radio.prototype.stop = function(){
    console.log("%s  %s  closed",this.name,this.fm);    
}
util.inherits(radio,EventEmitter);
exports.radio = radio;
