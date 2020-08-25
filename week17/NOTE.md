# 第十七周学习总结

## 0730第一次课总结

## 0801第二次课总结

* 工具

  * jenkins
  * git
  * webpack
  * travis
  * babel
  * eslint
  * gulp
  * create-react-app
  * umi
  * gitlab
  * vscode
  * mocha
  * http-server
  * rollup
  * vue-cli
  * husky
  * prettier
  * axios
  * yeoman
  * postman
  * dvajerna
  * jest
  * easymock
  * swagger
  * wireshark
  * charles

* 闭包递归

  ```
  (g =>
  	(f => f(f))(
  		self =>
  			g((...args) => self(self).apply(this, args))
  ))(
  	self => {
  		return n => n > 0 ? self(n - 1) + n : 0
  })(100)
  
  
  var y = g =>
  	(f => f(f))(
  		self =>
  			g((...args) => self(self).apply(this, args))
  )
  let f = y(self => {
  		return n => n > 0 ? self(n - 1) + n : 0
  })
  f(100)
  ```

  * Node ttys
  
    ```
    
    var tty = require('tty');
    var ttys = require('ttys');
    var readline = require('readline');
    
    var stdin = ttys.stdin;
    var stdout = ttys.stdout;
    
    const rl = readline.createInterface({
    	input: process.stdin,
    	output: process.stdout
    });
    
    async function ask(question){
    	return new Promise((resolve, reject) => {
    		rl.question(question, (answer) => {
    			resolve(answer);
    			rl.close();
    		});
    	})
    }
    
    void async function(){
    	console.log(await ask("your project name?"));
    }();
    
    ```
  
    