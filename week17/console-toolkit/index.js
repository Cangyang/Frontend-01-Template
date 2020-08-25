
var tty = require('tty');
var ttys = require('ttys');
var rl = require('readline');

var stdin = ttys.stdin;
var stdout = ttys.stdout;

stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf-8');


function getChar(){
	return new Promise(resolve => {
		stdin.once('data', function(key){
			resolve(key);
		});
	});
}

function up(n = 1){
	stdout.write('\033['+n+'A')
}

function down(n = 1){
	stdout.write('\033['+n+'B')
}

function right(n = 1){
	stdout.write('\033['+n+'C')
}

function left(n = 1){
	stdout.write('\033['+n+'D')
}

async function select(choices) {
	// 光标选中的行
	let selected = 0;
	
	for(let i = 0; i < choices.length; i ++){
		let choice = choices[i];
		if(i === selected){			
			stdout.write('[x]' + choice + '\n');
		}else {
			stdout.write('[ ]' + choice + '\n');
		}
	}
	// 光标默认第一行
	up(choices.length);
	right();
	while(true){
		let char = await getChar();
		if(char === '\u0003'){
			process.exit();
			break;
		}
		if(char === 'w' && selected > 0){
			stdout.write(" ");
			left();
			selected --;
			up();
			stdout.write("x");
			left();
		}
		if(char === 's' && selected < choices.length - 1){
			stdout.write(" ");
			left();
			selected ++;
			down();
			stdout.write("x");
			left();
		}
		if(char === '\r'){
			down(choices.length - selected);
			left();
			return choices[selected];
		}
		
	}
}

void async function(){
	stdout.write('which framework do you want to use?\n');
	let answer = await select(['vue', 'react', 'angular']);
	stdout.write('you selected:' + answer + '\n');
	process.exit();
}()