import {createEle, Text, Wrapper} from './createEle';

export class ListView {
	constructor(config){
		this.children = [];
		this.attributes = new Map();
		this.properties = new Map();
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

	
	render(){
		let data = this.getAttribute("data");
		return <div class="list-view" style="width:300px;">
			{
				data.map(this.children[0])
			}
		</div>
	}
}