// File written in mostly JavaSciprt without jQuery

// Pathetic Attempt to Disable AJAX Cache
$.ajaxSetup({ cache: false });

function _(id) {
	return document.getElementById(id);
};

function submitForm() {

	$("#submit").attr('disabled', 'disabled');

	var formdata = new FormData();

	formdata.append("name", _("name").value);
	formdata.append("email", _("email").value);
	formdata.append("message", _("message").value);
	
	var ajax = new XMLHttpRequest();

	ajax.open("POST", "email-me.php?q=test&amp;rnd=");
	ajax.onreadystatechange = function() {
	
		if (ajax.readyState == 4 && ajax.status == 200) {
			if (ajax.responseText == "success") {
				_("submit").innerHTML = "Thank You!";
				_("result").className += " popup-active";
				_("submit").className += " disable-submit";
				$("#submit").attr("disabled", "disabled");
				document.getElementsByName("contact-form")[0].reset();
			} else {
				_("submit").innerHTML = "Resend";
				$("#submit").removeAttr("disabled");
			};
		};
	};

	ajax.send(formdata);

};