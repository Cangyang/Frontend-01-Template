
import {createEle, Text, Wrapper} from './createEle';

import {Carousel} from './carousel.view';

/**
class Carousel {
	constructor(config){
		this.children = [];
		this.attributes = new Map();
		this.properties = new Map();
		// this.root = document.createElement("div");
	}
	
	setAttribute(name, value){          // attribute
		this[name] = value;
		console.log(name, value);
	}
	
	mountTo(parent){
		// parent.appendChild(this.root);
		this.render().mountTo(parent);
	}
	appendChild(child){                 // children
		this.children.push(child);
		console.log("child:",this.children)
	}
	
	render(){
		let children = this.data.map( url => {
				let element = <img src={url}/>;
				element.addEventListener("dragstart", event => event.preventDefault());
				return element;
		});
		let root = <div class="carousel">
			{children }
		</div>
		
		let position = 0;
		
		let nextPic = () => {
			
			let nextPosition = (position + 1) % this.data.length;
			let current = children[position];
			let next = children[nextPosition];
			
			// 动画效果
			current.style.transition = "ease 0s";
			next.style.transition = "ease 0s";
			
			current.style.transform = `translateX(${ -100 * position}%)`;
			next.style.transform = `translateX(${100 -100 * nextPosition}%)`;
			
			// 此处亦可使用俩层requestAnimationFrame来实现
			setTimeout(function(){
				current.style.transition = ""; // "" means use css rule
				next.style.transition = "";
			
				current.style.transform = `translateX(${-100 -100 * position}%)`;
				next.style.transform = `translateX(${-100 * nextPosition}%)`;
				position = nextPosition;
			},16); // 16ms means 1000 / 60 , 现代屏幕刷新率1s60帧
			
			
			setTimeout(nextPic, 3000);
		}
		setTimeout(nextPic, 3000);
		
		
		return root;
	}
}
*/

// let component = <MyComponent id="a" class="b" style="width:100px;height:100px;background-color:lightgreen;">
	// <MyComponent></MyComponent>
	// <MyComponent></MyComponent>
	// <p></p>
	// <MyComponent></MyComponent>
	// <div></div>
// </MyComponent>

// let component = <MyComponent id="a" class="b" style="width:100px;height:100px;background-color:lightgreen;">
	// <div>test</div>
	// <div>{new Wrapper("span")}</div>
// </MyComponent>

// component.id = "c";

// component.mountTo(document.body);
// console.log(component);
// component.setAttribute("id", "a");

let component = <Carousel data={[
				"https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
				"https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
				"https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
				"https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
]} />
component.mountTo(document.body);