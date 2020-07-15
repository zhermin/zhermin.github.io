$(document).ready(function(){

	// Sets Window Height based on calculated ViewHeight value
	let vh = window.document.documentElement.clientHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);

	$(window).resize(function() {
		let vh = window.document.documentElement.clientHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	});

	// Calculates 4 Values from user form submission detected by a change in select options
	$("select").change(function(){
		
		var rp = 0;
		var rp_no_mtl = 0;
		var igp = 0;
		var total = 0;
		var res_list = [];
		var init_form = $("#rp-form").serializeArray();

		$.each(init_form, function(i, field){	
			total += parseFloat(field.value);
			if (i == 6) {
				rp = total * .9;
				rp_no_mtl = total - field.value;
			};
			if (6 < i) {
				igp += parseFloat(field.value);
			};
		});

		igp += 7.5*2;
		if (rp > rp_no_mtl) {
			var diff = rp - igp;
			res_list.push(rp, rp_no_mtl, igp, diff);
			$("#higher").html("+MT");
			$("#lower").html("NO MT");
		} else {
			var diff = rp_no_mtl - igp;
			res_list.push(rp_no_mtl, rp, igp, diff);
			$("#higher").html("NO MT");
			$("#lower").html("+MT");
		};

		// console.log(rp, rp_no_mtl, igp, diff);
		// console.log(res_list);

		// Animates the numbers' changes in the Results Section
		$(".results-wrapper").children("span").each(function(x, value) {

			var circ_index = "#circ-" + (x+1);
			var startVal = $(circ_index).text();

			$(circ_index).html(res_list[x]);

			$(circ_index).prop('Counter', startVal).animate({
				Counter: $(this).text()
			}, {
				duration: 1000,
				easing: 'swing',
				step: function (now) {
					var showVal = parseFloat(now).toFixed(3);
					if (showVal >= 0 && x == 3) {
						$(this).text("+" + parseFloat(showVal));
					} else {
						$(this).text(parseFloat(showVal));
					}
				}
			});

			if (x == 3) {
				if (res_list[x] < 0) {
					$(circ_index).css("color", "red");
					$(circ_index).css("border-color", "red");
				} else {
					$(circ_index).css("color", "lime");
					$(circ_index).css("border-color", "lime");
				};
			};
			
		});

	});

	// Help Modal Window's Functionalities
	$("#help").on("click", function() {
		$(".help-bg").addClass("active");
	});

	$(".close").on("click", function() {
		$(".help-bg").removeClass("active");
	});

	$(window).on("click", function(e) {
		if (e.target == $(".help-bg")[0]){
			$(".help-bg").removeClass("active");
		};
	});

	$(document).keyup(function(e) {
		if (e.keyCode === 27) {
			$(".help-bg").removeClass("active");
		};
	});

});