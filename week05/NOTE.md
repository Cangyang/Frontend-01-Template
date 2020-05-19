# 第五周学习总结

---

## 0507学习总结 - 结构化程序设计

### JS执行粒度

* JS Context => Realm

  有一套内置对象

  global object

  ​	18.1 Value Properties of the Global Object

  ​	18.2 Function Properties of the Global Object

  ​	18.3 Constructor Properties of the Global Object

  ​	18.4 Other Properties of the Global Object

* 宏任务

* 微任务（Promise）

* 函数调用（Execution Context）

  ```
  function foo(){
  	var x = 1;
  	console.log(x)
  }
  export foo;
  ```

  ```
  import {foo} from "foo.js"
  var i = 0;
  console.log(i)
  foo();
  console.log(i);
  i++;
  ```

  Execution Context Stack

  Execution Context ......  Running Execution Context

  **Execution Context**

  * code evaluation state

  * Function

  * Script or Module

  * Generator

  * Realm

    在JS中，函数表达式和对象直接量均会创建对象

    使用. 做隐式转换也会创建对象

    这些对象也是有原型的，如果我们没有Realm，就不知道它们的原型是什么。

  * LexicalEnvironment

    * this
    * new.target
    * super
    * 变量

  * VariableEnvironment

    * 仅用于处理var声明
    * {let y = 2; eval('var x=1;'); }
    * with({a:1}){ eval('var x;'); }

  * Environment Record

    Environment Records

    * Declarative Environment Records
      * Function Environment Records
      * module Environment Records
    * Global Environment Records
    * Object Environment Records

* 语句/声明

* 表达式

* 直接量/变量/this

### JS中闭包Closure的原理

```
var y = 2;
function foo2(){
	console.log(y);
}
export foo2;
```

```
Function:foo2
	Environment Record:
		y:2
	Code:
		console.log(y);
```

---

```
var y = 2;
function foo2(){
	var z = 3;
	return () => {
		console.log(y,z);
	}
}
var foo3 = foo2();
export foo3;
```

```
Function:foo3
	Environment Record:    =>   | Environment Record:
			z:3				  |   y:2
			this:global        |
	Code:                       |___________________
		console.log(y,z);
```

---

## 0509学习总结 - 浏览器工作原理

### 浏览器干了什么

​        http          parse    css computing        layout                          render

URL  => HTML => DOM => DOM with CSS => DOM with position => Bitmap

### ISO-OSI七层网络模型

### node中的net库学习

* net.Socket()

### request的组成

POST  /  HTTP/1.1

Host: 127.0.0.1

Content-Type: application/x-www-form-urlencoded

/r/n

field1=xxx&field2=xxx

### response的组成

HTTP/1.1 200 OK

Content-Type: text/html

Date: Mon, 23 Dec 2019 06:46:19 GMT

Connection: keep-alive

Transfer-Encoding: chunked

/r/n

Content....