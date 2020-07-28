export function createEle(Cls, attributes, ...children){
	// 处理组件小写问题
	let o;
	if(typeof Cls === "string"){
		o = new Wrapper(Cls);
	} else {
		
		o = new Cls({timer:{}});
	}
	
	console.log(arguments);
	for(let name in attributes){
		// attribute == property ?
		//o[name] = attributes[name];
		o.setAttribute(name, attributes[name])
	}
	
	let visit = (children) => {
		for(let child of children){
			if(child){
				if(typeof child === "object" && child instanceof Array){
					visit(child);
					continue;
				}
				// 处理文字
				if(typeof child === "string"){
					child = new Text(child)
				}
				o.appendChild(child);
			}
		}
	}
	visit(children);
	
	return o;
}

export class Text {
	constructor(text){
		this.children = [];
		this.root = document.createTextNode(text);
	}
	mountTo(parent){
		parent.appendChild(this.root);
	}
}

export class Wrapper{
	constructor(type){
		this.children = [];
		this.root = document.createElement(type);
	}
	setAttribute(name, value){          // attribute
		this.root.setAttribute(name, value);
		console.log(name, value);
	}
	mountTo(parent){
		parent.appendChild(this.root);
		for(let child of this.children){
			child.mountTo(this.root);
			console.log("child:",child)
		}
	}
	appendChild(child){                 // children
		
		// this.root.appendChild(child);
		this.children.push(child);
		
	}
	addEventListener(){
		this.root.addEventListener(...arguments);
	}
	get style(){
		return this.root.style;
	}
}

export class MyComponent{
	constructor(config){
		this.children = [];
		// this.root = document.createElement("div");
	}
	setAttribute(name, value){          // attribute
		this.slot.setAttribute(name, value);
		console.log(name, value);
	}
	mountTo(parent){
		// parent.appendChild(this.root);
		this.slot = <div></div>;
		for(let child of this.children){
			this.slot.appendChild(child);
		}
		this.render().mountTo(parent);
	}
	appendChild(child){                 // children
		this.children.push(child);
		console.log("child:",this.children)
	}
	set class(v){                       // property
		console.log("Parent::class",v);
	}
	set id(v){                          // property
		console.log("Parent::id",v);
	}
	render(){
		
		return <article>
			<header>this is a header</header>
			{this.slot}
			<footer>this is a footer</footer>
		</article>
	}
}


