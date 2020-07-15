$(document).ready(function() {

	// From https://css-tricks.com/the-trick-to-viewport-units-on-mobile/ to account for mobile URL bar
	// Viewport Height changes when URL bar either scrolls in / scrolls out of view (collapse)

	// Get Viewport Height and multiply by 1% to get a value for 1 vh unit
	let vh = window.document.documentElement.clientHeight * 0.01;
	// Set Viewport Height in the --vh Custom Property to the Root of the Document
	document.documentElement.style.setProperty('--vh', `${vh}px`);

	// In the event of window resize
	$(window).resize(function() {
		let vh = window.document.documentElement.clientHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	});

	// jQuery Functions to set Main Nav either on the right or bottom of page and enlarge hover function
	function smallScreen() {
		$(".wrapper").css("flex-direction", "column");
		$("#main-nav").css("flex-direction", "row");
		$("#main-nav li").css("margin", "0");

		$("#main-nav").children().each(function() {
			$(this).mouseenter(function() {
				$(this).css("transform", "");
			});

			$(this).mouseleave(function() {
				$(this).css("transform", "");
			});
		});
	};

	function bigScreen() {
		$(".wrapper").css("flex-direction", "row");
		$("#main-nav").css("flex-direction", "column");
		$("#main-nav li").css("margin", "20px 10px");

		$("#main-nav").children().each(function() {
			$(this).mouseenter(function() {
				$(this).css("transform", "scale(1.2)");
			});

			$(this).mouseleave(function() {
				$(this).css("transform", "");
			});
		});
	};

	// On window manual resize function, use set jQuery Media Functions to decide
	$(window).resize(function() {
		if ($(window).width() <= 800) {
			smallScreen();
		} else {
			bigScreen();
		};
	});

	// On initial page load, checks screen width and sets
	if ($(window).width() <= 800) {
		smallScreen();
	} else {
		bigScreen();
	};

	// Dynamically Generating all Modal Windows and Closing Functions using .each()
	$all_modals = ["about", "projects", "contact"];

	$("#main-nav").children().each(function(i, value) {
		$(this).children().on("click", function() {
			$("." + $all_modals[i]).addClass("active");
		});

		$(this).mouseover(function() {
			$("#" + $all_modals[i] + "-open").children("span").css("visibility", "visible")
		});

		$(this).mouseout(function() {
			$("#" + $all_modals[i] + "-open").children("span").css("visibility", "hidden")
		});
	});

	$(".close").each(function(i, value) {
		$(this).on("click", function() {
			$("." + $all_modals[i]).removeClass("active");
		});
	});

	$(".bg-modal").each(function(i, value) {
		$(window).on("click", function(e) {
			if (e.target == $("." + $all_modals[i])[0]){
				$("." + $all_modals[i]).removeClass("active");
			};
		});

		$(document).keyup(function(e) {
			if (e.keyCode === 27) {

				// Checks if on Contact Window's iteration (Last, iteration 2)
				// Then checks if Popup Window is shown and closes it
				if (i === 2) {
					if ($(".popup-active").length) {
						$(".bg-pop").removeClass("popup-active");
					} else {
						$("." + $all_modals[i]).removeClass("active");
					};
				} else {
					$("." + $all_modals[i]).removeClass("active");
				};

			};
		});
	});

	// Closing Submit Success Popup Modal Window
	$("#close-popup").on("click", function() {
		$(".bg-pop").removeClass("popup-active");
	});

	$(window).on("click", function(e) {
		if (e.target == $(".bg-pop")[0] || e.target == $(".bg-modal.contact")[0]){
			$(".bg-pop").removeClass("popup-active");
		};
	});

	// Toggle to show email as clickable mailto link
	$("#email-box a").hide();
	$("#show-email").on("click", function() {
		$("#email-box a").toggle();
	});



	// Debugging Popup after Form Submission without PHP

	// $("#pop").on("click", function() {
	// 	document.getElementById("submit").innerHTML = "Thank You!";
	// 	document.getElementById("result").className += " popup-active";
	// 	document.getElementById("submit").className += " disable-submit";
	// 	$("#submit").attr('disabled', 'disabled');
	// 	document.getElementsByName("contact-form")[0].reset();
	// });

});