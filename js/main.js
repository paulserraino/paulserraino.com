(function ($, window) {
	$(main);

	function main () {
		responsiveMenu();
	}

	function responsiveMenu() {
		var $win = $(window);

		$('.menu-icon').on('click', function (evt) {
			$(".x-mark").toggleClass("hide x-rotate");
			$('.hamburger').toggleClass("hide");
			$('.nav').slideToggle();
		});

		$win.on("resize", function (evt) {
			if ($win.width() > 570)
				$('.nav').removeAttr("style");
		});
	}

})(jQuery, window);