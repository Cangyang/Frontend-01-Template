const css =require("css");
// 解析CSS样式
let rules = [];
function addCSSRules(cs){
	var ast = css.parse(cs);
	//console.log(JSON.stringify(ast, null, "     "));
	rules.push(...ast.stylesheet.rules);
}

function computeCSS(element, father){
	// slice复制father元素，防止操作污染。reverse反转数组，按照CSS解析规则先从当前元素开始。
	//var elements = element.parent.slice().reverse();
	var elements = father.slice().reverse();
	// 添加计算属性
	if(!element.computedStyle){
		element.computedStyle = {};
	}
	for(let rule of rules){
		// "body div #myid"
		var selectorParts = rule.selectors[0].split(" ").reverse();
		// 当前元素不匹配第一条自身规则，直接跳过计算
		if(!match(element, selectorParts[0])){
			continue;
		}
		
		// 当前元素匹配第一条自身规则后，再继续与当前元素的父元素进行匹配映射
		var j = 1;
		for(var i = 0; i < elements.length; i ++){
			if(match(elements[i], selectorParts[j])){
				j ++;
				
			}
		}
		// 拆分之后的选择器都匹配到元素以及其父元素上了，说明组合选择器可以匹配到当前元素
		let matched =false;
		if(j >= selectorParts.length){
			matched = true;
		}
		if(matched) {
			// 匹配成功，计算元素上的CSS样式优先级
			var sp = specificity(rule.selectors[0]);
			// 匹配成功，添加computedStyle
			var computedStyle = element.computedStyle;
			for(var declaration of rule.declarations){
				if(!computedStyle[declaration.property]){
					computedStyle[declaration.property] = {};
				}
				if(!computedStyle[declaration.property].specificity){
					computedStyle[declaration.property].specificity = sp;
					computedStyle[declaration.property].value = declaration.value;
				}
				// 发生属性冲突，计算优先级比较后重新赋值
				else if(compare(computedStyle[declaration.property].specificity, sp) < 0){
					computedStyle[declaration.property].specificity = sp;
					computedStyle[declaration.property].value = declaration.value;
					
				}
				
				
			}
			// console.log("computedStyle:",computedStyle);
		}
	}
	// console.log("compute CSS for Element", element);
}

// 判断某条CSS的属性选择器是否匹配某个元素
// selector: "main>div.a#id[attr=value]"，使用正则表达式或状态机拆分开来
function match(element, selector){
	if(!selector || !element.attributes){
		return false;
	}
	// id选择器
	if(selector.charAt(0) == "#"){
		var attr = element.attributes.filter(attr => attr.name == "id")[0];
		if(attr && attr.value === selector.replace("#", "")){
			return true;
		}
	}
	// class类选择器
	// TODO 元素的多个class属性使用空格分割
	else if(selector.charAt(0) == "."){
		var attr = element.attributes.filter(attr => attr.name == "class")[0];
		if(attr && attr.value === selector.replace(".", "")){
			return true;
		}
	}
	
	// 标签选择器
	else {
		if(element.tagName === selector){
			return true;
		}
	}
	return false;
}

function specificity(selector){
	var p = [0, 0, 0, 0];
	var selectorParts = selector.split(" ");
	for(var part of selectorParts){
		if(part.charAt(0) == "#"){
			p[1] += 1;
		}
		else if(part.charAt(0) == "."){
			p[2] += 1;
		}
		else {
			p[3] += 1;
		}
	}
	return p;
}

function compare(sp1, sp2){
	if(sp1[0] - sp2[0]){
		return sp1[0] - sp2[0];
	}
	if(sp1[1] - sp2[1]){
		return sp1[1] - sp2[1];
	}
	if(sp1[2] - sp2[2]){
		return sp1[2] - sp2[2];
	}
	return sp1[3] - sp2[3];
}

module.exports = {
	addCSSRules : addCSSRules,
	computeCSS : computeCSS
}


















