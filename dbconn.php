<?php
/**** MySQL Stat Reporter ****/
/** DB connect **/
/**** Tyler Normile ****/  

function connect_db(){

  $server = "localhost";
  $username = "root";
  $password = "root";
  $database = "fusche";
  $pswd = "";

  $con=mysqli_connect($server,$username,$password,$database);
  // Check connection
  if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

  return $con;

}

function insert_user($user_name,$user_email,$user_pwd,$verbatim){
  
  if(check_email($user_email)=="0"){

  	return "Email already registered";

  }else{
  	$con = connect_db();
    $con1 = connect_db();
    $con2 = connect_db();

	mysqli_query($con,"INSERT INTO signup (name, email, pswd)
	VALUES ('$user_name','$user_email','$user_pwd')");

  $result = mysqli_query($con,"SELECT * FROM signup WHERE email = '$user_email' ");

  while($row = mysqli_fetch_array($result)) {
    $pswd = $row['pswd'];
    $signid = $row['signid'];
    $name = $row['name'];
  }

  mysqli_query($con,"INSERT INTO synclogin (signid,loginid, name, email)
  VALUES ($signid,1,'$user_name','$user_email')");

  $result = mysqli_query($con,"SELECT * FROM synclogin WHERE signid = '$signid' ");

  while($row = mysqli_fetch_array($result)) {
    $syncid = $row['syncid'];
  }

	mysqli_close($con);

	return $syncid;

  }
}

function fetch_user($user_email){

  $con = connect_db();

  $result = mysqli_query($con,"SELECT * FROM signup WHERE email = '$user_email' ");

  while($row = mysqli_fetch_array($result)) {
    $pswd = $row['pswd'];
    $signid = $row['signid'];
    $name = $row['name'];
  }

  mysqli_close($con);

  return array($pswd, $name, $signid);

}

function check_email($email){

	$con = connect_db();

    $query=$con->stmt_init();
    $query->prepare("SELECT count(*) FROM signup where email=?");
    $query->bind_param("s",$email);
    $query->execute();
    $query->bind_result($user_count);
    $query->fetch();
    //$query->close();
    //echo "fetching username";
    //if yes then raise the flag
    if($user_count!=0){
        return "0";
    }
    $query->close();
    mysqli_close($con);

}

function insert_user_preference($bio,$health,$price,$distance,$syncid){

    $con = connect_db();

    mysqli_query($con,"INSERT INTO user_preference (syncid, health_rating, price_range, distance)
    VALUES ($syncid,'$health','$price','$distance')");

    mysqli_close($con);

    return "Success";

}

?>