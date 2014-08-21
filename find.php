<?php
 
function search(){
    include_once("check_session.php");
 
    $return = $_POST;
 
    $keyword = strip_tags($_POST['searchBox']);
    $keyword = trim($keyword);
    $health = strip_tags($_POST['health']);
    $price = strip_tags($_POST['price']);
    $distance = strip_tags($_POST['distance']);
    $start = (int)strip_tags($_POST['start']);
    $end = (int)strip_tags($_POST['end']);
    $lat = $_POST['lat'];
    $lng = $_POST['lng'];
    $syncid = $_SESSION['syncid'];
 
    // if($syncid=="" or $syncid == null){
    //     $return["response"] = $end;
    // echo json_encode($return);
    // $db = null;
    // exit();
    // }

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
        $lat = "40.760000";
        $return["lat"] = $lat;
    }
    if($lng =="" or $lng==null){
        $lng = "-73.980000";
        $return["lng"] = $lng;
    }
 
    $radius = 6371;
 
    // latitude boundaries
    $maxlat = $lat + rad2deg($distance / $radius);
    $minlat = $lat - rad2deg($distance / $radius);

    // longitude boundaries (longitude gets smaller when latitude increases)
    $maxlng = $lng + rad2deg($distance / $radius / cos(deg2rad($lat)));
    $minlng = $lng - rad2deg($distance / $radius / cos(deg2rad($lat)));

    $return["maxLat"] = $maxlat;
    $return["minLat"] = $minlat;
    $return["maxLng"] = $maxlng;
    $return["minLng"] = $minlng;

    preg_match_all("/(#\w+)/", $keyword, $matches);

    $return["hastags"] = $matches[0];

    $new_keyword = preg_replace("/(#\w+)/", " ", $keyword);

    $return["new_keyword"] = trim($new_keyword);

    $new_keys = explode(" ", trim($new_keyword));

    $return["new_keys"] = $new_keys;

    $output = substr($keyword, 0, 1);
    if($output[0] == '#'){
        $output = explode('#', $keyword, 2);
        $keyword = $output[1];
        $return["output1"] = $keyword;

        $output = explode(' ', $keyword, 2);
        $com_cuisine = $output[0];
        $return["output2"] = trim($com_cuisine);
        $com_name = $output[1];
        $return["output3"] = trim($com_name);

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
        $query = "SELECT restaurantid, name, street, building, city, phone, price, cuisine, grade, latitude, longitude FROM restaurants WHERE ";
        
        $numItems = count($matches[0]);
        $i = 0;

        foreach ($matches[0] as $key=>$val) {
            if($key == 0){
                $query .= "(";
            }else{
                $query .= " or ";
            }
            $output = explode('#', $matches[0][$key], 2);
            $query .= " LOWER(cuisine) like LOWER('%".$output[1]."%') "; 
            if(++$i === $numItems) {
                $query .= ") ";
            }
        }

        $numItems = count($new_keys);
        $i = 0;
        foreach ($new_keys as $key => $value) {
            if($key == 0){
                if(trim($value) != ""){
                    $query .= " and (";
                    $query .= " LOWER(name) like LOWER('%".trim($value)."%') "; 
                }
            }elseif(++$i === $numItems) {
                if(trim($value) != ""){
                    $query .= " or ";
                    $query .= " LOWER(name) like LOWER('%".trim($value)."%') "; 
                    $query .= " )";
                }
            }else{
                if(trim($value) != ""){
                    $query .= " or ";
                    $query .= " LOWER(name) like LOWER('%".trim($value)."%') "; 
                }
            }

        }

        $query .= "group by `name`, `street`, `building`, `city` having max(gradedate) order by gradedate desc ";
        $return["query1"] = $query;

        $stmt2 = $db->prepare($query);
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


        }
        catch(PDOException $e){
        $return["response"] = $e->getMessage();
        echo json_encode($return);
        $db = null;
        exit();
        }

    }else{
        $return["output"] = $output[0];

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
        $query = "SELECT restaurantid, name, street, building, city, phone, price, cuisine, grade, latitude, longitude FROM restaurants WHERE ";
        $numItems = count($new_keys);
        $i = 0;
        foreach ($new_keys as $key => $value) {
            if($key == 0){
                if(trim($value) != ""){
                    $query .= "(";
                    $query .= " LOWER(name) like LOWER('%".trim($value)."%') "; 
                }
            }else{
                if(trim($value) != ""){
                    $query .= " or ";
                    $query .= " LOWER(name) like LOWER('%".trim($value)."%') "; 
                }
            }
            if(++$i === $numItems) {
                $query .= ")";
            }

        }

        $query .= "group by `name`, `street`, `building`, `city` having max(gradedate) order by gradedate desc ";
        $return["query1"] = $query;


        $stmt2 = $db->prepare($query);
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