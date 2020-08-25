export class Timeline {
	constructor(){
		this.animations = new Set();
		this.finishedAnimations = new Set();
		this.addTimes = new Map();
		this.requestID = null;
		// 状态管理
		this.state = "inited";
		// 每帧执行的函数
		this.tick = () => {
			// console.log("tick");
			let t = Date.now() - this.startTime;
			// 只针对未完成的animation执行tick操作
			// let animations = this.animations.filter(animation => !animation.finished);
			// 每帧依次执行animations中保存的动画即可
			for(let animation of this.animations){
				let {object, property, template, start, end, duration, delay, timingFunction} = animation;
				let addTime = this.addTimes.get(animation);
				// 参考cubic-bezier的设计
				let progression = timingFunction((t - delay - addTime)/duration); // 0-1之间的数
				if(t < delay + addTime){
					continue;
				}
				// 让动画效果最终一致
				if(t > duration + delay + addTime){
					progression = 1;
					this.animations.delete(animation);
					this.finishedAnimations.add(animation);
				}
				let value = animation.valueFromProgression(progression);
				object[property] = template(value);
			}
			// 有未完成的帧动画才不断循环执行
			if(this.animations.size){
				this.requestID = requestAnimationFrame(() => this.tick());
			}else {
				this.requestID = null;
			}
		}
	}
	
	start(){
		if(this.state !== 'inited'){
			return;
		}
		this.state = "playing";
		this.startTime = Date.now();
		this.tick();
	}
	
	pause(){
		if(this.state !== 'playing'){
			return;
		}
		this.state = "paused";
		this.pauseTime = Date.now();
		if(this.requestID !== null){
			cancelAnimationFrame(this.requestID);
			this.requestID = null;
		}
	}
	
	resume(){
		if(this.state !== 'paused'){
			return;
		}
		this.state = "playing";
		this.startTime += Date.now() - this.pauseTime; 
		this.tick();
	}
	
	reset(){
		// 先调用pause关闭帧动画
		if(this.state === 'playing'){
			this.pause();
		}
		// 重置所有变量状态
		this.animations = new Set();
		this.finishedAnimations = new Set();
		this.addTimes = new Map();
		this.requestID = null;
		this.startTime = Date.now();
		this.pauseTime = null;
		this.state = 'inited';
		
	}
	
	restart(){
		// 先调用pause关闭帧动画
		if(this.state === 'playing'){
			this.pause();
		}
		// 继续不重新开始
		for(let animation of this.finishedAnimations){
			this.animations.add(animation);
		}
		this.finishedAnimations = new Set();
		this.requestID = null;
		// 状态管理
		this.state = "playing";
		this.startTime = Date.now();
		this.pauseTime = null;
		this.tick();
	}
	
	/**
	 * @animation 定义动画帧属性的对象
	 * @addTime 处理跟随时间
	 */
	add(animation, addTime) {
		if(this.state === 'playing' && this.requestID === null){
			//this.requestID = requestAnimationFrame(() => this.tick());
			this.tick();
		}
		// animation.finished = false;
		if(this.state === 'playing'){
			// 动画在播放过程中从当前时间重新开始
			this.addTimes.set(animation, addTime !== void 0 ? addTime : (Date.now() - this.startTime));
		}else {
			// 其他过程中从动画从0开始
			this.addTimes.set(animation, addTime !== void 0 ? addTime : 0);
		}
		this.animations.add(animation);
	}
}

export class Animation {
	constructor(object, property, start, end, duration, delay, timingFunction, template, startTime){
		this.object = object;
		this.property = property;
		this.template = template;
		this.start = start;
		this.end = end;
		this.duration = duration;
		this.delay = delay || 0;
		this.timingFunction = timingFunction;
		this.startTime = startTime;
	}
	// value的函数支持
	valueFromProgression(progression){
		return this.start + progression * (this.end - this.start);
	}
}

export class ColorAnimation {
	constructor(object, property, start, end, duration, delay, timingFunction, template){
		this.object = object;
		this.property = property;
		this.template = template || ((v) => `rgba(${v.r},${v.g},${v.b},${v.a})`);
		this.start = start;
		this.end = end;
		this.duration = duration;
		this.delay = delay || 0;
		this.timingFunction = timingFunction;
	}
	// value的函数支持
	valueFromProgression(progression){
		return {
			r: this.start.r + progression * (this.end.r - this.start.r),
			g: this.start.g + progression * (this.end.g - this.start.g),
			b: this.start.b + progression * (this.end.b - this.start.b),
			a: this.start.a + progression * (this.end.a - this.start.a)
		}
	}
}


/*
// 多个animation调用编排
let animation = new Animation(object, property, start, end, duration, delay, timingFunction);
let animation2 = new Animation(object, property, start, end, duration, delay, timingFunction);

// 时间线的作用，管理、编排多个动画
let timeline = new Timeline;
timeline.add(animation);
timeline.add(animation2);

timeline.start();

timeline.pause();

timeline.resume();

timeline.stop();

setTimeout
setInterval
requestAnimationFrame
*/

 