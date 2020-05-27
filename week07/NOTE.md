

# 第七周学习总结

---

## 0521 浏览器工作原理 | 排版

1、渲染的概念

Main Axis    Cross axis

flex-direction: row / column

Main: width x left right / height y top bottom

Cross: height y top bottom/ width x left right

2、收集元素进行（hang）

* 分行
  * 根据主轴尺寸，把元素分进行
  * 若设置了no-wrap，则强行分配进第一行

3、计算主轴

* 计算主轴方向
  * 找出所有flex元素
  * 把主轴方向的剩余尺寸按比例分配给这些元素
  * 若剩余空间为负数，所有flex元素width为0，等比压缩剩余元素

4、计算交叉轴

* 计算交叉轴方向
  * 根据每一行中最大元素尺寸计算行高
  * 根据行高flex-align和item-align，确定元素具体位置

5、绘制

* 绘制单个元素
  * 绘制需要依赖一个图形环境
  * 采用npm包images
  * 绘制在一个viewport上进行
  * 与绘制相关的属性：background-color、border、background-images等
* 绘制DOM

---

## 0523 重学CSS | 总论

1、CSS语法的研究

* CSS2.1的语法

  https://www.w3.org/TR/CSS21/grammar.html#q25.0

  https://www.w3.org/TR/css-syntax-3

* CSS总结结构

  * @charset
  * @import
  * rules
    * @media
    * @page
    * rule

* CSS轶事

  CDO、CDC指代`<!--` 和 `-->` ,因为古代浏览器不支持style标签，所有在style标签内使用html注释标签的格式来让CSS进行解析。

2、CSS @规则的研究

https://developer.mozilla.org/en-US/

3、CSS规则的结构

* 普通规则
  * Selector
    * https://www.w3.org/TR/selectors-3/
    * https://www.w3.org/TR/selectors-4/
  * Key
    * Properties
    * Variables: https://www.w3.org/TR/css-variables/（变量）
  * Value（各种单位）
    * https://www.w3.org/TR/css-values-4/

4、初建CSS知识体系

5、实验

* 收集CSS标准

```
var st = document.getElementById("container").children;
var cssStandard = [];
for(var li of st){
	if(li.getAttribute('data-tag').match(/css/)){
		cssStandard.push({
			name:li.children[1].innerText,
			link:li.children[1].children[0].href
		});
	}
}
JSON.stringify(cssStandard,null, "    ");
console.log(cssStandard);
```

```
let iframe = document.createElement("iframe");
document.body.innerHTML = "";
document.body.appendChild(iframe);

function happen(element, event){
	return new Promise(function(resolve){
		let handler = () => {
			resolve();
			element.removeEventListener(event, handler);
		}
		element.addEventListener(event, handler);
	});
}

void async function(){
	for(let standard of standards){
		iframe.src = standard.link;
		console.log(standard.name);
		await happen(iframe, "load");
	}
}();

```

