var $ = require("jquery");
module.exports = {
		fetch: function () {
			var dfd = $.Deferred();
			$.ajax({
				url: "../data/projects.json",
				type: "GET",
				dataType: "json",
				success: function (projects) {
					if (typeof projects === "string")
						projects = JSON.parse(projects);

					dfd.resolve(projects);
				},
				error: function (err) {
					console.error(err.message);
				}
			});
			return dfd.promise();
		}
};