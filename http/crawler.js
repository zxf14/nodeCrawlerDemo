var http=require('http');
var url='http://218.94.159.99/';
http.get(url,res=>{
	var html='';
	res.on('data',data=>{
		html+=data;
	});
	res.on('end',()=>{
		console.log(html);
	})
}).on('error',()=>{
	console.log("error");
})