<?php
    include 'server.php';
    /* vr2 */
    echo readLocations();

    /* vr1 */
    /*
    echo readJSONFile('data.json');
    
    function readJSONFile($filename) {
        $str = file_get_contents($filename);
        //var_dump($str);

        $jsonFile = json_decode($str, true); 
        //var_dump($jsonFile);

        $json = json_encode($jsonFile);
        //var_dump($json);

        return $json;
    }
    */
  
  ?>