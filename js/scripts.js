(function () {
	var App = {
		Views: {}
	};

	App.Views.Index = Backbone.View.extend({
		el: "#page",
		template: _.template($("#index-tmpl")),
		render: function () {
			this.$el.html(template);
		}
	});

	App.Router = Backbone.Router.extend({
		routes: {
			'': 'index',
			'about': 'about',
			'projects': 'projects'
		},
		index: function () {
			var v = new App.Views.Index();
			v.render();
		}
	});

	new App.Router();
	Backbone.history.start();
})();