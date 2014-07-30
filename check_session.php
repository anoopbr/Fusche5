<?php
session_start();
include_once("connect.php");
$user_is_logged = false;
$log_user_id = "";
$log_uname = "";
$log_pass = "";
if(isset($_SESSION['signid']) && isset($_SESSION['name']) && isset($_SESSION['password'])){
	$log_user_id = preg_replace('#[^0-9]#', '', $_SESSION['signid']);
	$log_uname = preg_replace('#[^a-z0-9]#i', '', $_SESSION['name']);
	$log_pass = preg_replace('#[^a-z0-9]#i', '', $_SESSION['password']);
	$stmt = $db->prepare("SELECT signid FROM signup WHERE signid=:log_user_id");
	$stmt->bindValue(':log_user_id',$log_user_id,PDO::PARAM_INT);
	try{
		$stmt->execute();
		 if($stmt->rowCount() > 0){
			 $user_is_logged = true;
		 }
	}
	catch(PDOException $e){
		return false;
	}
}else if(isset($_COOKIE['signid']) && isset($_COOKIE['name']) && isset($_COOKIE['password'])){
	$_SESSION['signid'] = preg_replace('#[^0-9]#', '', $_COOKIE['signid']);
	$_SESSION['name'] = preg_replace('#[^a-z0-9]#i', '', $_COOKIE['name']);
	$_SESSION['password'] = preg_replace('#[^a-z0-9]#i', '', $_COOKIE['password']);
	$log_user_id = $_SESSION['signid'];
	$log_uname = $_SESSION['name'];
	$log_pass = $_SESSION['password'];
	$stmt = $db->prepare("SELECT signid FROM signup WHERE signid=:log_user_id LIMIT 1");
	$stmt->bindValue(':log_user_id',$log_user_id,PDO::PARAM_INT);
	try{
		$stmt->execute();
		 if($stmt->rowCount > 0){
			 $user_is_logged = true;
		 }
	}
	catch(PDOException $e){
		return false;
	}
	if($user_is_logged == true){
		$db->query("UPDATE signup SET lastlog=now() WHERE signid='$log_user_id' LIMIT 1");
	}
}
