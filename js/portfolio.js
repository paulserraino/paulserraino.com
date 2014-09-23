var $ = require("jquery");
var _ = require("underscore");
var Router = require("routely-js");
var ProjectsCollection = require("./models/ProjectsCollection");

$(document).ready(function () {
	var router = new Router();

	router.route("/", function (){
		ProjectsCollection.fetch().done(function (data) {
			console.log("data ", data);
			var template = _.template($("#projects-list").html());
			$("#portfolio").html(template({projects: data}));
		});
	});

	router.route("/project/:id", function (id) {
		console.log("project ", id);
		ProjectsCollection.fetch().done(function (data) {
			var template = _.template($("#project-template").html());
			$("#portfolio").html(template({project: data[id]}));
		});
	});
});