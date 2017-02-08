var http=require('http');
var zlib = require('zlib');
var cheerio=require('cheerio');
var url='http://www.imooc.com/learn/348';
const baseUrl='http://www.imooc.com';

var getVideo = html =>{
	var $=cheerio.load(html);
	var videoList=[];
	$('.video a').each(function(item){
		var number=$(this).attr('href');
		if(number.indexOf("/video")===0){
			videoList.push({
				href:number.slice(7),
			});
		}
	});
	// console.log(videoList);
	videoList.map(item=>{
		requestComment(item.href,1);
	})
}

http.get(url,res=>{
	var html='';
	res.on('data',data=>{
		html+=data;
	});
	res.on('end',()=>{
		getVideo(html);
	})
}).on('error',()=>{
	console.log("error");
})



var printComment=json=>{
	var commentList=[];
	json.data.list.map(item=>{
		if(item.description.indexOf('sublime')!==-1){
			commentList.push(item.media_title);
			commentList.push(item.description);
		}
	});
	if(commentList.length>0){
		commentList.push(json.data.page_current);
		console.log(commentList);
	}
}

var getOption=(mid,page)=>{
	var option={
		hostname:'www.imooc.com',
		path:'/course/getcomment?mid='+mid+'&page='+page,
		method: 'GET',
		headers: {
		    'Accept':'application/json, text/javascript, */*; q=0.01',
			'Accept-Encoding':'gzip, deflate, sdch',
			'Accept-Language':'zh-CN,zh;q=0.8,en;q=0.6',
			'Connection':'keep-alive',
			'Cookie':'imooc_uuid=9871d782-d9c0-42d3-8795-0fbbea1838d1; imooc_isnew_ct=1475829168; loginstate=1; apsid=U2NGFlYzEzZDdiZGFhMTEwZjQwNTkzZjY3YmE5NTgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANDEzNjI0NgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAxMDQ4MDQzNzYzQHFxLmNvbQAAAAAAAAAAAAAAAAAAADJhNjNjYmQyOTEzNjdlNGE1NGU5NTM5ZTJkMTUzOGZhmg2YWJoNmFg%3DN2; last_login_username=1048043763%40qq.com; PHPSESSID=t38n591v6v45h3j940g14j7mf4; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1486357052,1486475498; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1486482868; imooc_isnew=2; cvde=5899d0e8f3eb3-57',
			'Host':'www.imooc.com',
			'Referer':'http://www.imooc.com/video/8837',
			'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
			'X-Requested-With':'XMLHttpRequest'
	  	}
	}
	return option;
}

var requestNext=(course,page)=>{
	var request=http.request(getOption(course,page),function(res){
		// console.log('headers: '+JSON.stringify(res.headers));
		var html=[];
		res.on('data',function(chunk){
			html.push(chunk);
			// console.log(Buffer.isBuffer(chunk));
		});

		res.on('end',function(){
			var buffer=Buffer.concat(html);
			var str="";
			var json;
			zlib.unzip(buffer, (err, buffer) => {
			  if (!err) {
			  	str=buffer.toString()
			    json=JSON.parse(str);
			    printComment(json);
			  } else {
			    console.log('error:'+err.message);
			  }
			});
		})

	}).on('error',function(e){
		console.log('error '+e.message);
	});
	request.end();
}

var requestComment=(course,page)=>{
	var request=http.request(getOption(course,page),function(res){
		// console.log('headers: '+JSON.stringify(res.headers));
		var html=[];
		res.on('data',function(chunk){
			html.push(chunk);
			// console.log(Buffer.isBuffer(chunk));
		});

		res.on('end',function(){
			var buffer=Buffer.concat(html);
			var str="";
			var json;
			zlib.unzip(buffer, (err, buffer) => {
			  if (!err) {
			  	str=buffer.toString()
			    json=JSON.parse(str);
			    printComment(json);
			    if(json.data.page_total>json.data.page_current){
			    	requestNext(course,page+1);
				}
			  } else {
			    console.log('error:'+err.message);
			  }
			});
			
		})

	}).on('error',function(e){
		console.log('error '+e.message);
	});
	request.end();
}
