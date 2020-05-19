# 第六周学习总结

---

## 0514学习总结 | 浏览器工作原理

### 有限状态机

* 每一个状态都是一个机器
  * 每一个机器里可以处理任何想处理的事情，比如计算、存储、输出
  * 所有的机器接受的输入数据结构是一致的
  * 状态机的每一个机器本身没有状态。如果用函数表示的话，应该是纯函数，无副作用，无其他依赖
* 每一个机器知道下一个状态
  * 每个机器都有确定的下一个状态(Moore)
  * 每个机器根据输入决定下一个状态(Mealy)平常经常使用

### 有限状态机处理字符串

在一个字符串中，找到字符" a"

```

function stateMachineA(str){
	let STATE_BEGIN = 0;
	let STATE_FOUND_SPACE = 1;
	let STATE_FOUND_A = 2;
	let STATE_FOUND_END = 3;
	
	let STATE_CURRENT = STATE_BEGIN;
	let result = false;
	for(let i = 0; i < str.length; i ++){
		if(STATE_CURRENT === STATE_BEGIN){
			if(str.charAt(i) === ' '){
				STATE_CURRENT = STATE_FOUND_SPACE;
			}
		}
		else if(STATE_CURRENT === STATE_FOUND_SPACE){
			if(str.charAt(i) === 'a'){
				STATE_CURRENT = STATE_FOUND_A;
			}else{
				STATE_CURRENT = STATE_BEGIN;
			}
		}
		else if(STATE_CURRENT === STATE_FOUND_A){
			STATE_CURRENT = STATE_FOUND;
		}
		else if(STATE_CURRENT === STATE_FOUND_END){
			result = true;
			break;
		}
	}
	return result;
}
```

在一个字符串中，找到字符"ab"

```
function stateMachineAB(str){
	let STATE_BEGIN = 0;
	let STATE_FOUND_A = 1;
	let STATE_FOUND_B = 2;
	let STATE_FOUND_END = 3;
	let STATE_CURRENT = STATE_BEGIN;
	let result = false;
	for(let i = 0; i < str.length; i ++){
		if(STATE_CURRENT === STATE_BEGIN){
			if(str.charAt(i) === 'a'){
				STATE_CURRENT = STATE_FOUND_A;
			}
		}
		else if(STATE_CURRENT === STATE_FOUND_A){
			if(str.charAt(i) === 'b'){
				STATE_CURRENT = STATE_FOUND_B;
			}else{
				STATE_CURRENT = STATE_BEGIN;
			}
		}
		else if(STATE_CURRENT === STATE_FOUND_B){
			STATE_CURRENT = STATE_FOUND_END;
		}
		else if(STATE_CURRENT === STATE_FOUND_END){
			result = true;
			break;
		}
	}
	return result;
}
```

### JS中的有限状态机（Mealy）

```
// 每个函数是一个状态
function state(input){
	// 自由编写代码，处理每个状态的逻辑
	return nextState; // 返回下一个状态
}

// 调用
while(input){
	// 获取输入
	state = state(input); // 状态机的返回作为下一个状态
}
```

### 如何使用状态机处理诸如“abcabx”的字符串查找

使用状态不回到start而是回到某个中间状态的小技巧

```
// test use 'abcabcabx'
function stateMachineABCABX(str){
	let STATE_BEGIN = 0;
	let STATE_FOUND_A = 1;
	let STATE_FOUND_B = 2;
	let STATE_FOUND_C = 3;
	let STATE_FOUND_A2 = 4;
	let STATE_FOUND_B2 = 5;
	let STATE_FOUND_X = 6;
	let STATE_FOUND_END = 7;
	
	let STATE_CURRENT = STATE_BEGIN;
	let result = false;
	for(let i = 0; i < str.length; i ++){
		if(STATE_CURRENT === STATE_BEGIN){
			if(str.charAt(i) === 'a'){
				STATE_CURRENT = STATE_FOUND_A;
			}
		}
		else if(STATE_CURRENT === STATE_FOUND_A){
			if(str.charAt(i) === 'b'){
				STATE_CURRENT = STATE_FOUND_B;
			}else {
				STATE_CURRENT = STATE_BEGIN;
			}
		}
		else if(STATE_CURRENT === STATE_FOUND_B){
			if(str.charAt(i) === 'c'){
				STATE_CURRENT = STATE_FOUND_C;
			}else {
				STATE_CURRENT = STATE_BEGIN;
			}
		}
		else if(STATE_CURRENT === STATE_FOUND_C){
			if(str.charAt(i) === 'a'){
				STATE_CURRENT = STATE_FOUND_A2
			}else {
				STATE_CURRENT = STATE_BEGIN;
			}
		}
		else if(STATE_CURRENT === STATE_FOUND_A2){
			if(str.charAt(i) === 'b'){
				STATE_CURRENT = STATE_FOUND_B2
			}else {
				STATE_CURRENT = STATE_BEGIN;
			}
		}
		else if(STATE_CURRENT === STATE_FOUND_B2){
			if(str.charAt === 'x'){
				STATE_CURRENT = STATE_FOUND_X;
			}else {
				// 这里注意不能直接回到start，存在'abcabcabx'的情况
				if(str.charAt === 'c'){
					STATE_CURRENT = STATE_FOUND_C;
				}else {
					STATE_CURRENT = STATE_BEGIN;
				}
				
			}
		}
		else if(STATE_CURRENT === STATE_FOUND_X){
			STATE_CURRENT = STATE_FOUND_END;
			result = true;
			break;
		}
	}
	return result;
}
```

### 作业：使用状态机处理 'abababx'

```
// for test 'ababababx'
// for test 'abababababx'
// for test 'ab...abababx'
function stateMachineABABABX(str){
	let STATE_BEGIN = 0;
	let STATE_FOUND_A = 1;
	let STATE_FOUND_B = 2;
	let STATE_FOUND_A2 = 3;
	let STATE_FOUND_B2 = 4;
	let STATE_FOUND_A3 = 5;
	let STATE_FOUND_B3 = 6;
	let STATE_FOUND_X = 7;
	let STATE_FOUND_END = 8;
	
	let STATE_CURRENT = STATE_BEGIN;
	let result = false;
	for(var i = 0; i < str.length; i ++){
		if(STATE_CURRENT === STATE_BEGIN){
			if(str.charAt(i) === 'a'){
				STATE_CURRENT = STATE_FOUND_A;
			}
		}
		else if(STATE_CURRENT === STATE_FOUND_A){
			if(str.charAt(i) === 'b'){
				STATE_CURRENT = STATE_FOUND_B;
			}else {
				STATE_CURRENT = STATE_BEGIN;
			}
		}
		else if(STATE_CURRENT === STATE_FOUND_B){
			if(str.charAt(i) === 'a'){
				STATE_CURRENT = STATE_FOUND_A2;
			}else {
				STATE_CURRENT = STATE_BEGIN;
			}
		}
		else if(STATE_CURRENT === STATE_FOUND_A2){
			if(str.charAt(i) === 'b'){
				STATE_CURRENT = STATE_FOUND_B2;
			}else {
				STATE_CURRENT = STATE_BEGIN;
			}
		}
		else if(STATE_CURRENT === STATE_FOUND_B2){
			if(str.charAt(i) === 'a'){
				STATE_CURRENT = STATE_FOUND_A3;
			}else {
				STATE_CURRENT = STATE_BEGIN;
			}
		}
		else if(STATE_CURRENT === STATE_FOUND_A3){
			if(str.charAt(i) === 'b'){
				STATE_CURRENT = STATE_FOUND_B3;
			}else {
				STATE_CURRENT = STATE_BEGIN;
			}
		}
		else if(STATE_CURRENT === STATE_FOUND_B3){
			if(str.charAt(i) === 'x'){
				STATE_CURRENT = STATE_FOUND_X;
			}else {
				// 注意这里回退的状态，回退到最近的上一个模式串结束位置
				if(str.charAt(i) === 'a'){
					STATE_CURRENT = STATE_FOUND_A3;
				} else {
					STATE_CURRENT = STATE_BEGIN;
				}
			}
		}
		else if(STATE_CURRENT === STATE_FOUND_X){
			STATE_CURRENT = STATE_FOUND_END;
			result = true;
			break
		}
	}
	return result;
}
```

### HTML的解析

1、解析BODY的HTML

* 为了方便文件管理，把parser单独拆到文件中
* parser接受HTML文本作为参数，返回一颗DOM树

2、创建状态机解析HTML

* 使用有限状态机FSM实现HTML的分析
* 在HTML标准中，已经规定了HTML的状态
* 只挑选其中一部分，完成最简单的一个版本

3、解析标签

* 主要的标签有： 开始标签、i二叔标签和自封闭标签
* 此步骤暂时忽略属性

4、创建元素

* 在状态机中，除了状态迁移，还会加入业务逻辑
* 标签结束状态提交标签token(调用emit)

5、处理属性

* 属性值分为单引号、双引号、无引号三种写法，因此需要较多状态处理
* 处理属性的方式跟标签类似
* 属性结束时，把属性加到标签Token上

6、构造DOM树

* 从标签构建DOM树的基础技巧是使用栈
* 遇到开始标签是创建元素并入栈，遇到结束标签是出栈
* 自封闭节点可以视为入栈后立刻出栈
* 任何元素的父元素是它入栈前的栈顶元素

7、处理文本节点

* 文本节点于自封闭标签处理类似
* 多个文本节点需要合并

---

## 0516学习总结 |CSS计算，排版,渲染，合成

0、CSS标准

* https://www.w3.org/TR/CSS2/

1、收集CSS规则

* 遇到style标签时，把CSS规则保存起来
* 调用CSS Parser分析CSS规则
* 需要了解CSS解析形成AST后的格式

2、添加调用

* 创建一个元素后，立即计算CSS
* 理论上，分析一个元素时，所有CSS规则已经收集完毕
* 真实浏览器中，可能遇到写在body的style标签，需要重新CSS计算，这里暂且忽略(CSS重排、重绘)

3、获取父元素序列

* 在computeCSS函数中，必须知道元素的所有父元素才能判定元素与规则是否匹配
* 从上一步骤中的stack，可以获取本元素所有的父元素
* 因为首先获取的是“当前元素”，所以获得和计算父元素匹配的顺序是从内到外

4、拆分选择器

* 选择器也要从当前元素向外排列
* 复杂选择器拆成针对单个元素的选择器，用循环匹配父元素队列

5、计算选择器与元素匹配

* 根据选择器的类型和元素属性，计算是否与当前元素匹配
* 暂时只实现三种基本选择器，实际浏览器中要处理复合选择器
* 作业：实现复合选择器，实现支持空格的Class选择器

6、生成computed属性

* 一旦选择匹配，就应用选择器到元素上，形成computedStyle







### 小知识：CSS Selector Types

The following list of selector types increases by **specificity**

1、Type selectors

2、Class selectors

3、ID selectors

CSS元素样式优先级问题

我们使用一个四元组【tagNameNum,classNum,IDNum,styleInlineNum】乘以一个基数base来计算CSS优先级的数值