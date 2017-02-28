var fs=require('fs');

var http=require('http');
var cheerio = require("cheerio");
var mkdirp = require('mkdirp');
var request = require("request");


const URL = 'http://car.visoon.com.cn/index/2.html';
const DIR = '/Users/zhouxiaofan/HCI/openCar/WebRoot/upload';


//发送请求
request(URL, function(error, response, body) {
    if(!error && response.statusCode == 200) {
    	// console.log(body);
        var $ = cheerio.load(body);
        $('a img').each(function() {
        	var src = $(this).attr('src');
        	if(src.indexOf('upload')===-1){
        		return;
        	}
        	var urls=src.split('upload');
            var name=urls[urls.length-1];
            var folderIndex=name.lastIndexOf('/');
            var folderName=DIR+name.substring(0,folderIndex);
            var imgName=name.substr(folderIndex+1);
            console.log('正在下载' + src);
            download(src, folderName, imgName);
            console.log('下载完成');
        });
    }
    else{
    	console.log(error);
    }
    
});

//下载方法
var download = function(url, dir, filename){
	if(url.indexOf('http:')===-1){
		url='http://car.visoon.com.cn:80/'+url;
	}
	fs.readdir(dir,(err, files)=>{
		if(err) {
			mkdirp(dir, function(err) {
				console.log('make dir');
			    if(err){
			        console.log(err);
			    }
			});
		}
    })
	
    request.head(url, function(err, res, body){
        request(url).pipe(fs.createWriteStream(dir + "/" + filename));
    });
};

