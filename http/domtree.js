// 树的深度遍历
// 每个节点先处理自己，然后找到第一个子节点，然后对子节点进行深度遍历
// 一直找到兄弟节点，如果兄弟节点存在就遍历并且再找，一直到不存在就停止

var walk_the_DOM=function(node,callback){
	callback(node);
	node = node.firstChild;
	while(node){
		walk_the_DOM(node,callback);
		node=node.nextSibling;
	}
}

var getElementsByAttribute=function(att,value){
	var results=[];
	walk_the_DOM(document.body,function(node){
		var actual=node.nodeType===1&&node.getAttibute(att);
		if(typeof actual==='string'&&
			(actual===value||typeof value!=='string')){
			results.push(node);
		}
	});
	return results;
}