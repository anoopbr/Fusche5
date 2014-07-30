<?php

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
	echo $e->getMessage();
	exit();
}
return $db;

?>