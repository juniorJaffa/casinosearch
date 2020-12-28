// In this example, we center the map, and add a marker, using a LatLng object
// literal instead of a google.maps.LatLng object. LatLng object literals are
// a convenient way to add a LatLng coordinate and, in most cases, can be used
// in place of a google.maps.LatLng object.
let map;
let jsonData;

function initMap() {

    // call php
    loadData();

    //loadMap();

}

function loadData() {
    $.ajax({
        type: "POST",
        url: 'index.php',
        data: $(this).serialize(),
        success: function(response)
        {
            console.log("php response: "+response);
            var jsonData = JSON.parse(response);
            console.log("jsonData: "+jsonData);
       }
   });         
}

function loadMap() {

    const mapOptions = {
        zoom: 16,
        center: { lat: 48.14126478819999, lng: 17.116004918026448 },
      };
      map = new google.maps.Map(document.getElementById("map"), mapOptions);
    
      // Olympic Casino Bratislava, Carlton
      // Hviezdoslavovo námestie 3, (Hotel Carlton)
      const marker1 = new google.maps.Marker({
        // The below line is equivalent to writing:
        // position: new google.maps.LatLng(-34.397, 150.644)
        position: { lat: 48.14143788944112, lng: 17.108613893253427 },
        map: map,
      });
    
    
      // Olympic Casino Bratislava, Eurovea
      // Pribinova 8
      const marker2 = new google.maps.Marker({
        // The below line is equivalent to writing:
        // position: new google.maps.LatLng(-34.397, 150.644)
        position: { lat: 48.14057591384127, lng: 17.12373869843766 }, 
        map: map,
      });
    
      // You can use a LatLng literal in place of a google.maps.LatLng object when
      // creating the Marker object. Once the Marker object is instantiated, its
      // position will be available as a google.maps.LatLng object. In this case,
      // we retrieve the marker's position using the
      // google.maps.LatLng.getPosition() method.
      const infowindow = new google.maps.InfoWindow({
        content: 
        "<p>Olympic Casino Bratislava, Carlton</p>"
        + "<p>Hviezdoslavovo námestie 3, (Hotel Carlton)</p>"
        + "<p>Marker Location:" + marker1.getPosition() + "</p>",
      });
    
      marker.addListener("click", toggleBounce);
      google.maps.event.addListener(marker1, "click", () => {
        infowindow.open(map, marker1);
      });
}

function toggleBounce() {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}