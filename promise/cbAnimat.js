// 小球动画，回调函数版，纯js
var ball1=document.querySelector('.ball1');
var ball2=document.querySelector('.ball2');
var ball3=document.querySelector('.ball3');

function animat(ball,distance,callback){
	setTimeout(function(){
		var marginLeft=parseInt(ball.style.marginLeft,10);
		if(marginLeft===distance){
			callback && callback();
		}
		else{
			if(marginLeft<distance){
				marginLeft++;
			}
			else{
				marginLeft--;
			}
			// 需要加上px，只对内联样式有用
			ball.style.marginLeft=marginLeft+"px";
			animat(ball,distance,callback);
		}
	},13);
}	
animat(ball1,100,function(){
	animat(ball2,200,function(){
		animat(ball3,300,function(){
			animat(ball3,150,function(){
				animat(ball2,150,function(){
					animat(ball1,150,function(){

					})
				})
			})
		})
	})
})