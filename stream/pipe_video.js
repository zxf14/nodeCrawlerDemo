var fs = require('fs');


fs.readdir('./img',(err, files)=>{
	if(err){
		fs.mkdir('./img');
	}

});
fs.createReadStream('logo.png').pipe(fs.createWriteStream('/Users/zhouxiaofan/Downloads/1-logo.png'));

// '/Users/zhouxiaofan/Downloads'