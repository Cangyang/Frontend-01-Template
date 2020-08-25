const parser = require("./parser");

module.exports = function(source) {
	let tree = parser.parseHTML(source);
	//console.log(tree.children[2]);
	//console.log("my loader is running!!!!!\r\n",this.resourcePath);
	
	let template = null;
	let script = null;
	for(let node of tree.children) {
		if(node.tagName == 'template'){
			template = node.children.filter(e => e.type != "text")[0];
		}
		if(node.tagName == 'script'){
			script = node.children[0].content;
		}
	}
	
	let createCode = "";
	let visit = (node, depth) => {
		// 跳过文本节点
		if(node.type === "text"){
			return JSON.stringify(node.content);
		}
		let attrs = {};
		for(let attribute of node.attributes){
			attrs[attribute.name] = attribute.value;
		}
		let children = node.children.map(node => visit(node));
		return `createEle("${node.tagName}", ${JSON.stringify(attrs)}, ${children})`;
	}
	
	
	let r = `
import {createEle, Text, Wrapper} from './createEle';
export class Carousel {
	
	setAttribute(name, value){          // attribute
		this[name] = value;
		console.log(name, value);
	}
	render(){
		return ${visit(template)};
	}
	mountTo(parent){
		// parent.appendChild(this.root);
		this.render().mountTo(parent);
	}
}
	`
	// console.log(r);
	return r;
}

