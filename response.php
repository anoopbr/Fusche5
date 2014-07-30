<?php

//db connection
require "login.php";
require "register.php";
require "userprofile.php";
require "find.php";

if (is_ajax()) {
  if (isset($_POST["action"]) && !empty($_POST["action"])) { //Checks if action value exists
    $action = $_POST["action"];
    session_start();
    switch($action) { //Switch case for value of action
      case "register": register_user(); break;
      case "login": authenticate_user(); break;
      case "save-preferences": save_preferences(); break;
      case "search": search(); break;
      default: authenticate_user(); break;
    }
  }
}
 
//Function to check if the request is an AJAX request
function is_ajax() {
  return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}
 


?>