

function charToUTF8(code){
  // 1个字节，首位编码固定0
  // 剩余7位码点
  // 0000 0000-0000 007F | 0xxxxxxx 
  if (code <= 0x7F) {
    return [code]
  } 
  // 2个字节，其中第一个字节前3位固定110,其中第二个字节前2位固定10
  // 剩余11位码点
  // 0000 0080-0000 07FF | 110xxxxx 10xxxxxx 
  else if (code <= 0x7FF) {
    return [
      0xC0 | ((code >> 6) & 0x1F),
      0x80 | ((code) & 0x3F),
    ]
  } 
  // 3个字节，其中第一个字节前4位固定1110,其中后面俩个字节前2位固定10
  // 剩余16位码点
  // 0000 0800-0000 FFFF | 1110xxxx 10xxxxxx 10xxxxxx  
  else if (code <= 0xFFFF) {
    return [
      0xE0 | ((code >> 12) & 0xF),
      0x80 | ((code >>  6) & 0x3F),
      0x80 | ((code) & 0x3F)
    ]
  } 
  // 4个字节，其中第一个字节前5位固定11110,其中后面三个字节前2位固定10
  // 剩余21位码点
  // 0001 0000-0010 FFFF | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
  else if (code <= 0x1FFFFF){
    return [
      0xF0 | ((code >> 18) & 0x7),
      0x80 | ((code >> 12) & 0x3F),
      0x80 | ((code >>  6) & 0x3F),
      0x80 | ((code) & 0x3F)
    ]
  }
  // 5个字节，其中第一个字节前6位固定111110,其中后面四个字节前2位固定10
  // 剩余26位码点
  // 
  else if (code <= 0x3FFFFFF){
    return [
	  0xF0 | ((code >> 24) & 0x7),
      0x80 | ((code >> 18) & 0x3F),
      0x80 | ((code >> 12) & 0x3F),
      0x80 | ((code >>  6) & 0x3F),
      0x80 | ((code) & 0x3F)
    ]
  }
  // 6个字节，其中第一个字节前7位固定1111110,其中后面五个字节前2位固定10
  // 剩余31位码点
  // 
  else if (code <= 0x7FFFFFFF){
    return [
	  0xF0 | ((code >> 32) & 0x7),
      0x80 | ((code >> 24) & 0x3F),
      0x80 | ((code >> 18) & 0x3F),
      0x80 | ((code >> 12) & 0x3F),
      0x80 | ((code >>  6) & 0x3F),
      0x80 | ((code) & 0x3F)
    ]
  }
}
// Big endian 使用零宽非换行空格(ZWNBSP-ZERO WIDTH NO-BREAK SPACE) FEFF表示
function UTF8Encoding(str){
    // 使用循环的方式
	let codes = [];
	for(let s of str){
	    // 返回字符的Unicode码点值，默认十进制
		let code = s.codePointAt(0);
		codes.push(charToUTF8(code));
	}
	return test;
}
var s = "严";
var test = UTF8Encoding(s);
console.log(s+":"+test)
