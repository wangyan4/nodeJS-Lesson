var dog = require('./dogBark.js');
var argv2 = process.argv[2];
var argv3 = process.argv[3];
var taidi =dog.taidi;
var zangao =dog.zangao;

taidi = new dog.Dog('taidi', argv2);
zangao = new dog.Dog('zangao', argv3);
taidi.on('bark',function(){
    console.log("%s barked!!,enery:%d", this.dogName, this.enery--);
    
})
zangao.on('bark',function(){
    console.log("%s barked!!,enery:%d", this.dogName, this.enery--);
})
