var ball1=document.querySelector('.ball1');
var ball2=document.querySelector('.ball2');
var ball3=document.querySelector('.ball3');
var Promise=window.Promise;

var promiseAni=(ball,distance)=>{
	// resolve和reject是什么？
	return new Promise((resolve,reject)=>{
		//表示私有
		function _animat(){
			setTimeout(function(){
				var marginLeft=parseInt(ball.style.marginLeft,10);
				if(marginLeft===distance){
					resolve && resolve();
				}
				else{
					if(marginLeft<distance){
						marginLeft++;
					}
					else{
						marginLeft--;
					}
					// 需要加上px，这种设置只对内联样式有用
					ball.style.marginLeft=marginLeft+"px";
					_animat();
				}
			},13);
		}
		_animat();
	});
}
promiseAni(ball1,100).then(function(){
	return promiseAni(ball2,200);
}).then(function(){
	return promiseAni(ball3,200);
}).then(function(){
	return promiseAni(ball3,50);
}).then(function(){
	return promiseAni(ball2,50);
}).then(function(){
	return promiseAni(ball1,50);
});