module.exports = function (grunt) {
	grunt.initConfig({
	  pkg: grunt.file.readJSON('package.json'),
	  concat: {
	    options: {
		    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
		    stripBanners: true
	    },
	    dist: {
	      src: ['js/libs/jquery.js', 'js/libs/underscore.js', 'js/libs/backbone.js', 'js/libs/handlebars.js'],
	      dest: 'js/deps.min.js',
	    },
	  },
	});

	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('default', ['concat']);
}