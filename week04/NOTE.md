# 第4周学习总结

===

# 0430学习总结

1、事件循环 任务队列

事件循环是属于浏览器内容

OC语言中的JavaScriptCore

```
#import <Foundation/Foundation.h>
#import <JavaScriptCore/JavaScriptCore.h>

int main(int argc, const char * argv[]){
	@autoreleasepool {
		JSContext* context = [[JSContext alloc] init];
		JSValue* result;
		// 事件循环在这里
		while(true){
			char sourcecode[1024];
			scanf("%s", &sourcecode);
			NSString* code = [NSString stringWithUTF8String:sourcecode];
			result = [context evaluateScript:code];
			NSLog(@"%@", [code toString]);
			//break;
		}
		
		// 接受一个函数
		NSString* code = @"(function(x){ return x * x})";
		result = [context evaluateScript:code];
		JSValue* arg1 = [JSValue valueWithInt32:4 inContext:context];
		NSLog(@"%@", [[result callWithArguments:@[arg1]] toString]);
		
		// 接受Promise
		NSString* code = @"new Promise(resolve => resolve()).then(() => this.a = 3), function(){return this.a};";
		result = [context evaluateScript:code];
		NSLog(@"%@", [[result callWithArguments:@[]] toString]);
	}
	return 0;
}
```

2、宏任务与微任务

Task

3、逗号表达式

永远输出逗号右边的值

```
new Promise(resolve => resolve())
.then(() => this.a = 3), function(){return this.a};
```

4、理解Promise

```
// 例子1
function fn(resolve){
	setTimeout(function(){
		resolve(123);
	}, 3000)
}
let p0 = new Promise(fn);
let p1 = Promise.resolve(p0);
console.log(p0 === p1);

// 例子2
const promise1 = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('success')
	}, 1000)
})
const promise2 = promise1.then(() => {
	throw new Error('error!');
})
console.log('promise1', promise1);
console.log('promise2', promise2);
setTimeout(() => {
	console.log('promise1', promise1);
	console.log('promise2', promise2);
}, 2000)


// 例子3
async function afoo(){
	console.log("-2")
	
	await new Promise(resolve => resolve());
	console.log("-1")
}

new Promise(resolve =>(console.log("0"), resolve())).then(() => (console.log("1"), new Promise(resolve => resolve()).then( () => console.log("1.5")) ));
setTimeout(function(){
	console.log("2")
	new Promise(resolve => resolve()).then(() => console.log("3"));
}, 0)

console.log("4")
console.log("5")
afoo()
```

例子3中

* 宏任务

  * 微任务 0 4 5 -2

  * 微任务 1
  * 微任务 -1
  * 微任务 1.5

* 宏任务

  * 微任务 2

  * 微任务 3

5、关于宏任务中执行后的undefined问题

```
setTimeout(function(){console.log("cool")}, (1+1));
new Promise(resolve => resolve()).then(() => console.log("cool")),(1+1)
```



