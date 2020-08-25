import {createEle, Text, Wrapper} from './createEle';

export class Panel {
	constructor(config){
		this.children = [];
		this.attributes = new Map();
		this.properties = new Map();
		// this.root = document.createElement("div");
	}
	
	setAttribute(name, value){          // attribute
		this[name] = value;
		this.attributes.set(name, value);
	}
	
	mountTo(parent){
		// parent.appendChild(this.root);
		this.render().mountTo(parent);
	}
	appendChild(child){                 // children
		this.children.push(child);
	}
	
	render(){
		return <div class="panel" style="border: 1px solid lightgreen;width:300px;">
			<h1 style="background-color: lightgreen;width:300px;margin:0;">{this.attributes.get("title")}</h1>
			<div style="width:300px;min-height:300px;">
			{this.children}
			</div>
		</div>
	}
}