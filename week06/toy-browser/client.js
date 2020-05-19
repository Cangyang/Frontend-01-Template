
const net = require("net");
const parser = require("./parser.js");

/* net.connect({
	host: "127.0.0.1",
	port: 8099,
	onread: {
		// Reuse a 4Kib Buffer for every read from the socket.
		buffer: Buffer.alloc(4 * 1024),
		callback: function(nread, buf) {
			// Received data is available in `buf` from 0 to `nread`
			console.log(buf.toString('utf8', 0, nread));
		}
	}
}); */

// const client = net.createConnection({
	// host: '127.0.0.1',
	// port: 8099
	// host: 'www.baidu.com',
	// port: 80
// }, () => {
	// console.log('connected to server.');
	// client.write('GET / HTTP/1.1\r\n');
	// client.write('Host: 10.8.6.4\r\n');
	// client.write('Content-Length: 23\r\n');
	// client.write('Content-Type: application/x-www-form-urlencoded\r\n');
	// client.write('\r\n');
	// client.write('field1=xxx&field2=xxx\r\n');
	
	// let request = new Request({
		// method: "GET",
		// host: "127.0.0.1",
		// port: 8099,
		// path: "/",
		// headers: {
			// "X-Foo": "test"
		// },
		// body: {
			// "name": "Alex"
		// }
	// });
	// console.log(request.toString());
	// client.write(request.toString());
// });

// client.on('data', (data) => {
	// console.log(data.toString());
	// client.end();
// });

// client.on('end', () => {
	// console.log('disconnected from server');
// });

// client.on('error', (err) => {
	// console.log(err);
	// client.end();
// });

class Request {
	// method, url = host + port + path
	// body: k/v
	// headers
	constructor(options){
		this.method = options.method || "GET";
		this.host = options.host;
		this.port = options.port || 80;
		this.path = options.path || "/";
		this.body = options.body || {};
		this.headers = options.headers || {};
		if(!this.headers["Content-Type"]){
			this.headers["Content-Type"] = "application/x-www-form-urlencoded";
		}
		if(this.headers["Content-Type"] === 'application/json'){
			this.bodyText = JSON.stringify(this.body);
		}
		else if(this.headers["Content-Type"] === 'application/x-www-form-urlencoded'){
			this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&');
		}
		this.headers["Content-Length"] = this.bodyText.length;
	}
	
	toString(){
		return `${this.method} ${this.path} HTTP/1.1\r\n
${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}
\r\n\r\n${this.bodyText}`
	}
	
	open(method, url){
		
	}
		
	send(connection){
		return new Promise((resolve, reject) => {
			const parser = new ResponseParser();
			if(connection){
				connection.write(this.toString());
			}else {
				connection = net.createConnection({
					host: this.host,
					port: this.port
				},() =>{
					connection.write(this.toString());
				});
			}
			// 服务端响应的处理,流式传输
			connection.on('data', (data) => {
				parser.receive(data.toString());
				if(parser.isFinished) {
					resolve(parser.getResponse());
				}
				// resolve(data.toString());
				//Object.keys(parser.headers).map(key => console.log(key+"="+parser.headers[key]));
				// 会产生400 Bad Request？
				// console.log(data.toString());
				connection.end();
			});
			connection.on('end', () => {
				console.log('disconnected from server');
			});
			connection.on('error', (err) => {
				reject(err);
				connection.end();
			});
		});
	}
}

class TrunkedBodyParser {
	constructor(){
		this.WAITING_LENGTH = 0;
		this.WAITING_LENGTH_LINE_END = 1;
		this.READING_TRUNK = 2;
		this.WAITING_NEW_LINE = 3;
		this.WAITING_NEW_LINE_END = 4;
		
		this.CURRENT_STATUS = this.WAITING_LENGTH;
		this.length = 0;
		// 性能原因使用数组而不是字符串
		this.content = [];
		this.isFinished = false;
	}
	receiveCharacter(char){
		// console.log("===="+JSON.stringify(char))
		if(this.CURRENT_STATUS === this.WAITING_LENGTH){
			if(char === '\r'){
				if(this.length === 0){
					this.isFinished = true;
				}
				this.CURRENT_STATUS = this.WAITING_LENGTH_LINE_END;
			}else {
				this.length *= 16;
				this.length += parseInt(char, 16);
			}
		}
		else if(this.CURRENT_STATUS === this.WAITING_LENGTH_LINE_END){
			if(char === '\n'){
				this.CURRENT_STATUS = this.READING_TRUNK;
			}
		}
		else if(this.CURRENT_STATUS === this.READING_TRUNK){
			if(this.length === 0){
				this.CURRENT_STATUS = this.WAITING_NEW_LINE;
			}else {
				this.content.push(char);
				this.length --;
			}
		}
		else if(this.CURRENT_STATUS === this.WAITING_NEW_LINE){
			if(char === '\r'){
				this.CURRENT_STATUS = this.WAITING_NEW_LINE_END;
			}
		}
		else if(this.CURRENT_STATUS === this.WAITING_NEW_LINE_END){
			if(char === '\n'){
				this.CURRENT_STATUS = this.WAITING_LENGTH;
			}
		}
	}	
}

class ResponseParser {
	constructor(){
		this.WAITING_STATUS_LINE = 0;
		this.WAITING_STATUS_LINE_END = 1;
		this.WAITING_HEADER_NAME = 2;
		this.WAITING_HEADER_SPACE = 3;
		this.WAITING_HEADER_VALUE = 4;
		this.WAITING_HEADER_LINE_END = 5;
		this.WAITING_HEADER_BLOCK_END = 6;
		this.WAITING_BODY = 7;
		
		this.CURRENT_STATUS = this.WAITING_STATUS_LINE;
		this.statusLine = "";
		this.headers = {};
		this.headerName = "";
		this.headerValue = "";
		this.bodyParser = null;
	}
	get isFinished() {
		return this.bodyParser && this.bodyParser.isFinished;
	}
	getResponse() {
		this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/);
		return {
			statusCode: RegExp.$1,
			statusDesc: RegExp.$2,
			headers: this.headers,
			body: this.bodyParser.content.join("")
		}
	}
	receive(string){
		for(let i = 0;i < string.length; i ++){
			let s = string.charAt(i);
			this.receiveCharacter(s);
			
		}
	}
	receiveCharacter(char){
		// 状态码
		if(this.CURRENT_STATUS === this.WAITING_STATUS_LINE){
			if(char === '\r'){
				this.CURRENT_STATUS = this.WAITING_STATUS_LINE_END;
			}else {
				this.statusLine += char;
			}
		}
		// 状态码结束
		else if(this.CURRENT_STATUS === this.WAITING_STATUS_LINE_END){
			if(char === '\n'){
				this.CURRENT_STATUS = this.WAITING_HEADER_NAME;
			}
		}
		// header name
		else if(this.CURRENT_STATUS === this.WAITING_HEADER_NAME){
			if(char === ':'){
				this.CURRENT_STATUS = this.WAITING_HEADER_SPACE;
			} else if(char === '\r'){
				this.CURRENT_STATUS = this.WAITING_HEADER_BLOCK_END;
			} else {
				this.headerName += char;
			}
		}
		// header value前的space
		else if(this.CURRENT_STATUS === this.WAITING_HEADER_SPACE){
			if(char === ' '){
				this.CURRENT_STATUS = this.WAITING_HEADER_VALUE;
			}
		}
		// header value
		else if(this.CURRENT_STATUS === this.WAITING_HEADER_VALUE){
			if(char === '\r'){
				this.CURRENT_STATUS = this.WAITING_HEADER_LINE_END;
				this.headers[this.headerName] = this.headerValue;
				this.headerName = this.headerValue = "";
			}else {
				this.headerValue += char;
			}
			//console.log(this.headers);
		}
		// header一行结束
		else if(this.CURRENT_STATUS === this.WAITING_HEADER_LINE_END){
			if(char === '\n'){
				this.CURRENT_STATUS = this.WAITING_HEADER_NAME;
			}
		}
		// header块结束
		else if(this.CURRENT_STATUS === this.WAITING_HEADER_BLOCK_END){
			if(char === '\n'){
				this.CURRENT_STATUS = this.WAITING_BODY;
				if(this.headers['Transfer-Encoding'] === 'chunked'){
					this.bodyParser = new TrunkedBodyParser();
				}
			}
		}
		// body
		else if(this.CURRENT_STATUS === this.WAITING_BODY){
			this.bodyParser.receiveCharacter(char);
		}
	}
}

// IIFE
void async function(){
	let request = new Request({
		method: "POST",
		host: "127.0.0.1",
		port: 8099,
		path: "/",
		headers: {
			"X-Foo": "test",
		},
		body: {
			"name": "Alex"
		}
	});
	console.log("=============request====================");
	console.log(request.toString());
	let response =  await request.send();
	console.log("==============response===================");
	console.log(response);
	let dom = parser.parseHTML(response.body);
	console.log("==============dom===================");
	// console.log(JSON.stringify(dom, null, " "));
}();

















