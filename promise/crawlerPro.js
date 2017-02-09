// var Promise=require('Promise');

var http=require('http');

var zlib = require('zlib');

var url='http://www.imooc.com/learn/348';
const baseUrl='http://www.imooc.com';
var util=require('./crawUtil');
var fetchVideoArray=[];


var getOption=util.getOption;
var printComment=util.printComment;
var getVideo=util.getVideo;

function getPageAsync(url){
	return new Promise((resolve,reject)=>{

		http.get(url,res=>{
			var html='';
			res.on('data',data=>{
				html+=data;
			});
			res.on('end',()=>{
				resolve(html);
			})
		}).on('error',e=>{
			reject(e)
			console.log("error");
		})
	});
}


function getCommentAsync(course,page){
	return new Promise((resolve,reject)=>{

		http.get(getOption(course,page),function(res){
		console.log('headers: '+JSON.stringify(res.headers));
			var html=[];

			res.on('data',function(chunk){
				html.push(chunk);
			});

			res.on('end',function(){
				zlib.unzip(Buffer.concat(html), (err, buffer) => {
				  if (!err) {
				    var json=JSON.parse(buffer.toString());
				    // printComment(json);
				    resolve(json);
				  } else {
				    console.log('error:'+err.message);
				  }
				});
			})

			res.on('error',function(e){
				console.log('error '+e.message);
			});
		});

	});
}



var requestComment=(course,page)=>{
	var request=http.request(getOption(course,page),function(res){
		console.log('headers: '+JSON.stringify(res.headers));
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

getPageAsync(url)
	.then(html=>{
		var fetchVideoArray=getVideo(html);
		var arr=fetchVideoArray.map(index=>{
			return getCommentAsync(index,1);
		});
		Promise.all(arr)
			.then(jsons=>{
				jsons.map((item)=>{
					printComment(item);
				})
					
				});
	});




