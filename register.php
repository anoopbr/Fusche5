<?php

function register_user(){

	include_once("check_session.php");
	if($user_is_logged == true){
		$return["response"] = "Authenticated";
		echo json_encode($return);
		exit();
	}
	$return = $_POST;

	// Usualy "localhost" but could be different on different servers
	$db_host = "localhost";
	// Place the username for the MySQL database here
	$db_username = "root"; 
	// Place the password for the MySQL database here
	$db_pass = "root"; 
	// Place the name for the MySQL database here
	$db_name = "fusche";
	try{
	$db = new PDO('mysql:host='.$db_host.';dbname='.$db_name,$db_username,$db_pass);
	$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	}
	catch(PDOException $e){
	$return["response"] = $e->getMessage();
	echo json_encode($return);
	exit();
	}

	$full_name = strip_tags($_POST['user_name']);
	$email = strip_tags($_POST['user_email']);
	$pass1 = $_POST['user_pwd'];
	$pass2 = $_POST['user_pwd2'];

	// make sure no fields are blank /////
	if(trim($email) == "" || trim($pass1) == "" || trim($pass2) == ""){
	  $return["response"] =  "Error: All fields are required. Please press back in your browser and try again.";
	  echo json_encode($return);
	  $db = null;
	  exit();
	}
	//// Make sure both password fields match ////
	else if($pass1 != $pass2){
	  $return["response"] = "Your password fields do not match. Press back and try again";
	  echo json_encode($return);
	  $db = null;
	  exit();
	}
	//// Make sure email is valid ////
	if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
	$return["response"] = "The email provided is invalid. Press try using another.";
	echo json_encode($return);
	$db = null;
	exit();
	}

	//// query to check if email is in the db already ////
	try{
		$stmt = $db->prepare("SELECT email FROM signup WHERE email=:email LIMIT 1");
		$stmt->bindValue(':email',$email,PDO::PARAM_STR);
		$stmt->execute();
		$count = $stmt->rowCount();
	}
	catch(PDOException $e){
		$return["response"] = $e->getMessage();
		echo json_encode($return);
		$db = null;
	exit();
	}
	///Check if email is in the db already ////
	if($count > 0){
		$return["response"] = "Sorry, that email is already in use in the system";
		echo json_encode($return);
		$db = null;
		exit();
	}

	//// Encrypt password ////
	$user_pwd = password_hash($pass1, PASSWORD_DEFAULT)."\n";

	try{
	$db->beginTransaction();
	$ipaddress = getenv('REMOTE_ADDR');
	$stmt2 = $db->prepare("INSERT INTO signup (name, email, pswd, signup_date, ipaddress) 
	VALUES (:full_name, :email, :pswd, now(), :ipaddress)");
	$stmt2->bindParam(':full_name', $full_name, PDO::PARAM_STR);
	$stmt2->bindParam(':email',$email,PDO::PARAM_STR);
	$stmt2->bindParam(':pswd',$user_pwd,PDO::PARAM_STR);
	$stmt2->bindParam(':ipaddress',$ipaddress,PDO::PARAM_INT);
	$stmt2->execute();
	/// Get the last id inserted to the db which is now this users id for activation ////
	$lastId = $db->lastInsertId();
	$token = rand(999999999,9999999999999999);
	$stmt3 = $db->prepare("INSERT INTO activate (user, token) VALUES ('$lastId', :token)");
	$stmt3->bindValue(':token',$token,PDO::PARAM_STR);
	$stmt3->execute();
	//// insert into synclogin
	$loginid = 1;
	$stmt4 = $db->prepare("INSERT INTO synclogin (signid,loginid, name, email)
	VALUES ('$lastId', :loginid, :full_name, :email)");
	$stmt4->bindParam(':loginid',$loginid,PDO::PARAM_STR);
	$stmt4->bindParam(':full_name', $full_name, PDO::PARAM_STR);
	$stmt4->bindParam(':email',$email,PDO::PARAM_STR);
	$stmt4->execute();
	//// Send email activation to the new user ////
	$from = "From: Auto Resposder @ Fusche <anoop@yahoo.com>";
	$subject = "IMPORTANT: Activate your Fusche account";
	$link = 'http://ocalhost:8888/Fusche2/activate.php?user='.$lastId.'&token='.$token.'';
	//// Start Email Body ////
	$message = "
	Thanks for registering an account at fusche! 
	Please click the link below to confirm your identity and get started.

	$link
	";
	//// Set headers ////
	$headers = 'MIME-Version: 1.0' . "rn";
	$headers .= "Content-type: textrn";
	$headers .= "From: $fromrn";
	/// Send the email now ////
	mail($email, $subject, $message, $headers, '-f noreply@fusche.com');
	//mail($email1, $subject, $message, $headers, '-f noreply@your-email.com');
	$db->commit();
	$return["response"] =  "Thanks for joining! Check your email in a few moments to activate your account so that you may log in.!";
	echo json_encode($return);
	$db = null;
	exit();
	}
	catch(PDOException $e){
	$db->rollBack();
	$return["response"] = $e->getMessage();
	echo json_encode($return);
	$db = null;
	exit();
	}
}

?>