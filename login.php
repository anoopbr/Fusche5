<?php

function authenticate_user(){

	include_once("check_session.php");
	if($user_is_logged == true){
		$return["response"] = "Authenticated";
		echo json_encode($return);
		exit();
	}

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

	$return = $_POST;

	$email = strip_tags($_POST['user_email']);
	$password = $_POST['user_pwd'];

	$stmt1 = $db->prepare("SELECT signid, name, pswd FROM signup WHERE email=:email AND activated='1' LIMIT 1");
	$stmt1->bindValue(':email',$email,PDO::PARAM_STR);
	try{
		$stmt1->execute();
		$count = $stmt1->rowCount();
		if($count > 0){
			while($row = $stmt1->fetch(PDO::FETCH_ASSOC)){
				$uid = $row['signid'];
				$username = $row['name'];
				$hash = $row['pswd'];
			}

			$stmt2 = $db->prepare("SELECT syncid FROM synclogin WHERE signid=:signid LIMIT 1");
			$stmt2->bindValue(':signid',$uid,PDO::PARAM_STR);
			$stmt2->execute();
			$count = $stmt2->rowCount();
			if($count > 0){
				while($row = $stmt2->fetch(PDO::FETCH_ASSOC)){
					$syncid = $row['syncid'];
				}
			}

			$hash = trim($hash);

			if (password_verify($password, $hash)) {
				$db->query("UPDATE signup SET lastlog=now() WHERE signid='$uid' LIMIT 1");
				$_SESSION['signid'] = $uid;
				$_SESSION['name'] = $username;
				$_SESSION['password'] = $hash;
				$_SESSION['email'] = $email;
				$_SESSION['syncid'] = $syncid;
				setcookie("signid", $uid, strtotime( '+30 days' ), "/", "", "", TRUE);
				setcookie("syncid", $syncid, strtotime( '+30 days' ), "/", "", "", TRUE);
				setcookie("password", $hash, strtotime( '+30 days' ), "/", "", "", TRUE); 
				setcookie("email", $email, strtotime( '+30 days' ), "/", "", "", TRUE); 
				/* echo 'Valid password<br />'.$_SESSION['uid'].'<br />'.$_SESSION['username'].'<br />'.$_SESSION['password'].'
				<br />'.$_COOKIE['id']; */

				$stmt3 = $db->prepare("SELECT syncid FROM user_preference WHERE syncid=:syncid LIMIT 1");
				$stmt3->bindValue(':syncid',$syncid,PDO::PARAM_STR);
				$stmt3->execute();
				$count = $stmt3->rowCount();
				if($count > 0){
					$return["response"] = "Authenticated";
					$_SESSION['preference'] = "Authenticated";
				}else{
					$return["response"] = "Registered";
					$_SESSION['preference'] = "Registered";
				}
				echo json_encode($return);
				exit();
			} else {
				$return["response"] = 'Invalid password Press back and try again!';
				echo json_encode($return);
				exit();
			}
		}
		else{
			$return["response"] = "A user with that email address does not exist here";
			echo json_encode($return);
			$db = null;
			exit();
		}
	}
	catch(PDOException $e){
		$return["response"] = $e->getMessage();
		echo json_encode($return);
		$db = null;
		exit();
	}

}

?>