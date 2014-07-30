<?php
session_start();
if(isset($_COOKIE['signid']) && isset($_COOKIE['email']) && isset($_COOKIE['password'])){
	setcookie("signid", '', strtotime('-30 days'), '/');
	setcookie("email", '', strtotime('-30 days'), '/');
	setcookie("password", '', strtotime('-30 days'), '/');
	setcookie("syncid", '', strtotime('-30 days'), '/');
}
session_destroy();
header("location: index.php");