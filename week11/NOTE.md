# 第十一周学习总结

## 0618学习总结 | 异步编程

1、红绿灯问题

一个路口的红绿灯，会按照绿灯亮10秒，黄灯亮2秒，红灯亮5秒的顺序无限循环，编写JS代码来控制这个红绿灯。

* 传统setTimeout
* 异步promise
* 异步async
* yield与generator

2、寻路问题



## 0620学习总结 | 正则表达式

1、正则相关的API

* match

  ```
  "[a=value]".match(/\[([^=]+)=([^\]]+)\]/)
  ```

* replace

  ```
  "abc".replace(/a(b)c/, function(str, $1){
  	console.log(str, $1);
  	return $1 + $1;
  });
  
  "abc".replace(/a(b)c/, "$1$1");
  ```

  

2、分组捕获与不捕获

* ()捕获
* (?:)不捕获

3、正则RegExp中的方法

* exec
* lastIndex