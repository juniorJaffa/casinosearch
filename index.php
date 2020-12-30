<?php

$str = file_get_contents('data.json');
//var_dump($str);

$jsonFile = json_decode($str, true); 
//var_dump($jsonFile);

$json = json_encode($jsonFile);
//var_dump($json);

echo $json;

?>