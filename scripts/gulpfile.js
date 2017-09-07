'use strict';

var b2v = require('buffer-to-vinyl');
var gulp = require('gulp');
var gulpNgConfig = require('gulp-ng-config');
var argv = require('yargs').argv;

var configureSetup = {
	createModule: true,
	constants: {}
};

var envVars = Object.keys(process.env);

envVars.forEach(function(envVar) {
	if(envVar.startsWith(argv.prefix)) {
		var v = envVar.replace(new RegExp("^" + argv.prefix, "g"), '');
		configureSetup.constants[v] = process.env[envVar];
	}
})

console.dir(configureSetup.constants);

function usage() {
	console.log("Usage:");
	console.log("\tgulp [--prefix <prefix>] --module <module> --output <output>");
	console.log();
	console.log("\t\tprefix: environment variables prefix");
	console.log("\t\tmodule: angular module name");
	console.log("\t\toutput: output file path");
}

gulp.task('check_argv', function() {
	if(!argv.module) {
		usage();
		throw new Error('Module name is empty.');
	}
	if(!argv.output) {
		usage();
		throw new Error('Output is empty.');
	}
});

gulp.task('default', ['check_argv'], function() {
	var json = JSON.stringify({});
	var outputPath = argv.output.substring(0, argv.output.lastIndexOf('/') + 1);
	var outputName = argv.output.substring(argv.output.lastIndexOf('/') + 1);
	return b2v.stream(new Buffer(json), outputName)
    	.pipe(gulpNgConfig(argv.module, configureSetup))
		.pipe(gulp.dest(outputPath)); 
});
