function a1(s){
	console.log(s);
}

function a2(callback,s){
	s+=" hhh";
	callback(s);
}


var srvSocket = net.connect(srvUrl.port, srvUrl.hostname, () => {
    cltSocket.write('HTTP/1.1 200 Connection Established\r\n' +
                    'Proxy-agent: Node.js-Proxy\r\n' +
                    '\r\n');
    srvSocket.write(head);
    srvSocket.pipe(cltSocket);
    cltSocket.pipe(srvSocket);
  });

var a2 = a1("abc",()=>{
	a2()
});
a2(a1,"abc");