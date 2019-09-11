var radio = require('./radio.js');
var radio = new radio.radio("music radio","FM 106.7");

radio.on("play",radio.play);
radio.on("stop",radio.stop);
radio.emit('play');