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