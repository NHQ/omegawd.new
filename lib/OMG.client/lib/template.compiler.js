module.exports = function(resolvedPath){

	var jadePath = resolvedPath + '/html/templates/'
	,		stylesPath = resolvedPath + '/css/templates/'
	,		fs = require('fs')
	,		watcher = fs
	,		jade = require('jade')
	,		styles = require('stylus')
	,		_ = require('underscore')
	,		logo = _.range(1)
	,		jadeLocals = {list: logo}
	;

	readFolder(jadePath);
	readFolder(stylesPath);

	function switchBoard(file){

		var name = file.slice(file.lastIndexOf('/') + 1, file.lastIndexOf('.'))
		,		ext = file.slice(file.lastIndexOf('.') + 1);

		switch(ext) {

			case 'html':

				fs.writeFileSync(resolvedPath + '/html/' + name + '.html', 'utf8')

			break;

			case 'jade':

				jadeTempl = fs.readFileSync(file, 'utf8')

				jadefn = jade.compile(jadeTempl, {filename: file, pretty: true})

				html = jadefn(jadeLocals)

				fs.writeFileSync(resolvedPath + '/html/' + name + '.html', html, 'utf8')

			break;

			case 'style':

				var css = fs.readFileSync(file, 'utf8');

				styles(css)
					.define('logo', logo)
					.render(function(err, css){
				  	if (err) throw err;
						else 
						fs.writeFileSync(resolvedPath + '/css/' + name + '.css', css, 'utf8')
					});

			break;

		};

	};

	function readFolder(path) {

		var path = path
		,		f = fs.readdirSync(path)
		;

		f.forEach(watchFile)

		function watchFile(file) {

			var file = file
			,		fileName = path + file
			;

			watch = fs.watch(fileName, function(ev){})

			switchBoard(fileName)

			watch.on('change', upDateFile)

			function upDateFile(){

				switchBoard(fileName)

			};

		};

	};

	
}

