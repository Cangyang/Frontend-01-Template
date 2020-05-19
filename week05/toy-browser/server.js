const http = require("http");

const server = http.createServer((req,res) => {
	//console.log("request received");
	console.log(req.headers);
	//console.log(req);
	res.setHeader('Content-Type', 'text/html');
	res.setHeader('X-Foo', 'bar');
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end(
`<html mata=a>
<head>
	<style>
body div #myid{
	width: 100px;
	background-clolor: #ff5000;
}
body div img{
	width: 30px;
	background-clolor: #ff1111;
}
	</style>
</head>
<body>
	<div>
		<img id="myid" /> 
		<img />
	</div>
</body>
</html>`);
});

server.listen(8099);