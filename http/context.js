var pet={
	words:"...",
	speak:function(say){
		console.log(say+" "+this.words);
	}
}

var dog={
	words:"wang"

}
//不能这么做，因为dog没有info的属性

dog.info.name="dog";

// pet.speak.call(dog,"say");

pet.speak("ss");

var pet={
	name:"pet",
	dog:{
		name:"dog",
		speak:function(){
			console.log(this.name);//dog
		}
	}
}
Object.prototype.name="pet";
Object.prototype.speak=function(){
	console.log(this.name)
}
var dog={name:"dog"};
dog.speak()

Function.prototype.method=function(name,func){
	//this在调用的时候绑定，而且绑定在调用对象上
	this.prototype[name]=func;
	return this;
}
Number.method('integer',function(){
	return Math[this<0?'ceil':'floor'](this);
});
(-10/3).integer();
console.log((-10/3).integer());