var http=require('http');
var url='http://www.imooc.com/learn/348';
const baseUrl='http://www.imooc.com';
var cheerio=require('cheerio');
var zlib = require('zlib');

var getVideo = html =>{
	var $=cheerio.load(html);
	var videoList=[];
	$('.video a').each(function(item){
		videoList.push({
			href:$(this).attr('href'),
		});
	});
	// videoList.map(item=>{
	// 	getComment(item);
	// })
	// console.log(videoList[0]);
	getComment(videoList[0]);
}



http.get(url,res=>{
	var html='';
	res.on('data',data=>{
		html+=data;
	});
	res.on('end',()=>{
		// getVideo(html);
		// console.log(data);
	})
}).on('error',()=>{
	console.log("error");
})

