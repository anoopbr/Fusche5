<?php

function register_user(){
  $return = $_POST;

  $user_pwd = password_hash($_POST["user_pwd"], PASSWORD_DEFAULT)."\n";

  $verbatim = substr($user_pwd, 7); 
  $verbatim = substr($verbatim, 28); 

  $res = insert_user($_POST["user_name"],$_POST["user_email"],$user_pwd,$verbatim);

  $return["user_pwd"] = $user_pwd;
  $return["response"] = $res;
  
    
    
    
  if($res != ""){
      session_start();
      $_SESSION['name'] = $_POST["user_name"];
      $_SESSION['email'] = $_POST["user_email"];
      $_SESSION['syncid'] = $res;
      $return["response"] = "Authenticated";
      
  }

  $return["json"] = json_encode($return);
  echo json_encode($return);
}

function authenticate_user(){

  $user_details = fetch_user($_POST["user_email"]);
  $user_pwd_hash = $user_details[0];
  $user_signid = $user_details[1];
  $user_name = $user_details[2];
  $user_pwd_hash = trim($user_pwd_hash);
  $user_pwd = $_POST["user_pwd"];

  $return = $_POST;

  if($user_pwd!=""){
    if (password_verify($user_pwd, $user_pwd_hash)) {
      $return["response"] = "Authenticated";
      session_start();
      $_SESSION['name'] = $user_name;
      $_SESSION['email'] = $user_name;
      $_SESSION['signid'] = $user_signid;
    } else {
      $return["response"] = "Invalid email or password.";
    }
  }else{
    $return["response"] = "Invalid email or password.";
  }

  $user_pwd_hash = $user_pwd_hash;

  $return["user_pwd"] = $user_pwd_hash;

  echo json_encode($return);

}

?>