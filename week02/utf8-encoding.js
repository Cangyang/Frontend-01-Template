
function toUtf8(str){
	let result = [];
	for(var ch of str){
		let cha = ch.charCodeAt(0);
		if(cha <= 0x7F){
			result.push(cha);
		}else if(cha <= 0x7FF){
			result.push(0xC0|0x1F&(cha>>>6));
			result.push(0x80|0x3F&cha);
		}else if(cha <= 0xFFFF){
			result.push(0xE0|0x0F&(cha>>>12));
			result.push(0x80|0x3F&(cha>>>6));
			result.push(0x80|0x3F&cha);
		}else if(cha <= 0x1FFFFF){
			result.push(0xF0|0x07&(cha>>>18));
			result.push(0x80|0x3F&(cha>>>12));
			result.push(0x80|0x3F&(cha>>>6));
			result.push(0x80|0x3F&cha);
		}else if(cha <= 0x3FFFFFF){
			result.push(0xF0|0x0B&(cha >>> 24));
			result.push(0x80|0x3F&(cha >>> 18));
			result.push(0x80|0x3F&(cha >>> 12));
			result.push(0x80|0x3F&(cha >>> 6));
			result.push(0x80|0x3F&cha);
		}else if(cha <= 0x7FFFFFFF){
			result.push(0xF0|0x0D&(cha >>> 31));
			result.push(0x80|0x3F&(cha >>> 24));
			result.push(0x80|0x3F&(cha >>> 18));
			result.push(0x80|0x3F&(cha >>> 12));
			result.push(0x80|0x3F&(cha >>> 6));
			result.push(0x80|0x3F&cha);
		}
	}
	return Uint8Array.from(result);	
}
function bytesToHex(array){
	let result  = "";
	for(let i = 0; i < array.length; i ++){
		result += (array[i] & 0xFF).toString(16);
	}
	return '0x'+result;
}
function utf8ArrayToString(array){
	let result = "";
	for(let i = 0; i < array.length; i ++){
		let code = array[i];
		if(code >=0 && code <= 0x7F){
			code = 0x7F & code;
		}
		else if(code <= 0xDF){
			code = ((0x1F & array[i]) << 6) | (0x3F & array[++i]);
		}
		else if(code <= 0xEF){
			code = ((0x0F & array[i]) << 12) | ((0x3F & array[++i]) << 6) | (0x3F & array[++i]);
		}
		else if(code <= 0xF7){
			code = ((0x07 & array[i]) << 18) | ((0x3F & array[++i]) << 12) | ((0x3F & array[++i]) << 6) | (0x3F & array[++i]);
		}
		else if(code <= 0xFB){
			code = ((0x03 & array[i]) << 24) | ((0x3F & array[++i]) << 18) | ((0x3F & array[++i]) << 12) | ((0x3F & array[++i]) << 6) | (0x3F & array[++i]);
		}
		else if(code <= 0xFD){
			code = ((0x01 & array[i]) << 30) | ((0x3F & array[++i]) << 24) | ((0x3F & array[++i]) << 18) | ((0x3F & array[++i]) << 12) | ((0x3F & array[++i]) << 6) | (0x3F & array[++i]);
		}
		console.log('utf8ArrayToString:'+code .toString(2));
		let char = String.fromCharCode(code);
		result += char;
	}
	return result;
}
var s = "严";
var test = toUtf8(s);
console.log(s+":"+test)
