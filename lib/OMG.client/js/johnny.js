(function(){
	var winX = window.innerWidth, winY = window.innerHeight;
	paper.install(window);
	paper.setup('bg');
	view.viewSize = new Size([winX, winY]);
	
	var bg = new Path.Rectangle(view.viewSize);
	bg.fillColor = new HSLColor(1,.6, .6);
		
	var pts = []
		, paths = []
		,	featureLength = 60
		, startingPoint = new Point(200,200)
	;
		
	function newPath(pt, angle){
		var path = new Path(pt);
		path._vector = new Point({
		        angle: angle,
		        length: featureLength
		    });
		path.strokeWidth = 2;
		path.strokeColor = 'red';
		paths.push(path)
		return path; 
	};
	
	
	var p = newPath(startingPoint, 60), path2, count = 0;

function writeHex(pt, angle){
	var path = newPath(pt, angle)
		, angle = path._vector.angle
		;
		
	function er(path){
		var pts = []
		for(var x = 1; x < 7; ++x){
			path.lineBy(path._vector)
			path._vector.angle+=60;
			var ext = newPath(path.lastSegment.point, path._vector.angle - 120);
			ext.lineBy(ext._vector);
			var c = new Path.Circle(ext.lastSegment.point, 3);
			c.fillColor = 'yellow';
			pts.push(ext.lastSegment.point)
		}	
	};
	
	er(path)

}
	writeHex(p.lastSegment.point, p._vector.angle)
	setTimeout(function(){view.onFrame = null}, 5500)
		
}())
