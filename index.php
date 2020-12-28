<?php

$str = file_get_contents('data.json');
var_dump($str); // show contents
$jsonFile = json_decode($str, true); 
echo $jsonFile;

?>