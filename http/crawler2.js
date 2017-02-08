var http=require('http');
var url='http://218.94.159.99/';
var cheerio=require('cheerio');

var parseChapter = html =>{
	var $=cheerio.load(html);
	var courseList=$('.coursename a');

	var coursData=[];

	$('.coursename a').each(function(items) {
		var chapters=$(this);
		var chapter=chapters.text();
		var chapterData={title:chapter}
		coursData.push(chapterData);
	});
	return coursData;
}

http.get(url,res=>{
	var html='';
	res.on('data',data=>{
		html+=data;
	});
	res.on('end',()=>{
		var data=parseChapter(html);
		console.log(data);
	})
}).on('error',()=>{
	console.log("error");
})