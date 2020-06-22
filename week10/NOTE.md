# 第十周学习总结

## 0611学习总结 | Range API

1、一个面试问题

把一个元素所有的子元素逆序

```
<div id="a">
	<span>1<span>
	<p>2</p>
	<a>3</a>
	<div>4</div>
</div>
<script>
let element = document.getElementById("a");
function reverseChildren(element) {
	let children = Array,prototype.slice.call(element.childNodes);
	children.reverse();
	for(let child of children){
		element.appendChild(child);
	}
	
}

function reverseChildren(element){
	var l = element.childNodes.length;
	while(l-- > 0){
		element.appendChild(element.childNodes[l]);
	}
}
reverseChildren(element);
</script>
```

2、Range API

* var range = new Range()
* range.setStart(element, 9)
* range.setEnd(element, 4)
* var range = document.getSelection.getRangeAt(0);
* range.setStartBefore
* range.setEndBefore
* range.setStartAfter
* range.setEndAfter
* range.SelectNode
* range.selectNodeContents
* var fragment = range.extractContents()
* range.insertNode(document.createTextNode("aaa"))

3、CSSOM

* document.styleSheets

4、CSS Rules

* document.styleSheets[0].cssRules
* document.styleSheets[0].insertRule("p {color:pink; }", 0)
* document.styleSheets[0].removeRule(0)
* 常见Rule
  * CSSStyleRule
    * selectorText String
    * style K-V结构
  * CSSCharsetRule
  * CSSImportRule
  * CSSMediaRule
  * CSSFontFaceRule
  * CSSPageRule
  * CSSNamespaceRule
  * CSSKeyframesRule
  * CSSKeyframeRule
  * CSSSupportsRule

5、getComputedStyle

* window.getComputedStyle(elt, pseudoElt);
  * elt 想要获取的元素
  * pseudoElt 可选，伪元素

6、一些窗口API

```
let childWindow = window.open("about:blank","_blank");
let childWindow = window.open("about:blank","_blank","width=100,height=100,left=100,top=100");
childWindow.moveBy(-50, -50);
childWindow.resizeBy(50, 50);
```

7、一些滚动API

```
window.scroll(left, top);
window.scrollBy(left, top);

Element页签选中元素，console可以使用$0代表选中元素
$0.scrollBy(0, 30);
$0.scrollHeight
```

8、元素一些相关属性

* getClientRects()

  $0.getClientRects()[0]（因为一个元素可能会有多个行盒，所以是数组）

* getBoundingClientRect()

  $0.getBoundingClientRect()

9、一些其他属性

* window.innerHeight（视口）
  * document.documentElement.getBoundingClientRect();
* window.innerWidth（视口）
  * document.documentElement.getBoundingClientRect();
* window.outerHeight
* window.outerWidth
* window.devicePixelRatio（一个物理像素代表几个逻辑像素）

10、浏览器的所有API

## 0613学习总结 | 编程与算法训练 | TicTacToe/井字棋

1、规则

* 棋盘：3x3方格
* 双方分别持有圆圈和叉俩种棋子
* 双方交替落子
* 率先连成三子直线的一方获胜