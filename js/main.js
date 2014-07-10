(function ($, window) {
	$(main);

	function main () {
		responsiveMenu();
	}

	function responsiveMenu() {
		var $win = $(window);

		$('.menu-icon').on('click', function (evt) {
			$('.nav').slideToggle();
			$(this).toggleClass('hamburger');
			$(this).toggleClass('x-mark rotate');
		});

		$win.on("resize", function (evt) {
			if ($win.width() > 570)
				$('.nav').removeAttr("style");
		});
	}

})(jQuery, window);