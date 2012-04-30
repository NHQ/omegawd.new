var steps = [], moves = [], clock = 1000 // 10 seconds
	,	btns = ['red', 'green', 'blue', 'yellow']
	,	startBtn = document.getElementById('startBtn')
 	, Pendulum = function(min, max, startVal, incrby){
			this.min = min;
			this.max = max;
			this.val = startVal;
			this.incrby = incrby;
			this.direction = true;
	
			return function(){
				switch (this.direction){
					case true:
						if(this.val < this.max)
							return this.val += this.incrby
							else 
								this.direction = false
								return this.val
					break;
					case false:
						if(this.val > this.min)
							return this.val -= this.incrby
						else 
							this.direction = true
							return this.val
					break;
				}
				return this.x ? this.x = false : this.x = true
			}	
		}
	,	swing = Pendulum(0, btns.length - 1, btns.length - 1, 1)
	, swingSwing = function(){
			return swing()
		}
	,	ev = new window.EventEmitter2({
      wildcard: false,
      delimiter: '.', 
    });
;

var t = setInterval(swingSwing, 27)

btns.forEach(function(b){
	var el = document.getElementById(b);
	el.addEventListener('click', function(e){
		ev.emit('click', b);
	}, false)
})

startBtn.onclick = function(){
	newGame()
}

function newGame(){
	steps = [];
	advance()
}

function advance(){
	console.log(swing())
	steps.push(btns[swing()])
	playSteps(playTurn)
}

function playSteps(cb){
	var step = 0, elem = null;
	
	var i = setInterval(playSoundAndLightUp, 100);
	
	function playSoundAndLightUp(){
		if(step < steps.length){
			if(elem) elem.classList.remove('glowing');
	 		elem = document.getElementById(steps[step]);
			console.log(steps, step, steps[step])
			elem.classList.add('glowing');
			++step;
		}
		else {
			(elem && elem.classList.remove('glowing'));
			window.clearInterval(i);
			cb()
		}
	}
}

function playTurn(){
	var buzzer = function(){console.log('buzz')}
		,	timer = setTimeout(advance, clock)
		,	set = steps.slice(0)
	;
//	ev.once('click', function(){console.log(set[0])})

}