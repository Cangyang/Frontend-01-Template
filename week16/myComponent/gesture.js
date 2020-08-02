


export function enableGesture(element){
	// context的作用在于存储起始点的坐标，计算move的距离判断具体是哪种事件
	let contexts = Object.create(null);

	// 鼠标事件区别于触屏的touch事件
	let MOUSE_SYMBOL = Symbol("mouse");
	if(document.ontouchstart !== null){
		element.addEventListener("mousedown", (event) => {
			contexts[MOUSE_SYMBOL] = Object.create(null);
			start(event, contexts[MOUSE_SYMBOL]);
			let mousemove = event => {
				move(event, contexts[MOUSE_SYMBOL])
			}
			let mouseend = event => {
				end(event, contexts[MOUSE_SYMBOL]);
				document.removeEventListener("mousemove",mousemove);
				document.removeEventListener("mousedown",mouseend);
			}
			document.addEventListener("mousemove",mousemove);
			document.addEventListener("mouseup",mouseend);
		})
	}

	// start 触屏事件
	element.addEventListener("touchstart", event => {
		for(let touch of event.changedTouches){
			contexts[touch.identifier] = Object.create(null);
			start(touch, contexts[touch.identifier]);
		}
	})

	element.addEventListener("touchmove", event => {
		for(let touch of event.changedTouches){
			move(touch, contexts[touch.identifier]);
		}
	})

	element.addEventListener("touchend", event => {
		for(let touch of event.changedTouches){
			end(touch, contexts[touch.identifier]);
			delete contexts[touch.identifier];
		}
	})

	element.addEventListener("touchcancel", event => {
		for(let touch of event.changedTouches){
			cancel(touch, contexts[touch.identifier]);
			delete contexts[touch.identifier];
		}
	})
	
	// tap
	// pan panstart panmove panend
	// flick
	// press pressstart pressend

	// 抽象事件,
	let start = (point, context) => {
		// 开始事件分发
		let s = new CustomEvent('start');
		Object.assign(s, {
				startX: point.clientX,
				startY: point.clientY,
				clientX: point.clientX,
				clientY: point.clientY
		});
		console.log(s)
		element.dispatchEvent(s);
		context.startX = point.clientX, context.startY = point.clientY;
		// 留存离开时的速度，计算是pan还是flick
		context.moves = [];
		// 事件开始设置默认触发事件
		context.isTap = true;
		context.isPan = false;
		context.isPress = false;
		// 长按0.5s后变为press
		context.timeoutHandler = setTimeout(() => {
			// pan的优先级高于press
			if(context.isPan){
				return;
			}
			context.isTap = false;
			context.isPan = false;
			context.isPress = true;
			// 事件分发
			element.dispatchEvent(new CustomEvent('pressstart', {}));
		}, 500)
	}

	let move = (point, context) => {
		// 计算坐标轴的移动距离
		let dx = point.clientX - context.startX, dy = point.clientY - context.startY;
		// 经验值：移动距离大于10px，变为pan
		if(dx ** 2 + dy ** 2 > 100 && !context.isPan){
			// pan开始时若有press需要取消掉
			if(context.isPress){
				element.dispatchEvent(new CustomEvent('presscancel', {}));
			}
			context.isTap = false;
			context.isPan = true;
			context.isPress = false;
			// 事件分发,用户关心坐标
			let ps = new CustomEvent('panstart');
			Object.assign(ps, {
				startX: context.startX,
				startY: context.startY,
				clientX: point.clientX,
				clientY: point.clientY
			});
			element.dispatchEvent(ps);
		}
		
		context.moves.push({
			dx,
			dy,
			t: Date.now()
		})
		
		// 计算flick，因为要求速度够快，经过太长时间的直接过滤掉
		context.moves = context.moves.filter(record => Date.now() - record.t < 300);
		
		if(context.isPan){
			// 事件分发
			let e = new CustomEvent('pan');
			Object.assign(e, {
				startX: context.startX,
				startY: context.startY,
				clientX: point.clientX,
				clientY: point.clientY
			});
			element.dispatchEvent(e);
		}
	}

	let end = (point, context) => {
		if(context.isPan){
			// 计算速度
			let dx = point.clientX - context.startX, dy = point.clientY - context.clientY;
			let s0 = context.moves[0];
			let speed = Math.sqrt((s0.dx - dx) ** 2 + (s0.dy - dy) ** 2) / (Date.now() - s0.t);
			// console.log("speed", speed);
			// 是否是flick事件
			let isFlick = speed > 2.5;
			if(isFlick){
				// 事件分发,用户关心坐标
				let fk = new CustomEvent('flick');
				Object.assign(fk, {
					startX: context.startX,
					startY: context.startY,
					clientX: point.clientX,
					clientY: point.clientY,
					speed: speed
				});
				element.dispatchEvent(fk);
			}
			// 事件分发,用户关心坐标
			let pd = new CustomEvent('panend');
			Object.assign(pd, {
				startX: context.startX,
				startY: context.startY,
				clientX: point.clientX,
				clientY: point.clientY,
				speed: speed,
				isFlick: isFlick
			});
			element.dispatchEvent(pd);
		}
		
		if(context.isTap){
			// 事件分发
			element.dispatchEvent(new CustomEvent('tap', {}));
		}
		
		if(context.isPress){
			// 事件分发
			element.dispatchEvent(new CustomEvent('pressend', {}));
		}
		
		clearTimeout(context.timeoutHandler);
	}

	let cancel = (point, context) => {
		// 事件分发
		element.dispatchEvent(new CustomEvent('cancel', {}));
		clearTimeout(context.timeoutHandler);
	}
}



