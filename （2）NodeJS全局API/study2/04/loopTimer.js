function loop(){
    console.log('I will loop forever!');
};
var lop = setInterval(loop, 500);

setTimeout(() => {
    clearInterval(lop);
    console.log("Game over");
    process.exit();
}, 5000);