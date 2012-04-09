(function(){
	paper.install(window)
	paper.setup('xyRangeFinder');
	
	
	function changeOrg()
	{
	var y=document.getElementById('oy').value;
	document.getElementById('div2').style.transformOrigin=x + '% ' + y + '%';
	document.getElementById('div2').style.msTransformOrigin=x + '% ' + y + '%';
	document.getElementById('div2').style.webkitTransformOrigin=x + '% ' + y + '%';
	document.getElementById('div2').style.MozTransformOrigin=x + '% ' + y + '%';
	document.getElementById('div2').style.OTransformOrigin=x + '% ' + y + '%';
	document.getElementById('origin').innerHTML=x + "% " + y + "%";            
	}
	
	$(document).ready(kickit)	
	
	function kickit(){
		$('.xyRangeFinder').draggable({
			helper: 'original',
			drag: xyRangeChange,
			containment: 'parent'
		});
		
		function xyRangeChange (event, ui){
			console.log(event, ui)	
		};
		
	}
	
	
	
	
}())
