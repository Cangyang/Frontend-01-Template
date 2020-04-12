# 第一周学习总结
===
# 4.9 前端技术知识图谱
 * API
   * Browser
      * DOM
	     * Nodes
		 * Ranges
		 * Events
	  * BOM
   * Node
   * Electron
   * 小程序
 * HTML
   * HTML as 通用的计算机语言
      * 语法
	  * 此法
   * HTML as SGML
      * DTD
	  * Entity
   * HTML as XML
      * Namespace
	    * svg
		* mathml
		* aria
	  * Tag
	    * seek road
		  1、MDN
		  2、html spec
		* Tag list
 * Javascript
    * Grammar
	  * Lex
		* InputElement
		  * Whitespace
		  * LineTerminator
		  * Comment
		  * Token
		    * Identifier
			* Keywords
			* Punctuator
			* NumericLiteral
			* StringLiteral
			* RegularExpressionLiteral
			* Template
	  * Syntax
	    * Atom
		* Expression
		* Structure
		* Script & Module
	    
	* Semantics
    * Runtime
	    * Type
		  * Number
		  * String
		  * Boolean
		  * Null
		  * Undefined
		  * Object
		  * Symbol
		  * 内部类型
		    * Reference
			* Completion Record
			* ...
		* 执行过程
		    * eg: Job
			  * Script/Module
			    * Promise
				   * Function
				     * Statement
					   * Expression
					      * Literal
						  * Identifier
	
 * CSS
    * 语法/词法
	* W3C spec
	* @规则
	* 普通规则
	  * 选择器
	    * 简单选择器
		  * class
		  * id
		  * tagname
		  * \\*
		  * [attr=v]
		* 复合选择器
		* 复杂选择器
		* 选择器列表
	  * Property
	  * Value
	* 机制
	  * 排版
	  * 伪元素
	  * 动画
	  * 优先级
	  
# 4.11 前端与工程体系
  * 优秀的前端工程师
  
    1、掌握优秀的领域知识，并形成体系
	2、具备核心三大能力：编程能力、架构能力、工程能力
	3、潜力
	
  * 职业规划
  
  * 职业发展
  
    1、成长
	2、成就
	
	   * 业务型成就
	     业务目标(理解公司业务的核心目标)->技术方案(业务指标到技术指标的转化)->实施方案(确定实施目标、参与人)->结果评估(数据采集、数据报表)
	   * 技术难题
	     目标(公认的技术难点) -> 方案与实施(依靠扎实的编程能力、架构能力形成解决方案) -> 结果(问题解决)
	   * 工程型成就
	     目标(质量、效率) -> 方案与实施(规章制度、库、工具、系统) -> 结果(线上监控)
		 
	3、晋升
	
   * 数据驱动的思考方式
   
    目标(分析业务目标/定数据指标) -> 现状(采集数据/建立数据展示系统) -> 方案(设计技术方案/预估数据) -> 实施(小规模实验，推广全公司落地形成制度) -> 结果(统计最终效果，汇报)
   * 前端技能模型
   
    1、领域知识
    2、前端知识
    3、三大能力
	
       * 编程能力
	   * 架构能力
	     * 工具链
		 
		   1、工具链的作用
		   
		   2、工具的分类 (四大阶段：init -> run -> test -> publish)
		   
		      * 脚手架
			  * 本地调试
			  * 单元测试
			  * 发布
		   3、工具链体系的设计 
		   
		      * 版本问题
			  * 数据统计
		 * 持续集成
		 
		   1、客户端软件持续集成
		   
		      * Daily build
			  * BVT(Build Verification Test)
		   2、前端持续集成
		      * Check-in build
			  * Lint + Rule Check
		 * 技术架构
		 
		    1、客户端架构：解决软件需求规模带来的复杂性
			2、服务端架构：解决大量用户访问带来的复杂性
			3、前端架构：解决大量页面需求带来的重复劳动
			
			   * 库：有复用价值的代码(URL、AJAX、ENV)
			   * 组件： UI上多次出现的元素
			   * 模块： 经常被使用的业务区块
			   
	   * 工程能力	