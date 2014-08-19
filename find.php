<?php

function search(){
	include_once("check_session.php");

	$return = $_POST;

	$keyword = strip_tags($_POST['searchBox']);
	$health = strip_tags($_POST['health']);
	$price = strip_tags($_POST['price']);
	$distance = strip_tags($_POST['distance']);
	$start = (int)strip_tags($_POST['start']);
	$end = (int)strip_tags($_POST['end']);
	$lat = (int)strip_tags($_POST['lat']);
	$lng = (int)strip_tags($_POST['lng']);
	$syncid = $_SESSION['syncid'];

	if($syncid=="" or $syncid == null){
		$return["response"] = $end;
	echo json_encode($return);
	$db = null;
	exit();
	}

	if($distance =="" or $distance==null){
		$distance = 5;
		$return["distance"] = $distance;
	}
	if($price =="" or $price==null){
		$price = '0';
		$return["price"] = $price;
	}
	if($health =="" or $health==null){
		$health = 'A';
		$return["health"] = $health;
	}
	if($lat =="" or $lat==null){
		$lat = "40.767291";
		$return["lat"] = $lat;
	}
	if($lng =="" or $lng==null){
		$lng = "-73.9572315";
		$return["lng"] = $lng;
	}

    $radius = 6371;

    // latitude boundaries
	$maxlat = $lat + rad2deg($distance / $radius);
	$minlat = $lat - rad2deg($distance / $radius);

	// longitude boundaries (longitude gets smaller when latitude increases)
	$maxlng = $lng + rad2deg($distance / $radius / cos(deg2rad($lat)));
	$minlng = $lng - rad2deg($distance / $radius / cos(deg2rad($lat)));


     try{

        $stmt = $db->prepare("INSERT INTO search_history (health_rating, price_range, distance, search_tag, cuisine_tag,  syncid, time) 
        VALUES ( :health, :price, :distance, :keyword, :cuisine, :syncid , now())");
        $stmt->bindParam(':health',$health,PDO::PARAM_STR);
        $stmt->bindParam(':price',$price,PDO::PARAM_STR);
        $stmt->bindParam(':distance',$distance,PDO::PARAM_STR);
        $stmt->bindParam(':keyword',$keyword,PDO::PARAM_STR);
        $stmt->bindParam(':cuisine',$cuisine,PDO::PARAM_STR);
        $stmt->bindParam(':syncid',$syncid,PDO::PARAM_STR);
        $stmt->execute();

        // $return["response"] = "Success";
        // echo json_encode($return);
        // exit();

        $cuisine = '%'.$keyword.'%';
		$stmt1 = $db->prepare("SELECT count(*) as count FROM (SELECT `name`, `street`, `building`, `city` 
			FROM restaurants WHERE 
			(LOWER(cuisine) like LOWER(:cuisine) or LOWER(name) like LOWER(:cuisine)) and
			price like :price and grade like :health and
			latitude BETWEEN :minlat AND :maxlat and
			longitude BETWEEN :minlng AND :maxlng
			group by `name`, `street`, `building`, `city` having max(gradedate) order by gradedate desc) as dist_rest");
		$stmt1->bindValue(':cuisine',$cuisine,PDO::PARAM_STR);
		$stmt1->bindValue(':cuisine',$cuisine,PDO::PARAM_STR);
		$stmt1->bindValue(':price',$price,PDO::PARAM_STR);
		$stmt1->bindValue(':health',$health,PDO::PARAM_STR);
		$stmt1->bindValue(':minlat',$minlat,PDO::PARAM_INT);
		$stmt1->bindValue(':maxlat',$maxlat,PDO::PARAM_INT);
		$stmt1->bindValue(':minlng',$minlng,PDO::PARAM_INT);
		$stmt1->bindValue(':maxlng',$maxlng,PDO::PARAM_INT);
		try{
			$stmt1->execute();
			$count = $stmt1->rowCount();
			if($count > 0){
				$stmt2 = $db->prepare("SELECT restaurantid, name, street, building, city, phone, price, cuisine, grade, latitude, longitude 
					FROM restaurants WHERE 
					(LOWER(cuisine) like LOWER(:cuisine) or LOWER(name) like LOWER(:cuisine)) and
					price like :price and grade like :health and
					latitude BETWEEN :minlat AND :maxlat and
					longitude BETWEEN :minlng AND :maxlng
					group by `name`, `street`, `building`, `city` having max(gradedate) order by gradedate desc ");
				$stmt2->bindValue(':cuisine',$cuisine,PDO::PARAM_STR);
				$stmt2->bindValue(':cuisine',$cuisine,PDO::PARAM_STR);
				$stmt2->bindValue(':price',$price,PDO::PARAM_STR);
				$stmt2->bindValue(':health',$health,PDO::PARAM_STR);
				$stmt2->bindValue(':minlat',$minlat,PDO::PARAM_INT);
				$stmt2->bindValue(':maxlat',$maxlat,PDO::PARAM_INT);
				$stmt2->bindValue(':minlng',$minlng,PDO::PARAM_INT);
				$stmt2->bindValue(':maxlng',$maxlng,PDO::PARAM_INT);
				// $stmt2->bindValue(':start',$start,PDO::PARAM_INT);
				// $stmt2->bindValue(':end',$end,PDO::PARAM_INT);
				try{
					$stmt2->execute();
				    $result = $stmt2->fetchAll(PDO::FETCH_OBJ);
				    //$result = $stmt2->fetchAll(PDO::FETCH_ASSOC);
				    $return["response"] = "success";

					$return["value"] = $result;
					$return["json"] = json_encode($return);
					echo json_encode($return);
					$db = null;
					exit();
				}
				catch(PDOException $e){
					$return["response"] = $e->getMessage();
					echo json_encode($return);
					$db = null;
					exit();
				}
			}else{
				$return["response"] = "Unable to find any restaurants matching the criteria";
				echo json_encode($return);
				$db = null;
	    		exit();
			}
			$return["response"] = $name;
			echo json_encode($return);
			$db = null;
    		exit();
			}
		catch(PDOException $e){
		$return["response"] = $e->getMessage();
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