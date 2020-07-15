<?php 
	if (isset($_POST["name"]) && isset($_POST["email"]) && isset($_POST["message"])) {
		$salutation = $_POST["salutation"];
		$name = htmlspecialchars($_POST["name"]);
		$email = htmlspecialchars($_POST["email"]);
		$message = nl2br(htmlspecialchars($_POST["message"]));
		$to = "tamzhermin@gmail.com";
		$from = $email;
		$subject = "Contact Form Message";
		$message = "<b>From:</b> ".$email."<br><b>Name:</b> ".$salutation." ".$name."<br><p>".$message."</p>";
		$headers = "From: $from\r\n";
		$headers .= "MIME-Version: 1.0\r\n";
		$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

		if (mail($to, $subject, $message, $headers)) {
			echo "success";
		}

		else {
			echo "The server failed to send your message, please try again later.";
		};
	};
 ?>