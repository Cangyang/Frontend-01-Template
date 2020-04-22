# 第二周学习总结

## 0416总结

编程语言通识与Javscript语言设计
1、语言按照语法分类
* 非形式语言
  * 中文、英文
* 形式语言（乔姆斯基谱系）
  * 0型 无限制文法
  * 1型 上下文相关文法
  * 2型 上下文无关文法
    * Javascript 99%属性上下文无关
	* 大多数编程语言都属于该类型
  * 3型 正则文法
  
2、产生式(BNF)
* 用尖括号括起来的名称标识***语法结构名***
* 语法结构分成***基础结构***和需要用其他语法结构定义的***复合结构***
  * 基础结构称为***终结符*** 
  * 复合结构称为***非终结符***
* 引号和中间的字符表示终结符(symbol)
* 可以有括号
* `*`表示重复多次
* `|`表示或
* `+`表示至少一次

3、通过产生式理解乔姆斯基谱系
* 0型 无限制文法
  ? ::= ?
* 1型 上下文相关文法: "a" <b> "c" ::= "a" "x" "c"
  ?<A>? ::= ?<B>?
* 2型 上下文无关文法: 
  <A> ::= ?
* 3型 正则文法: 只允许左递归
  <A> ::= <A>?
  
4、其他产生式
* EBNF ABNF Customized
* Javscript ECMA-262 Grammar Summary
`
AdditiveExpression:
    MultiplicationExpression
	AdditiveExpression + MultiplicationExpression
	AdditiveExpression - MultiplicationExpression
`
  
5、现代语言的特例（1型？）
* C++中， * 可能表示乘号乘号或者指针，具体取决于星号前面的标识符是否被声明为类型
* VB中，< 可能是小于号，也可能是XML直接量的开始，取决于当前位置是否可以接受XML直接量
* python中，行首的tab符号和空格会根据上一行的行首空白以一定规则被处理成虚拟终结符indent或者dedent
* Javascript中，/ 可能是除号，也可能是正则表达式开头，处理方式类似VB

6、图灵完备性
* 命令式——图灵机
  * goto
  *if和while
* 声明式——lambda
  * 递归


7、动态与静态
* 动态
  * 在用户的设备/在线服务器上
  * 产品实际运行时
  * Runtiem
* 静态
  * 在程序员的设备上
  * 在产品开发时
  * Compiletime

8、类型系统
* 动态类型系统与静态类型系统
* 强类型与弱类型（有没有类型隐式转换）
* 复合类型
  * 结构体
  * 函数签名
* 子类型
  * 逆变/协变(继承)

9、一般命令式编程语言
* Atom
  * Identifier
  * Literal
* Expression
  * Atom
  * Operator
  * Punctuator
* Statement
  * Expression
  * Keyword
  * Punctuator
* Structure
  * Function
  * Class
  * Process
  * Namespace
* Program
  * Program
  * Module
  * Package
  * Library

10、随堂练习
* 练习1:定义一种语言只能由字符a和b组成
`
"a"
"b"
<Program> := <Program> "a"+ | <Program> "b"+
`

* 练习2:定义整数加法
`
<Number> := "0" | "1" | "2" | ... | "9"
<DecimalNumber> := "0" | {{"1" | "2" | ... | "9"} <Number>+}
<Expression> := <DecimalNumber> "+" <DecimalNumber>
<Expression> := <Expression> "+" <DecimalNumber>

优化：
<Number> := "0" | "1" | "2" | ... | "9"
<DecimalNumber> := "0" | {{"1" | "2" | ... | "9"} <Number>+}
<Expression> := <DecimalNumber> | <Expression> "+" <DecimalNumber>
`

* 练习3:带括号的四则运算
  * 四则运算：  1 + 2 * 3
  * 终结符：    Number、(+-*/)
  * 非终结符：  Mutiplication、AdditiveExpression
  * 要注意结合性和优先级
`
<Number> := "0" | "1" | "2" | ... | "9"
<DecimalNumber> := "0" | {{"1" | "2" | ... | "9"} <Number>+}
<PrimaryExpression> := <DecimalNumber> |
    "(" <logicalExpression> ")"
<MutiplicationExpression> := <DecimalNumber> |
    <MutiplicationExpression> "*" <DecimalNumber> |
	<MutiplicationExpression> "/" <DecimalNumber> 
<AddtiveExpression> := <MutiplicationExpression> |
    <AddtiveExpression> "+" <MutiplicationExpression> |
	<AddtiveExpression> "-" <MutiplicationExpression> 
<logicalExpression> := <AddtiveExpression> |
    <logicalExpression> "||" <AddtiveExpression>
	<logicalExpression> "&&" <AddtiveExpression>
`

## 0418总结

1、字符集
* ascii
* unicode 
  * 官网 https://home.unicode.org
  * 其他 https://www.fileformat.info/info/unicode/
  * 重点 `Blocks` `Category`
    * CJK 中日韩字符集Blocks U+4E00 ~ U+
	* BMP 基本字符平面
  * Category
    * Seperate and Space
	
2、词法
* InputElement
  * WhiteSpace
    * TAB     制表符        \t
	* VT      纵向制表符    \v
	* FF      Form Feed     \c
	* SP    
	* NBSP    no-break space 一般用在排版，有空格但不换行
	* ZWNBSP  Zero width no break space
	* USP
  * LineTerminator
    * Line Feed           \n
	* Carriage Return     \r
  * Comment
    * 单行注释
	* 多行注释
  * Token
	* Punctuator   符号
	* Keywords     
	
    * IdentifierName   标识符
	  * Identifier  属性名
	  * Keywords    变量名
	  * Future reserved Keywords: enum
	* Literal      直接量
	
	  * Number  
	    *IEEE 754 Double Float
	      * Sign         (1)
		  * Exponent     (11)
		  * Fraction     (52)
	    * DecimalLiteral
		* BinaryIntegerLiteral
		* OctallntegerLiteral
		* HexIntegerLiteral
		* Number-Pratictice
		  * Safe Integer    
		  * Float Compare   `Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON`
      
	  * String
	    * Character 
		  * `97 .toString(2)`
		  * ASCII
		  * Unicode
		  * UCS U+0000 - U+FFFF
		  * GB 国标
		    * GB2312
			* GBK(GBK13000)
			* GB18030
		  * ISO-8859
		  * BIG5
		* Code Point
		* Encoding
		  * UTF  UTF8、UTF16
		* Grammar
	  * Boolean
	  * null
	  * undefined