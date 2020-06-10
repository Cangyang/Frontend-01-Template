# 第九周学习总结

	## 0604学习总结 | CSS动画

1、Animation

* @keyframes定义(关键帧)

* animation使用

  ```
  @keyframes mykf {
  	from {background: red;}
  	to {background: yellow;}
  }
  div{
  	animation:mykf 5s infinite;
  }
  ```

* animation常用属性
  * animation-name 时间曲线
  * animation-duration 动画的时长
  * animation-timing-function 动画的时间曲线
  * animation-delay 动画开始前的延迟
  * animation-iteration-count 动画的播放次数
  * animation-direction 动画的方向

```
@keyframes mykf {
	0% {top: 0;transition: top ease}
	50% {top: 30px;transition: top ease-in}
	75% { top: 10px;transition: top ease-out}
	100% { top: 0;transition: top linear}
}
```

2、Transition

* transition使用
  * transition-property 要变换的属性
  * transition-duration 变换的时长
  * transition-timing-function 时间曲线
  * transition-delay 延迟
* timing-function
  * cubic-bezier
    * X-time
    * Y-progression（percent）
    * start control point
    * end control point
  * cubic-bezier inherited
    * ease
    * linear
    * ease-in
    * ease-out
    * ease-in-out
    * user defines

3、贝塞尔曲线

* 一次贝塞尔曲线
  * P1出发直线到达P2，时序0到1
* 二次贝塞尔曲线
  * P0出发，满足顶点P1的控制，最终到达P2，时序0到1
* 三次贝塞尔曲线
  * 起点P0，终点P3，俩个控制点P1和P2

4、渲染与颜色

* 颜色

  * y颜色表示体系：
    * CMYK与RGB
    * HSL与HSV
      * Hue、Saturation、Lightness
      * Hue、Saturation、Value

* 形状

  * border
  * box-shadow
  * border-radius
  * data uri + svg

  ```
  data:image/svg+xml,<svg width="100%" height="100%" version="1.1" 
  xmlns="http://www.w3.org/2000/svg"><ellipse cx="300" cy="150" rx="200" ry="80" style="fill:rgb(200,100,50);stroke:rgb(0,0,100);stroke-width:2" /></svg>
  ```

  作业

  ```
  空白页面 getComputedStyle(document.body) 得到CSS的属性整理成脑图
  ```

  

## 0606 学习总结 | 重学HTML

1、HTML的定义

脱胎于SGML，发展于XML（namespace替代了SGML的DTD）

* https://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd

  * Character mnemonic entities

  ```
  <!ENTITY quot    "&#34;"> <!--  quotation mark, U+0022 ISOnum -->
  <!ENTITY amp     "&#38;#38;"> <!--  ampersand, U+0026 ISOnum -->
  <!ENTITY lt      "&#38;#60;"> <!--  less-than sign, U+003C ISOnum -->
  <!ENTITY gt      "&#62;"> <!--  greater-than sign, U+003E ISOnum -->
  ```

  

* https://w3.org/1999/xhtml

2、HTML标签-语义

* aside
* main
  * article
    * hgroup
      * h1 h2
    * div
      * abbr
    * nav
      * h3
      * ol
        * li(可以嵌套ol )
    * section
      * samp
        * pre
      * figure
        * img
        * figcaption
      * dfn 术语定义
      * cite被引用文章名字（quote被引用文章内容）
      * time
      * address
    * dl（ol、ul）
      * dt（defination term）
      * dd（defination description）

3、HTML语法

合法元素

* Element
* Text
* Comment
* DocumentType <!DOCTYPE html>
* ProcessingInstruction <? a 1?>
* CDATA <![CDATA[]]>

字符引用

* &#161
* `&amp;`
* `&lt;`
* `&quot;`

4、重学DOM

Node

* Element
  * HTMLElement
    * HTMLAnchorElement
    * HTMLAppletElement
    * HTMLAreaElement
    * HTMLAudioElement
    * HTMLBaseElement
    * HTMLBodyElement
    * ...
  * SVGElement
    * SVGAElement
    * SVGAltGlyphElement
* Document 文档根节点
* CharacterData 字符数据
  * Text
  * Comment
  * ProcessingInstructor 处理信息
* DocumentFrament 文档片段
* DocumentType

5、导航类操作

* parentNode
* childNodes
* firstChild
* lastChild
* nextSibling
* previousSibling

6、修改类操作

* appendChild
* insertBefore
* removeChild
* replaceChild

7、高级操作

* compareDocumentPosition 比较俩个节点中关系的函数
* contains 检查一个节点是否包含另一个节点
* isEqualNode 检查俩个节点是否完全相同
* isSameNode 检查俩个节点是否是同一个节点
* cloneNode 复制一个节点，穿过传入参数true，则会连同元素进行深拷贝

```
while(x.children.length){
	b.appendChild(x.children[0])
}
```

8、Event 事件

target.addEventListener(type,handler , [capture])

```
<div id="a" style="width:100%;height:300px;background-color:lightblue;">
	<div id="b" style="width:100%;height:200px;background-color:pink;"></div>
</div>

<script>
var a = document.getElementById("a");
var a = document.getElementById("b");
// 捕获过程
a.addEventListener("click", ()=>console.log("a"),true);
b.addEventListener("click", ()=>console.log("b"),true);
// 冒泡过程
a.addEventListener("click", ()=>console.log("a2"),false);
b.addEventListener("click", ()=>console.log("b2"),false);
</script>
```

