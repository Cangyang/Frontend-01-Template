let css = require('css')

module.exports = function(source, map) {
	var style = css.parse(source);
	let name = this.resourcePath.match(/([^\\]+).css$/)[1]
	for(let rule of style.stylesheet.rules){
		// 防止别人干坏事，强行把rule里面的selectors替换掉
		rule.selectors = rule.selectors.map(selector =>
			selector.match(new RegExp(`^.${name}`)) ? selector : `${name} ${selector}`
		);
	}
	return `
		let style = document.createElement('style');
		style.innerHTML = ${JSON.stringify(css.stringify(style))};
		document.documentElement.appendChild(style);
	`;
}