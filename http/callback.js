function a1(s){
	console.log(s);
}

function a2(callback,s){
	s+=" hhh";
	callback(s);
}

a2(a1,"abc");