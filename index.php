<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />

  <title>CasinoSearch Google Map</title>
  <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>

  <script
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBM7BJW0HCNZjbzUc-Zm_Cj8_K_2I7YYfs&callback=initMap&libraries=&v=weekly"
    defer></script>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

  <!-- Latest compiled and minified CSS -->
  <!-- <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous"> -->
  <!-- <link rel="stylesheet" href="./bootstrap/css/bootstrap.min.css"> -->
  <link rel="stylesheet" href="https://www.casinosearch.sk/assets/stylesheets/bootstrap.min.css">

  <!-- <link rel="stylesheet" href="./bootstrap/css/bootstrap-theme.min.css"> -->

  <!-- Latest compiled and minified JavaScript -->
  <!-- <script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js" integrity="sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd" crossorigin="anonymous"></script> -->
  <script src="./bootstrap/js/bootstrap.min.js"></script>

  <link rel="stylesheet" type="text/css" href="./style.css" />
  <script src="./index.js" charset="utf-8"></script>
</head>

<body>
  <div id="map"></div>

  <!-- Modal1 - Carlton -->
  <!-- <div class="modal fade mapPointModal" id="mapPointDetail1" tabindex="-1" role="dialog" style="display: none;">
  </div> -->

  <!-- Modal2 - Eurovea -->
  <!-- <div class="modal fade mapPointModal" id="mapPointDetail2" tabindex="-1" role="dialog" style="display: none;">
  </div> -->

  <?php
    include 'server.php';
    $result = readMapPoints();

    if (mysqli_num_rows($result) > 0) 
    {
        while($row = mysqli_fetch_assoc($result)) 
        {
            echo "<div class=\"modal fade mapPointModal\" id=\"mapPointDetail{$row['branch_id']}\" tabindex=\"-1\" role=\"dialog\" style=\"display: none;\"></div>\n";
        }
    }
  ?>

</body>

</html>