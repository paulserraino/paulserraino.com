module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		'compile-handlebars': {
			globbedTemplateAndOutput: {
				template: ['templates/*.handlebars'],
				templateData: '',
				partials: 'templates/partials/*.handlebars',
				output: __dirname+'/*.html'
			}
		}

	});

	grunt.loadNpmTasks('grunt-compile-handlebars');

	grunt.registerTask('default', ['compile-handlebars']);
}