<?php

function search(){
	include_once("check_session.php");

	$return = $_POST;

	$keyword = strip_tags($_POST['searchBox']);
	$cuisine = strip_tags($_POST['searchBox']);
	$health = strip_tags($_POST['health']);
	$price = strip_tags($_POST['price']);
	$distance = strip_tags($_POST['distance']);
	$start = (int)strip_tags($_POST['start']);
	$end = (int)strip_tags($_POST['end']);
	$syncid = $_SESSION['syncid'];

 //    $return["response"] = $end;
	// echo json_encode($return);
	// $db = null;
	// exit();

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

        $cuisine = '%'.$cuisine.'%';
		$stmt1 = $db->prepare("SELECT count(*) as count FROM (SELECT `name`, `street`, `building`, `city` FROM restaurants WHERE LOWER(cuisine) like LOWER(:cuisine) group by `name`, `street`, `building`, `city` having max(gradedate) order by gradedate desc) as dist_rest");
		$stmt1->bindValue(':cuisine',$cuisine,PDO::PARAM_STR);
		try{
			$stmt1->execute();
			$count = $stmt1->rowCount();
			if($count > 0){
				$stmt2 = $db->prepare("SELECT name, street, building, city, phone, price, cuisine, grade FROM restaurants WHERE LOWER(cuisine) like LOWER(:cuisine) group by `name`, `street`, `building`, `city` having max(gradedate) order by gradedate desc ");
				$stmt2->bindValue(':cuisine',$cuisine,PDO::PARAM_STR);
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