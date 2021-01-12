<?php

    /* ### HTML ###################################### */

    $projectId = 1;
    $locCode = 1; 

    $tbCasino = "t_casinomap";
    $activeWhere = "WHERE project_id = {$GLOBALS['projectId']} AND loc_code = '{$GLOBALS['locCode']}' AND visible = 1";

    /**
     * Just read branch_id for html <div> holders
     */
    function readMapPoints(){
        
        $conn = openDbCon();

        $sql = "SELECT branch_id FROM {$GLOBALS['tbCasino']} {$GLOBALS['activeWhere']}";
        $result = mysqli_query($conn, $sql);
        //$result = $conn->query($sql);

        if ($result->num_rows > 0) {
            return $result;
        } 
        else {
            echo "0 results";
        }

        closeDbCon($conn);
    }

    /**
     * Create JSON for Google Maps
     */
    function readLocations(){
        $conn = openDbCon();

        $sql = "SELECT * FROM {$GLOBALS['tbCasino']} {$GLOBALS['activeWhere']}";
        $result = mysqli_query($conn, $sql);

        $arr = array('markers' => array());
        if ($result->num_rows > 0) {
            while ($row = mysqli_fetch_array($result)) {
                $branch_id = $row["branch_id"];
                $branch_name = $row["branch_name"];
                $branch_address1 = $row["branch_address1"];
                $branch_address2 = $row["branch_address2"];
                $branch_city = $row["branch_city"];
                $branch_psc = $row["branch_psc"];
                $branch_url = $row["branch_url"];
                $branch_latitude = $row["branch_latitude"];
                $branch_longitude = $row["branch_longitude"];
                
                $marker = array(
                    "id" => $branch_id,
                    "name" => $branch_name,
                    "address" => $branch_address1 ." ".$branch_address2,
                    "city" => $branch_city,
                    "psc" => $branch_psc,
                    "location" => array(floatval($branch_latitude), floatval($branch_longitude)),
                    "url" => $branch_url
                );
                array_push($arr['markers'], $marker);
            }
        } 
        
        $json = json_encode($arr);
        echo $json;
    }

    /* -------------------------------- */
    function openDbCon(){
        $dbhost = "localhost";
        $dbuser = "root";
        $dbpass = "root";
        $db = "casinosearch";

        $conn = new mysqli($dbhost, $dbuser, $dbpass, $db);
        
        if (!$conn) {
            die("Connection failed: " . mysqli_connect_error());
            //die("Connect failed: %s\n". $conn -> error);
         }

        return $conn;
    }

    function closeDbCon($conn){
        $conn -> close();
    }


?>