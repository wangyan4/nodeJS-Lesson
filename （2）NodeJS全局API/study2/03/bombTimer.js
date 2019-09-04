function Bomb(){

}
Bomb.prototype.explode = function(){
    console.log(this.message);
}
Bomb.prototype.message = "bomb!!"
setTimeout(function(){
    var bomb = new Bomb();
    bomb.explode();
},2000);

