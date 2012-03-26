    module.exports = function(){
	
		return {
    		init: function(size){
					var self = this;
		
    			this.colorPicker.Selector.apply(this);
    			_.bindAll(this);
          this.tool.onMouseUp = this.mouseUp.call(this, this.events.CP_mouseUp);
          this.tool.onMouseDrag = this.mouseDrag.call(this, this.events.CP_drag);
          this.tool.onMouseDown = this.mouseDown();
    			this.colorPicker.pallette.store();
    			view.draw()
    		},
    		pallette : {
    		  store: function(){
    		    var cors = store.get('colors');
    		    var poop = [];
    		    _.each(cors, function(e){
    		      var c = new HSBColor(e[0],e[1],e[2],e[3]);
    		      poop.push(c);
    		    })
    		    this.get = poop;
    		    this.set();
    		  },
    		  set: function(color){
						var center = view.center;
    		    if (color){
    		      this.get.unshift(color);
    		      store.set('colors', _.map(this.get, function(obj){
    		        return [obj.hue, obj.saturation, obj.brightness, obj.alpha]
    		      }));
    		      this.set();
    		      return		      		        
    		      }
    		    this.swathii.remove();
    		    this.swathii = new Group();
    		    this.swath = [];
    		    var rad = 330;
    		    var radian = 15;
    		    if (this.get.length > 24){radian-=6}
    		    for (var x = this.get.length; x >= 0; --x){
    		      var unit = 360 / this.get.length;
    		      vek = new Point({
                angle: -(x * radian) - 5,
                length: rad
              })
    		      this.swath[x] = new Path.Circle(center.add(vek),30);
    		      //this.swath[x].strokeColor = "#333";
    		      this.swath[x].fillColor = this.get[x];
    		      //this.swath[x].moveAbove(this.swath[x+1]);
    		      this.swathii.addChild(this.swath[x])
    		    }  
    		    //this.swathii.position = [550,0]
    		    },
    		  get: [],
    		  swathii: new Group(),
    		  swath:[]
    		},
    		Selector : function(){
    		  this.group = new Group();
    			this.globs.color = this.pal =  new HSLColor(210, 1, 0.65);
    			this.bg = [];
    			for (i=35;i>0;--i){
    				this.bg[i] = new Path([3,(i*10)],[358,0+(i*10)]);
    				this.bg[i].strokeWidth = 5;
    				this.bg[i].strokeColor = "#c1c2c3";
    				this.group.addChild(this.bg[i])
    			}
    			this.sb = new Path.Rectangle(0, 0, 360, 360);
    			this.sb.fillColor = this.pal;
    			this.circ = new Path.Circle(this.sb.position.x + (this.pal.lightness * 180),this.sb.position.y,6);
    			this.circ.strokeColor = "black";
					this.circ.fillColor = '#999';
    			this.circ.strokeWidth = 3;
    			var colors = [];
    			var cycles = 4;
    			for (var i = 0, l = 360; i < l; i++) {
    				var brightness = 1;
    				var hue = i;
    				var color = new HSBColor(hue, 1, brightness);
    				colors.push(color);
    			}

    			this.hueSelect = new Path.Rectangle(0,375,360,30);
    			var gradient = new Gradient(colors);
    			var gradientColor = new GradientColor(gradient, this.hueSelect.bounds.bottomLeft,this.hueSelect.bounds.bottomRight);
    			this.hueSelect.fillColor = gradientColor;

    			this.tiny = new Path.Circle([210, 390],14);
    			this.tiny.fillColor = this.pal;
    			this.tiny.strokeColor = "#000";

    			this.as = new Path.Rectangle(375,-10,30,360);
    			this.palAlpha1 = this.pal.clone();
    			this.palAlphaZero = this.pal.clone();
    			this.palAlphaZero.alpha = 0;
    			var gradient = new Gradient([[this.palAlphaZero],[this.palAlpha1]]);
    			var gradientColor = new GradientColor(gradient, this.as.bounds.topLeft,this.as.bounds.bottomLeft);
    			this.as.fillColor = gradientColor;
    			this.add = new PointText([367,410]);
    			this.add.content= "+";
    			this.add.characterStyle = {
              fontSize: 60,
          }
          this.add.strokeJoin = 'round';
    			this.add.fillColor = "#000";
    			this.add.strokeColor = "#fff"

    			this.addRect = new Path.Rectangle(new Point(367,365), new Size(48,48));
    			//var cornerSize = new Size(20, 20);
    			//this.addRect = new Path.RoundRectangle(aRex, cornerSize);

    			this.addRect.strokeColor = "#fff";
    			this.addRect.fillColor = "#fff";
    			this.addRect.fillColor.alpha = 0;

   // 			this.group.addChildren([this.as, this.sb, this.hueSelect, this.tiny, this.circ, this.add, this.addRect]);
    			this.group.position = view.center;


    //			this.add = new Path([[25,25],[25,10],[35,10],[25,35]]);
    		},
    		remove: function(){
    	    omg.gg.group.remove();
    	    this.pallette.swathii.remove();
    	  },
	  }
	}