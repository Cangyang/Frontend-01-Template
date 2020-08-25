import {createEle, Text, Wrapper} from './createEle';

export class TabPanel {
	constructor(config){
		this.children = [];
		this.attributes = new Map();
		this.properties = new Map();
		// 记录当前tab切换的状态
		this.state = Object.create(null);
		// this.root = document.createElement("div");
	}
	
	setAttribute(name, value){          // attribute
		this[name] = value;
		this.attributes.set(name, value);
	}
	
	getAttribute(name){          // attribute
		return this[name];
	}
	
	mountTo(parent){
		// parent.appendChild(this.root);
		this.render().mountTo(parent);
	}
	appendChild(child){                 // children
		this.children.push(child);
	}
	
	select(i) {
		for(let view of this.childViews){
			view.style.display = 'none';
		}
		this.childViews[i].style.display = "";
		
		for(let view of this.titleViews){
			view.classList.remove("selected");
		}
		
		this.titleViews[i].classList.add("selected");
		
		
	}
	
	render(){
		this.childViews = this.children.map(child => <div style="width:300px;min-height:300px;">{child}</div>)
		this.titleViews = this.children.map((child, i) => <span onClick={() => this.select(i)} 
			style="background-color: lightgreen;margin: 5px 5px 0px 5px;font-size:24px;width:300px;min-height:300px;">{child.getAttribute("title")}</span>);
		// 每次刷新默认选择第一个tab
		setTimeout(() => this.select(0), 16);
		return <div class="panel" style="border: 1px solid lightgreen;width:300px;">
			<h1 style="width:300px;margin:0;">{this.titleViews}</h1>
			<div style="border: 1px solid lightgreen;">
			{this.childViews}
			</div>
		</div>
	}
}