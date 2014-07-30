<?php

function save_preferences(){
  include_once("check_session.php");

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

  $bio = strip_tags($_POST['bio']);
  $health = strip_tags($_POST['health']);
  $price = strip_tags($_POST['price']);
  $distance = strip_tags($_POST['distance']);
  $syncid = $_SESSION['syncid'];

  //// query to check if user entry is in the db already ////
  try{
    $stmt = $db->prepare("SELECT syncid FROM user_preference WHERE syncid=:syncid LIMIT 1");
    $stmt->bindValue(':syncid',$syncid,PDO::PARAM_STR);
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
     try{
        $stmt1 = $db->prepare("UPDATE user_preference SET health_rating=:health, price_range=:price, distance=:distance, bio=:bio  WHERE syncid=:syncid");
        $stmt1->bindParam(':health',$health);
        $stmt1->bindParam(':price',$price);
        $stmt1->bindParam(':distance',$distance);
        $stmt1->bindParam(':bio',$bio);
        $stmt1->bindParam(':syncid',$syncid);
        $stmt1->execute();
        $return["response"] = "Success";
        echo json_encode($return);
        exit();
      }
      catch(PDOException $e){
        $return["response"] = $e->getMessage();
        echo json_encode($return);
        $db = null;
      exit();
      }
  }else{
     try{

        $stmt4 = $db->prepare("INSERT INTO user_preference (health_rating, price_range, distance, bio,  syncid) 
        VALUES ( :health, :price, :distance, :bio, :syncid )");
        $stmt4->bindParam(':health',$health,PDO::PARAM_STR);
        $stmt4->bindParam(':price',$price,PDO::PARAM_STR);
        $stmt4->bindParam(':distance',$distance,PDO::PARAM_STR);
        $stmt4->bindParam(':bio',$bio,PDO::PARAM_STR);
        $stmt4->bindParam(':syncid',$syncid,PDO::PARAM_STR);
        $stmt4->execute();

        $return["response"] = "Success";
        echo json_encode($return);
        exit();
      }
      catch(PDOException $e){
        $return["response"] = $e->getMessage();
        echo json_encode($return);
        $db = null;
      exit();
      }
  }

}

?>